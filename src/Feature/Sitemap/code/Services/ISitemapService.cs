using Sitecore.Data.Items;

namespace AtriusHealth.Feature.Sitemap.Services
{
  public interface ISitemapService
  {
    string Get<T>(Item rootItem);
  }
}
