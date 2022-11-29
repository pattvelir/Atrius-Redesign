using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Sitecore;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.SecurityModel;
using AtriusHealth.Foundation.Workflow.References;
using Constants = AtriusHealth.Foundation.Workflow.References.Constants;

namespace AtriusHealth.Foundation.Workflow.Services
{
    public class TaskService
    {
        public void CreatePublishSchedule(Item item)
        {
            Assert.IsNotNull((object)item, string.Format("{0}.CreatePublishSchedule: item is null", (object)this.GetType()));
            Log.Info(string.Format("{0}.CreatePublishSchedule start - item:{1}", (object)this.GetType(), (object)item.ID), (object)this);
            if (item.Publishing.PublishDate != DateTime.MinValue)
                this.CreateScheduleItem(item, string.Format("{0}_AutoPublish", (object)item.ID.ToShortID()), Sitecore.DateUtil.ToServerTime(item.Publishing.PublishDate));
            if (!(item.Publishing.UnpublishDate != DateTime.MaxValue))
                return;
            this.CreateScheduleItem(item, string.Format("{0}_AutoUnpublish", (object)item.ID.ToShortID()), Sitecore.DateUtil.ToServerTime(item.Publishing.UnpublishDate));
        }

        private void CreateScheduleItem(Item item, string itemName, DateTime startDate)
        {
            Log.Info(string.Format("{0}.CreateScheduleItem start - itemName:{1}", (object)this.GetType(), (object)itemName), (object)this);
            using (new SecurityDisabler())
            {
                try
                {
                    var autoPublishCommand = item.Database.GetItem(Constants.AutoPublishCommandPath);

                    Assert.IsNotNull(autoPublishCommand, "command not found");

                    Item ScheduleFolder = item.Database.GetItem(Constants.SchedulesFolder);
                    Item ScheduleItem = ((IEnumerable<Item>)ScheduleFolder.Axes.GetDescendants()).FirstOrDefault<Item>((Func<Item, bool>)(x => x.Name == itemName)) ?? ScheduleFolder.Add(itemName, new TemplateID(TemplateIDs.Schedule));

                    using (new EditContext(ScheduleItem, true, false))
                    {
                        ScheduleItem[Constants.Command] = autoPublishCommand.ID.ToString();

                        ScheduleItem[Constants.Schedule] = string.Format("{0:yyyyMMddTHHmmss}|{1:yyyyMMddTHHmmss}|127|00:01:00", (object)startDate, (object)startDate.AddHours(1.0));
                        ScheduleItem[Constants.LastRun] = DateUtil.ToIsoDate(startDate);


                        ScheduleItem[Constants.Items] = item.ID.ToString();
                    }
                }
                catch (Exception e)
                {
                    Log.Error("Error Creating Task in Automated Publisher", e, this);

                }
            }

            Log.Info(string.Format("{0}.CreateScheduleItem start - finished", (object)this.GetType()), (object)this);
        }
    }
}
