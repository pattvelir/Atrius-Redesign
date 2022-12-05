using System;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Jabberwocky.WebApi.Attributes;
using AtriusHealth.Feature.Listing.Models;
using AtriusHealth.Feature.Listing.Page;
using AtriusHealth.Feature.Listing.Results;
using Velir.Search.Core.Managers;
using Velir.Search.Core.Request;
using Velir.Search.Core.Results;
using Velir.Search.WebApi.Binders;

namespace AtriusHealth.Feature.Listing.Controllers.Api
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
