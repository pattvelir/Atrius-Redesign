using Thread.Foundation.Abstractions.Social;
using Thread.Foundation.Orm.Factory.Pipeline;

namespace Thread.Project.Common.Pipelines.InterfaceFactory
{
	public class PageBaseItemIShareableProcessor : InterfaceFactoryProcessor<IShareable>
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