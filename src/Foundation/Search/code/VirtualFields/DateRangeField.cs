using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Sitecore;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.Linq.Common;
using Sitecore.ContentSearch.Pipelines.GetFacets;
using Sitecore.ContentSearch.Pipelines.ProcessFacets;
using Sitecore.ContentSearch.Utilities;
using Sitecore.Diagnostics;
using Constants = AtriusHealth.Foundation.Search.Reference.Constants;

namespace AtriusHealth.Foundation.Search.VirtualFields
{
    public class DateRangeField : IVirtualFieldProcessor, IFieldQueryTranslator, ISearchIndexInitializable
    {
        protected ISearchIndex _searchIndex;
        private bool _isInitialized;
        private string _indexFieldFormat;

        public void Initialize(ISearchIndex searchIndex)
        {
            _searchIndex = searchIndex;
            _isInitialized = true;
            _indexFieldFormat = FieldFormat.GetFieldFormat(_searchIndex, IndexFieldName, typeof(DateTime));
        }

        public TranslatedFieldQuery TranslateFieldQuery(string fieldName, object fieldValue, ComparisonType comparison,
            FieldNameTranslator fieldNameTranslator)
        {
            Assert.IsTrue(_isInitialized, () => $"{GetType()}, FieldName: {FieldName} have not been initialized.");

            DateTime serverTime = Sitecore.DateUtil.ToServerTime(DateTime.UtcNow);
            if (comparison == ComparisonType.OrderBy)
                throw new InvalidOperationException($"Sorting by virtual field {fieldName} is not supported.");

            TranslatedFieldQuery translatedFieldQuery = new TranslatedFieldQuery();
            string translatedIndexFieldName = fieldNameTranslator.GetIndexFieldName(IndexFieldName, typeof(DateTime));
            switch (fieldValue.ToString())
            {
                case Constants.DateRangeKeywords.PastMonth:
                    translatedFieldQuery.FieldComparisons.Add(new Tuple<string, object, ComparisonType>(translatedIndexFieldName, ConvertToIndexFormat(serverTime.AddMonths(-1)), ComparisonType.GreaterThanOrEqual));
                    return translatedFieldQuery;
                case Constants.DateRangeKeywords.PastWeek:
                    translatedFieldQuery.FieldComparisons.Add(new Tuple<string, object, ComparisonType>(translatedIndexFieldName, ConvertToIndexFormat(serverTime.AddDays(-7.0)), ComparisonType.GreaterThanOrEqual));
                    return translatedFieldQuery;
                case Constants.DateRangeKeywords.PastYear:
                    translatedFieldQuery.FieldComparisons.Add(new Tuple<string, object, ComparisonType>(translatedIndexFieldName, ConvertToIndexFormat(serverTime.AddYears(-1)), ComparisonType.GreaterThanOrEqual));
                    return translatedFieldQuery;
                default:
                    var fromToDate= fieldValue.ToString().Split(',');
                    DateTime tempDate;
                    if (DateTime.TryParse(fromToDate[0], out tempDate))
                    {
                        translatedFieldQuery.FieldComparisons.Add(new Tuple<string, object, ComparisonType>(translatedIndexFieldName, tempDate, ComparisonType.GreaterThanOrEqual));
                        if (fromToDate.Count() > 1 && DateTime.TryParse(fromToDate[1], out tempDate))
                            translatedFieldQuery.FieldComparisons.Add(new Tuple<string, object, ComparisonType>(translatedIndexFieldName, tempDate, ComparisonType.LessThanOrEqual));
                        return translatedFieldQuery;
                    }

                    translatedFieldQuery.FieldComparisons.Add(new Tuple<string, object, ComparisonType>(fieldName, fieldValue, ComparisonType.Equal));
                    return translatedFieldQuery;
            }
        }

        public IDictionary<string, object> TranslateFieldResult(IDictionary<string, object> fields, FieldNameTranslator fieldNameTranslator)
        {
            Assert.IsTrue(_isInitialized, () => $"{GetType()}, FieldName: {FieldName} have not been initialized.");

            DateTime serverTime = Sitecore.DateUtil.ToServerTime(DateTime.UtcNow);
            string indexFieldName = fieldNameTranslator.GetIndexFieldName(IndexFieldName, typeof(DateTime));

            if (fields.ContainsKey(indexFieldName) && CompareIndexDate(fields[indexFieldName].ToString(), serverTime.AddDays(-7)) >= 0)
            {
                fields[FieldName] = Constants.DateRangeKeywords.PastWeek;
            }
            else if (fields.ContainsKey(indexFieldName) && CompareIndexDate(fields[indexFieldName].ToString(), serverTime.AddMonths(-1)) >= 0)
            {
                fields[FieldName] = Constants.DateRangeKeywords.PastMonth;
            }
            else if (fields.ContainsKey(indexFieldName) && CompareIndexDate(fields[indexFieldName].ToString(), serverTime.AddYears(-1)) >= 0)
            {
                fields[FieldName] = Constants.DateRangeKeywords.PastYear;
            }

            return fields;
        }

        public string FieldName => "daterange";
        public string IndexFieldName => "c_date_tdt";

        public GetFacetsArgs TranslateFacetQuery(GetFacetsArgs args)
        {
            Assert.IsTrue(_isInitialized, () => $"{GetType()}, FieldName: {FieldName} have not been initialized.");

            List<FacetQuery> facetQueries = args.FacetQueries.ToList();
            List<FacetQuery> list = facetQueries.Where(q =>
            {
                if (q.FieldNames.Count() == 1)
                    return q.FieldNames.First() == FieldName;
                return false;
            }).ToList();

            if (list.Count > 0)
            {
                int? minimumResultCount = list[0].MinimumResultCount;
                facetQueries.Add(new FacetQuery(null, new[]
                {
                    args.FieldNameTranslator.GetIndexFieldName(IndexFieldName, typeof (string))
                }, minimumResultCount, null));
                list.ForEach(f => facetQueries.Remove(f));
            }

            return new GetFacetsArgs(args.BaseQuery, facetQueries, args.VirtualFieldProcessors, args.FieldNameTranslator);
        }

        public IDictionary<string, ICollection<KeyValuePair<string, int>>> TranslateFacetResult(ProcessFacetsArgs args)
        {
            Assert.IsTrue(_isInitialized, () => $"{GetType()}, FieldName: {FieldName} have not been initialized.");

            DateTime serverNow = Sitecore.DateUtil.ToServerTime(DateTime.UtcNow);
            IDictionary<string, ICollection<KeyValuePair<string, int>>> facets = args.Facets;

            if (args.OriginalFacetQueries.Any(q =>
            {
                if (q.FieldNames.Count() == 1)
                    return q.FieldNames.First() == FieldName;
                return false;
            }))
            {
                List<KeyValuePair<string, int>> keyValuePairList = new List<KeyValuePair<string, int>>();
                ICollection<KeyValuePair<string, int>> source;
                facets.TryGetValue(args.FieldNameTranslator.GetIndexFieldName(IndexFieldName, typeof(DateTime)), out source);
                if (source != null && source.Any())
                {
                    List<KeyValuePair<string, int>> pastweeks = source.Where(v => CompareIndexDate(v.Key, serverNow.AddDays(-7)) >= 0).ToList();
                    if (pastweeks.Any())
                    {
                        keyValuePairList.Add(new KeyValuePair<string, int>(Constants.DateRangeKeywords.PastWeek, pastweeks.Sum(x => x.Value)));
                    }

                    List<KeyValuePair<string, int>> pastmonths = source.Where(v => CompareIndexDate(v.Key, serverNow.AddMonths(-1)) >= 0).ToList();
                    if (pastmonths.Any())
                    {
                        keyValuePairList.Add(new KeyValuePair<string, int>(Constants.DateRangeKeywords.PastMonth, pastmonths.Sum(x => x.Value)));
                    }

                    List<KeyValuePair<string, int>> pastyears = source.Where(v => CompareIndexDate(v.Key, serverNow.AddYears(-1)) >= 0).ToList();
                    if (pastyears.Any())
                    {
                        keyValuePairList.Add(new KeyValuePair<string, int>(Constants.DateRangeKeywords.PastYear, pastyears.Sum(x => x.Value)));
                    }
                }

                facets[FieldName] = keyValuePairList;
                facets.Remove(args.FieldNameTranslator.GetIndexFieldName(IndexFieldName));
            }

            return facets;
        }

        protected string ConvertToIndexFormat(DateTime date)
        {
            return Sitecore.DateUtil.ToUniversalTime(date).ToString(_indexFieldFormat);
        }

        protected int CompareIndexDate(string facetDate, DateTime date)
        {
            string indexFormat = ConvertToIndexFormat(date);
            return string.Compare(facetDate, indexFormat, true, CultureInfo.InvariantCulture);
        }

        protected DateTime StartOfWeek(DateTime date)
        {
            DayOfWeek firstDayOfWeek = Context.Language.CultureInfo.DateTimeFormat.FirstDayOfWeek;
            int num = date.DayOfWeek - firstDayOfWeek;
            if (num < 0)
                num += 7;
            return date.AddDays((double)(-1 * num)).Date;
        }
    }
}
