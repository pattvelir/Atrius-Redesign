using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using Sitecore.Mvc.Helpers;
using System.Web;
using HtmlAgilityPack;
using Mvp.Xml.Common.Xsl;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Pipelines.RenderField;
using Sitecore.SharedSource.Commons.Utilities.MediaLibrary;
using Thread.Foundation.ResponsiveImages.Extensions.Markers;
using Thread.Foundation.SitecoreExtensions.Item;

namespace Thread.Foundation.ResponsiveImages.Extensions
{
  public static class SitecoreHelperExtensions
  {
    private static LogOwner owner = new LogOwner();

    // For "owner" member of log API, so that logging by namespace works.  
    public class LogOwner
    {
    }

    /// <summary>
    /// Render image with 1x, 2x srcset
    /// </summary>
    /// <param name="helper"></param>
    /// <param name="imageField"></param>
    /// <param name="ssw">Wrapper object for 1x width</param>
    /// <returns></returns>
    public static HtmlString Field(this SitecoreHelper helper, ImageField imageField, SrcSet1x2x ssw)
    {
      if (Sitecore.Context.PageMode.IsExperienceEditorEditing)
      {
        return Mvc.Extensions.SitecoreHelperExtensions.Field(helper, imageField, new { mw = ssw.Width1X });
      }

      MediaItem mediaItem = imageField.MediaItem;
      if (mediaItem == null)
      {
        Sitecore.Diagnostics.Log.Warn(
          $"While rendering {Sitecore.Context.Item.Paths.Path} an invalid image item was encountered (MediaItem is not of type \"MediaItem\". No image rendered.",
          owner);
        return new HtmlString(string.Empty);
      }

      int width1x = ssw.Width1X;
      int width2x = ssw.Width1X * 2;

      if (int.TryParse(mediaItem.InnerItem["Width"], out int imageWidth))
      {
        bool is1xValid = imageWidth >= width1x;
        bool is2xValid = imageWidth >= width2x;

        string srcSet1 = mediaItem.GetSrc(is1xValid ? ssw.Width1X : imageWidth);
        string srcSet2 = mediaItem.GetSrc(ssw.Width1X * 2);
        string srcSet = is2xValid ? $"{srcSet1} 1x, {srcSet2} 2x" : $"{srcSet1} 1x";

        return new HtmlString($"<img srcset='{srcSet}' alt='{mediaItem.Alt}' />");
      }
      else
      {
        Sitecore.Diagnostics.Log.Warn(
          $"While rendering {Sitecore.Context.Item.Paths.Path} an invalid image item was encountered (no \"Width\" field). No image rendered.",
          owner);
        return new HtmlString(string.Empty);
      }
      // Return empty string because invalid image field.
    }


    
    public static HtmlString Field(this SitecoreHelper helper, ImageField imageField, SrcSetList srcSetList)
    {
      return Field(helper, imageField, srcSetList, new object());
    }


    public static HtmlString Field(this SitecoreHelper helper, ImageField imageField, SrcSetList srcSetList,
      object parameters)
    {
      if (Sitecore.Context.PageMode.IsExperienceEditorEditing)
      {
        return Mvc.Extensions.SitecoreHelperExtensions.Field(helper, imageField, parameters);
      }

      MediaItem mediaItem = imageField.MediaItem;
      if (mediaItem == null)
      {
        Sitecore.Diagnostics.Log.Warn(
          $"While rendering {Sitecore.Context.Item.Paths.Path} an invalid image item was encountered (MediaItem is not of type \"MediaItem\". No image rendered.",
          owner);
        return new HtmlString(string.Empty);
      }

      HtmlString baseMarkup = Mvc.Extensions.SitecoreHelperExtensions.Field(helper, imageField, parameters);

      var doc = new HtmlDocument();
      doc.LoadHtml(baseMarkup.ToString());
      var element = doc.DocumentNode.SelectSingleNode("/img");
      element.Attributes.Remove("src");
      element.Attributes.Add("srcset", imageField.GetSrcSetWidths(srcSetList.Widths));
      return new HtmlString(element.OuterHtml);
    }
  }
}