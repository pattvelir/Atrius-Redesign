using System.Web;
using Sitecore.Data.Fields;
using Sitecore.Mvc.Helpers;
using AtriusHealth.Feature.Navigation.Models;
using AtriusHealth.Foundation.Mvc.Extensions;
using AtriusHealth.Foundation.SitecoreExtensions.Item;

namespace AtriusHealth.Feature.Navigation.Extensions
{
	public static class SitecoreHelperExtensions
	{
		public static HtmlString Field(this SitecoreHelper helper, ILinkable link, object parameters = null)
		{
			if (link.LinkField is LinkField)
			{
				return helper.Field(link.LinkField, parameters);
			}
			
			return new HtmlString($"<a href=\"{link.LinkField.InnerField.Item.Url()}\">{helper.Field(link.LinkField)}</a>");
		}

		public static string Text(this SitecoreHelper helper, ILinkable link)
		{
			LinkField field = link.LinkField as LinkField;
			if (field != null)
			{
				return field.Text;
			}

			return link.LinkField.Value;
		}
	}
}
