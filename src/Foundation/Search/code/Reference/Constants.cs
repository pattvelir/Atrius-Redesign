using System;

namespace Thread.Foundation.Search.Reference
{
	public static class Constants
	{
		public static class ResultFormats
		{
			public static Guid LoadMore => new Guid("{A9D4D91F-9388-453D-A27B-597A0864AB55}");
			public static Guid Pagination => new Guid("{8BF5C2D4-983F-4ECC-9FF2-D50289B6CE3B}");
		}

		public static class TransitionDirections
		{
			public static Guid SlideFromLeft => new Guid("{B3FEF9EA-3908-4F50-B4B4-67616A950953}");
			public static Guid SlideFromRight => new Guid("{8EA76C18-B0A7-45F4-90F9-CDEA86813ED6}");
		}

		public static class IndexFieldNames
		{
			public const string Searchable = "c_searchable";
			public const string DisplayTitle = "c_title_display";
			public const string SearchTitle = "title";
			public const string Summary = "summary";
			public const string Date = "c_date";
			public const string DisplayContentType = "c_content_type";
			public const string ContentType = "content_type_s";
			public const string DisplayAuthors = "c_authors";
			public const string People = "people_sm";
			public const string DisplayTopics = "c_topics";
			public const string Topics = "topics_sm";
			public const string DisplayLocations = "c_locations";
			public const string Locations = "locations_sm";
			public const string AllTemplates = "c_alltemplates";
            public const string LatestVersion = "_latestversion";
		}

        public static class DateRangeKeywords
        {
            public const string Today = "today";
            public const string PastYear = "pastyear";
            public const string PastMonth = "pastmonth";
            public const string PastWeek = "pastweek";
        }
    }
}