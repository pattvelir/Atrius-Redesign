using System;

namespace Thread.Feature.Metadata.Reference
{
	public static class Constants
	{
		public static class MetaTagNames
		{
			public const string Title = "title";
			public const string Keywords = "keywords";
			public const string Description = "description";
			public const string Robots = "robots";
			public const string Canonical = "canonical";
		}

		public static class Renderings
		{
			public static Guid HtmlPageTitle => new Guid("{80889A9E-B116-46B9-A1B0-8D08DD4F1F0F}");
			public static Guid Metadata => new Guid("{3863F7F0-D061-4F3E-84E4-9C964745118C}");
			public static Guid CustomHeadHtml => new Guid("{AEC018CE-CD65-4F4D-B60D-2258C464CF0A}");
		}
	}
}