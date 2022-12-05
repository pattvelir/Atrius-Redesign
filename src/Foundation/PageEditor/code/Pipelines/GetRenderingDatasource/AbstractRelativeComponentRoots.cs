using System;
using System.Linq;
using Sitecore.Data;
using Sitecore.Data.Items;
using AtriusHealth.Foundation.PageEditor.Reference;

namespace AtriusHealth.Foundation.PageEditor.Pipelines.GetRenderingDatasource
{
	public abstract class AbstractRelativeComponentRoots
	{
		protected virtual Item GetLocationRootItem(Item contextItem, string datasourceLocation)
		{
			if (datasourceLocation.StartsWith(Constants.Tokens.Parent))
			{
				return contextItem.Parent;
			}

			if (datasourceLocation.StartsWith(Constants.Tokens.Current))
			{
				return contextItem;
			}

			return contextItem.Database.GetItem("/sitecore/content");
		}

		protected virtual string GetLocationPath(Item contextItem, string datasourceLocation)
		{
			if (datasourceLocation.StartsWith(Constants.Tokens.Parent))
			{
				return $"{contextItem.Parent.Paths.FullPath}{datasourceLocation.Remove(0, 2)}";
			}

			if (datasourceLocation.StartsWith(Constants.Tokens.Current))
			{
				return $"{contextItem.Paths.FullPath}{datasourceLocation.Remove(0, 1)}";
			}

			return datasourceLocation;
		}

		protected virtual string GetItemsSitePath(string itemPath)
		{
			var siteInfo = Sitecore.Configuration.Factory.GetSiteInfoList()
				.FirstOrDefault(x => !string.IsNullOrEmpty(x.RootPath) &&
				                     itemPath.StartsWith($"{x.RootPath}{x.StartItem}", StringComparison.InvariantCultureIgnoreCase) &&
				                     !x.Domain.Equals("sitecore", StringComparison.InvariantCultureIgnoreCase));

			return siteInfo != null ? siteInfo.RootPath : string.Empty;
		}

		protected virtual Item GetFolderItem(Database db, Item currentItem, string itemName)
		{
			// try to get the item at this level
			Item item = db.GetItem($"{currentItem.Paths.FullPath}/{itemName}");

			return item;
		}
	}
}
