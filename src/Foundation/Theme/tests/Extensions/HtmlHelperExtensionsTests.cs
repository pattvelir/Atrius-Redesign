using System.Web.Mvc;
using NSubstitute;
using NUnit.Framework;
using Thread.Foundation.Theme.Extensions;

namespace Thread.Foundation.Theme.Tests.Extensions
{
	[TestFixture]
	public class HtmlHelperExtensionsTests
	{
		private HtmlHelper _helper;

		[SetUp]
		public void SetUp()
		{
			_helper = new HtmlHelper(Substitute.For<ViewContext>(), Substitute.For<IViewDataContainer>());
		}

		[Test]
		public void RenderSvg_NullHelper_ReturnsEmptyString()
		{
			HtmlHelper helper = null;

			Assert.AreEqual(string.Empty, helper.RenderSvg("test").ToString());
		}

		[Test]
		public void RenderSvg_NullSpriteName_ReturnsEmptyString()
		{
			Assert.AreEqual(string.Empty, _helper.RenderSvg(null).ToString());
		}

		[Test]
		public void RenderSvg_JustSpriteName_ReturnsSvgTag()
		{
			Assert.AreEqual("<svg>\r\n\t<use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"/assets/-build/img/svg-sprite.svg#test\">\r\n\r\n\t</use>\r\n</svg>", _helper.RenderSvg("test").ToString());
		}

		[Test]
		public void RenderSvg_HasClassName_ReturnsSvgTagWithClass()
		{
			Assert.AreEqual("<svg class=\"icon\">\r\n\t<use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"/assets/-build/img/svg-sprite.svg#test\">\r\n\r\n\t</use>\r\n</svg>", _helper.RenderSvg("test").ToString());
		}

		[Test]
		public void RenderSvg_HasRole_ReturnsSvgTagWithRole()
		{
			Assert.AreEqual("<svg role=\"img\">\r\n\t<use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"/assets/-build/img/svg-sprite.svg#test\">\r\n\r\n\t</use>\r\n</svg>", _helper.RenderSvg("test", role: "img").ToString());
		}

		[Test]
		public void RenderSvg_HasAriaLabel_ReturnsSvgTagWithAriaLabel()
		{
			Assert.AreEqual("<svg aria-label=\"test icon\">\r\n\t<use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"/assets/-build/img/svg-sprite.svg#test\">\r\n\r\n\t</use>\r\n</svg>", _helper.RenderSvg("test", ariaLabel: "test icon").ToString());
		}

		[Test]
		public void RenderSvg_HasTitle_ReturnsSvgTagWithTitle()
		{
			Assert.AreEqual("<svg>\r\n\t<title>\r\n\t\ttest icon\r\n\t</title><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"/assets/-build/img/svg-sprite.svg#test\">\r\n\r\n\t</use>\r\n</svg>", _helper.RenderSvg("test", title: "test icon").ToString());
		}

		[Test]
		public void RenderSvg_HasAllAttributes_ReturnsSvgTagWithAllAttributes()
		{
			Assert.AreEqual("<svg class=\"icon\" role=\"img\" aria-label=\"aria\">\r\n\t<title>\r\n\t\ttest title\r\n\t</title><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"/assets/-build/img/svg-sprite.svg#test\">\r\n\r\n\t</use>\r\n</svg>", _helper.RenderSvg("test", "icon", "img", "aria", "test title").ToString());
		}
	}
}