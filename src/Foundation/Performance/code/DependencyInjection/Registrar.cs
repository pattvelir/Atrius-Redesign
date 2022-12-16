using Jabberwocky.Core.Caching;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;
using AtriusHealth.Foundation.Orm.Services;
using AtriusHealth.Foundation.Performance.Cache;

namespace AtriusHealth.Foundation.Performance.DependencyInjection
{
	public class Registrar : IServicesConfigurator
	{
		public void Configure(IServiceCollection serviceCollection)
		{
			serviceCollection.AddSingleton<SiteCache>();
            serviceCollection.AddScoped<ICacheProvider>(sp => new SitecoreCacheDecorator(sp.GetService<SiteCache>(), sp.GetService<IContextProvider>()));
		}
	}
}
