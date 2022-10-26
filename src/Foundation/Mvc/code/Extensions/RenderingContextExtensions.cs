using System.IO;
using System.Linq;
using System.Text;
using Sitecore.Mvc.Presentation;

namespace Thread.Foundation.Mvc.Extensions
{
	public static class RenderingContextExtensions
	{
		public static bool HasRenderings(this RenderingContext context, string placeholderName)
		{
			if (string.IsNullOrEmpty(placeholderName)) return false;

			var renderings = context?.PageContext?.PageDefinition?.Renderings?.Where(r => r.Placeholder == placeholderName) ?? Enumerable.Empty<Rendering>();

			var sb = new StringBuilder();
			using (var writer = new StringWriter(sb))
			{
				foreach (var rendering in renderings)
				{
					rendering.Renderer.Render(writer);
				}
			}
				
			return !string.IsNullOrEmpty(sb.ToString().Trim());
		}
	}
}