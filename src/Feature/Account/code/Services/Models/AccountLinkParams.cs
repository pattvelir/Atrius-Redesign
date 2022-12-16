using System;

namespace AtriusHealth.Feature.Account.Services.Models
{
	public class AccountLinkParams
	{
		public virtual string EmailAddress { get; set; }
		public virtual string PasswordToken { get; set; }
		public virtual DateTime ExpirationDate { get; set; }
	}
}
