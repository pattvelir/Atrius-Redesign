using AtriusHealth.Foundation.Mvc.ViewModels;

namespace AtriusHealth.Feature.Banners.Models
{
	public class HeroBannerModel : AtriusHealthViewModel<HeroItem, BannerParameters>
	{
		public string ThemeClass => string.IsNullOrEmpty(RenderingParameters.Theme?.Value?.Value) ? "" : "hero--theme" + RenderingParameters.Theme.Value.Value;
	}
}
