using Jabberwocky.Core.Caching;
using Sitecore.Data;
using Sitecore.Data.Items;

namespace Thread.Foundation.Multisite.Configuration
{
	public class SitecoreConfigurationManagerCacheDecorator : ISitecoreConfigurationManager
	{
		private readonly ISitecoreConfigurationManager _manager;
		private readonly ICacheProvider _cache;
		
		public SitecoreConfigurationManagerCacheDecorator(ISitecoreConfigurationManager manager, ICacheProvider cache)
		{
			_manager = manager;
			_cache = cache;
		}

		public SiteConfigurationFolderItem GetConfigurationFolderItem()
		{
			return _cache.GetFromCache($"SitecoreConfigurationManager:GetConfigurationFolderItem", () => _manager.GetConfigurationFolderItem());
		}

		public Item GetSettings(ID templateId)
		{
			return _cache.GetFromCache($"SitecoreConfigurationManager:GetSettings:TemplateId={templateId}", () => _manager.GetSettings(templateId));
		}
	}
}
