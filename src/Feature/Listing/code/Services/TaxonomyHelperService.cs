using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.ContentSearch.Linq.Utilities;
using Sitecore.Data.Items;
using AtriusHealth.Feature.Listing.Results;
using AtriusHealth.Foundation.Taxonomy;
using AtriusHealth.Foundation.SitecoreExtensions.Item;

namespace AtriusHealth.Feature.Listing.Services
{
	[AutowireService(LifetimeScope.SingleInstance)]
	public class TaxonomyHelperService : ITaxonomyHelperService
	{
		public Expression<Func<DynamicContentSearchResultItem, bool>> GetContentTypesFilter(IEnumerable<Item> contentTypes)
		{
			if (contentTypes != null && contentTypes.Any())
			{
				var contentTypePredicate = PredicateBuilder.False<DynamicContentSearchResultItem>();
				foreach (var contentType in contentTypes)
				{
					contentTypePredicate = contentTypePredicate.Or(i => i.ContentTypeId == contentType.ID.Guid);
				}

				return contentTypePredicate;
			}

			return null;
		}

		public Expression<Func<DynamicContentSearchResultItem, bool>> GetPeopleFilter(IEnumerable<Item> authors)
		{
			if (authors.Any())
			{
				var authorsPredicate = PredicateBuilder.False<DynamicContentSearchResultItem>();
				foreach (var author in authors)
				{
					authorsPredicate = authorsPredicate.Or(i => i.PeopleIds.Contains(author.ID.Guid));
				}

				return authorsPredicate;
			}

			return null;
		}

		public Expression<Func<DynamicContentSearchResultItem, bool>> GetTopicsFilter(IEnumerable<Item> topics)
		{
			if (topics.Any())
			{
				var topicsPredicate = PredicateBuilder.False<DynamicContentSearchResultItem>();
				foreach (var topic in topics)
				{
					topicsPredicate = topicsPredicate.Or(i => i.TopicIds.Contains(topic.ID.Guid));
				}

				return topicsPredicate;
			}

			return null;
		}

		public Expression<Func<DynamicContentSearchResultItem, bool>> GetLocationsFilter(IEnumerable<Item> locations)
		{
			if (locations.Any())
			{
				var locationsPredicate = PredicateBuilder.False<DynamicContentSearchResultItem>();
				foreach (var location in locations)
				{
					locationsPredicate = locationsPredicate.Or(i => i.LocationIds.Contains(location.ID.Guid));
				}

				return locationsPredicate;
			}

			return null;
		}

		public IEnumerable<Expression<Func<DynamicContentSearchResultItem, bool>>> GetPageTaxonomyFilters(Item page)
		{
			var vals = new string[]
			{
				page[_PeopleBaseItem.FieldIds.People],
				page[_TopicBaseItem.FieldIds.Topics],
				page[_LocationBaseItem.FieldIds.Locations]
			};

			var ids = string.Join("|", vals).Split('|');

			return GetTaxonomyFilters(ids.Select(id => page.Database.GetItem(id)));
		}

		public IEnumerable<Expression<Func<DynamicContentSearchResultItem, bool>>> GetTaxonomyFilters(IEnumerable<Item> taxonomyItems)
		{
			if(taxonomyItems == null) yield break;

			yield return GetContentTypesFilter(taxonomyItems.OfType(ContentTypeItem.TemplateId));
			yield return GetPeopleFilter(taxonomyItems.OfType(PersonItem.TemplateId));
			yield return GetTopicsFilter(taxonomyItems.OfType(TopicItem.TemplateId));
			yield return GetLocationsFilter(taxonomyItems.OfType(LocationItem.TemplateId));
		}
	}
}
