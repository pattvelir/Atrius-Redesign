using Thread.Foundation.Mvc.ViewModels;
using Thread.Foundation.Theme;

namespace Thread.Feature.Banners.Models
{
	public class TextBannerModel : ThreadViewModel<TextBannerItem, TextBannerParameters>
	{
		public string ThemeClass => string.IsNullOrEmpty(RenderingParameters.Theme?.Value?.Value) ? "" : "text-banner--theme" + RenderingParameters.Theme.Value.Value;
		public string ExcludeTopMarginClass => RenderingParameters.ExcludeTopMargin ? "text-banner--no-margin" : "";
	}
}