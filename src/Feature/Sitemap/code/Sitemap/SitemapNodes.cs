using System;
using System.Collections.Generic;

namespace AtriusHealth.Feature.Sitemap.Sitemap
{
  public class SitemapNode
  {
    public enum Frequency
    {
      always,
      hourly,
      daily,
      weekly,
      monthly,
      yearly,
      never
    }

    public List<SiteMapAlternateLanguageNode> AlternateLangagePages = new List<SiteMapAlternateLanguageNode>();

    public string Url { get; set; }
    public Frequency? ChangeFrequency { get; set; }
    public DateTime? LastModified { get; set; }
    public double? Priority { get; set; }
  }

  public class SiteMapAlternateLanguageNode
  {
    public string Lang { get; set; }
    public string Url { get; set; }
  }
}
