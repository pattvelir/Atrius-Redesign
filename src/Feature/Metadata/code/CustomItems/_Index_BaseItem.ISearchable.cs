using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AtriusHealth.Foundation.Abstractions.Indexing;

namespace AtriusHealth.Feature.Metadata
{
	public partial class _IndexBaseItem : ISearchable
	{
		public bool IsSearchable => !NoIndex.Checked;
	}
}
