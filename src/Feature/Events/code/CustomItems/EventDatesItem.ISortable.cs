using System;
using AtriusHealth.Foundation.Abstractions.Indexing;

namespace AtriusHealth.Feature.Events
{
	public partial class _EventDatesItem : ISortable
	{
		public DateTime SortDate => StartDate.DateTime;
	}
}
