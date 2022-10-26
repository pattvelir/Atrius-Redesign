using System;
using System.Collections.Generic;
using Sitecore.ContentSearch;
using Thread.Foundation.Search.Reference;
using Thread.Foundation.Search.Results;

namespace Thread.Feature.Listing.Results
{
	public class DynamicContentSearchResultItem : ThreadSearchResultItem
	{
		[IndexField(Constants.IndexFieldNames.ContentType)]
		public Guid ContentTypeId { get; set; }

		[IndexField(Constants.IndexFieldNames.People)]
		public IEnumerable<Guid> PeopleIds { get; set; }

		[IndexField(Constants.IndexFieldNames.Topics)]
		public IEnumerable<Guid> TopicIds { get; set; }

		[IndexField(Constants.IndexFieldNames.Locations)]
		public IEnumerable<Guid> LocationIds { get; set; }
	}
}