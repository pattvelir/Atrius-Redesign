using Sitecore.Mvc.Pipelines.Response.RenderRendering;
using Sitecore.Sites;

namespace AtriusHealth.Foundation.CascadedRenderings.Pipelines.RenderRendering
{
    public class SetPageModeBackToEdit : RenderRenderingProcessor
    {
        public override void Process(RenderRenderingArgs args)
        {
            if (!args.CustomData.ContainsKey("modeChanged")) return;

            Sitecore.Context.Site.SetDisplayMode(DisplayMode.Edit, DisplayModeDuration.Remember);
        }
    }
}
