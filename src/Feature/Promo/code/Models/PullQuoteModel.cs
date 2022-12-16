using Sitecore.StringExtensions;
using AtriusHealth.Foundation.Mvc.ViewModels;

namespace AtriusHealth.Feature.Promo.Models
{
	public class PullQuoteModel : AtriusHealthViewModel<PullQuoteItem>
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
