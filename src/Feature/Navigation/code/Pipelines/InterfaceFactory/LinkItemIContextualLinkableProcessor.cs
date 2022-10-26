using Thread.Feature.Navigation.Models;
using Thread.Foundation.Orm.Factory.Pipeline;

namespace Thread.Feature.Navigation.Pipelines.InterfaceFactory
{
	public class LinkItemIContextualLinkableProcessor : InterfaceFactoryProcessor<IContextualLinkable>
	{
		protected override bool ShouldBuildResult(InterfaceFactoryPipelineArgs args)
		{
			return base.ShouldBuildResult(args) && args.InnerItem.DescendsFrom(LinkItem.TemplateId);
		}

		protected override object BuildResult(InterfaceFactoryPipelineArgs args)
		{
			return (LinkItem) args.InnerItem;
		}
    }
}