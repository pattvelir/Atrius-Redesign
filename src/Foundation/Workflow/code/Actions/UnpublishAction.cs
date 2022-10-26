using Sitecore.Configuration;
using Sitecore.Publishing;
using Sitecore.Workflows.Simple;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Thread.Foundation.Workflow.Publishing;
using Thread.Foundation.Workflow.References;

namespace Thread.Foundation.Workflow.Actions
{
    public class UnpublishAction : AbstractCustomWorkflowAction
    {
        protected override void Execute(WorkflowPipelineArgs args)
        {
            var dbs = Parameters["database"].Split(',').Select(Factory.GetDatabase).ToArray();

            //Publish Inner Item
            if (Databases.Web != null)
            {
                PublishingUtility.UnpublishItems(InnerItem, dbs);
            }


        }

    }
}