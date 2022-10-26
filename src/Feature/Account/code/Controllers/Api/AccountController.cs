using System;
using System.Web;
using System.Web.Http;
using Thread.Foundation.Abstractions.Account;
using RedirectResult = System.Web.Http.Results.RedirectResult;

namespace Thread.Feature.Account.Controllers.Api
{
	[RoutePrefix("api/Account")]
	public class AccountController : ApiController
	{
		private readonly IMembershipProvider _provider;
		public AccountController(IMembershipProvider provider)
		{
			_provider = provider;
		}

		[System.Web.Http.HttpGet]
		public RedirectResult LogOut()
		{
			var response = _provider.Logout();

			return Redirect(new Uri("/", UriKind.Relative));
		}
	}
}