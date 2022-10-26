using System;
using System.Linq;
using Sitecore;
using Sitecore.Data.Events;
using Sitecore.Data.Items;
using Sitecore.Events;
using Sitecore.SecurityModel;

namespace Thread.Foundation.AX.Events.ItemCreated
{
	public class InsertItemLastEventHandler
	{
		protected void ItemCreated(object sender, EventArgs args)
		{
			var itemArgs = Event.ExtractParameter(args, 0) as ItemCreatedEventArgs;

			var createdItem = itemArgs?.Item;

			if (createdItem == null || createdItem.Database.Name != "master" || !createdItem.Paths.IsContentItem) return;

			Item lastSibling = createdItem.Parent?.Children.LastOrDefault();

			if (lastSibling == null) return;

			if (createdItem.ID == lastSibling.ID) return;

			using (new EditContext(createdItem, false, true))
			using (new SecurityDisabler())
			{
				int newSortOrder = lastSibling.Appearance.Sortorder + 100;
				createdItem[FieldIDs.Sortorder] = newSortOrder.ToString();
			}
		}
	}
}