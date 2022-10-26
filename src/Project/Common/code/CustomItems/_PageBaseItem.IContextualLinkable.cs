using Sitecore;
using Sitecore.Data.Fields;
using Thread.Feature.Navigation.Models;

namespace Thread.Project.Common
{
	public partial class _PageBaseItem : IContextualLinkable
	{
		public CustomField LinkField => !string.IsNullOrEmpty(ShortTitle?.Value) ? ShortTitle : Title;
		public bool IsCurrentItem => Sitecore.Context.Item.ID == ID;
		public virtual bool IsAncestorItem
		{
			get
			{
				var currentItem = Sitecore.Context.Item;
				return currentItem != null && StringUtil.EnsurePostfix('/', currentItem.Paths.FullPath).StartsWith(InnerItem.Paths.FullPath);
			}
		}
	}
}