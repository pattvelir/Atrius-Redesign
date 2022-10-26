using Sitecore.Configuration;
using Thread.Foundation.Enumerations;

namespace Thread.Feature.Events.Services
{
	public class MapQuestService : IEventMappable
	{
		protected static string MapLink => Settings.GetSetting("Thread.Feature.Events.MapLink", "https://www.mapquest.com/embed/us/{0}/{1}/{2}/{3}?zoom=15&maptype=map");

		public bool ServiceIsProperlyConfigured => true;

		public virtual string GetEmbeddableMapLink(_EventDetailsItem details)
		{
			if (details == null) return null;

			StateItem stateItem = details.State?.TargetItem;
			string state = FormatUrlPart(stateItem?.Value?.Value);
			string city = FormatUrlPart(details.City?.Value);
			string zip = FormatUrlPart(details.ZipCode?.Value);
			string address = FormatUrlPart(details.Address1?.Value);

			return string.Format(MapLink, state, city, zip, address);
		}

		private string FormatUrlPart(string part)
		{
			return part?.ToLower().Replace(" ", "-") ?? string.Empty;
		}
	}
}