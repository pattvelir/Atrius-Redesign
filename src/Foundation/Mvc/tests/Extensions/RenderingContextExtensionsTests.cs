using System.Collections.Generic;
using NSubstitute;
using NUnit.Framework;
using Sitecore.Mvc.Presentation;
using AtriusHealth.Foundation.Mvc.Extensions;

namespace AtriusHealth.Foundation.Mvc.Tests.Extensions
{
	[TestFixture]
	public class RenderingContextExtensionsTests
	{
		private RenderingContext _validRenderingContext;

		[SetUp]
		public void Setup()
		{
			var renderer = Substitute.For<ViewRenderer>();
			
			var rendering1 = Substitute.For<Rendering>();
			rendering1.Placeholder.Returns("test");
			rendering1.Renderer.Returns(renderer);

			var rendering2 = Substitute.For<Rendering>();
			rendering2.Placeholder.Returns("testy");

			var pageDefinition = Substitute.For<PageDefinition>();
			pageDefinition.Renderings.Returns(new List<Rendering> {rendering1, rendering2});

			var pageContext = Substitute.For<PageContext>();
			pageContext.PageDefinition.Returns(pageDefinition);

			_validRenderingContext = Substitute.For<RenderingContext>();
			_validRenderingContext.PageContext.Returns(pageContext);
		}

		[Test]
		public void HasRenderings_RenderingContextIsNull_ReturnsFalse()
		{
			RenderingContext context = null;

			Assert.IsFalse(context.HasRenderings("test"));
		}

		[Test]
		public void HasRenderings_PageContextIsNull_ReturnsFalse()
		{
			RenderingContext context = Substitute.For<RenderingContext>();
			context.PageContext.Returns(default(PageContext));

			Assert.IsFalse(context.HasRenderings("test"));
		}

		[Test]
		public void HasRenderings_PageDefinitionIsNull_ReturnsFalse()
		{
			var pageContext = Substitute.For<PageContext>();
			pageContext.PageDefinition.Returns(default(PageDefinition));

			RenderingContext context = Substitute.For<RenderingContext>();
			context.PageContext.Returns(pageContext);

			Assert.IsFalse(context.HasRenderings("test"));
		}

		[Test]
		public void HasRenderings_RenderingsIsNull_ReturnsFalse()
		{
			RenderingContext context = null;

			Assert.IsFalse(context.HasRenderings("test"));
		}

		[Test]
		public void HasRenderings_PlaceholderNameIsNull_ReturnsFalse()
		{
			var pageDefinition = Substitute.For<PageDefinition>();
			pageDefinition.Renderings.Returns(default(List<Rendering>));

			var pageContext = Substitute.For<PageContext>();
			pageContext.PageDefinition.Returns(pageDefinition);

			RenderingContext context = Substitute.For<RenderingContext>();
			context.PageContext.Returns(pageContext);

			Assert.IsFalse(context.HasRenderings(null));
		}

		[Test]
		public void HasRenderings_PlaceholderNameIsEmpty_ReturnsFalse()
		{
			RenderingContext context = Substitute.For<RenderingContext>();

			Assert.IsFalse(context.HasRenderings(string.Empty));
		}

		[Test]
		public void HasRenderings_HasNoRenderings_ReturnsFalse()
		{
			var pageDefinition = Substitute.For<PageDefinition>();
			pageDefinition.Renderings.Returns(new List<Rendering>());

			var pageContext = Substitute.For<PageContext>();
			pageContext.PageDefinition.Returns(pageDefinition);

			RenderingContext context = Substitute.For<RenderingContext>();
			context.PageContext.Returns(pageContext);

			Assert.IsFalse(context.HasRenderings("test"));
		}

		[Test]
		public void HasRenderings_HasRenderingsNoneMatching_ReturnsFalse()
		{
			Assert.IsFalse(_validRenderingContext.HasRenderings("invalid-test"));
		}
	}
}
