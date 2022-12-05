using System.Web;
using Sitecore.ExperienceForms.Models;
using Sitecore.ExperienceForms.Processing;
using Sitecore.ExperienceForms.Processing.Actions;
using Sitecore.StringExtensions;
using AtriusHealth.Foundation.Forms.Reference;

namespace AtriusHealth.Foundation.Forms.SubmitActions
{
	public class RedirectToParam : SubmitActionBase<string>
	{
		public RedirectToParam(ISubmitActionData submitActionData) : base(submitActionData)
		{
		}

		protected override bool TryParse(string value, out string target)
		{
			target = value;
			return true;
		}

		protected override bool Execute(string data, FormSubmitContext formSubmitContext)
		{
			var returnUrl = HttpContext.Current.Request.QueryString[Constants.Querystring.ReturnUrl];

			formSubmitContext.RedirectUrl = !returnUrl.IsNullOrEmpty() ? returnUrl : "/";
			formSubmitContext.RedirectOnSuccess = true;
			formSubmitContext.Abort();

			return true;
		}
	}
}
