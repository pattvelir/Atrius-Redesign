using NSubstitute;
using NUnit.Framework;
using Sitecore.Data;
using Sitecore.FakeDb;
using Thread.Feature.Search.Page;
using Thread.Foundation.Enumerations;
using Velir.Search.Core.Factory;
using Velir.Search.Core.Rules.Parser;

namespace Thread.Feature.Search.Tests.Page
{
	[TestFixture]
	public class SearchPageConfigurationTests
	{
		private Db _db;

		[SetUp]
		public void SetUp()
		{
			ID fiveItemsId = ID.NewID;
			ID testItemsId = ID.NewID;
			_db = new Db("web")
			{
				new DbTemplate(NumberOfItemsItem.TemplateId) { Fields = { NumberOfItemsItem.FieldIds.Value}},
				new DbTemplate(SearchResultsItem.TemplateId) { Fields = { SearchResultsItem.FieldIds.NumberOfItems }},
				new DbItem("Search Results Defaults", ID.NewID, SearchResultsItem.TemplateId),
				new DbItem("Search Results 5", ID.NewID, SearchResultsItem.TemplateId)
				{
					{ SearchResultsItem.FieldIds.NumberOfItems,  fiveItemsId.ToString() }
				},
				new DbItem("Search Results Test", ID.NewID, SearchResultsItem.TemplateId)
				{
					{ SearchResultsItem.FieldIds.NumberOfItems,  testItemsId.ToString() }
				},
				new DbItem("5", fiveItemsId, NumberOfItemsItem.TemplateId)
				{
					{NumberOfItemsItem.FieldIds.Value, "5" }
				},
				new DbItem("test", testItemsId,NumberOfItemsItem.TemplateId)
				{
					{NumberOfItemsItem.FieldIds.Value, "test" }
				}
			};
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void ItemsPerPage_DatasourceIsNull_Returns10()
		{
			var config = new TestSearchPageConfiguration(null, Substitute.For<ISearchRuleParser>(), Substitute.For<ISearchInterfaceFactory>());

			Assert.AreEqual(10, config.ItemsPerPage);
		}

		[Test]
		public void ItemsPerPage_NumberOfItemsIsNull_Returns10()
		{
			SearchResultsItem results = _db.GetItem("/sitecore/content/Search Results Defaults");
			
			var config = new TestSearchPageConfiguration(results, Substitute.For<ISearchRuleParser>(), Substitute.For<ISearchInterfaceFactory>());

			Assert.AreEqual(10, config.ItemsPerPage);
		}

		[Test]
		public void ItemsPerPage_NumberOfItemsNameIsNotANumber_Returns10()
		{
			SearchResultsItem results = _db.GetItem("/sitecore/content/Search Results Test");
			
			var config = new TestSearchPageConfiguration(results, Substitute.For<ISearchRuleParser>(), Substitute.For<ISearchInterfaceFactory>());

			Assert.AreEqual(10, config.ItemsPerPage);
		}

		[Test]
		public void ItemsPerPage_NumberOfItemsIs5_Returns5()
		{
			SearchResultsItem results = _db.GetItem("/sitecore/content/Search Results 5");

			var config = new TestSearchPageConfiguration(results, Substitute.For<ISearchRuleParser>(), Substitute.For<ISearchInterfaceFactory>());

			Assert.AreEqual(5, config.ItemsPerPage);
		}
	}

	public class TestSearchPageConfiguration : SearchPageConfiguration
	{
		public TestSearchPageConfiguration(SearchResultsItem resultsItem, ISearchRuleParser ruleParser, ISearchInterfaceFactory interfaceFactory) : base(ruleParser, interfaceFactory)
		{
			SearchResults = resultsItem;
		}
	}
}
