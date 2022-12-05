using Sitecore;
using Sitecore.Collections;

namespace AtriusHealth.Foundation.ResponsiveImages.Extensions
{
	public static class SafeDictionaryExtensions
	{
		private const string W = "w";
		private const string MW = "mw";
		private const string Width = "width";

		private const string H = "h";
		private const string MH = "mh";
		private const string Height = "height";

		public static int GetWidth(this SafeDictionary<string> dict)
		{
			if (dict.ContainsKey(W))
			{
				return MainUtil.GetInt(dict[W], 0);
			}

			if (dict.ContainsKey(MW))
			{
				return MainUtil.GetInt(dict[MW], 0);
			}

			if (dict.ContainsKey(Width))
			{
				return MainUtil.GetInt(dict[Width], 0);
			}

			return 0;
		}

		public static int GetHeight(this SafeDictionary<string> dict)
		{
			if (dict.ContainsKey(H))
			{
				return MainUtil.GetInt(dict[H], 0);
			}

			if (dict.ContainsKey(MH))
			{
				return MainUtil.GetInt(dict[MH], 0);
			}

			if (dict.ContainsKey(Height))
			{
				return MainUtil.GetInt(dict[Height], 0);
			}

			return 0;
		}
	}
}
