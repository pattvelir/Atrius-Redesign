using Jabberwocky.DependencyInjection.Extensions;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;
using AtriusHealth.Foundation.Aliases.Resolvers;

namespace AtriusHealth.Foundation.Aliases.DependencyInjection
{
	public class Registrar : IServicesConfigurator
	{
		public void Configure(IServiceCollection serviceCollection)
		{
			serviceCollection.AddScopedWithFuncFactory<IAliasResolver>(ctx => new SiteSpecificAliasResolver(Sitecore.Context.Site, Sitecore.Context.Database));
		}
	}
}
