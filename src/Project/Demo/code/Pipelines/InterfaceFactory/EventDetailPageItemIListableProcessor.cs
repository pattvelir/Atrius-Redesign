using Thread.Foundation.Abstractions.Listing;
using Thread.Foundation.Orm.Factory.Pipeline;
using Thread.Project.Demo.Factory.Listable;

namespace Thread.Project.Demo.Pipelines.InterfaceFactory
{
	public class EventDetailPageItemIListableProcessor : InterfaceFactoryProcessor<IListable>
	{
		protected override bool ShouldBuildResult(InterfaceFactoryPipelineArgs args)
		{
			return base.ShouldBuildResult(args) && args.InnerItem.DescendsFrom(EventDetailPageItem.TemplateId);
		}

		protected override object BuildResult(InterfaceFactoryPipelineArgs args)
		{
			return new EventDetailPageModel(args.InnerItem);
		}
    }
}