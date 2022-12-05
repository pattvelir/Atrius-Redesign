using Sitecore.Data.Items;
using System;
using AtriusHealth.Foundation.Abstractions.Listing;
using AtriusHealth.Foundation.Enumerations.References;
using AtriusHealth.Foundation.Mvc.ViewModels;
using AtriusHealth.Foundation.Orm.Factory;

namespace AtriusHealth.Feature.Promo.Models
{
	public class DynamicPromoModel : AtriusHealthViewModel<DynamicPromoItem, DynamicPromoRenderingParameters>
	{
        private readonly IItemInterfaceFactory _itemInterfaceFactory;

        public DynamicPromoModel(IItemInterfaceFactory itemInterfaceFactory)
        {
            _itemInterfaceFactory = itemInterfaceFactory;
        }

	 	public string OrientationClass => RenderingParameters?.ImageOrientation?.Value?.Value ?? string.Empty;

        public ImageFormat ImageRatio => ParseEnum(RenderingParameters?.ImageFormat?.Value?.Value?? string.Empty);

        public IListable FeaturePage => _itemInterfaceFactory.GetItem<IListable>(Datasource?.Feature?.TargetItem);

        private ImageFormat ParseEnum(string paramVal)
        {
            ImageFormat imageFormat;
            Enum.TryParse(paramVal, out imageFormat);

            return imageFormat;
        }
    }
}
