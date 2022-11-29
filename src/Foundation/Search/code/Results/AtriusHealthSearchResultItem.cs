using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Sitecore.ContentSearch;
using Sitecore.Links;
using AtriusHealth.Foundation.Search.Reference;
using Velir.Search.Core.Attributes;
using Velir.Search.Solr.Results;

namespace AtriusHealth.Foundation.Search.Results
{
	public class AtriusHealthSearchResultItem : SolrSearchResultItem
	{
		[IndexField(Constants.IndexFieldNames.DisplayTitle)]
		[DataMember]
		public string Title { get; set; }

		[QueryField(FieldType.Date, 0)]
		[IndexField(Constants.IndexFieldNames.Date)]
		[DataMember]
		public DateTime Date { get; set; }

		[IndexField(Constants.IndexFieldNames.DisplayContentType)]
		[DataMember]
		public string ContentType { get; set; }

		[IndexField(Constants.IndexFieldNames.DisplayAuthors)]
		[DataMember]
		public IEnumerable<string> Authors { get; set; }

		[IndexField(Constants.IndexFieldNames.Searchable)]
		public bool IsSearchable { get; set; }

		[IndexField(Constants.IndexFieldNames.DisplayTopics)]
		public IEnumerable<string> Topics { get; set; }

		[IndexField(Constants.IndexFieldNames.DisplayLocations)]
		public IEnumerable<string> Locations { get; set; }

		[QueryField(FieldType.Title, 2.5f)]
		[IndexField(Constants.IndexFieldNames.SearchTitle)]
		[IgnoreDataMember]
		public string SearchTitle { get; set; }

		[QueryField(FieldType.Description, 1.5f)]
		[IndexField(Constants.IndexFieldNames.Summary)]
		[IgnoreDataMember]
		public string Summary { get; set; }

		[IndexField(Constants.IndexFieldNames.AllTemplates)]
		[IgnoreDataMember]
		public IList<Guid> AllTemplates { get; set; }

		[IgnoreDataMember]
		public override string Url
		{
			get
			{
				try
				{
					var item = GetItem();

					return LinkManager.GetItemUrl(item);
				}
				catch
				{
					return string.Empty;
				}
			}
		}

        [IndexField(Constants.IndexFieldNames.LatestVersion)]
        [IgnoreDataMember]
        public bool LatestVersion { get; set; }
	}
}
