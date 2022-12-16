using System;
using System.Web.Mvc;
using System.Web.Routing;
using Sitecore.Mvc.Controllers;
using Sitecore.Mvc.Presentation;
using AtriusHealth.Foundation.Multisite.Configuration;
using AtriusHealth.Foundation.Mvc.Controllers;
using AtriusHealth.Foundation.SitecoreExtensions.DependencyInjection;

namespace AtriusHealth.Foundation.Mvc.Factory
{
	public class AtriusHealthControllerFactory : SitecoreControllerFactory
	{
		private readonly IServiceProvider _provider;
		public AtriusHealthControllerFactory(IServiceProvider provider, IControllerFactory innerFactory) : base(innerFactory)
		{
			_provider = provider;
		}

		protected override IController CreateControllerInstance(RequestContext requestContext, string controllerName)
		{
			var controller = base.CreateControllerInstance(requestContext, controllerName);

			if (!(controller is AtriusHealthController)) return controller;

			return CreateControllerProperties(controller);
		}

		protected virtual IController CreateControllerProperties(IController controller)
		{
			var AtriusHealthController = controller as AtriusHealthController;

			AtriusHealthController.SitecoreConfigManager = _provider.GetService<ISitecoreConfigurationManager>();
			AtriusHealthController.Rendering = RenderingContext.CurrentOrNull?.Rendering;
			AtriusHealthController.PageContext = PageContext.CurrentOrNull;

			return AtriusHealthController;
		}
	}
}
