using Thread.Foundation.Mvc.ViewModels;

namespace Thread.Feature.Promo.Models
{
	public class PromoModel : ThreadViewModel<PromoItem, PromoRenderingParameters>
	{
		public string OrientationClass => RenderingParameters.Orientation?.Value?.Value ?? string.Empty;
	}
}