using Sitecore.Data.Fields;
using Thread.Feature.Navigation.Models;

namespace Thread.Feature.Navigation
{
	public partial class PrimaryNavigationCategoryItem : IContextualLinkable
	{
		public CustomField LinkField => Title;
		public bool IsCurrentItem => false;
		public bool IsAncestorItem => false;
	}
}