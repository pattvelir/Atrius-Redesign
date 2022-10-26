using System;
using System.Web;
using Sitecore.Abstractions;
using Sitecore.Diagnostics;
using Sitecore.Links;
using Thread.Foundation.Multisite.Configuration;

namespace Thread.Foundation.ErrorHandling.Pipelines.HttpRequestBegin
{
	public class ExecuteRequest : Sitecore.Pipelines.HttpRequest.ExecuteRequest
	{
		private readonly Func<ISitecoreConfigurationManager> _configurationManagerThunk;

		public ExecuteRequest(Func<ISitecoreConfigurationManager> configurationManagerThunk, BaseSiteManager siteManager, BaseItemManager itemManager) : base(siteManager, itemManager)
		{
			_configurationManagerThunk = configurationManagerThunk;
		}

		protected override void RedirectOnLayoutNotFound(string url)
		{
			SendUserToNotFoundPage(url);
		}

		protected override void RedirectOnItemNotFound(string url)
		{
			SendUserToNotFoundPage(url);
		}

		private void SendUserToNotFoundPage(string url)
		{
			var context = HttpContext.Current;

			try
            {
                var manager = _configurationManagerThunk();

				// Request the NotFound page
				ErrorHandlingConfigurationItem configuration = manager.GetSettings(ErrorHandlingConfigurationItem.TemplateId);
				if (configuration == null) throw new Exception("Site configuration node not found");

				if (configuration._404PageLocation?.TargetItem == null) throw new Exception("Error page not set in site configuration");

                var options = LinkManager.GetDefaultUrlBuilderOptions();
                options.AlwaysIncludeServerUrl = true;

				var notFoundUrl = LinkManager.GetItemUrl(configuration._404PageLocation.TargetItem, options);
				string content = Sitecore.Web.WebUtil.ExecuteWebPage(notFoundUrl);

				// Send the NotFound page content to the client with a 404 status code
				context.Response.TrySkipIisCustomErrors = true;
				context.Response.StatusCode = 404;
				context.Response.Write(content);
			}
			catch (Exception e)
			{
				Log.Warn("An error occured while routing to 404 Error Page", e, this);
				// If our plan fails for any reason, fall back to the base method
				base.RedirectOnItemNotFound(url);
			}

			// Must be outside the try/catch, cause Response.End() throws an exception
			context.Response.End();
		}
	}
}