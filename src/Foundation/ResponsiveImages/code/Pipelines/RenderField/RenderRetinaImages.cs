using System;
using System.Linq;
using HtmlAgilityPack;
using Sitecore.Data.Fields;
using Sitecore.Data.ItemResolvers;
using Sitecore.Data.Items;
using Sitecore.Pipelines.RenderField;
using Sitecore.Resources.Media;
using AtriusHealth.Foundation.ResponsiveImages.Extensions;

namespace AtriusHealth.Foundation.ResponsiveImages.Pipelines.RenderField
{
	public class RenderRetinaImages
	{
		protected ItemPathResolver PathResolver = new ItemPathResolver();
		protected Item MediaLibraryItem { get; set; }

		public void Process(RenderFieldArgs args)
		{
			switch (args.FieldTypeKey)
			{
				case "rich text":
					MediaLibraryItem = args.Item.Database.GetItem("/sitecore/media library");
					args.Result.FirstPart = AddSrcSets(args.Result.FirstPart, 0, 0);
					return;
				case "image":
					args.Parameters.Add("srcset", GetSrcSet(args));
					return;
			}
		}

		private string GetSrcSet(RenderFieldArgs args)
		{
			var width = args.Parameters.GetWidth();
			var height = args.Parameters.GetHeight();

			ImageField imageField = args.GetField();

			return imageField?.GetSrcSet(width, height) ?? string.Empty;
		}

		private string AddSrcSets(string rendered, int width, int height)
		{
			// get the rendered image
			var document = new HtmlDocument();
			document.LoadHtml(rendered);

			var images = document.DocumentNode.Descendants("img").Where(img => string.IsNullOrEmpty(img.GetAttributeValue("srcset", null)));

			foreach (HtmlNode imageNode in images)
			{
				var src = imageNode.GetAttributeValue("src", string.Empty);

				string img = src?.Split('.').FirstOrDefault();

				if (string.IsNullOrEmpty(img)) continue;

				foreach (string str in MediaManager.Config.MediaPrefixes)
				{
					// find if this link is a media item request
					int i = img.IndexOf(str, StringComparison.InvariantCultureIgnoreCase);

					if (i <= 0) continue;

					// if it is, move over the media prefix
					string path = img.Substring(i + str.Length);

					// use the item resolver to resolve under the media library
					Item item = PathResolver.ResolveItem(path, MediaLibraryItem);

					if (item == null) continue;

					MediaItem mediaItem = new MediaItem(item);

					if (width == 0 && height == 0)
					{
						width = imageNode.GetAttributeValue("width", 0);
						height = imageNode.GetAttributeValue("height", 0);
					}

					string srcset = mediaItem.GetSrcSet(width, height);
					if (!string.IsNullOrEmpty(srcset))
					{
						imageNode.SetAttributeValue("srcset", srcset);
					}
					if (imageNode.Attributes.Contains("width"))
					{
						imageNode.Attributes["width"].Remove();
					}
					if (imageNode.Attributes.Contains("height"))
					{
						imageNode.Attributes["height"].Remove();
					}
				}
			}

			return document.DocumentNode.OuterHtml;
		}
	}
}
