using Sitecore.ExperienceForms.Mvc.Pipelines.RenderForm;
using Sitecore.Mvc.Pipelines;

namespace AtriusHealth.Foundation.Forms.Pipelines.RenderForm
{
    public class FormPostSuccessEvent : MvcPipelineProcessor<RenderFormEventArgs>
    {
        public override void Process(RenderFormEventArgs args)
        {
            var attributes = args.Attributes["data-ajax-success"] as string;
            if (string.IsNullOrEmpty(attributes))
            {
                return;
            }

            var formId = args.Attributes["id"];

            args.Attributes["data-ajax-success"] = $"{args.Attributes["data-ajax-success"]};$('body, html').animate({{scrollTop:$('#{formId}').offset().top}}, 'slow');";
        }
    }
}
