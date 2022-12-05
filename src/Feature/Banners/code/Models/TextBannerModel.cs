using AtriusHealth.Foundation.Mvc.ViewModels;
using AtriusHealth.Foundation.Theme;

namespace AtriusHealth.Feature.Banners.Models
{
	public class TextBannerModel : AtriusHealthViewModel<TextBannerItem, TextBannerParameters>
	{
		public string ThemeClass => string.IsNullOrEmpty(RenderingParameters.Theme?.Value?.Value) ? "" : "text-banner--theme" + RenderingParameters.Theme.Value.Value;
		public string ExcludeTopMarginClass => RenderingParameters.ExcludeTopMargin ? "text-banner--no-margin" : "";
	}
}
