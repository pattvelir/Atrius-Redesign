using Thread.Feature.PageContent.Factory.Sortable;
using Thread.Foundation.Abstractions.Indexing;
using Thread.Foundation.Orm.Factory.Pipeline;

namespace Thread.Feature.PageContent.Pipelines.InterfaceFactory
{
	public class DateBaseISortableProcessor : InterfaceFactoryProcessor<ISortable>
	{
		protected override bool ShouldBuildResult(InterfaceFactoryPipelineArgs args)
		{
			return base.ShouldBuildResult(args) && args.InnerItem.DescendsFrom(_DateBaseItem.TemplateId);
		}

		protected override object BuildResult(InterfaceFactoryPipelineArgs args)
		{
			return new DateModel(args.InnerItem);
		}
    }
}