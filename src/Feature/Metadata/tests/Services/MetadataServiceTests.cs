using NSubstitute;
using NUnit.Framework;
using Sitecore.Data;
using Sitecore.FakeDb;
using Thread.Feature.Metadata.Reference;
using Thread.Feature.Metadata.Services;
using Thread.Foundation.Multisite.Configuration;
using Thread.Feature.PageContent;
using Thread.Foundation.Orm.Factory;

namespace Thread.Feature.Metadata.Tests.Services
{
	[TestFixture]
	public class MetadataServiceTests
	{
		private IMetadataService _metadataService;
		private ISitecoreConfigurationManager _configurationManager;
        private IItemInterfaceFactory _interfaceFactory;

		private Db _db;

		[SetUp]
		public void SetUp()
		{
			ID pageTemplateId = ID.NewID;
			_db = new Db("web")
			{
				new DbTemplate(_IndexBaseItem.TemplateId) { Fields = { _IndexBaseItem.FieldIds.NoIndex, _IndexBaseItem.FieldIds.NoFollow }},
				new DbTemplate(_TitleBaseItem.TemplateId) { Fields = { _TitleBaseItem.FieldIds.Title }},
				new DbTemplate(_SummaryBaseItem.TemplateId) { Fields = { _SummaryBaseItem.FieldIds.Summary }},
				new DbTemplate("Page", pageTemplateId){ BaseIDs = new []{_TitleBaseItem.TemplateId, _SummaryBaseItem.TemplateId}},
				new DbItem("Configuration", ID.NewID, MetadataConfigurationItem.TemplateId)
				{
					{ MetadataConfigurationItem.FieldIds.PageTitleSeparator, " | "},
					{ MetadataConfigurationItem.FieldIds.SiteName, "Velir" }
				},
				new DbItem("Home", ID.NewID, _MetadataBaseItem.TemplateId)
				{
					{ _MetadataBaseItem.FieldIds.MetaHtml, "<script>Current Page</script>" }
				},
				new DbItem("Demo No Title"),
				new DbItem("Demo", ID.NewID, pageTemplateId)
				{
					{ _TitleBaseItem.FieldIds.Title, "Demo Page Title" },
					{ _SummaryBaseItem.FieldIds.Summary, "Test Description" }
				},
				new DbItem("No Index", ID.NewID, _IndexBaseItem.TemplateId)
				{
					{ _IndexBaseItem.FieldIds.NoFollow, "0" },
					{ _IndexBaseItem.FieldIds.NoIndex, "1" }
				},
				new DbItem("No Follow", ID.NewID, _IndexBaseItem.TemplateId)
				{
					{ _IndexBaseItem.FieldIds.NoFollow, "1" },
					{ _IndexBaseItem.FieldIds.NoIndex, "0" }
				},
				new DbItem("No Index No Follow", ID.NewID, _IndexBaseItem.TemplateId)
				{
					{ _IndexBaseItem.FieldIds.NoFollow, "1" },
					{ _IndexBaseItem.FieldIds.NoIndex, "1" }
				}
			};

			_configurationManager = Substitute.For<ISitecoreConfigurationManager>();
			_configurationManager.GetSettings(MetadataConfigurationItem.TemplateId).Returns(_db.GetItem("/sitecore/content/Configuration"));

            _interfaceFactory = Substitute.For<IItemInterfaceFactory>();

			_metadataService = new MetadataService(_configurationManager, _interfaceFactory);
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void MetadataService_NullConfigurationManager_DoesNotThrow()
		{
			Assert.DoesNotThrow(() => new MetadataService(null, _interfaceFactory));
		}

		[Test]
		public void GetHtmlPageTitle_NullPageItemNullConfigManager_ReturnsEmptyString()
		{
			var service = new MetadataService(null, _interfaceFactory);

			Assert.IsEmpty(service.GetHtmlPageTitle(null));
		}

		[Test]
		public void GetHtmlPageTitle_NullPageItem_ReturnsSiteName()
		{
			Assert.AreEqual("Velir", _metadataService.GetHtmlPageTitle(null));
		}

		[Test]
		public void GetHtmlPageTitle_NullConfigurationManager_ReturnsPageTitleOnly()
		{
			var service = new MetadataService(null, _interfaceFactory);

			var pageItem = _db.GetItem("/sitecore/content/Demo No Title");

			Assert.AreEqual("Demo No Title", service.GetHtmlPageTitle(pageItem));
		}

		[Test]
		public void GetHtmlPageTitle_TitleSet_ReturnsPageTitleAndSiteName()
		{
			var pageItem = _db.GetItem("/sitecore/content/Demo");

			Assert.AreEqual("Demo Page Title | Velir", _metadataService.GetHtmlPageTitle(pageItem));
		}

		[Test]
		public void GetCustomHeadHtml_NullPageItemNullConfigManager_ReturnsEmptyString()
		{
			var service = new MetadataService(null, _interfaceFactory);

			Assert.IsEmpty(service.GetCustomHeadHtml(null));
		}

		[Test]
		public void GetCustomHeadHtml_NullConfigManager_ReturnsPageCustomHtml()
		{
			var service = new MetadataService(null, _interfaceFactory);

			var home = _db.GetItem("/sitecore/content/Home");

			Assert.AreEqual("<script>Current Page</script>", service.GetCustomHeadHtml(home));
		}

		[Test]
		public void GetPageMetadata_NoSearchSettings_ReturnsDictionaryWithoutRobotsTag()
		{
			var pageItem = _db.GetItem("/sitecore/content/Demo No Title");
			var metadata = _metadataService.GetPageMetadata(pageItem);

			Assert.IsFalse(metadata.MetaTags.ContainsKey(Constants.MetaTagNames.Robots));
		}

		[Test]
		public void GetPageMetadata_NoFollow_ReturnsProperRobotsTag()
		{
			var pageItem = _db.GetItem("/sitecore/content/No Follow");
			var metadata = _metadataService.GetPageMetadata(pageItem);

			Assert.AreEqual("nofollow", metadata.MetaTags[Constants.MetaTagNames.Robots]);
		}

		[Test]
		public void GetPageMetadata_NoIndex_ReturnsProperRobotsTag()
		{
			var pageItem = _db.GetItem("/sitecore/content/No Index");
			var metadata = _metadataService.GetPageMetadata(pageItem);

			Assert.AreEqual("noindex", metadata.MetaTags[Constants.MetaTagNames.Robots]);
		}

		[Test]
		public void GetPageMetadata_NoIndexNoFollow_ReturnsProperRobotsTag()
		{
			var pageItem = _db.GetItem("/sitecore/content/No Index No Follow");
			var metadata = _metadataService.GetPageMetadata(pageItem);

			Assert.AreEqual("noindex,nofollow", metadata.MetaTags[Constants.MetaTagNames.Robots]);
		}

		[Test]
		public void GetPageMetadata_MetaDescription_ReturnsProperDescriptionTag()
		{
			var pageItem = _db.GetItem("/sitecore/content/Demo");
			var metadata = _metadataService.GetPageMetadata(pageItem);

			Assert.AreEqual("Test Description", metadata.MetaTags[Constants.MetaTagNames.Description]);
		}
	}
}
