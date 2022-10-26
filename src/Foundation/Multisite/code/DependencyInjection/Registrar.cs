using Jabberwocky.Core.Caching;
using Jabberwocky.DependencyInjection.Extensions;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;
using Thread.Foundation.Multisite.Configuration;

namespace Thread.Foundation.Multisite.DependencyInjection
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