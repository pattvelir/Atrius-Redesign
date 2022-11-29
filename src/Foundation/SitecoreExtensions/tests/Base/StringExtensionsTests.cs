using NUnit.Framework;
using AtriusHealth.Foundation.SitecoreExtensions.Base;

namespace AtriusHealth.Foundation.SitecoreExtensions.Tests.Base
{
	[TestFixture]
	public class StringExtensionsTests
	{
		[Test]
		public void FormatImagePath_NullPath_ReturnsEmptyString()
		{
			string path = null;

			Assert.IsNotNull(path.FormatImagePath());
		}

		[Test]
		public void IsHex_ValueIsNull_ReturnsFalse()
		{
			string hexValue = null;

			Assert.IsFalse(hexValue.IsHex());
		}

		[Test]
		public void IsHex_ValueIsEmpty_ReturnsFalse()
		{
			string hexValue = string.Empty;

			Assert.IsFalse(hexValue.IsHex());
		}

		[Test]
		public void IsHex_ValueIsWord_ReturnsFalse()
		{
			string hexValue = "test";

			Assert.IsFalse(hexValue.IsHex());
		}

		[Test]
		public void IsHex_ValueIsNumberAndIsMoreThan6Digits_ReturnsFalse()
		{
			string hexValue = "11111111";

			Assert.IsFalse(hexValue.IsHex());
		}

		[Test]
		public void IsHex_ValueIsNumberAndIsLessThan3Digits_ReturnsFalse()
		{
			string hexValue = "23";

			Assert.IsFalse(hexValue.IsHex());
		}

		[Test]
		public void IsHex_ValueIsHexNoHash_ReturnsTrue()
		{
			string hexValue = "ffffff";

			Assert.IsTrue(hexValue.IsHex());
		}

		[Test]
		public void IsHex_ValueIsHexWithHash_ReturnsTrue()
		{
			string hexValue = "#ffffff";

			Assert.IsTrue(hexValue.IsHex());
		}

		[Test]
		public void IsHex_ValueIsHexWithUppercase_ReturnsTrue()
		{
			string hexValue = "#AAAAAA";

			Assert.IsTrue(hexValue.IsHex());
		}

		[Test]
		public void IsHex_ValueIsHexWithUpperAndLowercase_ReturnsTrue()
		{
			string hexValue = "AAffCc";

			Assert.IsTrue(hexValue.IsHex());
		}

		[Test]
		public void GetFullUrl_UrlIsNull_ReturnsNull()
		{
			string url = null;

			Assert.IsNull(url.GetFullUrl());
		}

		[Test]
		public void GetFullUrl_UrlIsEmpty_ReturnsEmpty()
		{
			Assert.AreEqual(string.Empty, string.Empty.GetFullUrl());
		}
	}
}
