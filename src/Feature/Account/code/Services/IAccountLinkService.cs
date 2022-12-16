using System.Collections.Specialized;
using AtriusHealth.Feature.Account.Services.Models;
using AtriusHealth.Foundation.Abstractions.Account;

namespace AtriusHealth.Feature.Account.Services
{
	public interface IAccountLinkService
	{
		string GenerateSecureUrl(AccountLinkInput input, string passwordToken);
		AccountLinkParams GetAccountParams(NameValueCollection querystring);
	}
}
