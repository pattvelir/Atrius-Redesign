using System;
using Thread.Foundation.Abstractions.Indexing;

namespace Thread.Feature.PageContent.Factory.Sortable
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