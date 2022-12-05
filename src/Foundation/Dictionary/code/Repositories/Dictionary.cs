using Sitecore.Configuration;
using Sitecore.DependencyInjection;
using Sitecore.Globalization;
using Sitecore.Sites;
using AtriusHealth.Foundation.SitecoreExtensions.DependencyInjection;

namespace AtriusHealth.Foundation.Dictionary.Repositories
{
	public class Dictionary : IDictionaryRepository
	{
		private static readonly string DefaultDomain = Settings.GetSetting("AtriusHealth.Foundation.Dictionary.DefaultDomain", "Default");

		public static IDictionaryRepository Current => ServiceLocator.ServiceProvider.GetService<IDictionaryRepository>();

		protected string CurrentDomain { get; set; }

		public Dictionary(SiteContext site)
		{
			CurrentDomain = !string.IsNullOrEmpty(site.DictionaryDomain) ? site.DictionaryDomain : site.Name;
		}

		public virtual string Get(string key)
		{
			var text = Translate.TextByDomain(CurrentDomain, key);

			if (!text.Equals(key)) return text;

            text = Translate.TextByDomain(DefaultDomain, key);

            if (!text.Equals(key))
                return text;

            return string.Empty;
		}
	}
}
