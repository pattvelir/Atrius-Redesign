using System.Collections.Generic;

namespace AtriusHealth.Feature.Metadata.Areas.AtriusHealth.Models
{
	public class PageMetadataModel : IPageMetadata
	{
		public virtual string MetaFaviconSrc { get; set; }
		public virtual IDictionary<string, string> MetaTags { get; set; }
	}
}
