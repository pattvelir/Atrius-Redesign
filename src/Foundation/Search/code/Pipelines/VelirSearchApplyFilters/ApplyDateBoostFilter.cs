using Thread.Foundation.Search.Builders;
using Velir.Search.Core.Extensions;
using Velir.Search.Core.Helpers;
using Velir.Search.Core.Pipelines.VelirSearchQuery;
using Velir.Search.Core.Pipelines.VelirSearchQuery.Args;
using Velir.Search.Core.Reference;
using Velir.Search.Solr.Results;

namespace Thread.Foundation.Search.Pipelines.VelirSearchApplyFilters
{
    public class ApplyDateBoostFilter : AbstractVelirSearchQueryProcessor<SolrSearchResultItem>
    {
        private readonly ISearchResultItemHelper _itemHelper;

        public ApplyDateBoostFilter(ISearchResultItemHelper itemHelper)
        {
            _itemHelper = itemHelper;
        }

        public override void Process<T>(VelirSearchQueryArgs<T> args)
        {
            if (args.Request.SortBy == SiteSettings.QueryString.SortByRelevanceValue)
            {
                args.Query = args.Query.Filter(new SolrDateBoostPredicateBuilder<T>(_itemHelper, args.Configuration.IndexName));
            }
        }
    }
}