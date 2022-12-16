using AtriusHealth.Foundation.Multisite.Configuration;
using AtriusHealth.Foundation.Mvc.ViewModels;

namespace AtriusHealth.Feature.Social.Models
{
	public class AddThisModel : AtriusHealthViewModel<_ShareConfigurationItem>
	{
		public AddThisModel(ISitecoreConfigurationManager configManager)
		{
			_ShareConfigurationItem configuration = configManager.GetSettings(_ShareConfigurationItem.TemplateId);

			AccountId = configuration?.AddThisAccountID?.Value ?? string.Empty;
		}

		public string AccountId { get; set; }
	}
}
