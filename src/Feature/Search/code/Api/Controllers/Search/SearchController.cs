using Jabberwocky.WebApi.Attributes;
using AtriusHealth.Foundation.Search.Results;
using Velir.Search.Core.Managers;
using Velir.Search.Core.Page;
using Velir.Search.WebApi.Controllers;

namespace AtriusHealth.Feature.Search.Api.Controllers.Search
{
	[Compression, CamelCasingFilter]
	public class SearchController : VelirSearchController<AtriusHealthSearchResultItem>
	{
		public SearchController(ISearchManager searchManager, IPageConfigurationFactory configurationFactory) : base(searchManager, configurationFactory)
		{
            Sitecore.Context.Device = new Sitecore.Data.Items.DeviceItem(Sitecore.Context.Database.GetItem(new Sitecore.Data.ID("{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}")));
        }
	}
}
