using System.Text.RegularExpressions;
using Sitecore.Mvc.Helpers;
using Sitecore.Mvc.Presentation;
using Sitecore.Pipelines.RenderField;
using Thread.Feature.RichText.Reference;

namespace Thread.Feature.RichText.Pipelines.RenderField
{
    public class RenderPlaceholder
    {
        public void Process(RenderFieldArgs args)
        {
            if (args.FieldTypeKey != "rich text") return;

            if (RenderingContext.CurrentOrNull == null) return;

            string text = args.Result.FirstPart.Trim();
            if (!string.IsNullOrEmpty(text))
            {
                var regex = new Regex(string.Format(Constants.Placeholder.ExperienceEditorFormat, "(rich-text__embed[^\"]*?)", "###PLACEHOLDER###"));
                MatchCollection matches = regex.Matches(text);

                int count = 0;
                foreach (Match match in matches)
                {
                    string placeholder = new SitecoreHelper(RenderingContext.Current.PageContext.HtmlHelper).DynamicPlaceholder("rich-text", seed: count++).ToString();

                    string placeholderHtmlFormat = Sitecore.Context.PageMode.IsExperienceEditor ? Constants.Placeholder.ExperienceEditorFormat : Constants.Placeholder.StandardFormat;
                    text = regex.Replace(text, string.Format(placeholderHtmlFormat, match.Groups[1].Value, placeholder), 1);
                }
            }

            args.Result.FirstPart = text;
        }
    }
}