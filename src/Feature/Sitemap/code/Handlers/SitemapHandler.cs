using System;
using System.IO;
using System.Web;
using Sitecore.DependencyInjection;
using Thread.Feature.Sitemap.Services;
using Thread.Feature.Sitemap.Sitemap;
using Thread.Foundation.Orm.Services;
using Thread.Foundation.SitecoreExtensions.DependencyInjection;

namespace Thread.Feature.Sitemap.Handlers
{
	public class SitemapHandler : IHttpHandler
	{
		#region Implementation of IHttpHandler

		public void ProcessRequest(HttpContext context)
		{
			context.Response.StatusCode = 200;
			context.Response.ContentType = "text/xml";

			try
			{
				var sitemap = GetSitemapContent();

				if (string.IsNullOrEmpty(sitemap))
				{
					sitemap = GetDefaultSitemap();
				}

				context.Response.Write(sitemap);
			}
			catch (Exception ex)
			{
				Sitecore.Diagnostics.Log.Error("Sitemap handler failed", ex, this);
			}
		}

		private string GetSitemapContent()
		{
			var service = ServiceLocator.ServiceProvider.GetService<ISitemapService>();
			var context = ServiceLocator.ServiceProvider.GetService<IContextProvider>();

			var homeItem = context.GetHomeItem();

			if (homeItem == null) return string.Empty;

			return service.Get<SitemapInner>(homeItem);
		}

		private string GetDefaultSitemap()
		{
			var filename = $"{AppDomain.CurrentDomain.BaseDirectory}\\sitemap.xml";
			try
			{
				var sr = new StreamReader(filename);
				return sr.ReadToEnd();
			}
			catch
			{
				return string.Empty;
			}
		}

		public bool IsReusable => true;

		#endregion
	}
}