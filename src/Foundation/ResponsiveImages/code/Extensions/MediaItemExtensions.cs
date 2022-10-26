using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sitecore;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.ImageCropper.CustomItems.Media.Unversioned;
using Thread.Foundation.SitecoreExtensions.Item;
using Velir.Utilities.Extensions.System.Collections.Generic;

namespace Thread.Foundation.ResponsiveImages.Extensions
{
	public static class MediaItemExtensions
	{
		public static string GetSrcSet(this ImageField field, int width = 0, int height = 0)
		{
			if (field == null) return null;

			return GetSrcSet(field.MediaItem, width, height);
		}

		[Obsolete("Incorrectly doubles size of base image.")]
		public static string GetSrcSet(this MediaItem mediaItem, int width = 0, int height = 0)
		{
			if (mediaItem == null) return null;

			var imageWidth = MainUtil.GetInt(mediaItem.InnerItem["Width"], 0);
			var imageHeight = MainUtil.GetInt(mediaItem.InnerItem["Height"], 0);
			
			int width1x = width > 0 ? width : imageWidth / 2;
			int width2x = width > 0 ? width * 2 : imageWidth;

			int height2x = height == 0 ? 0 : height * 2;

			var sizes = new List<string> { $"{mediaItem.GetSrc(width1x, height)} 1x" };

			if (width2x <= imageWidth && height2x <= imageHeight)
			{
				sizes.Add($"{mediaItem.GetSrc(width2x, height2x)} 2x");
			}

			return string.Join(", ", sizes);
		}

		/// <summary>
		/// Get SrcSet string using a list of widths (in pixels).
		/// If image is smaller than largest width, then largest value is image value, followed by all values that are
		/// smaller than the image width.
    /// </summary>
		/// <param name="mediaItem"></param>
		/// <param name="widths">If no value passed, defaults to 3200 down to 400 by 400.</param>
    /// <returns>SrcSet string, e.g. "path/to/image.jpg 3200w, path/to/image2.jpg 2800w (etc.)</returns> 
    public static string GetSrcSetWidths(this MediaItem mediaItem, params int[] widths)
    {
      if (widths.Length == 0)
      {
        widths = new[] { 3200, 2800, 2400, 2000, 1600, 1200, 800, 400 };
      }

      widths = widths.OrderByDescending(i => i).ToArray();

      var imageWidth = MainUtil.GetInt(mediaItem.InnerItem["Width"], 0);

      if (imageWidth < widths[0])
      {
        var newWidths = new List<int> { imageWidth };
        newWidths.AddRange(widths.Where(w => w < imageWidth));
        widths = newWidths.ToArray();
      }

      var outputElements = new List<string>();
      foreach (int width in widths)
      {
        outputElements.Add($"{mediaItem.GetSrc(width)} {width}w");
      }

      return string.Join(", ", outputElements);
    }

		/// <summary>
		/// Get SrcSet string using a list of widths (in pixels).
    /// If image is smaller than largest width, then largest value is image value, followed by all values that are
    /// smaller than the image width.
		/// </summary>
		/// <param name="imageField"></param>
    /// <param name="widths">If no value passed, defaults to 3200 down to 400 by 400.</param>
    /// <returns>SrcSet string, e.g. "path/to/image.jpg 3200w, path/to/image2.jpg 2800w (etc.)</returns> 
    public static string GetSrcSetWidths(this ImageField imageField, params int[] widths)
    {
      return GetSrcSetWidths(imageField.MediaItem, widths);
    }
	}
}
