using System.Linq;
using System.Web;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.Configuration;
using AtriusHealth.Foundation.Enumerations;

namespace AtriusHealth.Feature.Events.Services
{
	[AutowireService(LifetimeScope.SingleInstance)]
	public class GoogleMapsService : IEventMappable
	{
		protected static string MapLink => Settings.GetSetting("AtriusHealth.Feature.Events.MapLink", "https://www.google.com/maps/embed/v1/place?key={0}&q={1}");
		protected static string MapApiKey => Settings.GetSetting("AtriusHealth.Feature.Events.MapApiKey");
		
		public bool ServiceIsProperlyConfigured => !string.IsNullOrEmpty(MapApiKey);

		public string GetEmbeddableMapLink(_EventDetailsItem details)
		{
			if (details == null) return null;

			StateItem state = details.State?.TargetItem;
			var cityState = $"{details.City?.Value} {state?.Value?.Value ?? string.Empty}".Trim();

			var parts = new[] { details.Address1?.Value, details.Address2?.Value, cityState, details.ZipCode?.Value };

			var location = string.Join(",", parts.Where(p => !string.IsNullOrWhiteSpace(p)));

			if (string.IsNullOrWhiteSpace(location)) return null;

			string encodedLocation = HttpUtility.UrlEncode(location);
			return string.Format(MapLink, MapApiKey, encodedLocation);
		}
	}
}
