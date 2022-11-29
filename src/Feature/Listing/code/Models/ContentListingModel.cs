using System;
using System.Collections.Generic;
using System.Linq;
using AtriusHealth.Foundation.Enumerations;
using AtriusHealth.Foundation.Mvc.ViewModels;
using AtriusHealth.Foundation.SitecoreExtensions.Base;
using AtriusHealth.Foundation.SitecoreExtensions.Item;

namespace AtriusHealth.Feature.Listing.Models
{
	public class ContentListingModel : AtriusHealthViewModel<ContentListingItem>
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
