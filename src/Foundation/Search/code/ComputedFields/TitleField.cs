using Sitecore.Data.Items;
using Sitecore.DependencyInjection;
using AtriusHealth.Foundation.Abstractions.Listing;
using AtriusHealth.Foundation.Orm.Factory;
using AtriusHealth.Foundation.SitecoreExtensions.DependencyInjection;
using Velir.Search.Core.ComputedFields;

namespace AtriusHealth.Foundation.Search.ComputedFields
{
	public class TitleField : BaseContentComputedField
	{
		protected IItemInterfaceFactory Factory => ServiceLocator.ServiceProvider.GetService<IItemInterfaceFactory>();

		public override object GetFieldValue(Item indexItem)
		{
			var listItem = Factory.GetItem<IListable>(indexItem);

			if (!string.IsNullOrEmpty(listItem?.ListTitle)) return listItem.ListTitle;

			return indexItem.DisplayName;
		}
	}
}
