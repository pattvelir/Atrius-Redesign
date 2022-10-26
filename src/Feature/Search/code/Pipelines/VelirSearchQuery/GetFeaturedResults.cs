using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore.ContentSearch.Linq;
using Sitecore.Data;
using Thread.Feature.Search.References;
using Thread.Feature.Search.Repositories;
using Thread.Foundation.Abstractions.Listing;
using Thread.Foundation.Search.Results;
using Velir.Search.Core.Pipelines.VelirSearchQuery;
using Velir.Search.Core.Pipelines.VelirSearchQuery.Args;
using Velir.Search.Core.Reference;

namespace Thread.Feature.Search.Pipelines.VelirSearchQuery
{
    public class GetFeaturedResults : AbstractVelirSearchQueryProcessor<ThreadSearchResultItem>
    {
        private readonly IFeaturedResultsRepository _featuredResults;

        public GetFeaturedResults(IFeaturedResultsRepository repository)
        {
            _featuredResults = repository;
        }

        public override void Process<TR>(VelirSearchQueryArgs<TR> queryArgs)
        {
            var q = queryArgs.Request.QueryParameters[SiteSettings.QueryString.QueryKey];

            if (string.IsNullOrEmpty(q)) return;

            queryArgs.CustomData["FeaturedResults"] = _featuredResults.Get(q);
        }
    }

    public class FilterFeaturedResults : AbstractVelirSearchQueryProcessor<ThreadSearchResultItem>
    {
        public override void Process<TR>(VelirSearchQueryArgs<TR> queryArgs)
        {
            var ids = (queryArgs.CustomData["FeaturedResults"] as IList<IListable>)?.Select(r => new ID(r.ListId)) ?? Enumerable.Empty<ID>();

            queryArgs.Query = queryArgs.Query.Filter(q => !ids.Contains(q.ItemId));
        }
    }

    public class AddFeaturedResultsToResponse : AbstractVelirSearchQueryProcessor<ThreadSearchResultItem>
    {
        public override void Process<TR>(VelirSearchQueryArgs<TR> queryArgs)
        {
            throw new NotImplementedException();
        }
    }
}