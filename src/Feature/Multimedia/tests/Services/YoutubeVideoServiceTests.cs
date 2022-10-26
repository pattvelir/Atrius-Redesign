using System;
using System.Json;
using NSubstitute;
using NUnit.Framework;
using Sitecore.Data.Items;
using Sitecore.NSubstituteUtils;
using Thread.Feature.Multimedia.Services;

namespace Thread.Feature.Multimedia.Tests.Services
{

  public class YouTubeVideoServiceTests
  {

    public class GetVideoIdFromURL
    {

      [Test]
      public void PassedNullReturnsEmptyString()
      {
        var sut = new YouTubeVideoService();

        string actual = sut.GetVideoIdFromURL(null);
        string expected = String.Empty;

        Assert.AreEqual(expected, actual, "null");
      }

      [Test]
      public void PassedUrlReturnsId()
      {
        var sut = new YouTubeVideoService();

        string actual = sut.GetVideoIdFromURL("https://www.youtube.com/watch?v=m_KBvP0_8Tc");
        string expected = "m_KBvP0_8Tc";

        Assert.AreEqual(expected, actual, "url");
      }

      [Test]
      public void PassedShortenedUrlReturnsId()
      {
        var sut = new YouTubeVideoService();

        string actual = sut.GetVideoIdFromURL("http://youtu.be/afa-5HQHiAs");
        string expected = "afa-5HQHiAs";

        Assert.AreEqual(expected, actual, "short url");
      }

      [Test]
      public void PassedIdReturnsId()
      {
        var sut = new YouTubeVideoService();

        string actual = sut.GetVideoIdFromURL("m_KBvP0_8Tc");
        string expected = "m_KBvP0_8Tc";

        Assert.AreEqual(expected, actual, "id");
      }


    }

    public class GetReactData
    {

 
      //TODO Get this code to run. Requires adding various item dependencies, but can be used as a starting point for future unit tests.
      [Test, Ignore("Mock items requires more dependencies to be worked out.")]
      public void IncludesId()
      {
        var sut = new YouTubeVideoService();
        Item innerItem = new FakeItem().ToSitecoreItem();
        VideoItem vi = Substitute.For<VideoItem>(innerItem);

        sut.GetReactData(vi, null /* TODO */ );
      }
    }
  }
}
