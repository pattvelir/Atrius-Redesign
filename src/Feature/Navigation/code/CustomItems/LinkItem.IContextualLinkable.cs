using Sitecore;
using Sitecore.Data.Fields;
using Thread.Feature.Navigation.Models;

namespace Thread.Feature.Navigation
{
	public partial class LinkItem : IContextualLinkable
	{
		public CustomField LinkField => Link;
		public bool IsCurrentItem => Sitecore.Context.Item.ID == Link.TargetID;
		public virtual bool IsAncestorItem
		{
			get
			{
				var currentItem = Sitecore.Context.Item;
				var targetItem = Link.TargetItem;
				return currentItem != null && targetItem != null && StringUtil.EnsurePostfix('/', currentItem.Paths.FullPath).StartsWith(targetItem.Paths.FullPath);
			}
		}
	}
}