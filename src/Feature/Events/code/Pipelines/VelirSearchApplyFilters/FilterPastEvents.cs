using System;
using Sitecore.ContentSearch.Linq;
using Sitecore.ContentSearch.Linq.Utilities;
using Sitecore.ContentSearch.SearchTypes;
using Thread.Foundation.Search.Results;
using Velir.Search.Core.Pipelines.VelirSearchQuery;
using Velir.Search.Core.Pipelines.VelirSearchQuery.Args;

namespace Thread.Feature.Events.Pipelines.VelirSearchApplyFilters
{
	public class FilterPastEvents : AbstractVelirSearchQueryProcessor<ThreadSearchResultItem>
	{
        public override void Process<T>(VelirSearchQueryArgs<T> queryArgs)
        {
            var predicate = PredicateBuilder.Create<T>(i => !i.AllTemplates.Contains(_EventDatesItem.TemplateId.Guid));

            predicate = predicate.Or(i => (DateTime)i[(ObjectIndexerKey)"end_date_tdt"] >= DateTime.UtcNow);
            predicate = predicate.Or(i => (DateTime)i[(ObjectIndexerKey)"start_date_tdt"] >= DateTime.UtcNow);

			queryArgs.Query = queryArgs.Query.Filter(predicate);
        }
	}
}