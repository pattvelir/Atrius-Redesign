using Sitecore.Data.Items;
using Sitecore.DependencyInjection;
using Thread.Foundation.Abstractions.Listing;
using Thread.Foundation.Orm.Factory;
using Thread.Foundation.SitecoreExtensions.DependencyInjection;
using Velir.Search.Core.ComputedFields;

namespace Thread.Foundation.Search.ComputedFields
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