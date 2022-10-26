using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore.ContentSearch.SearchTypes;
using Thread.Foundation.Search.Builders;
using Velir.Search.Core.Extensions;
using Velir.Search.Core.Helpers;
using Velir.Search.Core.Pipelines.VelirSearchQuery;
using Velir.Search.Core.Pipelines.VelirSearchQuery.Args;
using Velir.Search.Core.Predicates.Builders;
using Velir.Search.Core.Queries;
using Velir.Search.Core.Reference;

namespace Thread.Foundation.Search.Pipelines.VelirSearchApplyFilters
{
	// Note: KeywordPredicateBuilder is customized for 10.1
	public class ApplyKeywordFilter : AbstractVelirSearchQueryProcessor<SearchResultItem>
	{
		private readonly ISearchResultItemHelper _itemHelper;
		private readonly IQueryFormatter _queryFormatter;
		private readonly ITypeHelper _typeHelper;

		public ApplyKeywordFilter(ISearchResultItemHelper itemHelper, IQueryFormatter queryFormatter, ITypeHelper typeHelper)
		{
			_itemHelper = itemHelper;
			_queryFormatter = queryFormatter;
			_typeHelper = typeHelper;
		}

		public override void Process<T>(VelirSearchQueryArgs<T> args)
		{
			var values = GetSelectedValues(args.Request.QueryParameters, SiteSettings.QueryString.QueryKey);
			if (values.Any())
			{
				args.Query = args.Query.Filter(new Thread.Foundation.Search.Builders.KeywordPredicateBuilder<T>(_queryFormatter, _itemHelper, values, _typeHelper));
			}
		}
		protected virtual IList<string> GetSelectedValues(IDictionary<string, string> queryParams, string filterKey)
		{
			var keys = filterKey.Split(new[] { Constants.KeySeparator }, StringSplitOptions.RemoveEmptyEntries);

			var values = new List<string>();

			foreach (var key in keys)
			{
				if (queryParams.ContainsKey(key))
				{
					values.AddRange(queryParams[key].Split(SiteSettings.ValueSeparator));
				}
			}

			return values;
		}
	}
}