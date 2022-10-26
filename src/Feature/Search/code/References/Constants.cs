using Sitecore.Globalization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Thread.Feature.Search.References
{
    public class Constants
    {
        public static class DateRange
        {
            public static string PastWeekKey = "pastweek";
            public static string PastMonthKey = "pastmonth";
            public static string PastYearKey = "pastyear";
        }

        public static class SiteSettings
        {
            public static class DateRange
            {
                public static string PastWeekLabel => Translate.Text("Search.DateRangeFilter.PastWeek");
                public static string PastMonthLabel => Translate.Text("Search.DateRangeFilter.PastMonth");
                public static string PastYearLabel => Translate.Text("Search.DateRangeFilter.PastYear");
            }
        }
    }
}