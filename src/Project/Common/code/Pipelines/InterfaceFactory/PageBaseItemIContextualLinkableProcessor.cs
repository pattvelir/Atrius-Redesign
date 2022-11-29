using AtriusHealth.Feature.Navigation.Models;
using AtriusHealth.Foundation.Orm.Factory.Pipeline;

namespace AtriusHealth.Project.Common.Pipelines.InterfaceFactory
{
	public class PageBaseItemIContextualLinkableProcessor : InterfaceFactoryProcessor<IContextualLinkable>
	{
		protected override bool ShouldBuildResult(InterfaceFactoryPipelineArgs args)
		{
			return base.ShouldBuildResult(args) && args.InnerItem.DescendsFrom(_PageBaseItem.TemplateId);
		}

		protected override object BuildResult(InterfaceFactoryPipelineArgs args)
		{
			return (_PageBaseItem) args.InnerItem;
		}
	}
}
