using System.Collections.Generic;
using NUnit.Framework;
using Thread.Foundation.SitecoreExtensions.Base;

namespace Thread.Foundation.SitecoreExtensions.Tests.Base
{
	[TestFixture]
	public class DictionaryExtensionsTests
	{
		[Test]
		public void SafeAdd_ValidKeyValuePair_AddsToCollection()
		{
			Dictionary<string, string> dict = new Dictionary<string, string>();
			dict.SafeAdd("testKey", "testValue");

			Assert.AreEqual("testValue", dict["testKey"]);
		}

		[Test]
		public void SafeAdd_KeyIsAlreadyPresent_NoOp()
		{
			Dictionary<string, string> dict = new Dictionary<string, string>();
			dict.SafeAdd("testKey", "firstValue");

			Assert.DoesNotThrow(() => dict.SafeAdd("testKey", "secondValue"));
			Assert.AreEqual("firstValue", dict["testKey"]);
		}

		[Test]
		public void SafeAdd_DictionaryIsNull_ReturnsNull()
		{
			Dictionary<string, string> dict = null;
			dict.SafeAdd(string.Empty, string.Empty);

			Assert.IsNull(dict);
		}

		[Test]
		public void SafeAdd_KeyIsNullOrEmpty_DoesNotAdd()
		{
			Dictionary<string, string> dict = new Dictionary<string, string>();
			dict.SafeAdd(null, "test");

			Assert.AreEqual(0, dict.Count);
		}

		[Test]
		public void SafeAdd_ValueIsNullOrEmpty_DoesNotAdd()
		{
			Dictionary<string, string> dict = new Dictionary<string, string>();
			dict.SafeAdd("test", null);

			Assert.AreEqual(0, dict.Count);
		}
	}
}
