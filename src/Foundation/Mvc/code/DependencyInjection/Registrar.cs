using Jabberwocky.DependencyInjection.Sc.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.Mvc.Presentation;
using Thread.Foundation.Mvc.Extensions;

namespace Thread.Foundation.Mvc.DependencyInjection
{
	public class Registrar : AbstractServicesConfigurator
	{
		public override void Configure(IServiceCollection serviceCollection)
		{
			serviceCollection.AddMvcControllers(AssemblyNames);
			serviceCollection.AddThreadViewModels(AssemblyNames);

			serviceCollection.AddScoped<PageContext>(p => PageContext.CurrentOrNull);
		}
	}
}