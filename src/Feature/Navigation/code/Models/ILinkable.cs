using Sitecore.Data.Fields;

namespace AtriusHealth.Feature.Navigation.Models
{
	public interface ILinkable
	{
		CustomField LinkField { get; }
	}
}
