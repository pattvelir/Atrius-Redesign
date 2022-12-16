using AtriusHealth.Foundation.Abstractions.Listing;
using AtriusHealth.Foundation.Orm.Factory.Pipeline;
using AtriusHealth.Project.Atrius.Factory.Listable;

namespace AtriusHealth.Project.Atrius.Pipelines.InterfaceFactory
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
