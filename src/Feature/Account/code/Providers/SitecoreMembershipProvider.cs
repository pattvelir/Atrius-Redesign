using System;
using System.Net.Mail;
using System.Web;
using System.Web.Security;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore;
using Sitecore.Analytics;
using Sitecore.Analytics.Tracking.Identification;
using Sitecore.Data;
using Sitecore.Security.Accounts;
using Sitecore.Security.Authentication;
using Sitecore.StringExtensions;
using Thread.Feature.Account.Services;
using Thread.Feature.Account.Services.Models;
using Thread.Foundation.Abstractions.Account;
using Thread.Foundation.Forms;
using Thread.Foundation.Orm.Services;
using Thread.Foundation.SitecoreExtensions.Base;
using Thread.Foundation.SitecoreExtensions.Item;

namespace Thread.Feature.Account.Providers
{
	[AutowireService(LifetimeScope.PerScope)]
	public class SitecoreMembershipProvider : IMembershipProvider
	{
		private readonly IContextProvider _context;
		private readonly IAccountLinkService _linkService;
        private readonly IContactIdentificationManager _manager;

		public SitecoreMembershipProvider(IContextProvider context, IAccountLinkService linkService, IContactIdentificationManager manager)
		{
			_context = context;
			_linkService = linkService;
            _manager = manager;
        }

		public MembershipProviderResponse Login(CredentialsInput input)
        { 
            var domain = _context.GetDomain();
            var accountName = domain.GetFullName(input.UserName);

            var result = AuthenticationManager.Login(accountName, input.Password);
			if (!result)
			{
				return new MembershipProviderResponse
				{
					Success = false,
					Message = $"Failed to login in user: {accountName}"
				};
			}

			if (Tracker.Enabled && Tracker.IsActive)
			{
				var source = $"{_context.GetSite().Name}{domain?.Name}";
                _manager?.IdentifyAs(new KnownContactIdentifier(source, accountName));
			}

			return new MembershipProviderResponse
			{
				Success = true
			};
		}

		public MembershipProviderResponse Logout()
		{
			try
			{
				AuthenticationManager.Logout();

				return new MembershipProviderResponse
				{
					Success = true
				};
			}
			catch (Exception ex)
			{
				return new MembershipProviderResponse
				{
					Success = false,
					Message = $"An error occurred logging out user. Error: {ex.Message}"
				};
			}
		}

		public MembershipProviderResponse Register(RegisterUserInput input)
		{
			var domain = _context.GetDomain();
			var accountName = domain.GetFullName(input.UserName);

			if (User.Exists(accountName))
			{
				return new MembershipProviderResponse
				{
					Success = false,
					Message = $"{input.EmailAddress} has already been used."
				};
			}

			var user = User.Create(accountName, input.Password);
			user.Profile.Email = input.EmailAddress;
			user.Profile.FullName = $"{input.FirstName} {input.LastName}";
			user.Profile.SetCustomProperty("FirstName", input.FirstName);
			user.Profile.SetCustomProperty("LastName", input.LastName);
            user.Profile.SetCustomProperty("PasswordToken", ID.NewID.ToShortID().ToString());

            user.Profile.Save();

			var member = Membership.GetUser(accountName);

			if (member == null)
			{
				return new MembershipProviderResponse
				{
					Success = false,
					Message = $"{input.EmailAddress} does not have a valid login."
				};
			}

			member.IsApproved = false;
			Membership.UpdateUser(member);

			return new MembershipProviderResponse
			{
				Success = true
			};
		}

		public MembershipProviderResponse ConfirmAccount()
		{
			var input = _linkService.GetAccountParams(HttpContext.Current.Request.QueryString);
			if (input.ExpirationDate < DateTime.Now)
			{
				return new MembershipProviderResponse
				{
					Success = false,
					Message = "Registration Confirmation link has expired."
				};
			}

			var domain = _context.GetDomain();
			var accountName = domain.GetFullName(input.EmailAddress);

			var member = Membership.GetUser(accountName);

			if (member == null)
			{
				return new MembershipProviderResponse
				{
					Success = false,
					Message = $"{input.EmailAddress} does not have a valid login."
				};
			}
			
			member.IsApproved = true;
			Membership.UpdateUser(member);

			return new MembershipProviderResponse
			{
				Success = true
			};
		}

		public MembershipProviderResponse SendSecureLink(SecureLinkInput input)
        {
            var domain = _context.GetDomain();
            var accountName = domain.GetFullName(input.EmailAddress);

			if (!User.Exists(accountName))
			{
				return new MembershipProviderResponse
				{
					Success = false,
					Message = $"No account found for email address: {input.EmailAddress}"
				};
			}

			try
			{
				var message = BuildMailMessage(input);

				MainUtil.SendMail(message);
			}
			catch (Exception ex)
			{
				return new MembershipProviderResponse
				{
					Success = false,
					Message = $"Error sending forgot password email: {ex.Message}"
				};
			}

			return new MembershipProviderResponse
			{
				Success = true
			};
		}

		protected MailMessage BuildMailMessage(SecureLinkInput input)
		{
			EmailTemplateItem emailTemplateItem = _context.GetDatabase().GetItem(input.EmailTemplateId);

			var message = new MailMessage(emailTemplateItem.From.Value, input.EmailAddress)
			{
				IsBodyHtml = true,
				Subject = ReplaceTokens(emailTemplateItem.Subject.Value, input),
				Body = ReplaceTokens(emailTemplateItem.Body.Value, input)
			};

			if (!string.IsNullOrEmpty(emailTemplateItem.CC?.Value))
			{
				message.CC.Add(emailTemplateItem.CC.Value);
			}

			if (!string.IsNullOrEmpty(emailTemplateItem.Bcc?.Value))
			{
				message.Bcc.Add(emailTemplateItem.Bcc.Value);
			}
			
			return message;
		}

		protected string ReplaceTokens(string text, SecureLinkInput input)
		{
            var domain = _context.GetDomain();
            var accountName = domain.GetFullName(input.EmailAddress);

            var user = User.FromName(accountName, false);

            if (text.Contains("$link$"))
			{
				var page = _context.GetDatabase().GetItem(input.PageId);
				var link = _linkService.GenerateSecureUrl(new AccountLinkInput
				{
					BaseUrl = page?.Url()?.GetFullUrl(),
					EmailAddress = input.EmailAddress,
					ExpirationMinutes = input.Expiration,
                    RedirectUrl = input.RedirectUrl      
                },
                user?.Profile?.GetCustomProperty("PasswordToken")??string.Empty);

				text = text.Replace("$link$", $"<a href=\"{link}\">{link}</a>");
			}

			if (text.Contains("$firstName$") || text.Contains("$lastName$") || text.Contains("$fullName$"))
			{

				if (user != null)
				{
					text = text.Replace("$firstName$", user.Profile.GetCustomProperty("FirstName"));
					text = text.Replace("$lastName$", user.Profile.GetCustomProperty("LastName"));
					text = text.Replace("$fullName$", user.Profile.FullName);
				}
			}
			
			return text;
		}

		public MembershipProviderResponse ResetPassword(CredentialsInput input)
		{
			var linkParams = _linkService.GetAccountParams(HttpContext.Current.Request.QueryString);

            var domain = _context.GetDomain();
            var accountName = domain.GetFullName(linkParams.EmailAddress);

            var membershipUser = Membership.GetUser(accountName);
            if (membershipUser == null)
            {
                return new MembershipProviderResponse
                {
                    Success = false,
                    Message = $"No user found with the username: {accountName}"
                };
            }

            

            var user = User.FromName(domain.GetFullName(linkParams.EmailAddress), true);


            if (linkParams.ExpirationDate < DateTime.Now || (user != null &&user.Profile != null &&  user?.Profile?.GetCustomProperty("PasswordToken")!=linkParams.PasswordToken))
			{
				return new MembershipProviderResponse
				{
					Success = false,
					Message = "Reset Password link has expired."
				};
            }

            var resetPassword = membershipUser.ResetPassword();
			membershipUser.ChangePassword(resetPassword, input.Password);

            user.Profile.SetCustomProperty("PasswordToken", ID.NewID.ToShortID().ToString());

            user.Profile.Save();

            return new MembershipProviderResponse
			{
				Success = true
			};
		}
	}
}