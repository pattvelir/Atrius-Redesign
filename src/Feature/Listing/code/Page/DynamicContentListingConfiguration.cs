using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.Data.Items;
using Thread.Feature.Listing.Services;
using Velir.Search.Core.Factory;
using Velir.Search.Core.Filters;
using Velir.Search.Core.Page;
using Velir.Search.Core.Rules.Parser;
using Velir.Search.Core.Sorts;

namespace Thread.Feature.Listing.Page
{
	[AutowireService]
	public class DynamicContentListingConfiguration : PageConfiguration
	{
		protected readonly ITaxonomyHelperService TaxonomyHelper;
		protected readonly ISearchInterfaceFactory InterfaceFactory;
		public DynamicContentListingItem Datasource { get; set; }
		public DynamicContentListingConfiguration(ITaxonomyHelperService taxonomyHelper, ISearchRuleParser ruleParser, ISearchInterfaceFactory interfaceFactory)
			: base(ruleParser, interfaceFactory)
		{
			TaxonomyHelper = taxonomyHelper;
			InterfaceFactory = interfaceFactory;
		}

		public override IEnumerable<Expression<Func<T, bool>>> GetStaticFilterExpressions<T>()
		{
			yield return TaxonomyHelper.GetContentTypesFilter(Datasource.ContentTypesDisplayed.GetItems()) as Expression<Func<T, bool>>;
            yield return x => x.ItemId != PageItem.ID;

			var taxonomyFilters = Datasource.TaxonomyOverride.TargetIDs.Any()
				? TaxonomyHelper.GetTaxonomyFilters(Datasource.TaxonomyOverride.GetItems())
				: TaxonomyHelper.GetPageTaxonomyFilters(PageItem);

			foreach (var filter in taxonomyFilters)
			{
				yield return filter as Expression<Func<T, bool>>;
			}
		}

		public override ISortOption DefaultSort => Datasource?.SortMethod?.TargetItem != null
			? InterfaceFactory.GetItem<ISortOption>(Datasource?.SortMethod?.TargetItem)
			: null;

		public override string IndexName => $"sitecore_{Sitecore.Context.Database.Name}_index";

		protected int NumberOfItems
		{
			get
			{
				int.TryParse(Datasource?.NumberOfItems?.TargetItem?.Name ?? "5", out int count);

				return count > 0 ? count : 5;
			}
		}

		public override int ItemsPerPage => NumberOfItems;

		public override IEnumerable<ISearchFilterable> ValidRefinements => InterfaceFactory.GetItems<ISearchFilterable>(Datasource?.FiltersDisplayed?.GetItems() ?? Enumerable.Empty<Item>());

		public override IEnumerable<ISortOption> ValidSortOptions => DefaultSort != null ? new[] {DefaultSort} : Enumerable.Empty<ISortOption>();

	}
}
