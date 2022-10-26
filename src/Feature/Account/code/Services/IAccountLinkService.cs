using System.Collections.Specialized;
using Thread.Feature.Account.Services.Models;
using Thread.Foundation.Abstractions.Account;

namespace Thread.Feature.Account.Services
{
	public interface IAccountLinkService
	{
		string GenerateSecureUrl(AccountLinkInput input, string passwordToken);
		AccountLinkParams GetAccountParams(NameValueCollection querystring);
	}
}