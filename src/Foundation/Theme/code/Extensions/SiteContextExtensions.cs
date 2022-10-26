namespace Thread.Foundation.Theme.Extensions
{
    public static class SiteContextExtensions
    {
        public static string PrimaryArea(this Sitecore.Sites.SiteContext context)
        {
            return context?.Properties?["primaryArea"] ?? string.Empty;
        }
    }
}
