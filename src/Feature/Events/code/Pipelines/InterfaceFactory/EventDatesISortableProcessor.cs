using Thread.Foundation.Abstractions.Indexing;
using Thread.Foundation.Orm.Factory.Pipeline;

namespace Thread.Feature.Events.Pipelines.InterfaceFactory
{
	public class EventDatesISortableProcessor : InterfaceFactoryProcessor<ISortable>
	{
		protected override bool ShouldBuildResult(InterfaceFactoryPipelineArgs args)
		{
			return base.ShouldBuildResult(args) && args.InnerItem.DescendsFrom(_EventDatesItem.TemplateId);
		}

		protected override object BuildResult(InterfaceFactoryPipelineArgs args)
		{
			return (_EventDatesItem) args.InnerItem;
		}
    }
}