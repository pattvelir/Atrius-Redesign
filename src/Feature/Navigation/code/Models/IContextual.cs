
namespace Thread.Feature.Navigation.Models
{
	public interface IContextual
	{
		bool IsCurrentItem { get; }
		bool IsAncestorItem { get; }
	}
}