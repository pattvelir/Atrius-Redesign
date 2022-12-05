using Sitecore.Data.Items;

namespace AtriusHealth.Foundation.Orm
{
	public class AtriusHealthItem : CustomItem
	{
		public AtriusHealthItem(Item innerItem) : base(innerItem) { }
		public static implicit operator AtriusHealthItem(Item innerItem)
		{
			return innerItem != null ? new AtriusHealthItem(innerItem) : null;
		}
		public static implicit operator Item(AtriusHealthItem customItem)
		{
			return customItem?.InnerItem;
		}
	}
}
