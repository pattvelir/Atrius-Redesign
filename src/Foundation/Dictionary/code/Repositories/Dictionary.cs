using Sitecore.Configuration;
using Sitecore.DependencyInjection;
using Sitecore.Globalization;
using Sitecore.Sites;
using Thread.Foundation.SitecoreExtensions.DependencyInjection;

namespace Thread.Foundation.Dictionary.Repositories
{
	public class Dictionary : IDictionaryRepository
	{
		private static readonly string DefaultDomain = Settings.GetSetting("Thread.Foundation.Dictionary.DefaultDomain", "Default");

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