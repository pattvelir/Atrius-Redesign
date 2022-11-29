using System.Linq;
using HtmlAgilityPack;
using Sitecore.Pipelines.RenderField;

namespace AtriusHealth.Foundation.ResponsiveImages.Pipelines.RenderField
{
	public class RemoveImageSizeAttributes
	{
		public void Process(RenderFieldArgs args)
		{
			if (args.FieldTypeKey != "image") return;

			HtmlDocument doc = new HtmlDocument();
			doc.LoadHtml(args.Result.FirstPart);

			var imgNode = doc.DocumentNode.ChildNodes.FirstOrDefault();

			if (imgNode == null) return;

			imgNode.Attributes.Remove("width");
			imgNode.Attributes.Remove("height");

			args.Result.FirstPart = doc.DocumentNode.OuterHtml;
		}
	}
}
