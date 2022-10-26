using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Linq;
using Sitecore.Data.Items;
using Sitecore.Links;
using Sitecore.Security.Accounts;
using Sitecore.Sites;

namespace Thread.Feature.Sitemap.Sitemap
{
	public class SitemapInner
	{
		private readonly XNamespace ns = "http://www.w3.org/1999/xhtml";

		public string InnerSiteMap(Item rootItem, SiteContext site)
		{
			// Use a memory stream to write the xml document to
			using (var ms = new MemoryStream())
			{
				// Use an xml text writer to format the xml document
				using (var xmlWriter = new XmlTextWriter(ms, Encoding.UTF8))
				{
					var document = new XDocument();
					var docNs = new XAttribute(XNamespace.Xmlns + "xhtml", ns);
					var schema = new XAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");

					var root = new XElement("urlset", docNs, schema);

					// Get all of the items within the tree
					GetItems(root, rootItem, site);

					document.Add(root);
					document.WriteTo(xmlWriter);

					xmlWriter.Flush();

					// Flush the memory stream
					ms.Flush();

					// Write the contents of the memory stream to a stream reader and return as a string
					ms.Position = 0;
					var sr = new StreamReader(ms);
					return sr.ReadToEnd();
				}
			}
		}

		private void GetItems(XElement doc, Item i, SiteContext site)
		{
			if (i.Versions.GetVersionNumbers().Length != 0 && i.Visualization.Layout != null)
			{
				// Link manager options
				var opts = LinkManager.GetDefaultUrlBuilderOptions();
				opts.AlwaysIncludeServerUrl = true;
				opts.Site = site;

				if (i.Language?.CultureInfo?.Name == "en")
					opts.LanguageEmbedding = LanguageEmbedding.Never;

				var anonymous = User.FromName(@"extranet\Anonymous", false);
				if (i.Security.CanRead(anonymous))
				{
					var english = i.Languages.FirstOrDefault(w => w.Name == "en");

					var lastModified = (DateTime?)null;

					if (english != null)
					{
						var englishVer = i.Database.GetItem(i.ID, english);

						lastModified = englishVer.Statistics.Updated == DateTime.MinValue
							? englishVer.Statistics.Created
							: englishVer.Statistics.Updated;
					}

					var siteMapNode = new SitemapNode
					{
						Url = LinkManager.GetItemUrl(i, opts),
						ChangeFrequency = SitemapNode.Frequency.weekly,
						Priority = 0.75,
						LastModified = lastModified
					};

					foreach (var language in i.Languages)
					{
						opts.Language = language;
						var item = i.Database.GetItem(i.ID, language);

						if (item?.Versions.Count > 0)
							siteMapNode.AlternateLangagePages.Add(new SiteMapAlternateLanguageNode
							{
								Lang = item.Language.Name,
								Url = LinkManager.GetItemUrl(i, opts)
							});
					}

					// Append the entry to the xml writer
					doc.Add(AppendToXml(siteMapNode));
				}
			}

			// Go through the children
			foreach (Item child in i.Children)
			{
				GetItems(doc, child, site);
			}
		}

		private XElement AppendToXml(SitemapNode addLocation)
		{
			var root = new XElement("url");
			root.Add(new XElement("loc", addLocation.Url));
			foreach (var alts in addLocation.AlternateLangagePages)
				root.Add(new XElement(ns + "link",
					new XAttribute("rel", "alternate"),
					new XAttribute("hreflang", alts.Lang),
					new XAttribute("href", alts.Url)));

			if (addLocation.LastModified.HasValue)
				root.Add(new XElement("lastmod", $"{addLocation.LastModified:yyyy-MM-dd}"));

			root.Add(new XElement("changefreq", addLocation.ChangeFrequency.ToString()));
			root.Add(new XElement("priority", addLocation.Priority.ToString()));

			return root;
		}
	}
}