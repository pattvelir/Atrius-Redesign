using NSubstitute;
using NUnit.Framework;
using Sitecore.Data;
using Sitecore.FakeDb;
using Thread.Feature.Banners.Models;
using Thread.Foundation.Orm.Factory;
using Thread.Foundation.Theme;

namespace Thread.Feature.Banners.Tests.Models
{
	[TestFixture]
	public class PageBannerModelTests
	{
		private Db _db;
		private PageBannerModel _model;

		[SetUp]
		public void Setup()
		{
			ID mediaId = ID.NewID;
			ID blackId = ID.NewID;
			ID whiteId = ID.NewID;

			_db = new Db("web")
			{
				new DbTemplate(ColorItem.TemplateId) { Fields = { ColorItem.FieldIds.Value }},
				new DbTemplate(ColorPairingItem.TemplateId) { Fields = { ColorPairingItem.FieldIds.BackgroundColor, ColorPairingItem.FieldIds.ForegroundColor}},
				new DbTemplate(PageBannerItem.TemplateId) { Fields = { PageBannerItem.FieldIds.Image, PageBannerItem.FieldIds.Video }},
				new DbItem("Page Item"),
				new DbItem("Page Banner Item", ID.NewID, PageBannerItem.TemplateId)
				{
					{PageBannerItem.FieldIds.Image, $"<image mediaid=\"{mediaId}\" />" }
				},
				new DbItem("Page Banner No Image"),
				new DbItem("Banner Image", mediaId),
				new DbItem("Black",blackId, ColorItem.TemplateId)
				{
					{ ColorItem.FieldIds.Value, "#000" }
				},
				new DbItem("White",whiteId, ColorItem.TemplateId)
				{
					{ ColorItem.FieldIds.Value, "#fff" }
				},
				new DbItem("Valid Color Pairing", ID.NewID, ColorPairingItem.TemplateId)
				{
					{ ColorPairingItem.FieldIds.ForegroundColor, blackId.ToString() },
					{ ColorPairingItem.FieldIds.BackgroundColor, whiteId.ToString() }
				}
			};

			_model = new PageBannerModel(Substitute.For<IItemInterfaceFactory>()) 
			{
				Datasource = _db.GetItem("/sitecore/content/Page Banner Item"),
				RenderingParameters = Substitute.For<BannerParameters>()
			};
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void PageBannerModel_NullSitecoreContext_DoesNotThrow()
		{
			Assert.DoesNotThrow(() => new PageBannerModel(null));
		}

		[Test]
		public void IsValid_ImageIsSet_IsTrue()
		{
			Assert.IsTrue(_model.IsValid);
		}

		[Test]
		public void IsValid_ImageIsNotSet_IsFalse()
		{
			_model.Datasource = _db.GetItem("/sitecore/content/Page Banner No Image");

			Assert.IsFalse(_model.IsValid);
		}

		[Test]
		public void HasHeight_NoBannerHeight_IsFalse()
		{
			Assert.IsFalse(_model.HasHeight);
		}

		[Test]
		public void HasHeight_BannerHeightIsSet_IsTrue()
		{
			_model.RenderingParameters.BannerHeight.Returns(500);

			Assert.IsTrue(_model.HasHeight);
		}

		[Test]
		public void HeightStyle_BannerHeightIsSet_ReturnsHeightStyleAttribute()
		{
			_model.RenderingParameters.BannerHeight.Returns(500);

			Assert.AreEqual("height: 500px;", _model.HeightStyle);
		}

		[Test]
		public void HeightStyle_NoBannerHeight_ReturnsEmptyString()
		{
			Assert.AreEqual(string.Empty, _model.HeightStyle);
		}

		[Test]
		public void HeightClass_BannerHeightIsSet_ReturnsHeightClass()
		{
			_model.RenderingParameters.BannerHeight.Returns(500);

			Assert.AreEqual("has-height", _model.HeightClass);
		}

		[Test]
		public void HeightClass_NoBannerHeight_ReturnsEmptyString()
		{
			Assert.AreEqual(string.Empty, _model.HeightClass);
		}

		[Test]
		public void OpacityStyle_OpacityIsZero_ReturnsOpacityStyle()
		{
			_model.RenderingParameters.Opacity.Returns(0);

			Assert.AreEqual("opacity: 0;", _model.OpacityStyle);
		}

		[Test]
		public void OpacityStyle_OpacityIsOne_ReturnsOpacityStyle()
		{
			_model.RenderingParameters.Opacity.Returns(1);

			Assert.AreEqual("opacity: 1;", _model.OpacityStyle);
		}

		[Test]
		public void OpacityStyle_OpacityIsPointFive_ReturnsOpacityStyle()
		{
			_model.RenderingParameters.Opacity.Returns((float).5);

			Assert.AreEqual("opacity: 0.5;", _model.OpacityStyle);
		}

		[Test]
		public void HasColorPairing_HasValidPairing_ReturnsTrue()
		{
			ColorPairingItem pairingItem = _db.GetItem("/sitecore/content/Valid Color Pairing");
			_model.RenderingParameters.ColorPairing.Returns(pairingItem);

			Assert.IsTrue(_model.HasColorPairing);
		}

		[Test]
		public void HasColorPairing_DoesNotHavePairing_ReturnsFalse()
		{
			_model.RenderingParameters.ColorPairing.Returns(default(ColorPairingItem));

			Assert.IsFalse(_model.HasColorPairing);
		}

		[Test]
		public void ColorPairingClass_HasValidPairing_ReturnsCssClass()
		{
			ColorPairingItem pairingItem = _db.GetItem("/sitecore/content/Valid Color Pairing");
			_model.RenderingParameters.ColorPairing.Returns(pairingItem);

			Assert.AreEqual("u-color-pair", _model.ColorPairingClass);
		}

		[Test]
		public void ColorPairingClass_DoesNotHavePairing_ReturnsEmptyString()
		{
			_model.RenderingParameters.ColorPairing.Returns(default(ColorPairingItem));

			Assert.IsEmpty(_model.ColorPairingClass);
		}

		[Test]
		public void ColorPairingStyle_HasValidPairing_ReturnsInlineStyle()
		{
			ColorPairingItem pairingItem = _db.GetItem("/sitecore/content/Valid Color Pairing");
			_model.RenderingParameters.ColorPairing.Returns(pairingItem);

			Assert.AreEqual("background-color:#fff;color:#000;", _model.ColorPairingStyle);
		}

		[Test]
		public void ColorPairingStyle_DoesNotHavePairing_ReturnsEmptyString()
		{
			_model.RenderingParameters.ColorPairing.Returns(default(ColorPairingItem));

			Assert.IsEmpty(_model.ColorPairingStyle);
		}
	}
}
