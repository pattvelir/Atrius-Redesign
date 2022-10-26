using System.Collections.Generic;

namespace Thread.Feature.Metadata.Areas.Thread.Models
{
	public interface IPageMetadata
	{
		string MetaFaviconSrc { get; }
		IDictionary<string, string> MetaTags { get; }
	}
}