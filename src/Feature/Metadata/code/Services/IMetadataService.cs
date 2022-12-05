using Sitecore.Data.Items;
using AtriusHealth.Feature.Metadata.Areas.AtriusHealth.Models;

namespace AtriusHealth.Feature.Metadata.Services
{
	public interface IMetadataService
	{
		string GetHtmlPageTitle(Item pageItem);
		IPageMetadata GetPageMetadata(Item pageItem);
		string GetCustomHeadHtml(Item pageItem);
	}
}
