using System.Linq;
using NUnit.Framework;
using Sitecore.Data;
using Sitecore.FakeDb;
using Thread.Feature.Listing.Models;
using Thread.Foundation.Enumerations;

namespace Thread.Feature.Listing.Tests.Models
{
	[TestFixture]
	public class ContentListingModelTests
	{
		private Db _db;

		[SetUp]
		public void SetUp()
		{
			ID enum2 = ID.NewID;
			ID enum7 = ID.NewID;
			_db = new Db("web")
			{
				new DbTemplate(ContentListingItem.TemplateId) { Fields = { ContentListingItem.FieldIds.NumberOfItems}},
				new DbTemplate(ContentListingItemItem.TemplateId),
				new DbTemplate(NumberOfItemsItem.TemplateId) { Fields = { NumberOfItemsItem.FieldIds.Value}},
				new DbItem("Content Listing", ID.NewID, ContentListingItem.TemplateId)
				{
					new DbItem("Item 1", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 2", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 3", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 4", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 5", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 6", ID.NewID, ContentListingItemItem.TemplateId)
				},
				new DbItem("Content Listing 2", ID.NewID, ContentListingItem.TemplateId)
				{
					{ ContentListingItem.FieldIds.NumberOfItems, enum2.ToString() },
					new DbItem("Item 1", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 2", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 3", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 4", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 5", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 6", ID.NewID, ContentListingItemItem.TemplateId)
				},
				new DbItem("Content Listing 7", ID.NewID, ContentListingItem.TemplateId)
				{
					{ ContentListingItem.FieldIds.NumberOfItems, enum7.ToString() },
					new DbItem("Item 1", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 2", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 3", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 4", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 5", ID.NewID, ContentListingItemItem.TemplateId),
					new DbItem("Item 6", ID.NewID, ContentListingItemItem.TemplateId)
				},
				new DbItem("Enum 2", enum2, NumberOfItemsItem.TemplateId)
				{
					{ NumberOfItemsItem.FieldIds.Value, "2" }
				},
				new DbItem("Enum 7", enum7,NumberOfItemsItem.TemplateId)
				{
					{NumberOfItemsItem.FieldIds.Value, "7" }
				}
			};
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void ContentListingModel_NullRenderingContextService_DoesNotThrow()
		{
			Assert.DoesNotThrow(() => new ContentListingModel());
		}

		[Test]
		public void VisibleListItems_NullEnum_Returns5()
		{
			var model = new ContentListingModel();
			model.Datasource = _db.GetItem("/sitecore/content/Content Listing");

			Assert.AreEqual(5, model.VisibleListItems.Count());
		}

		[Test]
		public void VisibleListItems_EnumSetTo2_Returns2()
		{
			var model = new ContentListingModel();
			model.Datasource = _db.GetItem("/sitecore/content/Content Listing 2");

			Assert.AreEqual(2, model.VisibleListItems.Count());
		}

		[Test]
		public void HiddenListItems_EnumSetTo2_Returns4()
		{
			var model = new ContentListingModel();
			model.Datasource = _db.GetItem("/sitecore/content/Content Listing 2");

			Assert.AreEqual(4, model.HiddenListItems.Count());
		}

		[Test]
		public void VisibleListItems_EnumSetTo7_Returns6()
		{
			var model = new ContentListingModel();
			model.Datasource = _db.GetItem("/sitecore/content/Content Listing 7");

			Assert.AreEqual(6, model.VisibleListItems.Count());
		}

		[Test]
		public void HiddenListItems_EnumSetTo7_Returns0()
		{
			var model = new ContentListingModel();
			model.Datasource = _db.GetItem("/sitecore/content/Content Listing 7");

			Assert.AreEqual(0, model.HiddenListItems.Count());
		}
	}
}
