using System;
using System.Collections.Generic;
using Sitecore.Configuration;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;

namespace Thread.Foundation.Branching.Events.ItemAdded
{
	public class RelocateMultipleItemsFromBranch : RelocateFromBranch
	{
		protected override IList<string> LinkedFieldTypes => Settings.GetSetting("Thread.Foundation.Branching.MultipleItemLinkedFieldTypes", "Multilist|Multilist with Search|Treelist|Treelist with Search|TreelistEx").Split('|');
		protected override void CorrectFieldValue(Item item, ID fieldId, Item rootItem, Item rootBranchItem)
		{
			MultilistField field = item.Fields[fieldId];

			if (string.IsNullOrEmpty(field?.Value)) return;

			var updatedIds = new List<string>();
			foreach (var targetItem in field.GetItems())
			{
				if (targetItem == null) return;

				string newId = targetItem.ID.ToString();

				var oldPath = targetItem.Paths.FullPath;
				if (targetItem.Paths.FullPath.StartsWith(rootBranchItem.Paths.FullPath,
						StringComparison.InvariantCultureIgnoreCase))
				{
					var newPath = oldPath.Replace($"{rootBranchItem.Paths.FullPath}/$name", rootItem.Paths.FullPath);
					var newItem = targetItem.Database.GetItem(newPath);

					if (newItem != null)
					{
						newId = newItem.ID.ToString();
					}
				}

				updatedIds.Add(newId);
			}

			item.Editing.BeginEdit();
			item.Fields[fieldId].Value = string.Join("|", updatedIds);
			item.Editing.EndEdit();
		}
	}
}