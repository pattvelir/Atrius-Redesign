using System.Web.Mvc;
using Thread.Feature.Global.Models;
using Thread.Foundation.Mvc.Controllers;

namespace Thread.Feature.Global.Controllers.Global
{
	public class GlobalController : ThreadController
	{
		public virtual ActionResult HeaderSiteLogo()
		{
			_HeaderLogoItem model = GetConfigurationItem(_HeaderLogoItem.TemplateId);

			return View(model);
		}

		public virtual ActionResult FooterSiteLogo()
		{
			_FooterLogoItem model = GetConfigurationItem(_FooterLogoItem.TemplateId);

			return View(model);
		}

		public virtual ActionResult FooterConnect()
		{
			_FooterConnectItem datasource = GetConfigurationItem(_FooterConnectItem.TemplateId);

			var model = new FooterConnectModel
			{
				Datasource = datasource
			};

			return View(model);
		}

		public virtual ActionResult CopyrightStatement()
		{
			_FooterCopyrightItem model = GetConfigurationItem(_FooterCopyrightItem.TemplateId);

			return View(model);
		}
	}
}