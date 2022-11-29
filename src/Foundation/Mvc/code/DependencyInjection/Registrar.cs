using Jabberwocky.DependencyInjection.Sc.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.Mvc.Presentation;
using AtriusHealth.Foundation.Mvc.Extensions;

namespace AtriusHealth.Foundation.Mvc.DependencyInjection
{
	public class Registrar : AbstractServicesConfigurator
	{
		public override void Configure(IServiceCollection serviceCollection)
		{
			serviceCollection.AddMvcControllers(AssemblyNames);
			serviceCollection.AddAtriusHealthViewModels(AssemblyNames);

			serviceCollection.AddScoped<PageContext>(p => PageContext.CurrentOrNull);
		}
	}
}
