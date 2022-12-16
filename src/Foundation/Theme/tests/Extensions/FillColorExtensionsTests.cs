using NUnit.Framework;
using Sitecore.Data;
using Sitecore.FakeDb;
using AtriusHealth.Foundation.Theme.Extensions;

namespace AtriusHealth.Foundation.Theme.Tests.Extensions
{
	[TestFixture]
	public class FillColorExtensionsTests
	{
		private Db _db;

		[SetUp]
		public void Setup()
		{
			ID validColor = ID.NewID;
			ID invalidColor = ID.NewID;
			ID validWithSpaceColor = ID.NewID;
			ID whiteColor = ID.NewID;

			_db = new Db("web")
			{
				new DbTemplate(ColorItem.TemplateId) { Fields = { ColorItem.FieldIds.Value }},
				new DbTemplate(ColorPairingItem.TemplateId) { Fields = { ColorPairingItem.FieldIds.BackgroundColor, ColorPairingItem.FieldIds.ForegroundColor}},
				new DbItem("Valid Color", validColor, ColorItem.TemplateId)
				{
					{ ColorItem.FieldIds.Value, "FF00aa" }
				},
				new DbItem("Valid With Hash Color", whiteColor, ColorItem.TemplateId)
				{
					{ ColorItem.FieldIds.Value, "#ffffff" }
				},
				new DbItem("Invalid Color", invalidColor, ColorItem.TemplateId)
				{
					{ ColorItem.FieldIds.Value, "test" }
				},
				new DbItem("Valid With Space Color", validWithSpaceColor, ColorItem.TemplateId)
				{
					{ ColorItem.FieldIds.Value, " \nFF00aa  \t" }
				},
				new DbItem("Empty Pairing", ID.NewID, ColorPairingItem.TemplateId),
				new DbItem("Background Only", ID.NewID, ColorPairingItem.TemplateId)
				{
					{ ColorPairingItem.FieldIds.BackgroundColor, validColor.ToString() }
				},
				new DbItem("Background Only NeedsFormatting", ID.NewID, ColorPairingItem.TemplateId)
				{
					{ ColorPairingItem.FieldIds.BackgroundColor, validColor.ToString() }
				},
				new DbItem("Foreground Only", ID.NewID, ColorPairingItem.TemplateId)
				{
					{ ColorPairingItem.FieldIds.ForegroundColor, validColor.ToString() }
				},
				new DbItem("Valid Pairing", ID.NewID, ColorPairingItem.TemplateId)
				{
					{ ColorPairingItem.FieldIds.BackgroundColor, whiteColor.ToString() },
					{ ColorPairingItem.FieldIds.ForegroundColor, validColor.ToString() }
				}
			};
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void FormatFillColor_NameWithUppercase_ReturnsLowercaseValue()
		{
			ColorItem backgroundColor = _db.GetItem("/sitecore/content/Valid Color");

			Assert.AreEqual("#ff00aa", backgroundColor.Format());
		}

		[Test]
		public void FormatFillColor_NameWithWhiteSpace_ReturnsValueWithoutWhiteSpace()
		{
			ColorItem backgroundColor = _db.GetItem("/sitecore/content/Valid With Space Color");

			Assert.AreEqual("#ff00aa", backgroundColor.Format());
		}

		[Test]
		public void FormatFillColor_NotHexValue_ReturnsInputUnchanged()
		{
			ColorItem backgroundColor = _db.GetItem("/sitecore/content/Invalid Color");

			Assert.AreEqual("test", backgroundColor.Format());
		}

		[Test]
		public void FormatFillColor_HexValueWithHash_ReturnsInputUnchanged()
		{
			ColorItem color = _db.GetItem("/sitecore/content/Valid With Hash Color");
			
			Assert.AreEqual("#ffffff", color.Format());
		}

		[Test]
		public void FormatFillColor_HexValueWithoutHash_ReturnsInputWithLeadingHash()
		{
			ColorItem backgroundColor = _db.GetItem("/sitecore/content/Valid Color");

			Assert.AreEqual("#ff00aa", backgroundColor.Format());
		}

		[Test]
		public void GenerateInlineStyles_PairingIsNull_ReturnsEmptyString()
		{
			ColorPairingItem pair = null;

			Assert.AreEqual(string.Empty, pair.GenerateInlineStyles());
		}

		[Test]
		public void GenerateInlineStyles_PairingHasNoValues_ReturnsEmptyString()
		{
			ColorPairingItem pair = _db.GetItem("/sitecore/content/Empty Pairing");

			Assert.AreEqual(string.Empty, pair.GenerateInlineStyles());
		}

		[Test]
		public void GenerateInlineStyles_PairingHasJustBackgroundColor_ReturnsBackgroundColorCss()
		{
			ColorPairingItem pair = _db.GetItem("/sitecore/content/Background Only NeedsFormatting");
			
			Assert.AreEqual("background-color:#ff00aa;", pair.GenerateInlineStyles());
		}

		[Test]
		public void GenerateInlineStyles_PairingHasJustForegroundColor_ReturnsColorCss()
		{
			ColorPairingItem pair = _db.GetItem("/sitecore/content/Foreground Only");

			Assert.AreEqual("color:#ff00aa;", pair.GenerateInlineStyles());
		}

		[Test]
		public void GenerateInlineStyles_PairingHasForegroundAndBackgroundColor_ReturnsProperCss()
		{
			ColorPairingItem pair = _db.GetItem("/sitecore/content/Valid Pairing");

			Assert.AreEqual("background-color:#ffffff;color:#ff00aa;", pair.GenerateInlineStyles());
		}
	}
}
