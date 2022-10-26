using System.Web;

namespace Thread.Feature.Multimedia.Services
{
  public interface IVideoService
  {
    string GetVideoIdFromURL(string input);

    string GetReactData(VideoItem videoItem, VideoParameters renderingParameters);
  }
}