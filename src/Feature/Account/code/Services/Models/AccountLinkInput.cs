namespace AtriusHealth.Feature.Account.Services.Models
{
	public class AccountLinkInput
	{
		public virtual string BaseUrl { get; set; }
		public virtual string EmailAddress { get; set; }
		public virtual int ExpirationMinutes { get; set; }
        public virtual string RedirectUrl { get; set; }
        public virtual string PasswordToken { get; set; }
    }
}
