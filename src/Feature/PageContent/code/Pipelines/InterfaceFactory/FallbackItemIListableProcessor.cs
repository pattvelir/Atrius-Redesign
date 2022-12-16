using AtriusHealth.Feature.PageContent.Factory.Listable;
using AtriusHealth.Foundation.Abstractions.Listing;
using AtriusHealth.Foundation.Orm.Factory.Pipeline;

namespace AtriusHealth.Feature.PageContent.Pipelines.InterfaceFactory
{
	public class FallbackItemIListableProcessor : InterfaceFactoryProcessor<IListable>
	{
		protected override object BuildResult(InterfaceFactoryPipelineArgs args)
		{
			return new FallbackModel(args.InnerItem);
		}
	}
}
