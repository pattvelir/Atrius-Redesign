using System.Collections.Generic;
using System.Linq;
using Jabberwocky.Core.Caching;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.Data;
using Sitecore.Data.Items;
using AtriusHealth.Foundation.Abstractions.Listing;
using AtriusHealth.Foundation.Multisite.Configuration;
using AtriusHealth.Foundation.Orm.Factory;
using AtriusHealth.Foundation.Orm.Services;

namespace AtriusHealth.Feature.Search.Repositories
{
    [AutowireService(LifetimeScope.PerScope)]
    public class FeaturedResultsRepository : IFeaturedResultsRepository
    {
        private readonly ISitecoreConfigurationManager _sitecoreConfigManager;
        private readonly IItemInterfaceFactory _interfaceFactory;
        private readonly Database _db;
        private readonly ICacheProvider _cache;

        public FeaturedResultsRepository(IContextProvider context, ISitecoreConfigurationManager configManager, ICacheProvider cacheProvider, IItemInterfaceFactory interfaceFactory)
        {
            _sitecoreConfigManager = configManager;
            _interfaceFactory = interfaceFactory;
            _cache = cacheProvider;
            _db = context.GetDatabase();
        }

        public IEnumerable<Item> GetAll()
        {
            var configurationFolder = _sitecoreConfigManager.GetConfigurationFolderItem();
            var featuredResultFolder = configurationFolder.InnerItem.Children.FirstOrDefault(i => i.TemplateID == FeaturedResultsFolderItem.TemplateId);
            if (featuredResultFolder == null)
            {
                return Enumerable.Empty<Item>();
            }
            return _db.GetItem(featuredResultFolder.ID)?.Axes.GetDescendants()?.Where(i => i.TemplateID == FeaturedResultsItem.TemplateId);
        }

        public IEnumerable<IListable> Get(string keyword)
        {
            var normalizedKeyword = keyword?.Trim().ToLower();

            if (string.IsNullOrEmpty(normalizedKeyword)) return Enumerable.Empty<IListable>();

            var dictionary = _cache.GetFromCache("FeaturedResultsRepository:BuildDictionary", BuildDictionary);

            return dictionary.ContainsKey(normalizedKeyword) ? dictionary[normalizedKeyword] : Enumerable.Empty<IListable>();
        }

        protected IDictionary<string, IList<IListable>> BuildDictionary()
        {
            var dictionary = new Dictionary<string, IList<IListable>>();

            var featuredResults = GetAll();

            foreach (var result in featuredResults)
            {
                FeaturedResultsItem features = _db.GetItem(result.ID);

                var keywords = features.Keywords.Value.Split('\n').Select(k => k.Trim().ToLower());

                foreach (string keyword in keywords)
                {
                    if (dictionary.ContainsKey(keyword))
                    {
                        dictionary[keyword] = dictionary[keyword].Concat(_interfaceFactory.GetItems<IListable>(features.FeaturedItems.GetItems())).ToList();
                    }
                    else
                    {
                        dictionary.Add(keyword, _interfaceFactory.GetItems<IListable>(features.FeaturedItems.GetItems()).ToList());
                    }
                }
            }

            return dictionary;
        }

    }
}
