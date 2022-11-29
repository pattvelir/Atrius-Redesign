using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Sitecore.Mvc.Presentation;
using AtriusHealth.Foundation.Dictionary.Repositories;
using AtriusHealth.Foundation.Orm.Services;
using AtriusHealth.Foundation.Search.Areas.AtriusHealth.Models.Search;
using Velir.Search.Core.Extensions;
using Velir.Search.Core.Models;
using Constants = AtriusHealth.Foundation.Search.Reference.Constants;

namespace AtriusHealth.Feature.Search.Models
{
    [JsonObject(MemberSerialization.OptIn)]
    public class SiteSearchModel : AbstractSearchResultsModel<SearchResultsItem, RenderingParameters>
    {
        public SiteSearchModel(IContextProvider contextProvider) :
          base(contextProvider)
        {
        }


        protected override object Query => new ReactQueryModel
        {
            PageId = PageId,
            ListingId = this.Datasource.ID.ToString(),
            PerPage = GetResultsPerPage(this.Datasource),
            Site = Site
        };

        protected override object Dictionary => new DictionaryModel();

        protected override object Config => new { SearchId, Url, FeaturedUrl, Pagination, LoadMore, Sorters };

        public override string SearchId => $"search-{PageId}";

        public override string Url => Datasource?[AdminConfigurationItem.EndpointUrlFieldId] ?? string.Empty;

        public string FeaturedUrl => Datasource?.FeaturedResultsEndpoint?.Value ?? string.Empty;

        public override bool Pagination => (Datasource?.SearchResultsFormat?.TargetID.Guid ?? Guid.Empty) ==
                                           Constants.ResultFormats.Pagination;

        public bool LoadMore => (Datasource?.SearchResultsFormat?.TargetID.Guid ?? Guid.Empty) ==
                                               Constants.ResultFormats.LoadMore;

        public override IEnumerable<SortOptionModel> Sorters => PageItem.GetDatasources(SortOptionItem.TemplateId)
          .Select(i => (SortOptionItem)i).Select(d => new SortOptionModel
          {
              Id = d.ID.ToString(),
              Direction = GetSortDirection(d.SortDirectionDefault?.TargetItem),
              IsActive = IsActiveOption(d),
              Label = d.Title?.Value ?? string.Empty,
              Value = d.Key?.Value ?? string.Empty
          });

        private int GetResultsPerPage(SearchResultsItem datasource)
        {
            if (int.TryParse(datasource?.NumberOfItems?.Value, out int outValue))
            {
                return outValue;
            }
            return 10;
        }
    }


    [JsonObject(MemberSerialization.OptOut)]
    public class ReactQueryModel
    {
        public string ListingId { get; set; }
        public bool ShowDescriptions => true;
        public bool ShowDates => true;
        public bool ShowContentTypes => true;
        public bool ShowTaxonomyLabels => true;
        public bool LoadAllPages => false;
        public string PageId { get; set; }
        public bool ShowSummaries => true;
        public int PerPage { get; set; }
        public string Site { get; set; }

    }

    [JsonObject(MemberSerialization.OptOut)]
    public class DictionaryModel
    {
        public string Clear = Dictionary.Current.Get("Search.SiteSearch.Clear");
        public string ClearAll = Dictionary.Current.Get("Search.SiteSearch.ClearAll");
        public string FilterTitle = Dictionary.Current.Get("Search.SiteSearch.FacetHeader");
        public string LoadMoreLabel = Dictionary.Current.Get("Search.SiteSearch.LoadMore");
        public string SearchBoxPlaceholder = Dictionary.Current.Get("Search.SiteSearch.Placeholder");
        public string SearchBoxLabel = Dictionary.Current.Get("Search.SiteSearch.Label");
        public string FeaturedResultLabel = Dictionary.Current.Get("Search.FeaturedResults.Label");
        public string First = Dictionary.Current.Get("Search.SiteSearch.First");
        public string Last = Dictionary.Current.Get("Search.SiteSearch.Last");
        public string Next = Dictionary.Current.Get("Search.SiteSearch.Next");
        public string Previous = Dictionary.Current.Get("Search.SiteSearch.Previous");
        public string SortBy = Dictionary.Current.Get("Search.SiteSearch.SortBy");
        public string ShowMore = Dictionary.Current.Get("Search.SiteSearch.ShowMore");
        public string SelectedFiltersLabel = Dictionary.Current.Get("Search.SiteSearch.WithFilters");
    }
}
