using Sitecore.Data.Items;

namespace Thread.Feature.Sitemap.Services
{
  public interface ISitemapService
  {
    string Get<T>(Item rootItem);
  }
}