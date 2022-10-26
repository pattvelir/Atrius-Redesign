using System;
using System.IO;
using System.Web;
using System.Web.Mvc;
using Thread.Foundation.Multisite.Configuration;

namespace Thread.Feature.Robots.Handlers
{
	public class RobotsHandler : IHttpHandler
	{
		#region Implementation of IHttpHandler

		public void ProcessRequest(HttpContext context)
		{
			context.Response.StatusCode = 200;
			context.Response.ContentType = "text/plain";

			try
			{
				var configRobots = GetRobotsConfigurationText();

				if (string.IsNullOrEmpty(configRobots))
				{
					configRobots = GetDefaultRobots();
				}

				context.Response.Write(configRobots);
			}
			catch (Exception ex)
			{
				context.Response.Write(@"User-agent: *
                Disallow: *");
				Sitecore.Diagnostics.Log.Error("RobotService handler failed", ex, this);
			}
		}

		private string GetRobotsConfigurationText()
		{
			var configManager = DependencyResolver.Current.GetService<ISitecoreConfigurationManager>();
			RobotsConfigurationItem config = configManager.GetSettings(RobotsConfigurationItem.TemplateId);

			return config?.RobotsText?.Value;
		}

		private string GetDefaultRobots()
		{
			var filename = $"{AppDomain.CurrentDomain.BaseDirectory}\\robots.txt";
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