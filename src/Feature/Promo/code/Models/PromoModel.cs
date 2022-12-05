using AtriusHealth.Foundation.Mvc.ViewModels;

namespace AtriusHealth.Feature.Promo.Models
{
	public class PromoModel : AtriusHealthViewModel<PromoItem, PromoRenderingParameters>
	{
		public string OrientationClass => RenderingParameters.Orientation?.Value?.Value ?? string.Empty;
	}
}
