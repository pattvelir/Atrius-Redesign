using System.Web.UI;
using Sitecore;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.Security.AccessControl;
using Sitecore.Security.Accounts;
using Sitecore.Shell.Framework.CommandBuilders;
using Sitecore.Shell.Framework.Commands;
using Sitecore.Web.UI.WebControls.Ribbons;
using Sitecore.Workflows;

namespace Thread.Foundation.Workflow.Form
{
	public class CustomWorkflowPanel : Sitecore.Shell.Applications.ContentManager.Panels.WorkflowPanel
	{
		/// <summary>
		/// The _check in item.
		/// 
		/// </summary>
		private Item checkInItem;

		/// <summary>
		/// Renders the panel.
		/// 
		/// </summary>
		/// <param name="output">The output.
		///             </param><param name="ribbon">The ribbon.
		///             </param><param name="button">The button.
		///             </param><param name="context">The context.
		///             </param>
		public override void Render(HtmlTextWriter output, Ribbon ribbon, Item button, CommandContext context)
		{
			Assert.ArgumentNotNull((object)output, "output");
			Assert.ArgumentNotNull((object)ribbon, "ribbon");
			Assert.ArgumentNotNull((object)button, "button");
			Assert.ArgumentNotNull((object)context, "context");
			if (context.Items.Length < 1)
				return;
			Item obj = context.Items[0];
			if (!this.HasField(obj, FieldIDs.Workflow))
				return;
			IWorkflow workflow;
			WorkflowCommand[] commands;
			CustomWorkflowPanel.GetCommands(context.Items, out workflow, out commands);
			bool showCheckOutCommand = this.IsCommandEnabled("item:checkout", obj);
			bool showWorkflowCommands = CustomWorkflowPanel.CanShowCommands(obj, commands);
			bool showCheckInCommand = obj.Locking.IsLocked() && !obj.Locking.HasLock()  && Sitecore.Context.User.IsInRole(@"sitecore\Sitecore Content Publisher")?true: this.IsCommandEnabled("item:checkin", obj);
			this.RenderText(output, CustomWorkflowPanel.GetText(context.Items));
			if (workflow == null && !showCheckOutCommand && (!showWorkflowCommands && !showCheckInCommand))
				return;
			Context.ClientPage.ClientResponse.DisableOutput();
			ribbon.BeginSmallButtons(output);
			if (showCheckOutCommand)
				this.RenderSmallButton(output, ribbon, string.Empty, Translate.Text("Edit"), "Applications/24x24/document_edit.png", Translate.Text("Start editing this item."), "item:checkout", this.Enabled, false);
			if (showCheckInCommand)
			{
				Item checkInItem = this.GetCheckInItem();
				if (checkInItem != null)
					this.RenderSmallButton(output, ribbon, string.Empty, checkInItem["Header"], checkInItem["Icon"], Translate.Text("Check this item in."), "item:checkin(id=" + (object)obj.ID + ",language=" + obj.Language.Name + ",version=" + (object)obj.Version + ")", (this.Enabled ? 1 : 0) != 0, 0 != 0);
			}
			if (workflow != null)
				this.RenderSmallButton(output, ribbon, Sitecore.Web.UI.HtmlControls.Control.GetUniqueID("B"), Translate.Text("History"), "Applications/16x16/history.png", Translate.Text("Show the workflow history."), "item:workflowhistory", this.Enabled, false);
			if (showWorkflowCommands)
			{
				foreach (WorkflowCommand command in commands)
					this.RenderSmallButton(output, ribbon, string.Empty, command.DisplayName, command.Icon, command.DisplayName, new WorkflowCommandBuilder(obj, workflow, command).ToString(), this.Enabled, false);
			}
			ribbon.EndSmallButtons(output);
			Context.ClientPage.ClientResponse.EnableOutput();
		}

		/// <summary>
		/// Gets the commands.
		/// 
		/// </summary>
		/// <param name="items">The items to get commands for.
		///             </param><param name="workflow">The workflow.
		///             </param><param name="commands">The commands.
		///             </param>
		private static void GetCommands(Item[] items, out IWorkflow workflow, out WorkflowCommand[] commands)
		{
			Assert.ArgumentNotNull((object)items, "items");
			Item item = items[0];
			if (item != null)
			{
				IWorkflowProvider workflowProvider = Context.ContentDatabase.WorkflowProvider;
				if (workflowProvider != null && workflowProvider.GetWorkflows().Length > 0)
				{
					workflow = workflowProvider.GetWorkflow(item);
					if (workflow != null && workflow.GetState(item) != null)
					{
						commands = WorkflowFilterer.FilterVisibleCommands(workflow.GetCommands(item));
						return;
					}
				}
			}
			workflow = (IWorkflow)null;
			commands = (WorkflowCommand[])null;
		}

		/// <summary>
		/// Gets the text.
		/// 
		/// </summary>
		/// <param name="items">The items.
		///             </param>
		/// <returns>
		/// The get text.
		/// 
		/// </returns>
		private static string GetText(Item[] items)
		{
			Assert.ArgumentNotNull((object)items, "items");
			if (items.Length <= 0 || items.Length != 1)
				return string.Empty;
			Item obj = items[0];
			if (obj.Appearance.ReadOnly)
				return string.Empty;
			IWorkflow workflow = obj.State.GetWorkflow();
			WorkflowState workflowState = obj.State.GetWorkflowState();
			if (AuthorizationManager.IsAllowed((ISecurable)obj, AccessRight.ItemWrite, (Account)Context.User))
			{
				if (obj.Locking.HasLock())
					return Translate.Text("<b>You</b> have locked this item.");
				if (obj.Locking.IsLocked())
					return Translate.Text("<b>\"{0}\"</b> has locked this item.", (object)StringUtil.GetString(new string[2] { obj.Locking.GetOwnerWithoutDomain(), "?" }));
				if (obj.Locking.CanLock() && (workflow == null || workflowState == null))
					return Translate.Text("Click Edit to lock and edit this item.");
				if (obj.Locking.CanLock())
					return
							Translate.Text(
									"The item is in the <b>{0}</b> state<br/>in the <b>{1}</b> workflow. Click Edit to lock and edit this item.",
									(object)StringUtil.GetString(new string[2] { workflowState.DisplayName, "?" }),
									(object)StringUtil.GetString(new string[2] { workflow.Appearance.DisplayName, "?" }));
				if (workflow == null || workflowState == null)
					return Translate.Text("You do not have permission to<br/>edit the content of this item.");
				if (workflowState.FinalState)
					return Translate.Text("This item has been approved.");
				return Translate.Text("The item is in the <b>{0}</b> state<br/>in the <b>{1}</b> workflow.",
						(object)StringUtil.GetString(new string[2] { workflowState.DisplayName, "?" }),
						(object)StringUtil.GetString(new string[2] { workflow.Appearance.DisplayName, "?" }));
			}
			if (obj.Access.CanWrite() && (workflow == null || workflowState == null))
				return Translate.Text("Click Edit to lock and edit this item.");
			if (obj.Access.CanWrite())
				return
						Translate.Text(
								"The item is in the <b>{0}</b> state<br/>in the <b>{1}</b> workflow. Click Edit to lock and edit this item.",
								(object)StringUtil.GetString(new string[2] { workflowState.DisplayName, "?" }),
								(object)StringUtil.GetString(new string[2] { workflow.Appearance.DisplayName, "?" }));
			IWorkflow workflow1 = obj.State.GetWorkflow();
			WorkflowState workflowState1 = obj.State.GetWorkflowState();
			if (workflow1 == null || workflowState1 == null)
				return Translate.Text("You do not have permission to<br/>edit the content of this item.");
			if (workflowState1.FinalState)
				return Translate.Text("This item has been approved.");
			return Translate.Text("The item is in the <b>{0}</b> state<br/>in the <b>{1}</b> workflow.",
					(object)StringUtil.GetString(new string[2] { workflowState1.DisplayName, "?" }),
					(object)StringUtil.GetString(new string[2] { workflow1.Appearance.DisplayName, "?" }));
		}

		/// <summary>
		/// Determines whether this instance can show commands.
		/// 
		/// </summary>
		/// <param name="item">The item to check.
		///             </param><param name="commands">The commands.
		///             </param>
		/// <returns>
		/// <c>true</c> if this instance [can show commands] the specified item; otherwise, <c>false</c>.
		/// 
		/// </returns>
		public new static bool CanShowCommands(Item item, WorkflowCommand[] commands)
		{
			Assert.ArgumentNotNull((object)item, "item");
			return !item.Appearance.ReadOnly && commands != null && commands.Length > 0 &&
						 ((Context.IsAdministrator || item.Access.CanWriteLanguage() && (item.Locking.CanLock() || item.Locking.HasLock())) ||
							(item.State.GetWorkflowState().StateID == Foundation.Workflow.References.Constants.Workflow.States.AwaitingApprovalStateId && Sitecore.Context.User.IsInRole(@"sitecore\Sitecore Content Author")));
		}

		/// <summary>
		/// Gets the check in item.
		/// 
		/// </summary>
		/// 
		/// <returns>
		/// Check in workflow item
		/// 
		/// </returns>
		private Item GetCheckInItem()
		{
			if (this.checkInItem == null)
				this.checkInItem = Context.Database.Items["/sitecore/system/Settings/Workflow/Check In"];
			return this.checkInItem;
		}

		/// <summary>
		/// Determines whether command enabled for the specified item.
		/// 
		/// </summary>
		/// <param name="command">The command.
		///             </param><param name="item">The item to check.
		///             </param>
		/// <returns>
		/// <c>true</c> if [is command enabled] [the specified command]; otherwise, <c>false</c>.
		/// 
		/// </returns>
		private bool IsCommandEnabled(string command, Item item)
		{
			Assert.ArgumentNotNullOrEmpty(command, "command");
			Assert.ArgumentNotNull((object)item, "item");
			CommandState commandState = CommandManager.QueryState(command, item);
			if (commandState != CommandState.Down)
				return commandState == CommandState.Enabled;
			return true;
		}
	}
}
