using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Layouts;

namespace Thread.Foundation.Branching.Events.ItemAdded
{
	// http://www.suneco.nl/over-suneco/blog/2014/creating-items-from-a-branch-relocating-datasource.aspx
	public class RelocateDatasourceItemsFromBranch : RelocateFromBranch
	{
	    protected override IList<string> LinkedFieldTypes => new List<string>();

	    /// <summary>  
		/// Corrects datasources that are targeting items that are located under the branch item.  
		/// </summary>  
		///  <param name = "item" > The item that needs to be checked.  </param>  
		///  <param name = "rootItem" > The root item that is actually the root item that is created from the branch.</param>  
		///  <param name= "rootBranchItem" > The root branch item, the item.</param>  
		protected override void CorrectLinkTargetingBranch(Item item, Item rootItem, Item rootBranchItem)
		{
			var fields = new[] { FieldIDs.LayoutField, FieldIDs.FinalLayoutField };

			foreach (var fieldId in fields)
			{
				CorrectFieldValue(item, fieldId, rootItem, rootBranchItem);
			}

			foreach (var childItem in item.Axes.GetDescendants())
			{
                CorrectLinkTargetingBranch(childItem, rootItem, rootBranchItem);
			}
		}

	    protected override void CorrectFieldValue(Item item, ID fieldId, Item rootItem, Item rootBranchItem)
	    {
            var updated = false;
            var layoutField = new LayoutField(item.Fields[fieldId]);
            var layoutDefinition = LayoutDefinition.Parse(layoutField.Value);

            var deviceItem = GetDefaultDeviceItem(item.Database);

            var renderings = item.Visualization.GetRenderings(deviceItem, false);
            foreach (var rendering in renderings)
            {
                if (string.IsNullOrWhiteSpace(rendering?.Settings.DataSource)) continue;

                var datasource = item.Database.GetItem(rendering.Settings.DataSource);
                if (datasource == null || !datasource.Paths.FullPath.StartsWith(BranchFolderPath, StringComparison.InvariantCultureIgnoreCase)) continue;

                var oldPath = datasource.Paths.FullPath;
                var newPath = oldPath.Replace($"{rootBranchItem.Paths.FullPath}/$name", rootItem.Paths.FullPath);
                var newDatasource = item.Database.GetItem(newPath);

                if (newDatasource == null) continue;

                foreach (var renderingDefinition
                                    in from DeviceDefinition deviceDefinition
                                         in layoutDefinition.Devices
                                       where deviceDefinition != null
                                       select deviceDefinition.GetRenderingByUniqueId(rendering.UniqueId)
                                         into renderingDefinition
                                       where renderingDefinition != null
                                       select renderingDefinition)
                {
                    renderingDefinition.Datasource = newDatasource.ID.ToString();
                    updated = true;
                }
            }

            if (updated)
            {
                item.Editing.BeginEdit();
                layoutField.Value = layoutDefinition.ToXml();
                item.Editing.EndEdit();
            }
        }

	    private DeviceItem GetDefaultDeviceItem(Database db)
		{
			return db.Resources.Devices.GetAll().First(d => d.IsDefault);
		}
	}
}