using System;

namespace Thread.Feature.Account.Forms.SubmitActions.Register
{
	public class RegisterUserData
	{
		public Guid EmailAddressFieldId { get; set; }

		public Guid PasswordFieldId { get; set; }

		public Guid FirstNameFieldId { get; set; }
		public Guid LastNameFieldId { get; set; }
		public Guid ConfirmationPageId { get; set; }
		public string Expiration { get; set; }
	}
}