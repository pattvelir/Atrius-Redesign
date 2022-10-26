using System;
using Sitecore.Mvc.Pipelines.Loader;
using Sitecore.Pipelines;
using Thread.Foundation.Mvc.Factory;

namespace Thread.Foundation.Mvc.Pipelines.Initialize
{
	public class InitializeThreadControllerFactory : InitializeControllerFactory
	{
		private readonly IServiceProvider _provider;
		public InitializeThreadControllerFactory(IServiceProvider provider)
		{
			_provider = provider;
		}

		protected override void SetControllerFactory(PipelineArgs args)
		{
			System.Web.Mvc.ControllerBuilder.Current.SetControllerFactory(new ThreadControllerFactory(_provider, System.Web.Mvc.ControllerBuilder.Current.GetControllerFactory()));
		}
	}
}