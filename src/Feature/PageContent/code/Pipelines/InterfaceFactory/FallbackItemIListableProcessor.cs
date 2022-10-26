using Thread.Feature.PageContent.Factory.Listable;
using Thread.Foundation.Abstractions.Listing;
using Thread.Foundation.Orm.Factory.Pipeline;

namespace Thread.Feature.PageContent.Pipelines.InterfaceFactory
{
	public class FallbackItemIListableProcessor : InterfaceFactoryProcessor<IListable>
	{
		protected override object BuildResult(InterfaceFactoryPipelineArgs args)
		{
			return new FallbackModel(args.InnerItem);
		}
	}
}