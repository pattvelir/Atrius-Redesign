using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Sitecore;
using Sitecore.Data.Items;
using Thread.Feature.Navigation.Models;
using Thread.Feature.Navigation.Repositories;
using Thread.Foundation.Enumerations;
using Thread.Foundation.Mvc.Controllers;
using Thread.Foundation.SitecoreExtensions.Base;
using Thread.Foundation.SitecoreExtensions.Item;

namespace Thread.Feature.Navigation.Controllers.Navigation
{
	public class NavigationController : ThreadController
	{
		private readonly INavigationRepository _navigationRepository;
		public NavigationController(INavigationRepository navigationRepository)
		{
			_navigationRepository = navigationRepository;
		}

		public virtual ActionResult Breadcrumb()
		{
			BreadcrumbConfigurationItem config = GetConfigurationItem(BreadcrumbConfigurationItem.TemplateId);

			var links = _navigationRepository.GetBreadcrumb().ToArray();

			BreadcrumbModel model = new BreadcrumbModel
			{
				Parents = links.Take(links.Length > 0 ? links.Length - 1 : 0),
				Current = links.LastOrDefault(),
				Delimiter = config?.SvgDelimiterName?.Value ?? string.Empty
			};

			return View(model);
		}

		public virtual ActionResult PrimaryNav()
		{
			Item datasource = GetDatasourceItem();

			var links = _navigationRepository.GetPrimaryNavigation(datasource).ToArray();

			return CustomView(links);
		}

		public virtual ActionResult UtilityNav()
		{
			Item datasource = GetDatasourceItem();

			var links = datasource.Children.OfType(LinkItem.TemplateId).Select(i => (LinkItem)i);

			return View(links);
		}

		public virtual ActionResult LanguageSelector()
		{
			var model = _navigationRepository.GetLanguageList();
			
			return View(model);
		}

		public virtual ActionResult SecondaryNav()
		{
			var model = _navigationRepository.GetSecondaryNavigation();

			return View(model);
        }

        public virtual ActionResult MemberAccountNav()
        {
            var model = _navigationRepository.GetMemberAccountNavigation();

            return View(model);
        }

        public virtual ActionResult FooterNavigationItems()
		{
			LinksFolderItem datasource = GetDatasourceItem(LinksFolderItem.TemplateId);

			var model = datasource.InnerItem.Children.OfType(LinkItem.TemplateId).Select(i => (LinkItem)i);

			return View(model);
		}

		public virtual ActionResult FooterNavigationLinksColumns()
		{
			var datasource = GetConfigurationItem(FooterNavigationLinksColumnsFolderItem.TemplateId);

			var model = new FooterNavigationLinksColumnsFolderModel();
			var headerList = new List<FooterNavigationLinksColumnModel>();

			var linkHeaders = datasource?.Children.OfType(LinkColumnHeaderItem.TemplateId).Select(c => (LinkColumnHeaderItem)c) ?? Enumerable.Empty<LinkColumnHeaderItem>();

			foreach (LinkColumnHeaderItem linkHeader in linkHeaders)
			{
				NumberOfColumnsItem columns = linkHeader?.NumberOfColumns?.TargetItem;
				var linkColumn = new FooterNavigationLinksColumnModel
				{
					LinkColumnHeader = linkHeader,
					NumberOfColumns = columns?.Value?.Value.ToInt() ?? 1,
					Links = linkHeader?.InnerItem.Children?.OfType(LinkItem.TemplateId).Select(c => (LinkItem)c).ToArray() ?? Enumerable.Empty<LinkItem>()
				};

				headerList.Add(linkColumn);
			}

			model.LinkHeaders = headerList;

			return View(model);
		}
	}
}