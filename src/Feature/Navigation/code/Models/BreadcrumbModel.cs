using System.Collections.Generic;

namespace Thread.Feature.Navigation.Models
{
	public class BreadcrumbModel
	{
		public IEnumerable<ILinkable> Parents { get; set; }
		public ILinkable Current { get; set; }
		public string Delimiter { get; set; }
	}
}