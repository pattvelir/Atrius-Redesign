using AtriusHealth.Foundation.Mvc.ViewModels;
using AtriusHealth.Foundation.Orm;

namespace AtriusHealth.Feature.Containers.Models
{
	public class FullBleedContainerModel : AtriusHealthViewModel<AtriusHealthItem>
	{
		public virtual string ContainerId => $"Container-{Rendering.UniqueId}";
	}
}
