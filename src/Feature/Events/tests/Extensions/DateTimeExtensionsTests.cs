using System;
using NUnit.Framework;
using AtriusHealth.Feature.Events.Extensions;

namespace AtriusHealth.Feature.Events.Tests.Extensions
{
	[TestFixture]
	public class DateTimeExtensionsTests
	{
		[Test]
		public void FormatDateRange_IsSingleDay_ReturnsFormattedStartDate()
		{
			DateTime startDate = new DateTime(2018, 6, 20);
			DateTime endDate = new DateTime(2018, 6, 20);

			Assert.AreEqual("Jun 20, 2018", startDate.FormatDateRange(endDate));
		}

		[Test]
		public void FormatDateRange_IsMultiDaySameMonth_ReturnsFormattedStartAndEndDays()
		{
			DateTime startDate = new DateTime(2018, 6, 20);
			DateTime endDate = new DateTime(2018, 6, 30);

			Assert.AreEqual("Jun 20-30, 2018", startDate.FormatDateRange(endDate));
		}

		[Test]
		public void FormatDateRange_IsMultiDayDifferentMonths_ReturnsFormattedStartAndEndMonthsAndDays()
		{
			DateTime startDate = new DateTime(2018, 6, 20);
			DateTime endDate = new DateTime(2018, 7, 30);

			Assert.AreEqual("Jun 20 to Jul 30, 2018", startDate.FormatDateRange(endDate));
		}

		[Test]
		public void FormatDateRange_IsMultiDayDifferentYears_ReturnsFormattedStartAndEndDates()
		{
			DateTime startDate = new DateTime(2018, 6, 20);
			DateTime endDate = new DateTime(2019, 7, 30);

			Assert.AreEqual("Jun 20, 2018 to Jul 30, 2019", startDate.FormatDateRange(endDate));
		}

		[Test]
		public void FormatDateRange_EndDateIsNull_ReturnsFormattedStartDate()
		{
			DateTime startDate = new DateTime(2018, 6, 20);
			
			Assert.AreEqual("Jun 20, 2018", startDate.FormatDateRange(null));
		}

		[Test]
		public void FormatTimeRange_StartTimeIsTopOfHour_ReturnsStartTimeWithNoMinutes()
		{
			DateTime startDate = new DateTime(2018, 6, 20, 10, 0, 0);
			DateTime endDate = new DateTime(2018, 6, 20, 11, 30, 0);

			Assert.AreEqual("10-11:30 AM", startDate.FormatTimeRange(endDate));
		}

		[Test]
		public void FormatTimeRange_EndTimeIsTopOfHour_ReturnsEndTimeWithNoMinutes()
		{
			DateTime startDate = new DateTime(2018, 6, 20, 10, 30, 0);
			DateTime endDate = new DateTime(2018, 6, 20, 11, 0, 0);

			Assert.AreEqual("10:30-11 AM", startDate.FormatTimeRange(endDate));
		}

		[Test]
		public void FormatTimeRange_StartAndEndTimeBothAM_ReturnsAMOnEndTimeOnly()
		{
			DateTime startDate = new DateTime(2018, 6, 20, 10, 30, 0);
			DateTime endDate = new DateTime(2018, 6, 20, 11, 30, 0);

			Assert.AreEqual("10:30-11:30 AM", startDate.FormatTimeRange(endDate));
		}

		[Test]
		public void FormatTimeRange_StartAndEndTimeBothPM_ReturnsPMOnEndTimeOnly()
		{
			DateTime startDate = new DateTime(2018, 6, 20, 15, 0, 0);
			DateTime endDate = new DateTime(2018, 6, 20, 16, 0, 0);

			Assert.AreEqual("3-4 PM", startDate.FormatTimeRange(endDate));
		}

		[Test]
		public void FormatTimeRange_StartAndEndTimeSpanAMToPM_ReturnsAMPMOnStartAndEndTime()
		{
			DateTime startDate = new DateTime(2018, 6, 20, 10, 30, 0);
			DateTime endDate = new DateTime(2018, 6, 20, 12, 0, 0);

			Assert.AreEqual("10:30 AM - 12 PM", startDate.FormatTimeRange(endDate));
		}

		[Test]
		public void FormatTimeRange_EndDateIsNull_ReturnsFormattedStartTime()
		{
			DateTime startDate = new DateTime(2018, 6, 20, 10, 30, 0);
			
			Assert.AreEqual("10:30 AM", startDate.FormatTimeRange(null));
		}

		[Test]
		public void FormatDateAndTimeRange_ValidStartAndEndDates_ReturnsDateRangeThenSeparatorThenTimeRange()
		{
			DateTime startDate = new DateTime(2018, 6, 20, 10, 30, 0);
			DateTime endDate = new DateTime(2018, 6, 20, 12, 0, 0);

			Assert.AreEqual("Jun 20, 2018 \u2022 10:30 AM - 12 PM", startDate.FormatDateAndTimeRange(endDate));
		}

		[Test]
		public void FormatDateAndTimeRange_EndDateIsNull_ReturnsStartDateThenSeparatorThenStartTime()
		{
			DateTime startDate = new DateTime(2018, 6, 20, 10, 30, 0);
			
			Assert.AreEqual("Jun 20, 2018 \u2022 10:30 AM", startDate.FormatDateAndTimeRange(null));
		}
	}
}
