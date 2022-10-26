using System.Collections.Generic;
using System.Linq;
using Sitecore.ContentSearch.Linq;
using Velir.Search.Core.Facets.Sort;
using Velir.Search.Core.Results.Facets;
using Thread.Feature.Search.References;

namespace Thread.Feature.Search.Facets
{
    public class DateRangeFilterStrategy : AbstractSortStrategy
    {
        public override IEnumerable<IFacetResultValue> OrderValues(IEnumerable<FacetValue> allValues, IEnumerable<string> selectedValues)
        {
            return new[]
            {
                new FacetResultValue{ Id =Constants.DateRange.PastWeekKey, Name = Constants.SiteSettings.DateRange.PastWeekLabel, Count = GetCount(allValues, Constants.DateRange.PastWeekKey), Selected = selectedValues.Contains(Constants.DateRange.PastWeekKey) },
                new FacetResultValue{ Id = Constants.DateRange.PastMonthKey, Name =Constants.SiteSettings.DateRange.PastMonthLabel, Count = GetCount(allValues, Constants.DateRange.PastMonthKey), Selected = selectedValues.Contains(Constants.DateRange.PastMonthKey)},
                new FacetResultValue{ Id = Constants.DateRange.PastYearKey, Name = Constants.SiteSettings.DateRange.PastYearLabel, Count = GetCount(allValues, Constants.DateRange.PastYearKey), Selected = selectedValues.Contains(Constants.DateRange.PastYearKey) }
            };
        }

        public DateRangeFilterStrategy(bool includeSelectedValues) : base(includeSelectedValues)
        {
        }

        private int GetCount(IEnumerable<FacetValue> allValues, string key)
        {
            return allValues.FirstOrDefault(v => v.Name == key)?.AggregateCount ?? 0;
        }
    }
}