using System.Web.Mvc;

namespace Thread.Foundation.AX.Mvc
{
	public static class SitecoreHelperExtensions
	{
		public static SitecoreBodyTag BeginBody(this HtmlHelper helper, object parameters = null)
		{
			var body = new SitecoreBodyTag(helper.ViewContext.Writer, parameters);
			body.RenderStart();
			return body;
		}
	}
}