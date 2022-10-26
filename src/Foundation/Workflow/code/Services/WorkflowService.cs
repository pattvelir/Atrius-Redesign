using Sitecore;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.SecurityModel;

namespace Thread.Foundation.Workflow.Services
{
    public class WorkflowService
    {
        public void SetWorkflowState(Item item, string state)
        {
            Log.Info(string.Format("{0}.SetWorkflowState - item:{1} - state:{2}", (object)this.GetType(), (object)item.ID, (object)state), (object)this);
            using (new SecurityDisabler())
            {
                item.Editing.BeginEdit();
                item[References.Constants.WorkflowState] = state;
                item.Editing.EndEdit();
            }
            item.Database.Caches.ItemCache.RemoveItem(item.ID);
            Log.Info(string.Format("{0}.SetWorkflowState - finished", (object)this.GetType()), (object)this);
        }

        public void SetWorkflowAndState(Item item, string workflowStateId)
        {
            Log.Info(string.Format("{0}.SetWorkflowAndState - item:{1} - workflowStateId:{2}", (object)this.GetType(), (object)item.ID, (object)workflowStateId), (object)this);
            using (new SecurityDisabler())
            {
                item.Editing.BeginEdit();
                item[FieldIDs.Workflow] = References.Constants.Workflow.WorkflowId;
                item[FieldIDs.WorkflowState] = workflowStateId;
                item.Editing.EndEdit(true);
            }
            item.Database.Caches.ItemCache.RemoveItem(item.ID);
            Log.Info(string.Format("{0}.SetWorkflowAndState - finished", (object)this.GetType()), (object)this);
        }
    }
}