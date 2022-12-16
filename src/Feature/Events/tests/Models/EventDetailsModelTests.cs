using System;
using NUnit.Framework;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.FakeDb;
using AtriusHealth.Feature.Events.Models;
using AtriusHealth.Foundation.Enumerations;

namespace AtriusHealth.Feature.Events.Tests.Models
{
	[TestFixture]
	public class EventDetailsModelTests
	{
		private Db _db;

		[SetUp]
		public void SetUp()
		{
			ID stateId = ID.NewID;
			_db = new Db("web")
			{
				new DbTemplate(_EventDatesItem.TemplateId){ Fields = { _EventDatesItem.FieldIds.StartDate,_EventDatesItem.FieldIds.EndDate}},
				new DbTemplate(_EventDetailsItem.TemplateId) { Fields = { _EventDetailsItem.FieldIds.State,_EventDetailsItem.FieldIds.Address1, _EventDetailsItem.FieldIds.Address2, _EventDetailsItem.FieldIds.City, _EventDetailsItem.FieldIds.ZipCode }},
				new DbItem("No Date Event", ID.NewID, _EventDatesItem.TemplateId),
				new DbItem("Same Date Event", ID.NewID, _EventDatesItem.TemplateId)
				{
					{_EventDatesItem.FieldIds.StartDate, new DateTime(2018, 7, 1).ToString("yyyyMMddTHHmmssZ") },
					{ _EventDatesItem.FieldIds.EndDate, new DateTime(2018, 7, 1).ToString("yyyyMMddTHHmmssZ") }
				},
				new DbItem("Multi Day Event", ID.NewID, _EventDatesItem.TemplateId)
				{
					{_EventDatesItem.FieldIds.StartDate, new DateTime(2018, 7, 1, 12, 0, 0).ToString("yyyyMMddTHHmmssZ") },
					{ _EventDatesItem.FieldIds.EndDate, new DateTime(2018, 7, 1, 13, 0, 0).ToString("yyyyMMddTHHmmssZ") }
				},
				new DbItem("Address 1 Event", ID.NewID, _EventDetailsItem.TemplateId)
				{
					{_EventDetailsItem.FieldIds.Address1, "212 Elm St" }
				},
				new DbItem("Address 2 Event", ID.NewID, _EventDetailsItem.TemplateId)
				{
					{_EventDetailsItem.FieldIds.Address2, "Suite 201" }
				},
				new DbItem("City Event", ID.NewID, _EventDetailsItem.TemplateId)
				{
					{ _EventDetailsItem.FieldIds.City, "Somerville" }
				},
				new DbItem("State Event", ID.NewID, _EventDetailsItem.TemplateId)
				{
					{_EventDetailsItem.FieldIds.State, stateId.ToString() }
				},
				new DbItem("Zip Code Event", ID.NewID, _EventDetailsItem.TemplateId)
				{
					{_EventDetailsItem.FieldIds.ZipCode, "02144" }
				},
				new DbItem("MA", stateId, _EventDetailsItem.TemplateId)
				{
					{ StateItem.FieldIds.Value, "MA" }
				}
			};
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void FormatDate_ValidStartAndEndDates_ReturnsFormattedText()
		{
			var model = new TestEventDetailsModel();
			model.Datasource = _db.GetItem("/sitecore/content/Same Date Event");

			Assert.AreEqual("Jul 01, 2018", model.FormattedDate);
		}

		[Test]
		public void FormatDate_NoStartAndEndDates_ReturnsErrorMessage()
		{
			var model = new TestEventDetailsModel();
			model.Datasource = _db.GetItem("/sitecore/content/No Date Event");

			Assert.AreEqual("Date information not available.", model.FormattedDate);
		}

		[Test]
		public void FormatTime_ValidStartAndEndDates_ReturnsFormattedText()
		{
			var model = new TestEventDetailsModel();
			model.Datasource = _db.GetItem("/sitecore/content/Multi Day Event");

			Assert.AreEqual("12-1 PM", model.FormattedTime);
		}

		[Test]
		public void FormatTime_NoStartAndEndDates_ReturnsErrorMessage()
		{
			var model = new TestEventDetailsModel();
			model.Datasource = _db.GetItem("/sitecore/content/No Date Event");

			Assert.AreEqual("Time information not available.", model.FormattedTime);
		}

		[Test]
		public void HasAddressFields_Address1FilledOut_ReturnsTrue()
		{
			var model = new TestEventDetailsModel();
			model.Datasource = _db.GetItem("/sitecore/content/Address 1 Event");

			Assert.IsTrue(model.HasAddressFields());
		}

		[Test]
		public void HasAddressFields_Address2FilledOut_ReturnsTrue()
		{
			var model = new TestEventDetailsModel();
			model.Datasource = _db.GetItem("/sitecore/content/Address 2 Event");

			Assert.IsTrue(model.HasAddressFields());
		}

		[Test]
		public void HasAddressFields_CityFilledOut_ReturnsTrue()
		{
			var model = new TestEventDetailsModel();
			model.Datasource = _db.GetItem("/sitecore/content/City Event");

			Assert.IsTrue(model.HasAddressFields());
		}

		[Test]
		public void HasAddressFields_StateFilledOut_ReturnsTrue()
		{
			var model = new TestEventDetailsModel();
			model.Datasource = _db.GetItem("/sitecore/content/State Event");

			Assert.IsTrue(model.HasAddressFields());
		}

		[Test]
		public void HasAddressFields_ZipFilledOut_ReturnsTrue()
		{
			var model = new TestEventDetailsModel();
			model.Datasource = _db.GetItem("/sitecore/content/Zip Code Event");

			Assert.IsTrue(model.HasAddressFields());
		}

		[Test]
		public void HasAddressFields_AllFieldsEmpty_ReturnsFalse()
		{
			var model = new TestEventDetailsModel();
			model.Datasource = _db.GetItem("/sitecore/content/No Date Event");

			Assert.IsFalse(model.HasAddressFields());
		}
	}

	public class TestEventDetailsModel : EventDetailsModel
	{
		public override Item PageItem => Datasource;
	}
}
