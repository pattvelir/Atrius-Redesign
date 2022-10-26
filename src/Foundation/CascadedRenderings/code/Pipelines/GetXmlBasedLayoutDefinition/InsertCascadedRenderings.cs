using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Sitecore;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Layouts;
using Sitecore.Mvc.Devices;
using Sitecore.Mvc.Pipelines.Response.GetXmlBasedLayoutDefinition;
using Thread.Foundation.SitecoreExtensions.Base;
using Log = Sitecore.Diagnostics.Log;
using PageContext = Sitecore.Mvc.Presentation.PageContext;

namespace Thread.Foundation.CascadedRenderings.Pipelines.GetXmlBasedLayoutDefinition
{
    public class InsertCascadedRenderings : GetXmlBasedLayoutDefinitionProcessor
    {
        public override void Process(GetXmlBasedLayoutDefinitionArgs args)
        {
            if (args.Result == null) return;

            Item item = PageContext.Current.Item;
            Device device = PageContext.Current.Device;

            if (item?.Parent == null || device == null) return;

            args.Result = MergeWithCascadedRenderings(args.Result, item, device);

            Log.Debug($"The result of merge is:\n{args.Result}");
        }

        protected virtual XElement MergeWithCascadedRenderings(XElement self, Item currentItem, Device device)
        {
            LayoutDefinition selfParsed = LayoutDefinition.Parse(self.ToString());

            string deviceId = $"{{{device.Id.ToString().ToUpper()}}}";

            DeviceDefinition selfDevice = selfParsed.GetDevice(deviceId);

            var renderings = new List<RenderingDefinition>();
            foreach (var ancestor in currentItem.Axes.GetAncestors())
            {
                if (ancestor.Visualization.Layout == null) continue;

                renderings.AddRange(GetItemRenderingDefinitions(ancestor, deviceId));
            }

            foreach (var rendering in renderings)
            {
                selfDevice.AddRendering(rendering);
            }

            return XDocument.Parse(selfParsed.ToXml()).Root;
        }

        protected virtual IEnumerable<RenderingDefinition> GetItemRenderingDefinitions(Item item, string deviceId)
        {
            Field layoutField = item.Fields[FieldIDs.FinalLayoutField];

            LayoutDefinition parentParsed = LayoutDefinition.Parse(LayoutField.GetFieldValue(layoutField));

            DeviceDefinition parentDevice = parentParsed.GetDevice(deviceId);

            if (parentDevice.Renderings == null) return Enumerable.Empty<RenderingDefinition>(); // empty layout

            return parentDevice.Renderings.Cast<RenderingDefinition>()
                .Where(r => StringUtil.ExtractParameter("Cascade", r.Parameters ?? string.Empty) == "1")
                .ForEach(r => r.Parameters = $"{r.Parameters}&Editable=0");
        }
    }
}