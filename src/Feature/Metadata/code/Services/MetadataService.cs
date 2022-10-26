using System.Collections.Generic;
using System.Linq;
using System.Web;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.Data.Items;
using Thread.Feature.Metadata.Areas.Thread.Models;
using Thread.Feature.Metadata.Reference;
using Thread.Foundation.Abstractions.Listing;
using Thread.Foundation.Multisite.Configuration;
using Thread.Foundation.Orm.Factory;
using Thread.Foundation.SitecoreExtensions.Base;
using Thread.Foundation.SitecoreExtensions.Item;

namespace Thread.Feature.Metadata.Services
{
	[AutowireService(LifetimeScope.PerScope)]
	public class MetadataService : IMetadataService
	{
		protected MetadataConfigurationItem SiteMetadataConfiguration { get; set; }
		private readonly IItemInterfaceFactory _factory;
		public MetadataService(ISitecoreConfigurationManager configManager, IItemInterfaceFactory factory)
		{
			_factory = factory;
			SiteMetadataConfiguration = configManager?.GetSettings(MetadataConfigurationItem.TemplateId);
		}

		public virtual string GetHtmlPageTitle(Item pageItem)
		{
			var metadata = GetPageMetadata(pageItem);
			string title = metadata.MetaTags.ContainsKey(Constants.MetaTagNames.Title)
				? metadata.MetaTags[Constants.MetaTagNames.Title]
				: string.Empty;
			return string.Join(SiteMetadataConfiguration?.PageTitleSeparator?.Value ?? string.Empty, new [] { title, SiteMetadataConfiguration?.SiteName?.Value }.Where(p => !string.IsNullOrEmpty(p)));
		}

		public virtual IPageMetadata GetPageMetadata(Item pageItem)
		{
			return new PageMetadataModel
			{
				MetaFaviconSrc = SiteMetadataConfiguration?.Favicon?.Src ?? string.Empty,
				MetaTags = BuildMetaTags(pageItem)
			};
		}

		public virtual string GetCustomHeadHtml(Item pageItem)
		{
			if (pageItem == null) return string.Empty;

			_MetadataBaseItem metadataItem = pageItem.DescendsFrom(_MetadataBaseItem.TemplateId) ? pageItem : pageItem.Axes.GetAncestors().OfType(_MetadataBaseItem.TemplateId).FirstOrDefault();

			return metadataItem?.MetaHtml?.Value ?? string.Empty;
		}

		protected virtual IDictionary<string, string> BuildMetaTags(Item pageItem)
		{
			var tags = new Dictionary<string,string>();

			if (pageItem == null) return tags;

			if (HttpContext.Current != null)
			{
				tags.SafeAdd(Constants.MetaTagNames.Canonical, pageItem.Url().GetFullUrl());
			}

			var listItem = _factory.GetItem<IListable>(pageItem);
			if (listItem != null)
			{
				tags.SafeAdd(Constants.MetaTagNames.Description, listItem.ListDescription);
				tags.SafeAdd(Constants.MetaTagNames.Title, !string.IsNullOrEmpty(listItem.ListTitle) ? listItem.ListTitle : pageItem.DisplayName);
			}
			
			_IndexBaseItem searchItem = pageItem;
			if (searchItem != null)
			{
				var robots = new List<string>();
				if (searchItem.NoIndex.Checked)
				{
					robots.Add("noindex");
				}
				if (searchItem.NoFollow.Checked)
				{
					robots.Add("nofollow");
				}

				tags.SafeAdd(Constants.MetaTagNames.Robots, string.Join(",", robots));
			}

			return tags;
		}
	}
}