using System;
using System.IO;
using Jabberwocky.Core.Caching;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.Data.Items;
using AtriusHealth.Feature.Sitemap.Sitemap;

namespace AtriusHealth.Feature.Sitemap.Services
{
  [AutowireService]
  public class SitemapService : ISitemapService
  {
    private readonly ICacheProvider _cacheProvider;
    
    public SitemapService(ICacheProvider cacheProvider)
    {
      _cacheProvider = cacheProvider;
    }

    public virtual string Get<T>(Item rootItem)
    {
      if (typeof(T) == typeof(SitemapInner)) return GenerateSitemap(rootItem);

      return string.Empty;
    }

    private string GenerateSitemap(Item rootItem)
    {
      var cacheKey = $"SitemapService:GenerateSiteMap:uid:{rootItem.ID}";
      return _cacheProvider.GetFromCache(cacheKey, () => ReadSitemapFromFile(rootItem));
    }

    protected static string ReadSitemapFromFile(Item rootItem)
    {
	    var filename = $"{AppDomain.CurrentDomain.BaseDirectory}App_Data\\Sitemaps\\Sitemap{rootItem.ID.ToShortID()}.xml";

	    try
	    {
		    var sr = new StreamReader(filename);
		    return sr.ReadToEnd();
	    }
	    catch
	    {
		    return string.Empty;
	    }
    }
	}
}
