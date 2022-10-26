using System;
using System.IO;
using Sitecore.Diagnostics;
using Sitecore.Mvc.Pipelines.Response.RenderRendering;
using Sitecore.Mvc.Presentation;

namespace Thread.Foundation.ErrorHandling.Pipelines.RenderRenderings
{
	public class ExecuteRenderer : Sitecore.Mvc.Pipelines.Response.RenderRendering.ExecuteRenderer
	{
		protected override bool Render(Renderer renderer, TextWriter writer, RenderRenderingArgs args)
		{
			try
			{
				return base.Render(renderer, writer, args);
			}
			catch (Exception ex)
			{
				Log.Error(ex.Message, ex, typeof(ExecuteRenderer));
				
				if (Sitecore.Context.PageMode.IsExperienceEditorEditing || Sitecore.Context.PageMode.IsPreview)
				{
					writer.WriteLine("<div style=\"border:solid 1px red\">");
					writer.WriteLine($"<p>Error Rendering Component: {args.Rendering.RenderingItem.Name}</p>");
					writer.WriteLine($"<p>Message: {ex.Message}</p>");
					writer.WriteLine("</div>");
				}

				return false;
			}
		}
	}
}