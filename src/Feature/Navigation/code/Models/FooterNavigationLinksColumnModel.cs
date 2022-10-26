using System.Collections.Generic;

namespace Thread.Feature.Navigation.Models
{
	public class FooterNavigationLinksColumnModel
	{
		public virtual LinkColumnHeaderItem LinkColumnHeader { get; set; }
		public virtual int NumberOfColumns { get; set; }
		public virtual IEnumerable<LinkItem> Links { get; set; }
	}
}