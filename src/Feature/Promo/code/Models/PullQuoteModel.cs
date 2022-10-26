using Sitecore.StringExtensions;
using Thread.Foundation.Mvc.ViewModels;

namespace Thread.Feature.Promo.Models
{
	public class PullQuoteModel : ThreadViewModel<PullQuoteItem>
	{
		public bool HasContent()
		{
			return !Datasource?.Quote?.Value.IsNullOrEmpty() ?? false;
		}

		public bool HasCitation()
		{
			if (Datasource == null) return false;

			return !Datasource.Name.Value.IsNullOrEmpty() ||
			       !Datasource.Company.Value.IsNullOrEmpty() ||
			       !Datasource.JobTitle.Value.IsNullOrEmpty();
		}
	}
}