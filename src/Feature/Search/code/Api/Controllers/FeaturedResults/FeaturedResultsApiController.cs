using Jabberwocky.WebApi.Attributes;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Thread.Feature.Search.Repositories;
using Thread.Foundation.Search.Results;
using Thread.Foundation.SitecoreExtensions.Base;

namespace Thread.Feature.Search.Api.Controllers.FeaturedResults
{
    [Compression,CamelCasingFilter]
    public class FeaturedResultsController : ApiController
    {
        private readonly IFeaturedResultsRepository _repository;

        public FeaturedResultsController(IFeaturedResultsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IEnumerable<ResultItem> GetFeaturedItems(string keyword)
        {
            var results = _repository.Get(keyword ?? string.Empty);

            return results
                .Select(result => new ResultItem
                {
                    Key = $"f-{result.ListId}",
                    Title = result.ListTitle,
                    ContentUrl = result.ListUrl,
                    ImageSrc = result.ListImage1X1.FormatImagePath(220),
                    ContentType = result.ListContentType,
                    Body = result.ListDescription,
                    Date = result.ListDate,
                    Featured = true,
                });
        }
	}
}