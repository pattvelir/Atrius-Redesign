using NUnit.Framework;
using Sitecore.Data;
using Sitecore.FakeDb;
using Thread.Foundation.Theme.Extensions;

namespace Thread.Foundation.Theme.Tests.Extensions
{
	[TestFixture]
	public class ColorExtensionsTests
	{
		private Db _db;

		[SetUp]
		public void Setup()
		{
			_db = new Db("web")
			{
				new DbItem("Empty Color", ID.NewID, ColorItem.TemplateId)
				{
					{ ColorItem.FieldIds.Value, string.Empty }
				},
				new DbItem("Invalid Color", ID.NewID, ColorItem.TemplateId)
				{
					{ ColorItem.FieldIds.Value, "   \n\t   " }
				},
				new DbItem("Red Color", ID.NewID, ColorItem.TemplateId)
				{
					{ ColorItem.FieldIds.Value, "red" }
				}
			};
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void IsValid_NullColor_ReturnsFalse()
		{
			ColorItem color = null;

			Assert.IsFalse(color.IsValid());
		}

		[Test]
		public void IsValid_EmptyValue_ReturnsFalse()
		{
			ColorItem color = _db.GetItem("/sitecore/content/Empty Color");

			Assert.IsFalse(color.IsValid());
		}

		[Test]
		public void IsValid_ValueIsWhitespace_ReturnsFalse()
		{
			ColorItem color = _db.GetItem("/sitecore/content/Invalid Color");

			Assert.IsFalse(color.IsValid());
		}

		[Test]
		public void IsValid_HasValue_ReturnsTrue()
		{
			ColorItem color = _db.GetItem("/sitecore/content/Red Color");

			Assert.IsTrue(color.IsValid());
		}
	}
}