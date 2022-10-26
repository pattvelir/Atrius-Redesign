using Sitecore.ContentSearch;
using System;
using System.Linq.Expressions;
using Velir.Search.Core.Helpers;
using Velir.Search.Core.Predicates.Builders;
using Velir.Search.Solr.Results;

namespace Thread.Foundation.Search.Builders
{
    public class SolrDateBoostPredicateBuilder<T> : AbstractQueryPredicateBuilder<T> where T : SolrSearchResultItem
    {
        private readonly ISearchResultItemHelper _itemHelper;
        private readonly ISearchIndex _currentIndex;

        public SolrDateBoostPredicateBuilder(ISearchResultItemHelper itemHelper, string indexName)
        {
            _itemHelper = itemHelper;
            _currentIndex = ContentSearchManager.GetIndex(indexName);
        }

        public override Expression<Func<T, bool>> Build()
        {
            string dateField = _itemHelper.GetIndexFieldName<T>();
            if (!string.IsNullOrEmpty(dateField))
            {
                string translatedDateField = _currentIndex.FieldNameTranslator.GetIndexFieldName(dateField);
                return x => x.Val == $"recip(ms(NOW, {translatedDateField}), 3.16e-11, 100, 1.8)";
            }

            return null;
        }
    }
}