using NSubstitute;
using NUnit.Framework;
using Sitecore.Mvc.Presentation;
using Thread.Feature.Metadata.Controllers;
using Thread.Feature.Metadata.Services;
using Thread.Foundation.Multisite.Configuration;

namespace Thread.Feature.Metadata.Tests.Controllers
{
	[TestFixture]
	public class MetadataControllerTests
	{
		private MetadataController _controller;

		[SetUp]
		public void Setup()
		{
			_controller = new MetadataController(Substitute.For<IMetadataService>())
			{
				Rendering = Substitute.For<Rendering>(),
				SitecoreConfigManager = Substitute.For<ISitecoreConfigurationManager>(),
				PageContext = Substitute.For<PageContext>()
			};
		}

		[Test]
		public void HtmlPageTitle_NullContextItem_DoesNotThrow()
		{
			Assert.DoesNotThrow(() => _controller.HtmlPageTitle());
		}

		[Test]
		public void Metadata_NullContextItem_DoesNotThrow()
		{
			Assert.DoesNotThrow(() => _controller.Metadata());
		}

		[Test]
		public void CustomHeadHtml_NullContextItem_DoesNotThrow()
		{
			Assert.DoesNotThrow(() => _controller.CustomHeadHtml());
		}
	}
}
