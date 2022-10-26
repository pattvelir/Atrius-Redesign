using NUnit.Framework;
using Sitecore.Data;
using Sitecore.FakeDb;
using Thread.Feature.Containers.Models;
using Thread.Foundation.Theme;

namespace Thread.Feature.Containers.Tests.Models
{
	[TestFixture]
	public class FullBleedContainerModelTests
	{
		private Db _db;

		[SetUp]
		public void SetUp()
		{
			ID colorItemId = ID.NewID;
			ID imageId = ID.NewID;
			_db = new Db("web")
			{
				new DbTemplate(ColorItem.TemplateId) { Fields = { ColorItem.FieldIds.Value }},
				new DbTemplate(FullWidthBleedContainerItem.TemplateId) { Fields = { FullWidthBleedContainerItem.FieldIds.BackgroundColor, FullWidthBleedContainerItem.FieldIds.BackgroundImage }},
				new DbItem("Red", colorItemId, ColorItem.TemplateId)
				{
					{ ColorItem.FieldIds.Value, "Red" }
				},
				new DbItem("Image", imageId, ColorItem.TemplateId),
				new DbItem("Container No Image No Color", ID.NewID, FullWidthBleedContainerItem.TemplateId),
				new DbItem("Container With Image", ID.NewID, FullWidthBleedContainerItem.TemplateId)
				{
					{FullWidthBleedContainerItem.FieldIds.BackgroundImage, $"<image mediaid=\"{imageId}\" />" }
				},
				new DbItem("Container With Color", ID.NewID, FullWidthBleedContainerItem.TemplateId)
				{
					{ FullWidthBleedContainerItem.FieldIds.BackgroundColor, colorItemId.ToString() }
				}
			};
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void FullBleedContainersModel_NullRenderingContextService_DoesNotThrow()
		{
			Assert.DoesNotThrow(() => new FullBleedContainerModel());
		}

		[Test]
		public void HasFillColor_FillColorNotSet_ReturnsFalse()
		{
			var model = new FullBleedContainerModel();
			model.Datasource = _db.GetItem("/sitecore/content/Container No Image No Color");

			Assert.IsFalse(model.HasBackgroundColor);
		}

		[Test]
		public void HasFillColor_FillColorSet_ReturnsTrue()
		{
			var model = new FullBleedContainerModel();
			model.Datasource = _db.GetItem("/sitecore/content/Container With Color");

			Assert.IsTrue(model.HasBackgroundColor);
		}

		[Test]
		public void HasBackgroundImage_ImageNotSet_ReturnsFalse()
		{
			var model = new FullBleedContainerModel();
			model.Datasource = _db.GetItem("/sitecore/content/Container No Image No Color");

			Assert.IsFalse(model.HasBackgroundImage);
		}
	}
}