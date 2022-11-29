using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Dynamic;
using System.IO;
using System.Text.RegularExpressions;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Newtonsoft.Json;
using Sitecore.Data.Fields;
using Sitecore.Diagnostics;
using Sitecore.Resources.Media;
using AtriusHealth.Foundation.Dictionary.Repositories;
using AtriusHealth.Foundation.ResponsiveImages.Extensions;

namespace AtriusHealth.Feature.Multimedia.Services
{
  [AutowireService(LifetimeScope.SingleInstance)]
  public class YouTubeVideoService : IVideoService
  {
 
    /// <summary>
    /// See: https://regex101.com/r/7CxmJP/8  This RegEx is well documented with acceptance tests.
    /// It requires URLs to be links beginning with http://, https://, or //
    /// </summary> 
    /// <remarks>
    /// The acceptance tests look very robust, but there was one URL that appeared to be mishandled:
    /// http://www.youtube.com/watch?v=-wtIMTCHWuI/vi/XNHjiJVz0ks
    /// The regex identifies "XNHjiJVz0ks" as the code, but YouTube recognizes "-wtIMTCHWuI" as the video. 
    /// That format does not appear to be a meaningful YouTube URL (and is not included on this list,
    /// https://gist.github.com/rodrigoborgesdeoliveira/987683cfbfcc8d800192da1e73adc486) so
    /// this seems outweighed by the benefit that a wide range of formats are recognized, making it
    /// easy for authors to paste URLs. 
    /// </remarks>
    private static readonly string PatternToGetIdFromUrl = @"(?:http:|https:)*?\/\/(?:www\.|)(?:youtube\.com|m\.youtube\.com|youtu\.|youtube-nocookie\.com).*(?:v=|v%3D|v\/|(?:a|p)\/(?:a|u)\/\d.*\/|watch\?|vi(?:=|\/)|\/embed\/|oembed\?|be\/|e\/)([^&?%#\/\n]*)";

    private static readonly Regex RegexToGetIdFromUrl = new Regex(PatternToGetIdFromUrl, RegexOptions.Compiled);

    private static readonly string VideoIdPattern = "[0-9a-zA-Z\\-_]{11}";

    private static readonly Regex IdRegex = new Regex(VideoIdPattern, RegexOptions.Compiled);

    public virtual string GetVideoIdFromURL(string input)
    {
      if (input == null)
      {
        return string.Empty;
      }

      var urlMatch = RegexToGetIdFromUrl.Match(input);
      // Groups[0] contains the whole matching string, Groups[1] the ID
      if (urlMatch.Success && urlMatch.Groups.Count >= 2)
      {
        return urlMatch.Groups[1].Value;
      }

      var idMatch = IdRegex.Match(input);
      return idMatch.Success ? idMatch.Value : string.Empty;
    }

    public string GetReactData(VideoItem videoItem, VideoParameters renderingParameters)
    {
      Assert.ArgumentNotNull(videoItem, nameof(videoItem));

      dynamic data = new ExpandoObject();
      data.id = this.GetVideoIdFromURL(videoItem.Video.GetFriendlyUrl());
      data.darkButton = renderingParameters.DarkPlayIcon;

      if (!string.IsNullOrEmpty(videoItem.Caption?.Value))
      {
        data.caption = videoItem.Caption.Value;
      }

      if (!string.IsNullOrEmpty(videoItem.Title?.Value))
      {
        data.title = videoItem.Title.Value;
      }

      if (videoItem.Image?.MediaItem != null)
      {
        data.poster = GetPoster(videoItem.Image);
      }

      if (videoItem.Transcript?.MediaItem != null)
      {
        data.transcriptLink = GetTranscriptLink(videoItem.Transcript, videoItem.Title?.Value);
      }

      StringWriter stringWriter = new StringWriter();
      new JsonSerializer().Serialize(new JsonTextWriter(stringWriter), data);
      return stringWriter.ToString();
    }

    private dynamic GetPoster(ImageField videoItemImage)
    {
      dynamic poster = new ExpandoObject();
      poster.alt = videoItemImage.Alt;
      poster.srcset = videoItemImage.GetSrcSetWidths();
      return poster;
    }

    private dynamic GetTranscriptLink(FileField videoItemTranscript, string title)
    {
      dynamic transcriptLink = new ExpandoObject();
      transcriptLink.href = MediaManager.GetMediaUrl(videoItemTranscript.MediaItem);
      transcriptLink.text = Dictionary.Current.Get("Multimedia.Video.DownloadText");
      if (!string.IsNullOrEmpty(title))
      {
        transcriptLink.title = string.Format(Dictionary.Current.Get("Multimedia.Video.DownloadTitle"), title); 
      }

      return transcriptLink;
    }
  }
}
