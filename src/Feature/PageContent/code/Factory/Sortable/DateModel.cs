using System;
using AtriusHealth.Foundation.Abstractions.Indexing;

namespace AtriusHealth.Feature.PageContent.Factory.Sortable
{
	public class DateModel : ISortable
	{
		protected _DateBaseItem InnerItem;
		public DateModel(_DateBaseItem innerItem)
		{
			InnerItem = innerItem;
		}

		public DateTime SortDate => InnerItem.DisplayDate?.DateTime ?? DateTime.MinValue;
	}
}
