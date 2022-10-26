using System;
using Thread.Foundation.Abstractions.Indexing;

namespace Thread.Feature.Events
{
	public partial class _EventDatesItem : ISortable
	{
		public DateTime SortDate => StartDate.DateTime;
	}
}