using Sitecore.Mvc.Presentation;
using Sitecore.StringExtensions;
using Thread.Foundation.Mvc.Extensions;

namespace Thread.Feature.Global.Models
{
	public class FooterConnectModel
	{
		public _FooterConnectItem Datasource { get; set; }

		public bool HasContent()
		{
			if (Datasource == null) return false;

			if (!Datasource.ConnectStatement.Value.IsNullOrEmpty() &&
					!Datasource.PhoneNumber.Value.IsNullOrEmpty() &&
					!Datasource.ConnectLink.Value.IsNullOrEmpty())
			{
				return RenderingContext.CurrentOrNull.HasRenderings("footer-social");
			}

			return true;
		}
	}
}