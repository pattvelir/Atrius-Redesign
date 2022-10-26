using System;
using System.Collections.Generic;
using Sitecore.Configuration;
using Sitecore.Data;
using Sitecore.Data.Items;

namespace Thread.Foundation.Branching.Events.ItemAdded
{
    public class RelocateSingleLinkedItemsFromBranch : RelocateFromBranch
    {
        protected override IList<string> LinkedFieldTypes => Settings.GetSetting("Thread.Foundation.Branching.SingleItemLinkedFieldTypes", "Droplink|Droptree").Split('|');

        protected override void CorrectFieldValue(Item item, ID fieldId, Item rootItem, Item rootBranchItem)
        {
            string fieldValue = item.Fields[fieldId].Value;

            if (string.IsNullOrEmpty(fieldValue)) return;

            Item targetItem = item.Database.GetItem(fieldValue);

            if (targetItem == null) return;

            var oldPath = targetItem.Paths.FullPath;
            if (targetItem.Paths.FullPath.StartsWith(rootBranchItem.Paths.FullPath,
                StringComparison.InvariantCultureIgnoreCase))
            {
                var newPath = oldPath.Replace($"{rootBranchItem.Paths.FullPath}/$name", rootItem.Paths.FullPath);
                var newItem = targetItem.Database.GetItem(newPath);

                if (newItem != null)
                {
                    item.Editing.BeginEdit();
                    item.Fields[fieldId].Value = newItem.ID.ToString();
                    item.Editing.EndEdit();
                }
            }
        }
    }
}