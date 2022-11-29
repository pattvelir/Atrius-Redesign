using System;
using AtriusHealth.Foundation.SitecoreExtensions.Base;

namespace AtriusHealth.Feature.Events.Extensions
{
	public static class DateTimeExtensions
	{
		public static string FormatDateRange(this DateTime startDateTime, DateTime? endDateTime)
		{
			var startMonth = startDateTime.ToString("MMM");
			var startDay = startDateTime.ToString("dd");
			var startYear = startDateTime.ToString("yyyy");
			
			var endMonth = endDateTime?.ToString("MMM");
			var endDay = endDateTime?.ToString("dd");
			var endYear = endDateTime?.ToString("yyyy");

		    if (startDateTime == DateTime.MinValue) return string.Empty;

			if (!endDateTime.HasValue || endDateTime == DateTime.MinValue)
			{
				return $"{startMonth} {startDay}, {startYear}";
			}

			if (IsSingleDay(startDateTime, endDateTime))
			{
				return $"{startMonth} {startDay}, {startYear}";
			}

			if (IsMultiDaySameMonth(startDateTime, endDateTime))
			{
				return $"{startMonth} {startDay}-{endDay}, {startYear}";
			}

			if (IsMultiDayDifferentMonths(startDateTime, endDateTime))
			{
				return $"{startMonth} {startDay} to {endMonth} {endDay}, {startYear}";
			}

			if (IsMultiDayDifferentYears(startDateTime, endDateTime))
			{
				return $"{startMonth} {startDay}, {startYear} to {endMonth} {endDay}, {endYear}";
			}

			return string.Empty;
		}

		public static bool IsSingleDay(this DateTime startDateTime, DateTime? endDateTime)
		{
			return startDateTime.Date == endDateTime?.Date;
		}

		public static bool IsMultiDaySameMonth(this DateTime startDateTime, DateTime? endDateTime)
		{
			return startDateTime.Day != endDateTime?.Day
			       && startDateTime.Month == endDateTime?.Month
			       && startDateTime.Year == endDateTime?.Year;
		}

		public static bool IsMultiDayDifferentMonths(this DateTime startDateTime, DateTime? endDateTime)
		{
			return startDateTime.Month != endDateTime?.Month
			       && startDateTime.Year == endDateTime?.Year;
		}
		public static bool IsMultiDayDifferentYears(this DateTime startDateTime, DateTime? endDateTime)
		{
			return startDateTime.Year != endDateTime?.Year;
		}

		public static string FormatTimeRange(this DateTime startDateTime, DateTime? endDateTime)
		{
			var startHour = startDateTime.Hour % 12 == 0 ? 12 : startDateTime.Hour % 12;
			var startMin = startDateTime.Minute;
			var startTime = startMin == 0 ? startHour.ToString() : startDateTime.ToString("h:mm");
			var startAmPm = startDateTime.ToString("tt");

			var endHour = endDateTime?.Hour % 12 == 0 ? 12 : endDateTime?.Hour % 12;
			var endMin = endDateTime?.Minute;
			var endTime = endMin == 0 ? endHour.ToString() : endDateTime?.ToString("h:mm");
			var endAmPm = endDateTime?.ToString("tt");

		    if (startDateTime == DateTime.MinValue) return string.Empty;

            if (!endDateTime.HasValue || endDateTime == DateTime.MinValue)
			{
				return $"{startTime} {startAmPm}";
			}

			if (startAmPm == endAmPm)
			{
				return $"{startTime}-{endTime} {endAmPm}";
			}

			return $"{startTime} {startAmPm} - {endTime} {endAmPm}";
		}

		public static string FormatDateAndTimeRange(this DateTime startDate, DateTime? endDate)
		{
			if (startDate == DateTime.MinValue)
			{
				return string.Empty;
			}

            startDate = startDate.ToServerTime();
            endDate = endDate?.ToServerTime();

            return $"{startDate.FormatDateRange(endDate)} \u2022 {startDate.FormatTimeRange(endDate)}";
		}
	}
}
