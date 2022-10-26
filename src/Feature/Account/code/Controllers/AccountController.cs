using System;
using System.Web.Mvc;
using Thread.Feature.Account.Models;
using Thread.Feature.Account.Services;
using Thread.Foundation.Abstractions.Account;
using Thread.Foundation.Mvc.Controllers;

namespace Thread.Feature.Account.Controllers
{
	public class AccountController : ThreadController
	{
		private readonly IMembershipProvider _provider;
        private readonly IMemberProfileService _memberProfileService;

        public AccountController(IMembershipProvider provider, IMemberProfileService memberProfileService)
		{
			_provider = provider;
            _memberProfileService = memberProfileService;
        }

		public ActionResult ConfirmRegistration()
		{
			if (!Sitecore.Context.PageMode.IsExperienceEditorEditing)
			{
				var response = _provider.ConfirmAccount();

				if (response.Success)
				{
					_AccountConfigurationItem config = SitecoreConfigManager.GetSettings(_AccountConfigurationItem.TemplateId);

					return Redirect(config.LoginPage.GetFriendlyUrl());
				}
			}

			return Content(string.Empty);
        }

        public ActionResult MemberProfile()
        {
			if (HttpContext.User.Identity.IsAuthenticated)
				return View(_memberProfileService.GetProfileModel());
			else
				return Redirect(new Uri("/", UriKind.Relative).ToString());
        }

        [HttpPost]
        public ActionResult MemberProfile(MemberProfileModel collection)
        {
            return View(_memberProfileService.UpdateProfile(collection));
        }

        public ActionResult MemberInterests()
        {
			if (HttpContext.User.Identity.IsAuthenticated)
				return View(_memberProfileService.GetInterests(GetDatasourceItem()));
			else
				return Redirect(new Uri("/", UriKind.Relative).ToString());
        }

        [HttpPost]
        public ActionResult MemberInterests(FormCollection collection)
        {
            var response = _memberProfileService.UpdateInterests(collection);
            var model = _memberProfileService.GetInterests(GetDatasourceItem());
            model.Response = response;

            return View(model);
        }

        public ActionResult MemberEmailPreferences()
        {
			if (HttpContext.User.Identity.IsAuthenticated)
				return View(_memberProfileService.GetEmailPreferences(GetDatasourceItem()));
			else
				return Redirect(new Uri("/", UriKind.Relative).ToString());
        }

        [HttpPost]
        public ActionResult MemberEmailPreferences(MemberEmailPreferencesModel collection)
        {
            var response = _memberProfileService.UpdateEmailPreferences(collection);
            var model = _memberProfileService.GetEmailPreferences(GetDatasourceItem());
            model.Response = response;

            return View(model);
        }

        public ActionResult MemberAccountSecurity()
        {
			if (HttpContext.User.Identity.IsAuthenticated)
				return View(_memberProfileService.GetAccountSecurityModel());
			else
				return Redirect(new Uri("/", UriKind.Relative).ToString());
        }

        [HttpPost]
        public ActionResult MemberAccountSecurity(MemberAccountSecurityModel collection)
        {
            var response = _memberProfileService.UpdateAccountSecurity(collection);
            var model = _memberProfileService.GetAccountSecurityModel();
            model.Response = response;

            return View(model);
        }
    }
}