using System.Linq;
using Sitecore.Data;
using Sitecore.Data.Items;
using AtriusHealth.Foundation.Orm.Services;

namespace AtriusHealth.Foundation.Multisite.Configuration
{
	public class SitecoreConfigurationManager : ISitecoreConfigurationManager
	{
		private readonly IContextProvider _context;
		public SitecoreConfigurationManager(IContextProvider context)
		{
			_context = context;
		}

		public virtual SiteConfigurationFolderItem GetConfigurationFolderItem()
		{
			var db = _context.GetDatabase();
			var site = _context.GetSite();

			var startItem = db.GetItem(site.StartPath);

			return startItem?.Parent?.Children.FirstOrDefault(c => c.DescendsFrom(SiteConfigurationFolderItem.TemplateId));
		}

		public virtual Item GetSettings(ID templateId)
		{
			var configFolder = GetConfigurationFolderItem();

			if (configFolder == null) return null;

			return configFolder.InnerItem.DescendsFrom(templateId) ?
				configFolder.InnerItem :
				configFolder.InnerItem.Children.FirstOrDefault(c => c.DescendsFrom(templateId));
		}
	}
}
