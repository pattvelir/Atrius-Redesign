using Sitecore.Data.Items;
using Sitecore.DependencyInjection;
using Thread.Foundation.Abstractions.Indexing;
using Thread.Foundation.Orm.Factory;
using Thread.Foundation.SitecoreExtensions.DependencyInjection;
using Velir.Search.Core.ComputedFields;

namespace Thread.Foundation.Search.ComputedFields
{
	public class IsSearchableField : BaseContentComputedField
	{
		protected IItemInterfaceFactory Factory => ServiceLocator.ServiceProvider.GetService<IItemInterfaceFactory>();

		public override object GetFieldValue(Item indexItem)
		{
			if (!indexItem.Paths.IsContentItem) return false;

			if (indexItem.Visualization.Layout == null) return false;

			var searchItem = Factory.GetItem<ISearchable>(indexItem);

			if (searchItem == null) return true;

			return searchItem.IsSearchable;
		}
	}
}