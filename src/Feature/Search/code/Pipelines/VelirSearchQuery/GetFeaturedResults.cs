using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore.ContentSearch.Linq;
using Sitecore.Data;
using AtriusHealth.Feature.Search.References;
using AtriusHealth.Feature.Search.Repositories;
using AtriusHealth.Foundation.Abstractions.Listing;
using AtriusHealth.Foundation.Search.Results;
using Velir.Search.Core.Pipelines.VelirSearchQuery;
using Velir.Search.Core.Pipelines.VelirSearchQuery.Args;
using Velir.Search.Core.Reference;

namespace AtriusHealth.Feature.Search.Pipelines.VelirSearchQuery
{
    public class GetFeaturedResults : AbstractVelirSearchQueryProcessor<AtriusHealthSearchResultItem>
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

    public class FilterFeaturedResults : AbstractVelirSearchQueryProcessor<AtriusHealthSearchResultItem>
    {
        public override void Process<TR>(VelirSearchQueryArgs<TR> queryArgs)
        {
            var ids = (queryArgs.CustomData["FeaturedResults"] as IList<IListable>)?.Select(r => new ID(r.ListId)) ?? Enumerable.Empty<ID>();

            queryArgs.Query = queryArgs.Query.Filter(q => !ids.Contains(q.ItemId));
        }
    }

    public class AddFeaturedResultsToResponse : AbstractVelirSearchQueryProcessor<AtriusHealthSearchResultItem>
    {
        public override void Process<TR>(VelirSearchQueryArgs<TR> queryArgs)
        {
            throw new NotImplementedException();
        }
    }
}
