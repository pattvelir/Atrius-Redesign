using System.Collections.Generic;

namespace AtriusHealth.Feature.Metadata.Areas.AtriusHealth.Models
{
	public interface IPageMetadata
	{
		string MetaFaviconSrc { get; }
		IDictionary<string, string> MetaTags { get; }
	}
}
