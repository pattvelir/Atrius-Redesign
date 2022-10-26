using System;
using Sitecore.Data;
using Sitecore.DependencyInjection;
using Thread.Foundation.SitecoreExtensions.DependencyInjection;
using Sitecore.Diagnostics;
using Sitecore.ExperienceForms.Models;
using Sitecore.ExperienceForms.Processing;
using Thread.Foundation.Abstractions.Account;
using Thread.Foundation.Forms.SubmitActions;
using Thread.Foundation.Multisite.Configuration;

namespace Thread.Feature.Account.Forms.SubmitActions.Password
{
	public class SendSecureLink : AccountSubmitActionBase<SendSecureLinkData>
	{
		public SendSecureLink(ISubmitActionData submitActionData) : base(submitActionData)
		{
		}

		protected override bool Execute(SendSecureLinkData data, FormSubmitContext formSubmitContext)
		{
			Assert.ArgumentNotNull(data, nameof(data));
			Assert.ArgumentNotNull(formSubmitContext, nameof(formSubmitContext));

			var input = GetFormValues(data, formSubmitContext);

			Assert.IsNotNull(input, nameof(input));

			if (EmailValueIsNull(input))
			{
				return AbortForm(formSubmitContext);
			}

			var response = MembershipProvider.SendSecureLink(input);

			if (!response.Success)
			{
				return AbortForm(formSubmitContext, response.Message);
			}

			return true;
		}

		private SecureLinkInput GetFormValues(SendSecureLinkData data, FormSubmitContext formSubmitContext)
		{
			Assert.ArgumentNotNull(data, nameof(data));
			Assert.ArgumentNotNull(formSubmitContext, nameof(formSubmitContext));

            ISitecoreConfigurationManager sitecoreConfigManager = ServiceLocator.ServiceProvider.GetService<ISitecoreConfigurationManager>();
            _AccountConfigurationItem config = sitecoreConfigManager.GetSettings(_AccountConfigurationItem.TemplateId);

            ID redirectPage = data.IsResetLink ? config?.ResetPasswordPage?.TargetID : config?.RegistrationConfirmationPage?.TargetID;
            string redirectUrl = data.IsResetLink
                ? $"{(string.IsNullOrEmpty(config?.LoginPage?.GetFriendlyUrl()) ? "/" : config.LoginPage.GetFriendlyUrl())}?referrer=resetPassword"
                : string.Empty;

            return new SecureLinkInput
			{
				EmailAddress = FieldHelper.GetFieldValueById(data.EmailAddressFieldId, formSubmitContext.Fields),
				PageId = redirectPage,
                Expiration = int.Parse(data.Expiration),
				EmailTemplateId = new ID(data.EmailTemplateId),
                RedirectUrl = redirectUrl
            };
		}

		private bool EmailValueIsNull(SecureLinkInput values)
		{
			Assert.ArgumentNotNull(values, nameof(values));
			return string.IsNullOrEmpty(values.EmailAddress);
		}
	}

	public class SendSecureLinkData
	{
		public Guid EmailAddressFieldId { get; set; }
		public string Expiration { get; set; }
		public Guid EmailTemplateId { get; set; }
        public bool IsResetLink { get; set; }
	}
}