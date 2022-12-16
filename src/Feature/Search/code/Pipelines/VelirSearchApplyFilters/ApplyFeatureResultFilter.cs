using System.Linq;
using Sitecore.ContentSearch.Linq;
using Sitecore.Data;
using AtriusHealth.Feature.Search.Repositories;
using AtriusHealth.Foundation.Search.Results;
using Velir.Search.Core.Pipelines.VelirSearchQuery;
using Velir.Search.Core.Pipelines.VelirSearchQuery.Args;
using Velir.Search.Core.Reference;


namespace AtriusHealth.Feature.Search.Pipelines.VelirSearchApplyFilters
{
    public class ApplyFeatureResultFilter : AbstractVelirSearchQueryProcessor<AtriusHealthSearchResultItem>
    {
        private readonly IFeaturedResultsRepository _featuredResults;

        public ApplyFeatureResultFilter(IFeaturedResultsRepository repository)
        {
            _featuredResults = repository;
        }

        public override void Process<TR>(VelirSearchQueryArgs<TR> args)
        {
            bool keyExists = args.Request.QueryParameters.ContainsKey(SiteSettings.QueryString.QueryKey);
            
            if (!keyExists) return;
            
            var keyword = args.Request.QueryParameters[SiteSettings.QueryString.QueryKey] ?? string.Empty;
            var results = _featuredResults.Get(keyword);

            var ids = results?.Select(r => new ID(r.ListId)) ?? Enumerable.Empty<ID>();

            if (!ids.Any()) return;

            args.Query = args.Query.Filter(q => !ids.Contains(q.ItemId));
        }
    }
}
