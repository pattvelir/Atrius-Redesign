using Sitecore.Data.Fields;

namespace Thread.Feature.Navigation.Models
{
	public interface ILinkable
	{
		CustomField LinkField { get; }
	}
}
