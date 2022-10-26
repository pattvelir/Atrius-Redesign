using System;
using Sitecore.Data.Items;
using Sitecore.DependencyInjection;
using Thread.Foundation.Abstractions.Indexing;
using Thread.Foundation.Orm.Factory;
using Thread.Foundation.SitecoreExtensions.DependencyInjection;
using Velir.Search.Core.ComputedFields;

namespace Thread.Foundation.Search.ComputedFields
{
	public class SearchDateField : BaseContentComputedField
	{
		protected IItemInterfaceFactory Factory => ServiceLocator.ServiceProvider.GetService<IItemInterfaceFactory>();

		public override object GetFieldValue(Item indexItem)
		{
			var sortable = Factory.GetItem<ISortable>(indexItem);

			if (sortable == null || sortable.SortDate == DateTime.MinValue) return indexItem.Statistics.Updated;

			return sortable.SortDate;
		}
	}
}