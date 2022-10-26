using System.Linq;
using Sitecore;
using Sitecore.Configuration;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.Pipelines.GetDependencies;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Thread.Foundation.Taxonomy;

namespace Thread.Foundation.Search.Pipelines.IndexingGetDependencies
{
	public class GetTaxonomyDependencies : BaseProcessor
	{
		private static readonly string[] TaxonomyFolderTemplateIds = Settings.GetSetting("Thread.Foundation.Search.TaxonomyFolderIds", TaxonomyFolderItem.TemplateId.ToString()).Split('|');

		public override void Process(GetDependenciesArgs context)
		{
			Assert.IsNotNull(context.IndexedItem, "indexed item");
			Assert.IsNotNull(context.Dependencies, "dependencies");

			Item item = context.IndexedItem as SitecoreIndexableItem;
			if (item != null && 
			    item.Paths.IsContentItem && 
			    item.Axes.GetAncestors().Any(a => TaxonomyFolderTemplateIds.Contains(a.TemplateID.ToString())))
			{
				var source = Globals.LinkDatabase.GetReferrers(item)
					.Select(l => l?.GetSourceItem()?.Uri)
					.Where(uri => uri != null && uri != item.Uri)
					.Distinct()
					.Select(uri => (SitecoreItemUniqueId) uri);

				context.Dependencies.AddRange(source);
				context.Dependencies.Distinct();
			}
		}
	}
}