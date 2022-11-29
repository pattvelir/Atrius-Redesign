using AtriusHealth.Feature.PageContent.Factory.PageEditable;
using AtriusHealth.Foundation.Abstractions.PageContent;
using AtriusHealth.Foundation.Orm.Factory.Pipeline;

namespace AtriusHealth.Feature.PageContent.Pipelines.InterfaceFactory
{
	public class DefaultIPageEditableProcessor : InterfaceFactoryProcessor<IPageEditable>
	{
		protected override object BuildResult(InterfaceFactoryPipelineArgs args)
		{
			return new DefaultModel(args.InnerItem);
		}
	}
}
