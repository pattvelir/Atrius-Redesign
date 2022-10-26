using System;
using System.Globalization;
using System.Text.RegularExpressions;

namespace Thread.Foundation.SitecoreExtensions.Base
{
	public static class DateTimeExtensions
	{
		public static string GetDaySuffix(this DateTime date)
		{
			int day = date.Day;
			switch (day)
			{
				case 1:
				case 21:
				case 31:
					return "st";
				case 2:
				case 22:
					return "nd";
				case 3:
				case 23:
					return "rd";
				default:
					return "th";
			}
		}

		public static string ToStringExtended(this DateTime date, string format)
		{
			var match = Regex.Match(format, "(.*?)(SS)(.*)");
			if (match.Success)
			{
				var updatedFormat = $"{match.Groups[1].Value}{{0}}{match.Groups[3].Value}";

				return string.Format(date.ToString(updatedFormat), date.GetDaySuffix(), CultureInfo.InvariantCulture);
			}

			return date.ToString(format);
		}

		public static string ToThreadFormat(this DateTime date)
		{
			if (date == DateTime.MinValue) return string.Empty;
            return date.ToServerTime().ToStringExtended("MMM dd, yyyy");
	    }

	    public static DateTime ToServerTime(this DateTime date)
	    {
	        return Sitecore.DateUtil.ToServerTime(date);
	    }
    }
}
