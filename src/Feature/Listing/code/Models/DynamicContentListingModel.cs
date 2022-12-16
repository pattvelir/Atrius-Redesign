using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Sitecore.Data;
using Sitecore.Mvc.Presentation;
using AtriusHealth.Feature.Listing.Reference;
using AtriusHealth.Foundation.Orm.Services;
using AtriusHealth.Foundation.Search.Areas.AtriusHealth.Models.Search;
using Velir.Search.Core.Models;

namespace AtriusHealth.Feature.Listing.Models
{
    [JsonObject(MemberSerialization.OptIn)]
    public class DynamicContentListingModel : AbstractSearchResultsModel<DynamicContentListingItem,
        DynamicContentListingRenderingParameters>
    {
        public DynamicContentListingModel(IContextProvider contextProvider)
            : base(contextProvider)
        {
        }

        public override void Initialize(Rendering rendering)
        {
            base.Initialize(rendering);

            var renderingParams = HttpUtility.ParseQueryString(rendering.RenderingItem.Parameters);
            Theme = int.TryParse(renderingParams["Theme"], out int theme) ? theme : 1;
        }

        public override string SearchId => $"dynamic-listing-{Datasource.ID}";
        public string SearchIdEncoded => $"dynamic-listing-{ID.Encode(Datasource.ID)}";

        public override string Url => "/api/dynamiccontentlisting";

        public override bool Pagination => false;

        protected override object Dictionary => new Dictionary<string, string>
        {
            {"filterTitle",Foundation.Dictionary.Repositories.Dictionary.Current.Get("Listing.DynamicContent.FilterTitle")},
            {"filterLabel", Foundation.Dictionary.Repositories.Dictionary.Current.Get("Listing.DynamicContent.FilterLabel")},
            {"loadMoreLabel", Foundation.Dictionary.Repositories.Dictionary.Current.Get("Listing.DynamicContent.LoadMore")},
            {"clearAll", Foundation.Dictionary.Repositories.Dictionary.Current.Get("Listing.DynamicContent.ClearSelection")},
            {"resultsInfoLabel", Foundation.Dictionary.Repositories.Dictionary.Current.Get("Listing.DynamicContent.ResultsInfoLabel")},
            {"newResultsMessage", Foundation.Dictionary.Repositories.Dictionary.Current.Get("Listing.DynamicContent.NewResultsMessage")}
        };

        protected override object Query => new
        {

            Site,
            PageId,
            ListingId = Datasource.ID.Guid.ToString(),
            ShowSummaries = RenderingParameters.DisplaySummaries,
            ShowDates = RenderingParameters.DisplayDates,
            ShowContentTypes = RenderingParameters.DisplayContentTypeLabels,
            ShowImages = RenderingParameters.DisplayImages?.Value?.Value ?? string.Empty,
            LoadAllPages = false,
            PerPage = Datasource?.NumberOfItems?.TargetItem?.Name
        };
        
        public int Theme {get; private set; }

        protected override object Config => new
        {
            Url,
            Theme,
            EnableQueryString = false,
            Sorters
        };

        public override IEnumerable<SortOptionModel> Sorters
        {
            get
            {
                if (Datasource?.SortMethod?.TargetItem == null)
                {
                    return Enumerable.Empty<SortOptionModel>();
                }

                SortOptionItem sortOption = Datasource.SortMethod.TargetItem;

                return new[]
                {
                    new SortOptionModel
                    {
                        Id = sortOption.ID.ToString(),
                        Label = sortOption.Title.Value ?? string.Empty,
                        Value =sortOption.Key.Value ?? string.Empty,
                        Direction = GetSortDirection(sortOption.SortDirectionDefault.TargetItem),
                        IsActive = true
                    }
                };
            }
        }
    }
}
