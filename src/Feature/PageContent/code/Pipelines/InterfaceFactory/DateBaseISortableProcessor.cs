using AtriusHealth.Feature.PageContent.Factory.Sortable;
using AtriusHealth.Foundation.Abstractions.Indexing;
using AtriusHealth.Foundation.Orm.Factory.Pipeline;

namespace AtriusHealth.Feature.PageContent.Pipelines.InterfaceFactory
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
