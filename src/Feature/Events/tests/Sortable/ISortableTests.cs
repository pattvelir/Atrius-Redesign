using System;
using NUnit.Framework;
using Sitecore.Data;
using Sitecore.FakeDb;
using Thread.Foundation.Abstractions.Indexing;

namespace Thread.Feature.Events.Tests.Sortable
{
	[TestFixture]
	public class ISortableTests
	{
		private Db _db;

		[SetUp]
		public void SetUp()
		{
			_db = new Db("web")
			{
				new DbItem("Event Item", ID.NewID,_EventDatesItem.TemplateId)
				{
					{_EventDatesItem.FieldIds.StartDate, new DateTime(2018, 7, 1).ToString("yyyyMMddTHHmmssZ") },
				}
			};
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void SortDate_InheritsEventDatesBaseTemplate_ReturnsStartDate()
		{
			_EventDatesItem dateItem = _db.GetItem("/sitecore/content/Event Item");
			ISortable sortable = dateItem as ISortable;

			Assert.AreEqual(new DateTime(2018, 7, 1), sortable.SortDate);
		}
	}
}
