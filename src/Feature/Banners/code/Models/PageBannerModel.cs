using AtriusHealth.Foundation.Abstractions.PageContent;
using AtriusHealth.Foundation.Mvc.ViewModels;
using AtriusHealth.Foundation.Orm.Factory;
using AtriusHealth.Foundation.Taxonomy;
using AtriusHealth.Foundation.Theme.Extensions;

namespace AtriusHealth.Feature.Banners.Models
{
	public class PageBannerModel : AtriusHealthViewModel<PageBannerItem, BannerParameters>
	{
		private readonly IItemInterfaceFactory _factory;
		public PageBannerModel(IItemInterfaceFactory interfaceFactory)
		{
			_factory = interfaceFactory;
		}

		public bool IsValid => Datasource?.Image?.MediaItem != null;

		private IPageEditable _fields;
		public IPageEditable PageContentFields => _fields ?? (_fields = _factory.GetItem<IPageEditable>(PageItem));
		public _ContentTypeBaseItem ContentTypeItem => PageItem;

		public bool HasHeight => RenderingParameters.BannerHeight > 0;
		public string HeightClass => HasHeight ? "has-height" : string.Empty;
		public string HeightStyle => HasHeight ? $"max-height: {RenderingParameters.BannerHeight}px;" : string.Empty;
		public string OpacityStyle => $"opacity: {RenderingParameters.Opacity};";
		public string ThemeClass => string.IsNullOrEmpty(RenderingParameters.Theme?.Value?.Value) ? "" : "page-banner--theme" + RenderingParameters.Theme.Value.Value;
	}
}
