using System.Linq;
using Sitecore.Diagnostics;
using Sitecore.Pipelines.GetRenderingDatasource;
using AtriusHealth.Foundation.PageEditor.Reference;

namespace AtriusHealth.Foundation.PageEditor.Pipelines.GetRenderingDatasource
{
	public class AddRelativeComponentRoots : AbstractRelativeComponentRoots
	{
		private static readonly string[] _tokens = new[] {Constants.Tokens.Parent, Constants.Tokens.SiteRoot};

		public void Process(GetRenderingDatasourceArgs args)
		{
			Assert.IsNotNull(args, "args");

			string text = args.RenderingItem[Constants.DatasourceLocationFieldName];

			if (string.IsNullOrEmpty(text)) return;

			var locations = text.Split('|').Where(l => _tokens.Any(l.StartsWith));
			foreach (string location in locations)
			{
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
					
					if (item != null)
					{
						args.DatasourceRoots.Add(item);
					}
				}
			}
		}
	}
}
