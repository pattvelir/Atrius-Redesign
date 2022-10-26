using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Thread.Foundation.Abstractions.PageContent;

namespace Thread.Feature.PageContent.Factory.PageEditable
{
	public class DefaultModel : IPageEditable
	{
		protected Item InnerItem { get; set; }

		public DefaultModel(Item innerItem)
		{
			InnerItem = innerItem;
		}

		public Field HeaderTitleField => InnerItem.Fields[_HeaderTitleBaseItem.FieldIds.HeaderTitle];
		public Field SubtitleField => InnerItem.Fields[_SubtitleBaseItem.FieldIds.Subtitle];
	}
}