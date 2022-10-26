using Sitecore.ContentSearch.Linq;
using Thread.Foundation.Search.Results;
using Velir.Search.Core.Pipelines.VelirSearchQuery;
using Velir.Search.Core.Pipelines.VelirSearchQuery.Args;

namespace Thread.Foundation.Search.Pipelines.VelirSearchApplyFilters
{
	public class AppyIsSearchableFilter : AbstractVelirSearchQueryProcessor<ThreadSearchResultItem>
	{
		public override void Process<T>(VelirSearchQueryArgs<T> queryArgs)
        {
            queryArgs.Query = queryArgs.Query.Filter(q => q.IsSearchable);
        }
    }
}