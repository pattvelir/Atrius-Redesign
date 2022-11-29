using Sitecore;
using Sitecore.SecurityModel;
using Sitecore.Workflows.Simple;
using AtriusHealth.Foundation.Workflow.Services;

namespace AtriusHealth.Foundation.Workflow.Actions
{
    public class ScheduledPublishingAction :AbstractCustomWorkflowAction
    {
        protected override void Execute(WorkflowPipelineArgs args)
        {
            var hasPublish = args.CommentFields.ContainsKey(References.Constants.Workflow.PublishDateField);
            var publishValue = hasPublish ? args.CommentFields[References.Constants.Workflow.PublishDateField] : null;
            var hasUnpublish = args.CommentFields.ContainsKey(References.Constants.Workflow.UnPublishDateField);
            var unpublishValue = hasUnpublish ? args.CommentFields[References.Constants.Workflow.UnPublishDateField] : null;

            if (hasPublish || hasUnpublish)
            {
                using (new SecurityDisabler())
                {
                    InnerItem.Editing.BeginEdit();
                    if (!string.IsNullOrWhiteSpace(publishValue))
                        InnerItem[FieldIDs.PublishDate] = publishValue;
                    if (!string.IsNullOrWhiteSpace(unpublishValue))
                        InnerItem[FieldIDs.UnpublishDate] = unpublishValue;
                    InnerItem.Editing.EndEdit(false);
                }

                InnerItem.Database.Caches.ItemCache.RemoveItem(InnerItem.ID);
                TaskService taskBuilder = new TaskService();
                taskBuilder.CreatePublishSchedule(InnerItem);
            }

        }
    }
}
