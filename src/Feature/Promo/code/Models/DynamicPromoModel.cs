using Sitecore.Data.Items;
using System;
using Thread.Foundation.Abstractions.Listing;
using Thread.Foundation.Enumerations.References;
using Thread.Foundation.Mvc.ViewModels;
using Thread.Foundation.Orm.Factory;

namespace Thread.Feature.Promo.Models
{
	public class DynamicPromoModel : ThreadViewModel<DynamicPromoItem, DynamicPromoRenderingParameters>
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