using Sitecore.Data.Items;
using Thread.Feature.Metadata.Areas.Thread.Models;

namespace Thread.Feature.Metadata.Services
{
	public interface IMetadataService
	{
		string GetHtmlPageTitle(Item pageItem);
		IPageMetadata GetPageMetadata(Item pageItem);
		string GetCustomHeadHtml(Item pageItem);
	}
}
