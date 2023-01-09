using Jabberwocky.Core.Caching;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;
using Sitecore.Sites;
using AtriusHealth.Foundation.Dictionary.Repositories;

namespace AtriusHealth.Foundation.Dictionary.DependencyInjection
{
	public class Registrar : IServicesConfigurator
	{
		public void Configure(IServiceCollection serviceCollection)
		{
			serviceCollection.AddScoped(p => new Repositories.Dictionary(SiteContext.Current));
			serviceCollection.AddScoped<IDictionaryRepository>(sp => new DictionaryCacheDecorator(sp.GetService<Repositories.Dictionary>(), sp.GetService<ICacheProvider>()));
		}
	}
}
