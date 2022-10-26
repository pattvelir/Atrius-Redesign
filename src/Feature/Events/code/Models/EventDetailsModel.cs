using System;
using System.Collections.Generic;
using System.Linq;
using Thread.Feature.Events.Extensions;
using Thread.Foundation.Mvc.ViewModels;
using Thread.Foundation.Orm;
using Thread.Foundation.SitecoreExtensions.Base;

namespace Thread.Feature.Events.Models
{
	public class EventDetailsModel : ThreadViewModel<ThreadItem>
	{
		public _EventDetailsItem EventDetails => PageItem;
		public _EventDatesItem EventDates => PageItem;
	    private DateTime EventStartTime => EventDates.StartDate?.DateTime.ToServerTime() ?? DateTime.MinValue;
	    private DateTime EventEndTime => EventDates.EndDate?.DateTime.ToServerTime() ?? DateTime.MinValue;

        public string FormattedDate => FormatDate(EventStartTime, EventEndTime);
		public string FormattedTime => FormatTime(EventStartTime, EventEndTime);

		public bool HasAddressFields()
		{
			return new List<string>
				{
					EventDetails?.Address1?.Value,
					EventDetails?.Address2?.Value,
					EventDetails?.City?.Value,
					EventDetails?.State?.Value,
					EventDetails?.ZipCode?.Value
				}
				.Any(f => !string.IsNullOrWhiteSpace(f));
		}
		
		protected string FormatDate(DateTime startDateTime, DateTime? endDateTime)
		{
			string formattedEventDate = startDateTime.FormatDateRange(endDateTime);

			if (!string.IsNullOrEmpty(formattedEventDate))
			{
				return formattedEventDate;
			}

			return "Date information not available.";
		}

		protected string FormatTime(DateTime startDateTime, DateTime? endDateTime)
		{
			string formattedEventTime = startDateTime.FormatTimeRange(endDateTime);

			if (!string.IsNullOrEmpty(formattedEventTime))
			{
				return formattedEventTime;
			}

			return "Time information not available.";
		}
	}	
}