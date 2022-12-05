using Jabberwocky.Core.Caching;
using Jabberwocky.DependencyInjection.Extensions;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;
using AtriusHealth.Foundation.Multisite.Configuration;

namespace AtriusHealth.Foundation.Multisite.DependencyInjection
{
	public class Registrar : IServicesConfigurator
	{
		public void Configure(IServiceCollection serviceCollection)
		{
			serviceCollection.AddScoped<SitecoreConfigurationManager>();
            serviceCollection.AddScopedWithFuncFactory<ISitecoreConfigurationManager>(sp => new SitecoreConfigurationManagerCacheDecorator(sp.GetService<SitecoreConfigurationManager>(), sp.GetService<ICacheProvider>()));
		}
	}
}
