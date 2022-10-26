using Thread.Foundation.Mvc.ViewModels;

namespace Thread.Feature.Banners.Models
{
	public class HeroBannerModel : ThreadViewModel<HeroItem, BannerParameters>
	{
		public string ThemeClass => string.IsNullOrEmpty(RenderingParameters.Theme?.Value?.Value) ? "" : "hero--theme" + RenderingParameters.Theme.Value.Value;
	}
}