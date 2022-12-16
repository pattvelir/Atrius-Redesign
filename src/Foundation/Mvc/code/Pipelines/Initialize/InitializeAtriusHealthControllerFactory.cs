using System;
using Sitecore.Mvc.Pipelines.Loader;
using Sitecore.Pipelines;
using AtriusHealth.Foundation.Mvc.Factory;

namespace AtriusHealth.Foundation.Mvc.Pipelines.Initialize
{
	public class InitializeAtriusHealthControllerFactory : InitializeControllerFactory
	{
		private readonly IServiceProvider _provider;
		public InitializeAtriusHealthControllerFactory(IServiceProvider provider)
		{
			_provider = provider;
		}

		protected override void SetControllerFactory(PipelineArgs args)
		{
			System.Web.Mvc.ControllerBuilder.Current.SetControllerFactory(new AtriusHealthControllerFactory(_provider, System.Web.Mvc.ControllerBuilder.Current.GetControllerFactory()));
		}
	}
}
