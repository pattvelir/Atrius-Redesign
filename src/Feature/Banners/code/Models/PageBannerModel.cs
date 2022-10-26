using Thread.Foundation.Abstractions.PageContent;
using Thread.Foundation.Mvc.ViewModels;
using Thread.Foundation.Orm.Factory;
using Thread.Foundation.Taxonomy;
using Thread.Foundation.Theme.Extensions;

namespace Thread.Feature.Banners.Models
{
	public class PageBannerModel : ThreadViewModel<PageBannerItem, BannerParameters>
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
