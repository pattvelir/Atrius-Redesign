using System;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using Sitecore.Data.Items;
using Sitecore.Mvc.Common;
using Sitecore.Mvc.Extensions;

namespace AtriusHealth.Foundation.Mvc.Extensions
{
	public static class HtmlHelperExtensions
	{
		public static EditFrameRendering EditFrame<T>(this HtmlHelper<T> helper, Item datasource, string buttons, string title)
		{
			return helper.EditFrame(datasource?.ID.ToString() ?? string.Empty, buttons, title, title, string.Empty, null);
		}
        public static MvcHtmlString CheckBoxSimple<T>(this HtmlHelper<T> htmlHelper, Expression<Func<T, bool>> expression, object htmlAttributes = null)
        {
            string checkBoxWithHidden = htmlHelper.CheckBoxFor(expression, htmlAttributes).ToHtmlString().Trim();
            string pureCheckBox = checkBoxWithHidden.Substring(0, checkBoxWithHidden.IndexOf("<input", 1));
            return new MvcHtmlString(pureCheckBox);
        }
    }
}
