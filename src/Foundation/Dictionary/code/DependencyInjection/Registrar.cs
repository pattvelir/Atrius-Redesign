using Jabberwocky.Core.Caching;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;
using Sitecore.Sites;
using Thread.Foundation.Dictionary.Repositories;

namespace Thread.Foundation.Dictionary.DependencyInjection
{
	public class Registrar : IServicesConfigurator
	{
		public void Configure(IServiceCollection serviceCollection)
		{
			serviceCollection.AddScoped<IDictionaryRepository>(p => new Repositories.Dictionary(SiteContext.Current));
			serviceCollection.Decorate<IDictionaryRepository>((provider, sp) => new DictionaryCacheDecorator(provider, sp.GetService<ICacheProvider>()));
		}
	}
}