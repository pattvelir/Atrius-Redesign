using System.Collections.Generic;
using System.Linq;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.Data.Items;
using Sitecore.Pipelines;
using AtriusHealth.Foundation.Orm.Factory.Pipeline;

namespace AtriusHealth.Foundation.Orm.Factory
{
	[AutowireService(LifetimeScope.SingleInstance)]
	public class ItemInterfaceFactory : IItemInterfaceFactory
	{
		public T GetItem<T>(Item item) where T : class
		{
			var pipelineArgs = new InterfaceFactoryPipelineArgs
			{
				InterfaceType = typeof(T),
				InnerItem = item
			};

			CorePipeline.Run("interfaceFactory", pipelineArgs);

			return pipelineArgs.Result as T;
		}

		public IEnumerable<T> GetItems<T>(IEnumerable<Item> items) where T : class
		{
			return items.Select(GetItem<T>).Where(x => x != default(T));
		}
	}
}
