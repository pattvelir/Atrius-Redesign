using Thread.Foundation.Mvc.ViewModels;
using Thread.Foundation.Orm;

namespace Thread.Feature.Containers.Models
{
	public class FullBleedContainerModel : ThreadViewModel<ThreadItem>
	{
		public virtual string ContainerId => $"Container-{Rendering.UniqueId}";
	}
}