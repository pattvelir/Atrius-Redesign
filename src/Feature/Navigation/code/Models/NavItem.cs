using System.Collections.Generic;

namespace Thread.Feature.Navigation.Models
{
	public class NavItem
	{
		public IContextualLinkable LinkItem { get; set; }
		public IEnumerable<NavItem> ChildLinks { get; set; }
	}
}