using System.Linq;
using System.Text.RegularExpressions;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Pipelines.GetRenderingDatasource;
using Sitecore.Sites;
using Sitecore.Text;
using Thread.Foundation.PageEditor.Reference;

namespace Thread.Foundation.PageEditor.Pipelines.GetRenderingDatasource
{
	public class CreateRelativeComponentRoots : AbstractRelativeComponentRoots
	{
		public void Process(GetRenderingDatasourceArgs args)
		{
			Assert.IsNotNull(args, "args");
			RenderingItem rendering = new RenderingItem(args.RenderingItem);
			UrlString urlString = new UrlString(rendering.Parameters);
			var contentFolder = urlString.Parameters[Constants.ContentFolderTemplateParam];
			if (string.IsNullOrEmpty(contentFolder))
			{
				// Set the content folder to the common folder template
				contentFolder = Constants.Templates.ComponentsFolder;
			}
			if (!ID.IsID(contentFolder))
			{
				Log.Warn($"{Constants.ContentFolderTemplateParam} for Rendering {args.RenderingItem.Name} contains improperly formatted ID: {contentFolder}", this);
				return;
			}

			string text = args.RenderingItem[Constants.DatasourceLocationFieldName];

			if (string.IsNullOrEmpty(text)) return;

			string[] locations = text.Split('|');
			foreach (string location in locations)
			{
				if (location.StartsWith("query:")) continue;

				string modifiedLocation = location;
				if (location.Contains(Constants.Tokens.SiteRoot))
				{
					modifiedLocation = location.Replace(Constants.Tokens.SiteRoot, GetItemsSitePath(args.ContextItemPath));
				}

				if (!string.IsNullOrEmpty(args.ContextItemPath))
				{
					var contextItem = args.ContentDatabase.GetItem(args.ContextItemPath);
					var itemPath = GetLocationPath(contextItem, modifiedLocation);
					var item = args.ContentDatabase.GetItem(itemPath);
					var rootItem = GetLocationRootItem(contextItem, modifiedLocation);
					if (item == null && rootItem != null)
					{
						// split the path on '/' characters and create nested folders as needed.
						string partialPath = Regex.Replace(modifiedLocation, rootItem.Paths.FullPath, string.Empty, RegexOptions.IgnoreCase);
						string[] itemNames = partialPath.Split('/').Where(n => !new[] { Constants.Tokens.Current, Constants.Tokens.Parent, string.Empty }.Contains(n)).ToArray();
						var currentItem = rootItem;
						foreach (string name in itemNames)
						{
							// sanity check
							if (string.IsNullOrEmpty(name)) continue;

							// Either way set current item to the item for the next iteration
							currentItem = CreateFolderItem(args.ContentDatabase, currentItem, contentFolder, name);
						}
					}
				}
			}
		}

		private Item CreateFolderItem(Database db, Item currentItem, string folderTemplateId, string itemName)
		{
			// try to get the item at this level
			Item item = GetFolderItem(db, currentItem, itemName);

			// if it doesn't exist create it.
			if (item == null)
			{
				//if we create an item in the current site context, the WebEditRibbonForm will see an ItemSaved event and think it needs to reload the page
				using (new SiteContextSwitcher(SiteContextFactory.GetSiteContext("system")))
				{
					item = currentItem.Add(itemName, new TemplateID(ID.Parse(folderTemplateId)));
				}
			}

			return item;
		}
	}
}