using System.IO;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace AtriusHealth.Foundation.Theme.Extensions
{
	public static class HtmlHelperExtensions
	{
		public static HtmlString RenderSvg(this HtmlHelper helper, string spriteName, string className = null, string label = null)
		{
			if (helper == null || string.IsNullOrEmpty(spriteName)) return new HtmlString(string.Empty);

			var sb = new StringBuilder();

			using (var sw = new StringWriter(sb))
			using (var writer = new HtmlTextWriter(sw))
			{
				writer.AddAttribute(HtmlTextWriterAttribute.Class, className + " icon icon--" + spriteName);

				if (string.IsNullOrEmpty(label))
				{
					writer.AddAttribute("aria-hidden", "true");
				} else {
					writer.AddAttribute("role", "img");
					writer.AddAttribute("aria-label", label);
				}

				writer.AddAttribute("tabindex", "-1");

				writer.RenderBeginTag("svg");

				writer.AddAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
				writer.AddAttribute("xlink:href", $"/assets/{Sitecore.Context.Site.PrimaryArea()}-build/img/svg-sprite.svg#{spriteName}");
				writer.RenderBeginTag("use");
				writer.RenderEndTag();

				writer.RenderEndTag();
			}

			return new HtmlString(sb.ToString());
		}

		public static HtmlString RenderCss(this HtmlHelper helper, string fileName, string media = "all")
		{
			return new HtmlString($"<link href=\"/assets/{Sitecore.Context.Site.PrimaryArea()}-build/css/{fileName}-generated.css\" media=\"{media}\" rel=\"stylesheet\" />");
		}

		public static HtmlString RenderJs(this HtmlHelper helper, string fileName)
		{
			return new HtmlString($"<script src=\"/assets/{Sitecore.Context.Site.PrimaryArea()}-build/js/frontend/js/{fileName}-generated.js\"></script>");
		}
	}
}
