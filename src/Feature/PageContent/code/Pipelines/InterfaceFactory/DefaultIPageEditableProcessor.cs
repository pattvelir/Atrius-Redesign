using Thread.Feature.PageContent.Factory.PageEditable;
using Thread.Foundation.Abstractions.PageContent;
using Thread.Foundation.Orm.Factory.Pipeline;

namespace Thread.Feature.PageContent.Pipelines.InterfaceFactory
{
	public class DefaultIPageEditableProcessor : InterfaceFactoryProcessor<IPageEditable>
	{
		protected override object BuildResult(InterfaceFactoryPipelineArgs args)
		{
			return new DefaultModel(args.InnerItem);
		}
	}
}