using System.Text;
using Sitecore;
using AtriusHealth.Foundation.SitecoreExtensions.Base;

namespace AtriusHealth.Foundation.Theme.Extensions
{
	public static class ColorPairingExtensions
	{
		public static bool HasValidPairing(this ColorPairingItem pair)
		{
			ColorItem backgroundColorItem = pair?.BackgroundColor?.TargetItem;
			ColorItem foregroundColorItem = pair?.ForegroundColor?.TargetItem;

			return (backgroundColorItem?.IsValid() ?? false) || (foregroundColorItem?.IsValid() ?? false);
		}

		public static string GenerateInlineStyles(this ColorPairingItem pair)
		{
			if (!pair.HasValidPairing()) return string.Empty;

			StringBuilder sb = new StringBuilder();

			ColorItem backgroundColorItem = pair?.BackgroundColor?.TargetItem;
			if (!string.IsNullOrEmpty(backgroundColorItem?.Value?.Value))
			{
				sb.Append($"background-color:{backgroundColorItem.Format()};");
			}

            sb.Append(GenerateForegroundStyle(pair));

            return sb.ToString();
		}

        public static string GenerateForegroundStyle(this ColorPairingItem pair)
        {
            ColorItem foregroundColorItem = pair?.ForegroundColor?.TargetItem;
            if (!string.IsNullOrEmpty(foregroundColorItem?.Value?.Value))
            {
                return $"color:{foregroundColorItem.Format()};";
            }

            return string.Empty;
        }

        public static string Format(this ColorItem color)
		{
			string fillColor = color?.Value?.Value ?? string.Empty;
			fillColor = fillColor.Trim().ToLowerInvariant();

			if (fillColor.IsHex())
			{
				fillColor = StringUtil.EnsurePrefix('#', fillColor);
			}

			return fillColor;
		}
	}
}
