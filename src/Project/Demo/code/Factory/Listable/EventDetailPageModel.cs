using System.Linq;
using Sitecore.Data.Items;
using Thread.Feature.Events.Extensions;
using Thread.Feature.PageContent.Factory.Listable;
using Thread.Foundation.Abstractions.Listing;
using Thread.Foundation.Enumerations;

namespace Thread.Project.Demo.Factory.Listable
{
	public class EventDetailPageModel : FallbackModel, IListable
	{
		protected EventDetailPageItem EventPageItem { get; set; }
		public EventDetailPageModel(Item innerItem) : base(innerItem)
		{
			EventPageItem = innerItem;
		}

		public override string ListDate => EventPageItem.StartDate.DateTime.FormatDateAndTimeRange(EventPageItem.EndDate?.DateTime);
		public override string ListLocation => string.Join(", ", new[] { EventPageItem.City.Value, State?.Value?.Value }.Where(s => !string.IsNullOrEmpty(s)));

		protected StateItem State => EventPageItem.State?.TargetItem;
	}
}