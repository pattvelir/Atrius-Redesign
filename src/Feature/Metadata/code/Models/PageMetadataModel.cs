using System.Collections.Generic;

namespace Thread.Feature.Metadata.Areas.Thread.Models
{
	public class PageMetadataModel : IPageMetadata
	{
		public virtual string MetaFaviconSrc { get; set; }
		public virtual IDictionary<string, string> MetaTags { get; set; }
	}
}