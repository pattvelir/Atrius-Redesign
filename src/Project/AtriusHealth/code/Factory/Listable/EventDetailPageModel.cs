using System.Linq;
using Sitecore.Data.Items;
using AtriusHealth.Feature.Events.Extensions;
using AtriusHealth.Feature.PageContent.Factory.Listable;
using AtriusHealth.Foundation.Abstractions.Listing;
using AtriusHealth.Foundation.Enumerations;

namespace AtriusHealth.Project.AtriusHealth.Factory.Listable
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
