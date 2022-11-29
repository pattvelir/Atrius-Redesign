using Sitecore.ContentSearch.Linq;
using AtriusHealth.Foundation.Search.Results;
using Velir.Search.Core.Pipelines.VelirSearchQuery;
using Velir.Search.Core.Pipelines.VelirSearchQuery.Args;

namespace AtriusHealth.Foundation.Search.Pipelines.VelirSearchApplyFilters
{
	public class AppyIsSearchableFilter : AbstractVelirSearchQueryProcessor<AtriusHealthSearchResultItem>
	{
		public override void Process<T>(VelirSearchQueryArgs<T> queryArgs)
        {
            queryArgs.Query = queryArgs.Query.Filter(q => q.IsSearchable);
        }
    }
}
