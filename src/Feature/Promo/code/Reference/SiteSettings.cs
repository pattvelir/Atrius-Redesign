using Sitecore.Configuration;

namespace Thread.Feature.Promo.Reference
{
	public static class SiteSettings
	{
		public static string CitatationPrefix => Settings.GetSetting("Thread.PullQuote.CitationPrefix", "- ");
		public static string CitatationSeparator => Settings.GetSetting("Thread.PullQuote.CitationSeparator", ", ");
	}
}