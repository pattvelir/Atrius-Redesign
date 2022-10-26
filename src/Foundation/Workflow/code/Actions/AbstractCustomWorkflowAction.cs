using System.Collections.Specialized;
using Sitecore.Data.Items;
using Sitecore.SecurityModel;
using Sitecore.Web;
using Sitecore.Workflows.Simple;

namespace Thread.Foundation.Workflow.Actions
{
    public abstract class AbstractCustomWorkflowAction
    {
        protected virtual Item InnerItem { get; set; }
        protected virtual NameValueCollection Parameters { get; set; }

        public virtual void Process(WorkflowPipelineArgs args)
        {
            InnerItem = args.DataItem;
            if (InnerItem == null) return;

            Item actionItem = args.ProcessorItem.InnerItem;
            Parameters = WebUtil.ParseUrlParameters(actionItem?.Fields?["parameters"]?.Value ?? string.Empty);

            Execute(args);
        }

        protected abstract void Execute(WorkflowPipelineArgs args);

    }
}