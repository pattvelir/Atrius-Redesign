using System.Web.Mvc;
using Sitecore.Data.Items;
using Thread.Feature.Search.Models;
using Thread.Foundation.Mvc.Controllers;
using Thread.Foundation.SitecoreExtensions.Item;
using Velir.Search.Core.Reference;

namespace Thread.Feature.Search.Controllers.Search
{
	public class SearchController : ThreadController
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