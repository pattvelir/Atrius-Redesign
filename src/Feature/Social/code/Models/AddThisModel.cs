using Thread.Foundation.Multisite.Configuration;
using Thread.Foundation.Mvc.ViewModels;

namespace Thread.Feature.Social.Models
{
	public class AddThisModel : ThreadViewModel<_ShareConfigurationItem>
	{
		public AddThisModel(ISitecoreConfigurationManager configManager)
		{
			_ShareConfigurationItem configuration = configManager.GetSettings(_ShareConfigurationItem.TemplateId);

			AccountId = configuration?.AddThisAccountID?.Value ?? string.Empty;
		}

		public string AccountId { get; set; }
	}
}