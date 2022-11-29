using System.Collections.Generic;
using System.Linq;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using AtriusHealth.Foundation.Taxonomy;
using Velir.Search.Core.ComputedFields;

namespace AtriusHealth.Foundation.Search.ComputedFields
{
	public class TopicsFacetField : BaseContentComputedField
	{
		public override object GetFieldValue(Item indexItem)
		{
			return GetTopics(indexItem).Distinct().ToList();
		}

		protected virtual IEnumerable<string> GetTopics(Item item)
		{
			MultilistField topicsField = item.Fields[_TopicBaseItem.FieldIds.Topics];

			foreach (var topicItem in topicsField?.GetItems() ?? Enumerable.Empty<Item>())
			{
				for (Item currentItem = topicItem; currentItem.TemplateID == TopicItem.TemplateId; currentItem = currentItem.Parent)
				{
					yield return currentItem.DisplayName;
				}
			}
		}
	}
}
