using System.Collections.Generic;

namespace Thread.Foundation.SitecoreExtensions.Base
{
	public static class DictionaryExtensions
	{
		public static void SafeAdd(this IDictionary<string, string> dictionary, string key, string value)
		{
			if (string.IsNullOrEmpty(value)) return;

			dictionary.SafeAdd<string>(key, value);
		}

		public static void SafeAdd<T>(this IDictionary<string, T> dictionary, string key, T value) where T : class
		{
			if (dictionary == null || string.IsNullOrEmpty(key) || value == default(T)) return;

			if (dictionary.ContainsKey(key)) return;

			dictionary.Add(key, value);
		}
	}
}
