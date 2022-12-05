using System.Web.Mvc;
using AtriusHealth.Feature.Metadata.Services;
using AtriusHealth.Foundation.Mvc.Controllers;

namespace AtriusHealth.Feature.Metadata.Controllers
{
	public class MetadataController : AtriusHealthController
	{
		private readonly IMetadataService _metadataService;
		public MetadataController(IMetadataService metadataService)
		{
			_metadataService = metadataService;
		}

		public virtual ActionResult HtmlPageTitle()
		{
			string title = _metadataService.GetHtmlPageTitle(PageContext.Item);

			return View(new MvcHtmlString(title));
		}

		public virtual ActionResult Metadata()
		{
			var model = _metadataService.GetPageMetadata(PageContext.Item);

			return View(model);
		}

		public ActionResult CustomHeadHtml()
		{
			string html = _metadataService.GetCustomHeadHtml(PageContext.Item);

			return View(new MvcHtmlString(html));
		}
	}
}
