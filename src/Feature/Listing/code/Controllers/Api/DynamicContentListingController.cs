using System;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Jabberwocky.WebApi.Attributes;
using Thread.Feature.Listing.Models;
using Thread.Feature.Listing.Page;
using Thread.Feature.Listing.Results;
using Velir.Search.Core.Managers;
using Velir.Search.Core.Request;
using Velir.Search.Core.Results;
using Velir.Search.WebApi.Binders;

namespace Thread.Feature.Listing.Controllers.Api
{
	[Compression, CamelCasingFilter]
	public class DynamicContentListingController : ApiController
	{
		private readonly ISearchManager _searchManager;
		
		public DynamicContentListingController(ISearchManager searchManager)
		{
			_searchManager = searchManager;
		}

		public IQueryResults Get([ModelBinder(typeof(SearchRequestBinder))] SearchRequest request, [ModelBinder(typeof(DynamicContentConfigurationBinder))] DynamicContentListingConfiguration config)
		{
			if (string.IsNullOrEmpty(request?.PageId)) throw new NullReferenceException("No Page ID specified.");

			return _searchManager.GetResults<DynamicContentSearchResultItem>(request, config);
		}
	}
}