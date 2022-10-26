using System.ComponentModel.DataAnnotations;

namespace Thread.Feature.Search.Models
{
	public class QuickSearchBarModel
	{
		public virtual string Keyword { get; set; }

		public virtual string SearchPageUrl { get; set; }
	}
}