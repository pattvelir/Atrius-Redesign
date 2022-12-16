using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Events;

namespace AtriusHealth.Foundation.Branching.Events.ItemAdded
{
    public abstract class RelocateFromBranch
    {
        /// <summary>  
        /// The branches folder path  
        /// </summary>  
        protected static string BranchFolderPath { get; set; }

        protected abstract IList<string> LinkedFieldTypes { get; }

        /// <summary>  
        /// Called when [item added].  
        /// </summary>  
        ///  <param name = "sender" > The sender.</param>  
        ///  <param name = "args" > The EventArgs instance containing the event data.</param>  
        protected virtual void OnItemAdded(object sender, EventArgs args)
        {
            // The first [0] item contains the target item  
            var target = Event.ExtractParameter(args, 0) as Item;

            if (target?.Branch == null) return;

            BranchFolderPath = BranchFolderPath ?? target.Database.GetItem(ItemIDs.BranchesRoot)?.Paths.FullPath ?? "/sitecore/templates/branches";

            CorrectLinkTargetingBranch(target, target, target.Branch.InnerItem);
        }

        protected virtual void CorrectLinkTargetingBranch(Item item, Item rootItem, Item rootBranchItem)
        {
            var fieldIds = item.Fields.Where(f => LinkedFieldTypes.Contains(f.Type)).Select(f => f.ID);

            foreach (var fieldId in fieldIds)
            {
                CorrectFieldValue(item, fieldId, rootItem, rootBranchItem);
            }
        }

        protected abstract void CorrectFieldValue(Item item, ID fieldId, Item rootItem, Item rootBranchItem);
    }
}
