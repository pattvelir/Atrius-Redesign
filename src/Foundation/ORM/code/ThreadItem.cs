using Sitecore.Data.Items;

namespace Thread.Foundation.Orm
{
	public class ThreadItem : CustomItem
	{
		public ThreadItem(Item innerItem) : base(innerItem) { }
		public static implicit operator ThreadItem(Item innerItem)
		{
			return innerItem != null ? new ThreadItem(innerItem) : null;
		}
		public static implicit operator Item(ThreadItem customItem)
		{
			return customItem?.InnerItem;
		}
	}
}