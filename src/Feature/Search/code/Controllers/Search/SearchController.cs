using System.Web.Mvc;
using Sitecore.Data.Items;
using AtriusHealth.Feature.Search.Models;
using AtriusHealth.Foundation.Mvc.Controllers;
using AtriusHealth.Foundation.SitecoreExtensions.Item;
using Velir.Search.Core.Reference;

namespace AtriusHealth.Feature.Search.Controllers.Search
{
	public class SearchController : AtriusHealthController
	{
		public virtual ActionResult QuickSearchBar()
		{
			Item searchPage = GetDatasourceItem();

			var model = new QuickSearchBarModel
			{
				SearchPageUrl = searchPage?.Url() ?? string.Empty
			};

			return CustomView(model);
		}

		[HttpPost, ValidateAntiForgeryToken]
		public virtual ActionResult QuickSearchBarSubmit(QuickSearchBarModel model)
		{
			if (ModelState.IsValid && !string.IsNullOrEmpty(model?.SearchPageUrl))
			{
				return Redirect($"{model.SearchPageUrl}?{SiteSettings.QueryString.QueryKey}={model.Keyword}");
			}

			return Redirect(Request.RawUrl);
		}
	}
}
