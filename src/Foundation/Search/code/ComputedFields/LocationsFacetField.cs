using System.Collections.Generic;
using System.Linq;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Thread.Foundation.Taxonomy;
using Velir.Search.Core.ComputedFields;

namespace Thread.Foundation.Search.ComputedFields
{
	public class LocationsFacetField : BaseContentComputedField
	{
		public override object GetFieldValue(Item indexItem)
		{
			return GetLocations(indexItem).Distinct().ToList();
		}

		protected virtual IEnumerable<string> GetLocations(Item item)
		{
			MultilistField locationsField = item.Fields[_LocationBaseItem.FieldIds.Locations];

			foreach (var locationItem in locationsField?.GetItems() ?? Enumerable.Empty<Item>())
			{
				for (Item currentItem = locationItem; currentItem.TemplateID == LocationItem.TemplateId; currentItem = currentItem.Parent)
				{
					yield return currentItem.DisplayName;
				}
			}
		}
	}
}