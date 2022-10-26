using System.Linq;
using Sitecore.Pipelines.RenderField;
using Thread.Feature.RichText.Extensions;
using Thread.Feature.RichText.Reference;

namespace Thread.Feature.RichText.Pipelines.RenderField
{
	public class TokenReplacer
	{
		public void Process(RenderFieldArgs args)
		{
			if (Sitecore.Context.PageMode.IsExperienceEditor) return;

			if (args.FieldTypeKey != "single-line text" && args.FieldTypeKey != "rich text") return;

			string text = args.Result.FirstPart.Trim();
			if (string.IsNullOrEmpty(text)) return;
			
			text = Constants.Tokens.All.Aggregate(text, (current, token) => current.Replace(token));

			args.Result.FirstPart = text;
		}
	}
}