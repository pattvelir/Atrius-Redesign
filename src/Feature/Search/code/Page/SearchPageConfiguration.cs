using System.Linq;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Thread.Foundation.Enumerations;
using Velir.Search.Core.Extensions;
using Velir.Search.Core.Factory;
using Velir.Search.Core.Page;
using Velir.Search.Core.Rules.Parser;

namespace Thread.Feature.Search.Page
{
	[AutowireService]
	public class SearchPageConfiguration : PageConfiguration
	{
		private SearchResultsItem _results;
		protected virtual SearchResultsItem SearchResults
		{
			get { return _results ?? (_results = PageItem.GetDatasources(SearchResultsItem.TemplateId).FirstOrDefault()); }
			set { _results = value; }
		}

		public SearchPageConfiguration(ISearchRuleParser ruleParser, ISearchInterfaceFactory interfaceFactory)
			: base(ruleParser, interfaceFactory)
		{
			
		}

		public override int ItemsPerPage
		{
			get
			{
				NumberOfItemsItem item = SearchResults?.NumberOfItems?.TargetItem;
				return item?.Value?.Value.ToInt() ?? 10;
			}
		}
	}
}
