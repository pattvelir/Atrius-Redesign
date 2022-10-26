using Sitecore.Mvc.Pipelines.Response.RenderRendering;
using Sitecore.Mvc.Presentation;
using Sitecore.Sites;

namespace Thread.Foundation.CascadedRenderings.Pipelines.RenderRendering
{
    public class RenderRenderingInPreview : RenderRenderingProcessor
    {
        public override void Process(RenderRenderingArgs args)
        {
            if (!Sitecore.Context.PageMode.IsExperienceEditor) return;

            if (RenderingContext.CurrentOrNull?.Rendering?.Parameters?["Editable"] == "0")
            {
                Sitecore.Context.Site.SetDisplayMode(DisplayMode.Preview, DisplayModeDuration.Temporary);
                args.CustomData["modeChanged"] = true; 
            }
        }
    }
}