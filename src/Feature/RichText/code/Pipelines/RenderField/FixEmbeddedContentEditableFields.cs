using System.Text.RegularExpressions;
using Sitecore.Pipelines.RenderField;

namespace AtriusHealth.Feature.RichText.Pipelines.RenderField
{
	public class FixEmbeddedContentEditableFields
	{
		public void Process(RenderFieldArgs args)
		{
			if (!Sitecore.Context.PageMode.IsExperienceEditor) return;

			if (!args.FieldTypeKey.Contains("text")) return;

			var match = Regex.Match(args.Result.FirstPart, "<span[^>]*contenteditable=\"true\"[^>]*class=\"scWebEditInput[^>]*>", RegexOptions.IgnoreCase);

			if (match.Success)
			{
				args.Result.FirstPart = $"<span contenteditable=\"false\">{args.Result.FirstPart}";
				args.Result.LastPart = $"{args.Result.LastPart}</span>";
			}
		}
	}
}
