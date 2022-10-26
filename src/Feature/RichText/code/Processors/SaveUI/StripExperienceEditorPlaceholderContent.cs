using System;
using System.Linq;
using HtmlAgilityPack;
using Sitecore.Pipelines.Save;

namespace Thread.Feature.RichText.Processors.SaveUI
{
    public class StripExperienceEditorPlaceholderContent
    {
        public void Process(SaveArgs args)
        {
            var fields = args.Items.SelectMany(i => i.Fields);

            foreach (SaveArgs.SaveField saveField in fields)
            {
                if (string.IsNullOrEmpty(saveField.Value)) continue;

                var doc = new HtmlDocument();
                doc.LoadHtml(saveField.Value);

                var placeholders = doc.DocumentNode.Descendants("div")
                    .Where(x => x.Attributes["class"]?.Value.IndexOf("rich-text__embed",
                                    StringComparison.CurrentCultureIgnoreCase) >= 0);

                if (placeholders.Any())
                {
                    foreach (var placeholder in placeholders)
                    {
                        placeholder.InnerHtml = "###PLACEHOLDER###";
                    }

                    StripExcessPlaceholderStyles(doc);

                    saveField.Value = doc.DocumentNode.InnerHtml;
                }
            }
        }

        private void StripExcessPlaceholderStyles(HtmlDocument document)
        {
            var pTags = document.DocumentNode.Descendants("p")
                .Where(x => x.Attributes["class"]?.Value.IndexOf("rich-text__embed",
                                StringComparison.CurrentCultureIgnoreCase) >= 0);

            foreach (var pTag in pTags)
            {
                var cssClass = pTag.Attributes["class"].Value;
                pTag.Attributes["class"].Value = cssClass.Replace("l-pull-right", string.Empty)
                    .Replace("l-pull-left", string.Empty)
                    .Replace("l-rte-full", string.Empty)
                    .Replace("rich-text__embed", string.Empty);
            }
        }
    }
}