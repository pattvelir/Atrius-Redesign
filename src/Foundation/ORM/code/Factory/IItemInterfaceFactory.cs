using System.Collections.Generic;
using Sitecore.Data.Items;

namespace AtriusHealth.Foundation.Orm.Factory
{
	public interface IItemInterfaceFactory
	{
		T GetItem<T>(Item item) where T : class;
		IEnumerable<T> GetItems<T>(IEnumerable<Item> items) where T : class;
	}
}
