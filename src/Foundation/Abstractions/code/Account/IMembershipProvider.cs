using System;
using Sitecore.Data;

namespace AtriusHealth.Foundation.Abstractions.Account
{
	public interface IMembershipProvider
	{
		MembershipProviderResponse Login(CredentialsInput input);
		MembershipProviderResponse Logout();
		MembershipProviderResponse Register(RegisterUserInput input);
		MembershipProviderResponse ConfirmAccount();
		MembershipProviderResponse SendSecureLink(SecureLinkInput input);
		MembershipProviderResponse ResetPassword(CredentialsInput input);
	}

	public class CredentialsInput
	{
		public virtual string UserName { get; set; }
		public virtual string Password { get; set; }
	}

	public class RegisterUserInput : CredentialsInput
	{
		public virtual string FirstName { get; set; }
		public virtual string LastName { get; set; }
		public virtual string EmailAddress { get; set; }
	}

	public class SecureLinkInput
	{
		public virtual string EmailAddress { get; set; }
		public virtual ID PageId { get; set; }
		public virtual int Expiration { get; set; }
		public virtual ID EmailTemplateId { get; set; }
        public virtual string RedirectUrl { get; set; }
	}

	public class MembershipProviderResponse
	{
		public virtual bool Success { get; set; }
		public virtual string Message { get; set; }
	}
}
