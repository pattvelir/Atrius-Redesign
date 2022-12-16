using System.Globalization;
using System.Text.RegularExpressions;
using Sitecore.Resources.Media;
using Sitecore.Web;

namespace AtriusHealth.Foundation.SitecoreExtensions.Base
{
	public static class StringExtensions
	{
		public static string FormatImagePath(this string imageSource, int width = 0, int height = 0)
		{
			if (string.IsNullOrEmpty(imageSource)) return string.Empty;

			string url = imageSource.Replace(" ", "%20");
			if (width > 0)
			{
				url = WebUtil.AddQueryString(url, "w", width.ToString(CultureInfo.InvariantCulture));
			}

			if (height > 0)
			{
				url = WebUtil.AddQueryString(url, "h", height.ToString(CultureInfo.InvariantCulture));
			}

			return HashingUtils.ProtectAssetUrl(url);
		}

		public static bool IsHex(this string value)
		{
			if (string.IsNullOrEmpty(value)) return false;

			return Regex.IsMatch(value, "^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$", RegexOptions.IgnoreCase);
		}

		public static string GetFullUrl(this string url)
		{
			if (string.IsNullOrEmpty(url)) return url;

			string fullUrl = WebUtil.GetFullUrl(url);

			if (fullUrl.StartsWith("https://"))
			{
				return fullUrl.Replace(":443/", "/");
			}

			if (fullUrl.StartsWith("http://"))
			{
				return fullUrl.Replace(":80/", "/");
			}

			return fullUrl;
		}

		public static bool ToBool(this string value)
		{
			if (value == "1") return true;

			bool val;
			bool.TryParse(value, out val);

			return val;
		}

		public static int ToInt(this string value)
		{
			int val;
			int.TryParse(value, out val);

			return val;
		}
	}
}
