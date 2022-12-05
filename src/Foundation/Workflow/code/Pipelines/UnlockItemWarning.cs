using Sitecore.Pipelines.GetContentEditorWarnings;
using Sitecore;
using Sitecore.Data.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.Globalization;
using Sitecore.Configuration;
using Sitecore.Data.Managers;

namespace AtriusHealth.Foundation.Workflow.Pipelines
{
    public class UnlockItemWarning
    {
        public void Process(GetContentEditorWarningsArgs args)
        {
            Item obj = args.Item;
            if (obj == null)
                return;
            if (Context.IsAdministrator)
            {
                if (!obj.Locking.IsLocked() || string.Compare(obj.Locking.GetOwner(), Context.User.Name, StringComparison.InvariantCultureIgnoreCase) == 0)
                    return;
                args.Add(Translate.Text("'{0}' has locked this item.", (object)obj.Locking.GetOwnerWithoutDomain()), string.Empty);
            }
            else if (obj.Locking.IsLocked())
            {
                if (obj.Locking.HasLock())
                    return;
                if (Sitecore.Context.User.IsInRole(@"sitecore\Sitecore Content Publisher"))
                {
                    GetContentEditorWarningsArgs.ContentEditorWarning unlockContentEditorWarning = args.Add();
                    unlockContentEditorWarning.Title = Translate.Text("'{0}' has locked this item.", (object)obj.Locking.GetOwnerWithoutDomain());
                    unlockContentEditorWarning.AddOption(Translate.Text("Check In"), "AtriusHealth:unlockitem");
                }
                else
                {
                    args.Add(Translate.Text("You cannot edit this item because '{0}' has locked it.", (object)obj.Locking.GetOwnerWithoutDomain()), string.Empty);
                }
            }
            else
            {
                if (!Settings.RequireLockBeforeEditing || !TemplateManager.IsFieldPartOfTemplate(FieldIDs.Lock, obj))
                    return;
                GetContentEditorWarningsArgs.ContentEditorWarning contentEditorWarning = args.Add();
                contentEditorWarning.Title = Translate.Text("You must lock this item before you can edit it.");
                contentEditorWarning.Text = Translate.Text("To lock this item, click Edit on the Home tab.");
                contentEditorWarning.AddOption(Translate.Text("Lock and Edit"), "item:checkout");
            }
        }

    }
}
