using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using System.Web;
using Thread.Feature.Multimedia.Services;
using Thread.Foundation.Mvc.ViewModels;

namespace Thread.Feature.Multimedia.Models
{
  public class VideoModel : ThreadViewModel<VideoItem, VideoParameters>
  {
    private readonly IVideoService _videoService;

    public VideoModel(IVideoService videoService)
    {
      _videoService = videoService;
    }

    public virtual string YouTubeId => _videoService.GetVideoIdFromURL(this?.Datasource?.Video?.GetFriendlyUrl());

    public virtual string ReactData => _videoService.GetReactData(this.Datasource, this.RenderingParameters);

    public bool IsValidVideo => !string.IsNullOrEmpty(YouTubeId);
  }
}