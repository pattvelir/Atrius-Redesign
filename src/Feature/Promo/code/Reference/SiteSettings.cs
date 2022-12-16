using Sitecore.Configuration;

namespace AtriusHealth.Feature.Promo.Reference
{
	public static class SiteSettings
	{
		public static string CitatationPrefix => Settings.GetSetting("AtriusHealth.PullQuote.CitationPrefix", "- ");
		public static string CitatationSeparator => Settings.GetSetting("AtriusHealth.PullQuote.CitationSeparator", ", ");
	}
}
