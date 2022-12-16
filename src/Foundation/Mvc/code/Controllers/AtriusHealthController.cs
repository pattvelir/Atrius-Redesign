using System.Web.Mvc;
using Sitecore;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Mvc.Controllers;
using Sitecore.Mvc.Presentation;
using Sitecore.Web;
using AtriusHealth.Foundation.Multisite.Configuration;

namespace AtriusHealth.Foundation.Mvc.Controllers
{
	public class AtriusHealthController : SitecoreController
	{
		public ISitecoreConfigurationManager SitecoreConfigManager { get; internal set; }
		public Rendering Rendering { get; set; }
		public PageContext PageContext { get; set; }

		protected ViewResult CustomView(object model)
		{
			var parameters = WebUtil.ParseUrlParameters(Rendering.RenderingItem.Parameters);
			string customView = parameters["customView"];
			if (!string.IsNullOrEmpty(customView))
			{
				return View(StringUtil.EnsurePrefix('~', customView), model);
			}

			return View(model);
		}

		protected virtual Item GetConfigurationItem(ID templateId)
		{
			return GetDatasourceItem(templateId) ??
				SitecoreConfigManager.GetSettings(templateId);
		}

		protected virtual Item GetContextItem(ID templateId)
		{
			return PageContext.Item.DescendsFrom(templateId) ? PageContext.Item : null;
		}

		protected virtual Item GetDatasourceItem(ID templateId = null)
		{
			return templateId == default(ID) || Rendering.Item.DescendsFrom(templateId) ? Rendering.Item : null;
		}
	}
}
