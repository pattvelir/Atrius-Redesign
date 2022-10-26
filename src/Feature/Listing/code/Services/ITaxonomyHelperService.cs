using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Sitecore.Data.Items;
using Thread.Feature.Listing.Results;

namespace Thread.Feature.Listing.Services
{
	public interface ITaxonomyHelperService
	{
		Expression<Func<DynamicContentSearchResultItem, bool>> GetContentTypesFilter(IEnumerable<Item> contentTypes);
		Expression<Func<DynamicContentSearchResultItem, bool>> GetPeopleFilter(IEnumerable<Item> contentTypes);
		Expression<Func<DynamicContentSearchResultItem, bool>> GetTopicsFilter(IEnumerable<Item> contentTypes);
		Expression<Func<DynamicContentSearchResultItem, bool>> GetLocationsFilter(IEnumerable<Item> contentTypes);

		IEnumerable<Expression<Func<DynamicContentSearchResultItem, bool>>> GetPageTaxonomyFilters(Item page);
		IEnumerable<Expression<Func<DynamicContentSearchResultItem, bool>>> GetTaxonomyFilters(IEnumerable<Item> taxonomyItems);
	}
}
