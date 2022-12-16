using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore;
using Sitecore.Common;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Publishing;
using Sitecore.SecurityModel;
using Sitecore.Shell.Applications.Dialogs.ProgressBoxes;
using AtriusHealth.Foundation.Workflow.References;
using Constants = AtriusHealth.Foundation.Workflow.References.Constants;

namespace AtriusHealth.Foundation.Workflow.Publishing
{
	public static class PublishingUtility
	{
		public static bool SmartPublishFromRoot(string id)
		{
			try
			{
				List<Database> targetDatabases = new List<Database>();
				if (Databases.Web != null)
				{
					targetDatabases.Add(Databases.Web);
				}

				Sitecore.Globalization.Language[] languages = Databases.Master.Languages;
				Item root = Databases.Master.GetItem(id);
				Handle h = PublishManager.PublishItem(root, targetDatabases.ToArray(), languages, true, true);

				PublishStatus p = PublishManager.GetStatus(h);
				while (!p.IsDone)
				{
                    System.Threading.Thread.Sleep(1000);
					p = PublishManager.GetStatus(h);
				}

				return true;
			}
			catch (Exception ex)
			{
				Sitecore.Diagnostics.Log.Error("Error smart publishing site - " + ex.Message, ex, typeof(PublishingUtility));
				return false;
			}
		}

        public static void UnpublishItems(Item currentItem, Database[] targetDatabases)
        {
            SetPublishing(currentItem,false);

            //Publish Inner Item
            if (Databases.Web != null)
            {
                SmartPublishItems(currentItem, targetDatabases);
            }

            SetPublishing(currentItem,true);

        }


        public static void SmartPublishItems(Item currentItem, Database[] targetDatabases, bool publishRelatedItems)
		{
			var languages = currentItem.Language.Name == "en"
				? new[] { currentItem.Language }
				: currentItem.Languages.Where(i => i.Name == currentItem.Language.Name || i.Name == "en").ToArray();

			using (new SecurityDisabler())
			{
				Handle h = PublishManager.PublishItem(currentItem, targetDatabases, languages, false, false, publishRelatedItems);
				PublishStatus p = PublishManager.GetStatus(h);
				while (!p.IsDone)
				{
                    System.Threading.Thread.Sleep(1000);
					p = PublishManager.GetStatus(h);
				}
			}
		}

		public static void SmartPublishItems(Item currentItem, Database[] targetDatabases)
		{
			SmartPublishItems(currentItem, targetDatabases, true);
		}


        public static void SetPublishing(Item item,bool allowed)
        {
            using (new SecurityDisabler())
            {
                item.Editing.BeginEdit();
                item.Publishing.NeverPublish = !allowed;
                item.Editing.EndEdit();
            }
        }

        public static void SmartPublishWithStatus(params object[] parameters)
		{
			var currentItem = (Item)parameters[0];
			var targetDatabase = (Database)parameters[1];

			PublishParentFolders(currentItem, targetDatabase);
			SmartPublishItems(currentItem, new[] { targetDatabase });
		}

		public static void PublishParentFolders(Item currentItem, Database targetDatabase)
		{
			List<Item> parentFolders = new List<Item>();
			parentFolders = GetParentFolders(currentItem, parentFolders);

			foreach (Item parentFolder in parentFolders)
			{
				SmartPublishItems(parentFolder, new[] { targetDatabase }, false);
			}
		}

		public static List<Item> GetParentFolders(Item currentItem, List<Item> parentFolders)
		{
			Item parent = currentItem.Parent;
			if (parent == null || !parent.DescendsFrom(Constants.TemplateIds.Folder.ToID()))
			{
				return parentFolders;
			}

			if (parent.Locking.IsLocked())
			{
				parent.Editing.BeginEdit();
				parent.Locking.Unlock();
				parent.Editing.EndEdit();
			}

			parentFolders.Insert(0, parent);
			return GetParentFolders(parent, parentFolders);
		}
	}
}
