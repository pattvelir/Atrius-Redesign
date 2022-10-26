using System;
using System.Collections.Generic;
using Sitecore;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.Publishing;
using Sitecore.SecurityModel;
using Sitecore.Tasks;
using Sitecore.Workflows;
using Thread.Foundation.Workflow.Publishing;
using Thread.Foundation.Workflow.References;
using Thread.Foundation.Workflow.Services;
using Constants = Thread.Foundation.Workflow.References.Constants;

namespace Thread.Foundation.Workflow.Commands
{
    public class AutoPublish
    {
        public void Run(Item[] items, CommandItem command, ScheduleItem schedule)
        {
            var workflowService = new WorkflowService();
            Log.Info(string.Format("{0}.Run start", (object)this.GetType()), (object)this);
            if (schedule.Items.Length == 0)
            {
                Log.Error(string.Format("{0}.Run - no items to publish", (object)this.GetType()), (object)this);
            }
            else
            {
                Item currentItem = schedule.Items[0];
                Database webDatabase = Databases.Web;
                if (webDatabase == null)
                {
                    Log.Error(string.Format("{0}.Run - web database not found", (object)this.GetType()), (object)this);
                }
                else
                {
                    try
                    {
                        WorkflowState state = currentItem?.Database?.WorkflowProvider?.GetWorkflow(currentItem)?.GetState(currentItem);
                        if (state == null)
                            return;
                        Log.Info(string.Format("{0}.Run - Item: {1}, WorkflowState: {2}", (object)this.GetType(), (object)currentItem.ID, (object)state.DisplayName), (object)this);
                        if (!state.FinalState && state.StateID != Constants.Workflow.States.ScheduledStateId)
                            return;
                        if (state.StateID == Constants.Workflow.States.ScheduledStateId)
                            workflowService.SetWorkflowState(currentItem, Constants.Workflow.States.PublishedStateId);
                        else if (state.StateID == Constants.Workflow.States.PublishedStateId)
                        {
                            PublishingUtility.UnpublishItems(currentItem, new Database[1]
                        {
              webDatabase
                        });
                            workflowService.SetWorkflowState(currentItem, Constants.Workflow.States.UnPublishedStateId);

                        }
                        PublishingUtility.SmartPublishItems(currentItem, new Database[1]
                        {
              webDatabase
                        });
                        Log.Info(string.Format("{0}.Run - Published Item: {1}", (object)this.GetType(), (object)currentItem.ID), (object)this);
                        schedule.Remove();
                    }
                    catch (Exception ex)
                    {
                        Log.Error(string.Format("{0}.Run - {1}", (object)this.GetType(), (object)ex.Message), ex, (object)this);
                    }
                }
            }
        }

    }
}