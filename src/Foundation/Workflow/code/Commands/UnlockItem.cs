using Sitecore;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.SecurityModel;
using Sitecore.Shell.Framework.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Thread.Foundation.Workflow.Commands
{
    public class UnlockItem : Command
    {
        /// <summary>
        /// Executes the command in the specified context.
        /// </summary>
        /// <param name="context">The context.</param>
        public override void Execute(CommandContext context)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {
            Item item = context.Items[0];
            if (item.Access.CanWriteLanguage() && item.Locking.IsLocked())
            {
                Log.Audit(this, "Check in: {0}", new[] { AuditFormatter.FormatItem(item) });
                using (new SecurityDisabler())
                {
                    item.Editing.BeginEdit();
                    item.Locking.Unlock();
                    item.Editing.EndEdit();
                }
                Context.ClientPage.SendMessage(this, "item:checkedin");
            }
        }

        /// <summary>
        /// Queries the state of the command.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <returns>The state of the command.</returns>
        public override CommandState QueryState(CommandContext context)
        {
            Item item = context.Items[0];
            if (item.Access.CanWriteLanguage() && item.Locking.IsLocked() && !item.Locking.HasLock() && !Context.IsAdministrator && Context.User.IsInRole(@"sitecore\Pew Publisher"))
            {
                return CommandState.Enabled;
            }
            return CommandState.Hidden;
        }
    }
}