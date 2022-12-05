using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Globalization;
using Sitecore.Security.Domains;
using Sitecore.Sites;

namespace AtriusHealth.Foundation.Orm.Services
{
	[AutowireService(LifetimeScope.PerScope)]
	public class SitecoreContextProvider : IContextProvider
	{
		public virtual Database GetDatabase()
		{
			return Sitecore.Context.Database;
		}

		public virtual ISiteContext GetSite()
		{
			return new AtriusHealthSiteContext(Sitecore.Context.Site);
		}

		public virtual Item GetItem()
		{
			return Sitecore.Context.Item;
		}

		public virtual Item GetHomeItem()
		{
			var site = GetSite();
			var database = GetDatabase();

			return database.GetItem(site.StartPath);
		}

		public virtual Language GetLanguage()
		{
			return Sitecore.Context.Language;
		}

		public Domain GetDomain()
		{
			return Domain.Current;
		}
	}

	public interface ISiteContext
	{
		string Name { get; }
		string StartPath { get; }
		string StartItem { get; }
	}

	public class AtriusHealthSiteContext : ISiteContext
	{
		private readonly SiteContext _context;
		public AtriusHealthSiteContext(SiteContext context)
		{
			_context = context;
		}

		public virtual string Name => _context.Name;
		public virtual string StartPath => _context.StartPath;
		public virtual string StartItem => _context.StartItem;
	}
}
