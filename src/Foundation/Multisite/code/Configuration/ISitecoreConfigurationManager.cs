using Sitecore.Data;
using Sitecore.Data.Items;

namespace Thread.Foundation.Multisite.Configuration
{
	public interface ISitecoreConfigurationManager
	{
		SiteConfigurationFolderItem GetConfigurationFolderItem();
		Item GetSettings(ID templateId);
	}
}
