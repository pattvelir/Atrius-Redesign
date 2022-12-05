using System.Web;

namespace AtriusHealth.Feature.Multimedia.Services
{
  public interface IVideoService
  {
    string GetVideoIdFromURL(string input);

    string GetReactData(VideoItem videoItem, VideoParameters renderingParameters);
  }
}
