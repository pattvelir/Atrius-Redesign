using AtriusHealth.Foundation.Abstractions.Listing;
using AtriusHealth.Foundation.Orm.Factory.Pipeline;
using AtriusHealth.Project.AtriusHealth.Factory.Listable;

namespace AtriusHealth.Project.AtriusHealth.Pipelines.InterfaceFactory
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
