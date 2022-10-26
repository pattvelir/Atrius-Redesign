using Jabberwocky.Core.Caching;

namespace Thread.Foundation.Dictionary.Repositories
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
			return _cache.GetFromCache($"Thread.Foundation.Dictionary:Key={key}", () => _provider.Get(key));
		}
	}
}