using Sitecore.StringExtensions;

namespace Thread.Foundation.Theme.Extensions
{
	public static class ColorExtensions
	{
		public static bool IsValid(this ColorItem color)
		{
			var val = color?.Value?.Value?.Trim();

			return !val.IsNullOrEmpty();
		}
	}
}