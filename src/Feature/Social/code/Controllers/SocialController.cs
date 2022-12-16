using System.Linq;
using System.Web.Mvc;
using AtriusHealth.Feature.Social.Models;
using AtriusHealth.Foundation.Mvc.Controllers;

namespace AtriusHealth.Feature.Social.Controllers
{
	public class SocialController : AtriusHealthController
	{
		public virtual ActionResult SocialFollow()
		{
			var model = new SocialFollowModel
			{
				Datasource = Rendering.Item,
				SocialFollowItems = Rendering.Item.Children.Select(c => new SocialMediaLinkItem(c))
			};

			return View(model);
		}
	}
}
