using System;
using System.Collections.Specialized;
using System.Web;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.Configuration;
using AtriusHealth.Feature.Account.Cipher;
using AtriusHealth.Feature.Account.Services.Models;
using AtriusHealth.Foundation.Forms.Reference;
using AtriusHealth.Foundation.Multisite.Configuration;
using AtriusHealth.Foundation.SitecoreExtensions.Base;

namespace AtriusHealth.Feature.Account.Services
{
	[AutowireService(LifetimeScope.SingleInstance)]
	public class AccountLinkService : IAccountLinkService
	{
		private const string EmailParam = "email";
		private const string DateParam = "date";
		private const string TokenParam = "token";
		private const string EncryptedParam = "v";

		private static readonly string PrivateKey = Settings.GetSetting("AtriusHealth.Feature.Accounts.ResetPassword.PrivateKey");


        private readonly ICipherService _cipher;
        public AccountLinkService(ICipherService cipher)
		{
			_cipher = cipher;

        }

		public virtual string GenerateSecureUrl(AccountLinkInput input, string passwordToken = null)
		{
			if (string.IsNullOrEmpty(input?.BaseUrl) || string.IsNullOrEmpty(input.EmailAddress)) return null;

			var fullUrl = input.BaseUrl.StartsWith("/") ? input.BaseUrl.GetFullUrl() : input.BaseUrl;

			var unencrypedQuerystring = $"{EmailParam}={input.EmailAddress}";
			if (input.ExpirationMinutes > 0)
			{
				unencrypedQuerystring += $"&{DateParam}={DateTime.Now.AddMinutes(input.ExpirationMinutes).ToString()}";
			}

            if (!string.IsNullOrEmpty(passwordToken))
            {
                unencrypedQuerystring += $"&{TokenParam}={passwordToken}";
            }

            var cipher = _cipher.Encrypt(unencrypedQuerystring, PrivateKey); 
            return
                $"{fullUrl}?{EncryptedParam}={HttpUtility.UrlEncode(cipher)}&{Constants.Querystring.ReturnUrl}={input.RedirectUrl}";

        }

		public virtual AccountLinkParams GetAccountParams(NameValueCollection querystring)
		{
			var encryptedQuerystring = querystring[EncryptedParam];
			var decryptedParams = HttpUtility.ParseQueryString(_cipher.Decrypt(encryptedQuerystring, PrivateKey));

			DateTime expirationDate = DateTime.MaxValue;
			DateTime.TryParse(decryptedParams[DateParam], out expirationDate);

			return new AccountLinkParams
			{
				EmailAddress = decryptedParams[EmailParam],
				ExpirationDate = expirationDate,
                PasswordToken = decryptedParams[TokenParam]
            };
		}
	}
}
