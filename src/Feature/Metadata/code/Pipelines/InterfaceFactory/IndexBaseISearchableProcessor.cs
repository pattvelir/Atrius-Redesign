using AtriusHealth.Foundation.Abstractions.Indexing;
using AtriusHealth.Foundation.Orm.Factory.Pipeline;

namespace AtriusHealth.Feature.Metadata.Pipelines.InterfaceFactory
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
