using Thread.Foundation.Abstractions.Indexing;
using Thread.Foundation.Orm.Factory.Pipeline;

namespace Thread.Feature.Metadata.Pipelines.InterfaceFactory
{
	public class IndexBaseISearchableProcessor : InterfaceFactoryProcessor<ISearchable>
	{
		protected override bool ShouldBuildResult(InterfaceFactoryPipelineArgs args)
		{
			return base.ShouldBuildResult(args) && args.InnerItem.DescendsFrom(_IndexBaseItem.TemplateId);
		}

		protected override object BuildResult(InterfaceFactoryPipelineArgs args)
		{
			return (_IndexBaseItem) args.InnerItem;
		}
    }
}