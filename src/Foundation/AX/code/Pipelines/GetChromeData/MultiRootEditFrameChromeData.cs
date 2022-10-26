using System;
using System.Collections.Generic;
using Sitecore;
using Sitecore.Abstractions;
using Sitecore.Configuration;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Pipelines.GetChromeData;

namespace Thread.Foundation.AX.Pipelines.GetChromeData
{
    public class MultiRootEditFrameChromeData : GetEditFrameChromeData
    {
        public MultiRootEditFrameChromeData(BaseClient client, BaseSettings settings) : base(client, settings) { }

        public override void Process(GetChromeDataArgs args)
        {
            Assert.ArgumentNotNull(args, "args");
            Assert.IsNotNull(args.ChromeData, "Chrome Data");

            if (!"editFrame".Equals(args.ChromeType, StringComparison.OrdinalIgnoreCase))
            {
                // Don't do anything for non-editFrame chrome requests.
                return;
            }

            Database database = Factory.GetDatabase("core");
            Assert.IsNotNull(database, "core");

            // args.CustomData["buttonsPath] is populated by the EditFrame
            string buttonPaths = StringUtil.GetString(args.CustomData["buttonsPath"], Settings.WebEdit.DefaultButtonPath);
            List<WebEditButton> buttons = new List<WebEditButton>();

            foreach (string buttonPath in buttonPaths.Split(new[] { '|' }, StringSplitOptions.RemoveEmptyEntries))
            {
                string path = buttonPath;
                if (!ID.IsID(path) && !path.StartsWith("/"))
                {
                    // Allow button paths to be relative to the edit frame button root
                    path = "/sitecore/content/Applications/WebEdit/Edit Frame Buttons/" + path;
                }

                Item item = database.GetItem(path);
                Assert.IsNotNull(item, "buttonRoot does not exist for edit frame");

                buttons.AddRange(GetButtons(item));
            }

            // Title can be set by the edit frame, so only do this if one hasn't been set
            args.ChromeData.DisplayName = StringUtil.GetString(new[] { args.ChromeData.DisplayName, "Page Area" });
            AddButtonsToChromeData(buttons, args);
        }
    }
}