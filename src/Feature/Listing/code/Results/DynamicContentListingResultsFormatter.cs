using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.ContentSearch.Linq;
using Thread.Feature.Listing.Services;
using Thread.Foundation.Abstractions.Listing;
using Thread.Foundation.Enumerations.References;
using Thread.Foundation.Orm.Factory;
using Thread.Foundation.Search.Results;
using Thread.Foundation.SitecoreExtensions.Base;
using Velir.Search.Core.Results;

namespace Thread.Feature.Listing.Results
{
    [AutowireService(LifetimeScope.PerScope)]
    public class DynamicContentListingResultsFormatter : IResultsFormatter<DynamicContentSearchResultItem>
    {
        private readonly IItemInterfaceFactory _interfaceFactory;
        private readonly IListingDisplayOptionsService _displayOptionsService;

        public DynamicContentListingResultsFormatter(IItemInterfaceFactory interfaceFactory, IListingDisplayOptionsService displayOptionsService)
        {
            _interfaceFactory = interfaceFactory;
            _displayOptionsService = displayOptionsService;
        }

        public virtual IList FormatResults(SearchResults<DynamicContentSearchResultItem> results)
        {
            var displayOptions = _displayOptionsService.GetDisplayOptions();

            // SearchResultItem --> Item --> IListable --> Concrete Model
            return results?.Select(r => r.Document)
                       .Select(d => d.GetItem())
                       .Where(i => i != null)
                       .Select(g => _interfaceFactory.GetItem<IListable>(g))
                       .Where(i => i != null)
                       .Select(l => FormatResult(l, displayOptions))
                       .ToList() ?? new List<ResultItem>();
        }

        protected virtual ResultItem FormatResult(IListable l, DisplayOptions displayOptions)
        {
            return new ResultItem
            {
                Key = l.ListId,
                Title = l.ListTitle,
                Body = displayOptions.DisplaySummary ? l.ListDescription : string.Empty,
                ImageSrc = GetProperImageSrc(l, displayOptions.DisplayImageFormat).FormatImagePath(220),
                Date = displayOptions.DisplayDate ? l.ListDate : string.Empty,
                ContentType = displayOptions.DisplayContentType ? l.ListContentType : string.Empty,
                Location = l.ListLocation,
                Authors = l.ListAuthors,
                DisplayUrl = l.ListUrl.GetFullUrl(),
                ContentUrl = l.ListUrl
            };
        }

        private string GetProperImageSrc(IListable l, ImageFormat format)
        {
            if (format == ImageFormat.None) return string.Empty;

            if (format == ImageFormat.OneByOne) return l.ListImage1X1;

            return l.ListImage16X9;
        }
    }
}