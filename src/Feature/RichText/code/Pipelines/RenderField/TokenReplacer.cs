using System.Linq;
using Sitecore.Pipelines.RenderField;
using AtriusHealth.Feature.RichText.Extensions;
using AtriusHealth.Feature.RichText.Reference;

namespace AtriusHealth.Feature.RichText.Pipelines.RenderField
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
