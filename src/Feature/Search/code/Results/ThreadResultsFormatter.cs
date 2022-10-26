using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.ContentSearch.Linq;
using Thread.Foundation.Abstractions.Listing;
using Thread.Foundation.Orm.Factory;
using Thread.Foundation.Search.Results;
using Thread.Foundation.SitecoreExtensions.Base;
using Velir.Search.Core.Results;

namespace Thread.Feature.Search.Results
{
    [AutowireService(LifetimeScope.PerScope)]
    public class ThreadResultsFormatter : IResultsFormatter<ThreadSearchResultItem>
    {
        private readonly IItemInterfaceFactory _interfaceFactory;
		
        public ThreadResultsFormatter(IItemInterfaceFactory interfaceFactory)
        {
            _interfaceFactory = interfaceFactory;
        }

        public virtual IList FormatResults(SearchResults<ThreadSearchResultItem> results)
        {
            // SearchResultItem --> Item --> IListable --> Concrete Model
            return results?.Select(r => r.Document)
                       .Select(i => i.GetItem())
                       .Where(i => i != null)
                       .Select(g => _interfaceFactory.GetItem<IListable>(g))
                       .Where(i => i != null)
                       .Select(FormatResult)
                       .ToList() ?? new List<ResultItem>();
        }

        protected virtual ResultItem FormatResult(IListable l)
        {
            return new ResultItem
            {
                Key = l.ListId,
                Title = l.ListTitle,
                Body = l.ListDescription,
                ImageSrc = l.ListImage1X1.FormatImagePath(220),
                Date = l.ListDate,
                ContentType = l.ListContentType,
                Location = l.ListLocation,
                Authors = l.ListAuthors,
                DisplayUrl = l.ListUrl.GetFullUrl(),
                ContentUrl = l.ListUrl,
                Featured = false
            };
        }
    }
}