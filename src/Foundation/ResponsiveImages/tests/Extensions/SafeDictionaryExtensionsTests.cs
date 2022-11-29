using NUnit.Framework;
using Sitecore.Collections;
using AtriusHealth.Foundation.ResponsiveImages.Extensions;

namespace AtriusHealth.Foundation.ResponsiveImages.Tests.Extensions
{
	[TestFixture]
	public class SafeDictionaryExtensionsTests
	{
		[Test]
		public void GetWidth_EmptyDictionary_ReturnsZero()
		{
			// ARRANGE
			var dict = new SafeDictionary<string>();

			// ACT
			int width = dict.GetWidth();

			// ASSERT
			Assert.AreEqual(0, width);
		}

		[Test]
		public void GetWidth_WidthWithNonIntValue_ReturnsZero()
		{
			// ARRANGE
			var dict = new SafeDictionary<string> { { "width", "hello" } };

			// ACT
			int width = dict.GetWidth();

			// ASSERT
			Assert.AreEqual(0, width);
		}

		[Test]
		public void GetWidth_DictionaryWithWidth_ReturnsWidthValue()
		{
			// ARRANGE
			var dict = new SafeDictionary<string> { { "width", "50" } };

			// ACT
			int width = dict.GetWidth();

			// ASSERT
			Assert.AreEqual(50, width);
		}

		[Test]
		public void GetWidth_DictionaryWithMaxWidth_ReturnsMaxWidthValue()
		{
			// ARRANGE
			var dict = new SafeDictionary<string> { { "mw", "50" } };

			// ACT
			int width = dict.GetWidth();

			// ASSERT
			Assert.AreEqual(50, width);
		}

		[Test]
		public void GetWidth_DictionaryWithW_ReturnsWValue()
		{
			// ARRANGE
			var dict = new SafeDictionary<string> { { "w", "50" } };

			// ACT
			int width = dict.GetWidth();

			// ASSERT
			Assert.AreEqual(50, width);
		}

		[Test]
		public void GetWidth_DictionaryWithAllParameters_ReturnsWValue()
		{
			// ARRANGE
			var dict = new SafeDictionary<string> { { "width", "150" }, { "w", "50" }, { "mw", "100" } };

			// ACT
			int width = dict.GetWidth();

			// ASSERT
			Assert.AreEqual(50, width);
		}

		[Test]
		public void GetWidth_DictionaryWithMWAndWidthParameters_ReturnsMWValue()
		{
			// ARRANGE
			var dict = new SafeDictionary<string> { { "width", "150" }, { "mw", "100" } };

			// ACT
			int width = dict.GetWidth();

			// ASSERT
			Assert.AreEqual(100, width);
		}

		[Test]
		public void GetHeight_EmptyDictionary_ReturnsZero()
		{
			// ARRANGE
			var dict = new SafeDictionary<string>();

			// ACT
			int height = dict.GetHeight();

			// ASSERT
			Assert.AreEqual(0, height);
		}

		[Test]
		public void GetHeight_HeightWithNonIntValue_ReturnsZero()
		{
			// ARRANGE
			var dict = new SafeDictionary<string> { { "height", "hello" } };

			// ACT
			int height = dict.GetHeight();

			// ASSERT
			Assert.AreEqual(0, height);
		}

		[Test]
		public void GetHeight_DictionaryWithHeight_ReturnsHeightValue()
		{
			// ARRANGE
			var dict = new SafeDictionary<string> { { "height", "50" } };

			// ACT
			int height = dict.GetHeight();

			// ASSERT
			Assert.AreEqual(50, height);
		}

		[Test]
		public void GetHeight_DictionaryWithMH_ReturnsMHValue()
		{
			// ARRANGE
			var dict = new SafeDictionary<string> { { "mh", "50" } };

			// ACT
			int height = dict.GetHeight();

			// ASSERT
			Assert.AreEqual(50, height);
		}

		[Test]
		public void GetHeight_DictionaryWithH_ReturnsHValue()
		{
			// ARRANGE
			var dict = new SafeDictionary<string> { { "h", "50" } };

			// ACT
			int height = dict.GetHeight();

			// ASSERT
			Assert.AreEqual(50, height);
		}

		[Test]
		public void GetHeight_DictionaryWithAllParameters_ReturnsHValue()
		{
			// ARRANGE
			var dict = new SafeDictionary<string> { { "height", "150" }, { "h", "50" }, { "mh", "100" } };

			// ACT
			int height = dict.GetHeight();

			// ASSERT
			Assert.AreEqual(50, height);
		}

		[Test]
		public void GetHeight_DictionaryWithMHAndHeightParameters_ReturnsMHValue()
		{
			// ARRANGE
			var dict = new SafeDictionary<string> { { "height", "150" }, { "mh", "100" } };

			// ACT
			int height = dict.GetHeight();

			// ASSERT
			Assert.AreEqual(100, height);
		}
	}
}
