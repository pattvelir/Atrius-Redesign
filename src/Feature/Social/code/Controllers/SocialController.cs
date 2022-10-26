using System.Linq;
using System.Web.Mvc;
using Thread.Feature.Social.Models;
using Thread.Foundation.Mvc.Controllers;

namespace Thread.Feature.Social.Controllers
{
	public class SocialController : ThreadController
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