using System.Web.Mvc;
using AtriusHealth.Feature.Events.Models;
using AtriusHealth.Feature.Events.Services;
using AtriusHealth.Foundation.Mvc.Controllers;

namespace AtriusHealth.Feature.Events.Controllers
{
	public class EventsController : AtriusHealthController
	{
		private readonly IEventMappable _mappingService;

		public EventsController(IEventMappable mappingService)
		{
			_mappingService = mappingService;
		}

		public ActionResult EventLocation()
		{
			var datasource = GetDatasourceItem(_EventDetailsItem.TemplateId) ?? GetContextItem(_EventDetailsItem.TemplateId);

			var mapSrc = _mappingService.GetEmbeddableMapLink(datasource);
			var model = new EventLocationModel
			{
				CanDisplayMap = _mappingService.ServiceIsProperlyConfigured && !string.IsNullOrEmpty(mapSrc),
				MapSrc = mapSrc
			};

			return View(model);
		}
	}
}
