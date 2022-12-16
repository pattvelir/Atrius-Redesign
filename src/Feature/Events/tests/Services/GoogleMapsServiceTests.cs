using NUnit.Framework;
using Sitecore.Data;
using Sitecore.FakeDb;
using AtriusHealth.Feature.Events.Services;
using AtriusHealth.Foundation.Enumerations;

namespace AtriusHealth.Feature.Events.Tests.Services
{
	[TestFixture]
	public class GoogleMapsServiceTests
	{
		private Db _db;
		private IEventMappable _mapService;

		[SetUp]
		public void SetUp()
		{
			ID stateId = ID.NewID;
			_db = new Db("web")
			{
				new DbTemplate(_EventDetailsItem.TemplateId) { Fields = { _EventDetailsItem.FieldIds.State,_EventDetailsItem.FieldIds.Address1, _EventDetailsItem.FieldIds.Address2, _EventDetailsItem.FieldIds.City, _EventDetailsItem.FieldIds.ZipCode }},
				new DbTemplate(StateItem.TemplateId) { Fields = { StateItem.FieldIds.Value }},
				new DbItem("Event Item", ID.NewID, _EventDetailsItem.TemplateId)
				{
					{_EventDetailsItem.FieldIds.Address1, "212 Elm St" },
					{ _EventDetailsItem.FieldIds.City, "Somerville" },
					{_EventDetailsItem.FieldIds.State, stateId.ToString() },
					{_EventDetailsItem.FieldIds.ZipCode, "02144" }
				},
				new DbItem("MA", stateId, StateItem.TemplateId)
				{
					{ StateItem.FieldIds.Value, "MA" }
				}
			};

			_mapService = new GoogleMapsService();
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void GetEmbeddableMapLink_Address_ReturnsMapLink()
		{
			_EventDetailsItem location = _db.GetItem("/sitecore/content/Event Item");
			
			Assert.AreEqual("https://www.google.com/maps/embed/v1/place?key=&q=212+Elm+St%2cSomerville+MA%2c02144", _mapService.GetEmbeddableMapLink(location));
		}

		[Test]
		public void GetEmbeddableMapLink_AddressIsNull_ReturnsNull()
		{
			Assert.IsNull(_mapService.GetEmbeddableMapLink(null));
		}
	}
}
