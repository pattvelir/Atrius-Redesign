using Sitecore.Data.Items;
using AtriusHealth.Foundation.Taxonomy;
using Velir.Search.Core.ComputedFields;

namespace AtriusHealth.Foundation.Search.ComputedFields
{
	public class ContentTypeFacetField : BaseContentComputedField
	{
		public override object GetFieldValue(Item indexItem)
		{
			var contentTypeId = indexItem?.Fields[_ContentTypeBaseItem.FieldIds.ContentType]?.Value;

			if (string.IsNullOrEmpty(contentTypeId)) return null;

			var contentTypeItem = indexItem.Database.GetItem(contentTypeId);

			return contentTypeItem?.DisplayName;
		}
	}
}
