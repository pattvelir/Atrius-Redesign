using Sitecore.Diagnostics;
using Sitecore.Pipelines.GetLookupSourceItems;
using Sitecore.Shell.Applications.ContentEditor;
using Sitecore.Text;
using Sitecore.Web;

namespace AtriusHealth.Foundation.AX.Pipelines.GetLookupSourceItems
{
	public class ResolveRelativeQuerySource
	{
		public void Process(GetLookupSourceItemsArgs args)
		{
			Assert.IsNotNull(args, "args");
			if (!args.Source.StartsWith("query:"))
				return;
			string url = WebUtil.GetQueryString();
			if (!string.IsNullOrWhiteSpace(url) && url.Contains("hdl"))
			{
				FieldEditorParameters parameters = FieldEditorOptions.Parse(new UrlString(url)).Parameters;
				var currentItemId = parameters["contentitem"];
				if (!string.IsNullOrEmpty(currentItemId))
				{
					Sitecore.Data.ItemUri contentItemUri = new Sitecore.Data.ItemUri(currentItemId);
					args.Item = Sitecore.Data.Database.GetItem(contentItemUri);
				}
			}
		}
	}
}
