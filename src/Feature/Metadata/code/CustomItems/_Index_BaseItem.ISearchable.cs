using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Thread.Foundation.Abstractions.Indexing;

namespace Thread.Feature.Metadata
{
	public partial class _IndexBaseItem : ISearchable
	{
		public bool IsSearchable => !NoIndex.Checked;
	}
}