using Jabberwocky.Core.Caching;

namespace AtriusHealth.Foundation.Dictionary.Repositories
{
	public class DictionaryCacheDecorator : IDictionaryRepository
	{
		private readonly IDictionaryRepository _provider;
		private readonly ICacheProvider _cache;

		public DictionaryCacheDecorator(IDictionaryRepository provider, ICacheProvider cache)
		{
			_provider = provider;
			_cache = cache;
		}

		public string Get(string key)
		{
			return _cache.GetFromCache($"AtriusHealth.Foundation.Dictionary:Key={key}", () => _provider.Get(key));
		}
	}
}
