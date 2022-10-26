using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Globalization;
using Sitecore.Security.Domains;

namespace Thread.Foundation.Orm.Services
{
	public interface IContextProvider
	{
		Database GetDatabase();
		ISiteContext GetSite();
		Item GetItem();
		Item GetHomeItem();
		Language GetLanguage();
		Domain GetDomain();
	}
}
