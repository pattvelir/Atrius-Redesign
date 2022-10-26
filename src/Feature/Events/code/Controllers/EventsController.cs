using System.Web.Mvc;
using Thread.Feature.Events.Models;
using Thread.Feature.Events.Services;
using Thread.Foundation.Mvc.Controllers;

namespace Thread.Feature.Events.Controllers
{
	public class EventsController : ThreadController
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