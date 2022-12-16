using Sitecore.Data.Fields;
using AtriusHealth.Feature.Navigation.Models;

namespace AtriusHealth.Feature.Navigation
{
	public partial class PrimaryNavigationCategoryItem : IContextualLinkable
	{
		public CustomField LinkField => Title;
		public bool IsCurrentItem => false;
		public bool IsAncestorItem => false;
	}
}
