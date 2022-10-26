using System;
using System.Collections.Generic;
using System.Linq;
using Thread.Foundation.Enumerations;
using Thread.Foundation.Mvc.ViewModels;
using Thread.Foundation.SitecoreExtensions.Base;
using Thread.Foundation.SitecoreExtensions.Item;

namespace Thread.Feature.Listing.Models
{
	public class ContentListingModel : ThreadViewModel<ContentListingItem>
	{
		protected Lazy<int> NumberOfItems;

		public ContentListingModel()
		{
			NumberOfItems = new Lazy<int>(() =>
			{
				NumberOfItemsItem numberOfItems = Datasource?.NumberOfItems?.TargetItem;
				return numberOfItems?.Value?.Value.ToInt() ?? 5;
			});
		}

		private IList<ContentListingItemItem> _visibleItems;
		public IEnumerable<ContentListingItemItem> VisibleListItems
			=> _visibleItems ?? (_visibleItems = Datasource?.InnerItem.Children.OfType(ContentListingItemItem.TemplateId).Select(c => (ContentListingItemItem)c).Take(NumberOfItems.Value).ToArray() ?? new ContentListingItemItem[0]);

		private IList<ContentListingItemItem> _hiddenItems;
		public IEnumerable<ContentListingItemItem> HiddenListItems
					=> _hiddenItems ?? (_hiddenItems = Datasource?.InnerItem.Children.OfType(ContentListingItemItem.TemplateId).Select(c => (ContentListingItemItem)c).Skip(NumberOfItems.Value).ToArray() ?? new ContentListingItemItem[0]);
	}
}