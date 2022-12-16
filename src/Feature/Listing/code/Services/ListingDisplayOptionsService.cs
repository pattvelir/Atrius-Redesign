using System;
using System.Web;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using AtriusHealth.Foundation.Enumerations.References;

namespace AtriusHealth.Feature.Listing.Services
{
	[AutowireService(LifetimeScope.SingleInstance)]
	public class ListingDisplayOptionsService : IListingDisplayOptionsService
	{
		public DisplayOptions GetDisplayOptions()
		{
			var queryString = HttpContext.Current.Request.QueryString;

			return new DisplayOptions
			{
				DisplayDate = ParseBool(queryString[Reference.QueryString.ShowDateKey]),
				DisplayContentType = ParseBool(queryString[Reference.QueryString.ShowContentTypeKey]),
				DisplaySummary = ParseBool(queryString[Reference.QueryString.ShowSummaryKey]),
				DisplayImageFormat = ParseEnum(queryString[Reference.QueryString.ImageFormatKey])
			};
		}

		private bool ParseBool(string paramVal)
		{
			bool.TryParse(paramVal, out bool val);

			return val;
		}

		private ImageFormat ParseEnum(string paramVal)
		{
			Enum.TryParse(paramVal, out ImageFormat format);

			return format;
		}
	}
}
