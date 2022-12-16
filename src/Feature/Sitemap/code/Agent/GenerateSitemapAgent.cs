using System;
using System.IO;
using System.Linq;
using Sitecore.Configuration;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Sites;
using AtriusHealth.Feature.Sitemap.Sitemap;

namespace AtriusHealth.Feature.Sitemap.Agent
{
	public class GenerateSitemapAgent
	{
		protected Database Database;
		protected SiteContext[] Sites;
		
		public GenerateSitemapAgent(string database, string sites)
		{
			Database = Factory.GetDatabase(database);
			Sites = sites.Split('|').Select(Factory.GetSite).ToArray();
		}

		public void GenerateSitemaps()
		{
			Log.Info("AtriusHealthSitemapGenerator - Running Command", this);
			foreach (var site in Sites)
			{
				var rootItem = Database.GetItem($"{site.RootPath}{site.StartItem}");

				GenerateSitemap(rootItem, site);
			}
			Log.Info("AtriusHealthSitemapGenerator - Command Finished", this);
		}

		protected void GenerateSitemap(Item rootItem, SiteContext site)
		{
			// Generate the siteMap
			var sitemapInner = new SitemapInner();
			var siteMap = sitemapInner.InnerSiteMap(rootItem, site);
			var filename = $"{AppDomain.CurrentDomain.BaseDirectory}App_Data\\Sitemaps\\Sitemap{rootItem.ID.ToShortID()}.xml";

			// Create directory if it does not already exist
			var directory = $"{AppDomain.CurrentDomain.BaseDirectory}App_Data\\Sitemaps";
			Directory.CreateDirectory(directory);

			// Write the siteMap out to a file
			var sw = new StreamWriter(filename, false);
			sw.Write(siteMap);
			sw.Close();
		}
	}
}
