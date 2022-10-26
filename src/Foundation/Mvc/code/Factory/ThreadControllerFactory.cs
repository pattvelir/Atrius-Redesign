using System;
using System.Web.Mvc;
using System.Web.Routing;
using Sitecore.Mvc.Controllers;
using Sitecore.Mvc.Presentation;
using Thread.Foundation.Multisite.Configuration;
using Thread.Foundation.Mvc.Controllers;
using Thread.Foundation.SitecoreExtensions.DependencyInjection;

namespace Thread.Foundation.Mvc.Factory
{
	public class ThreadControllerFactory : SitecoreControllerFactory
	{
		private readonly IServiceProvider _provider;
		public ThreadControllerFactory(IServiceProvider provider, IControllerFactory innerFactory) : base(innerFactory)
		{
			_provider = provider;
		}

		protected override IController CreateControllerInstance(RequestContext requestContext, string controllerName)
		{
			var controller = base.CreateControllerInstance(requestContext, controllerName);

			if (!(controller is ThreadController)) return controller;

			return CreateControllerProperties(controller);
		}

		protected virtual IController CreateControllerProperties(IController controller)
		{
			var threadController = controller as ThreadController;

			threadController.SitecoreConfigManager = _provider.GetService<ISitecoreConfigurationManager>();
			threadController.Rendering = RenderingContext.CurrentOrNull?.Rendering;
			threadController.PageContext = PageContext.CurrentOrNull;

			return threadController;
		}
	}
}