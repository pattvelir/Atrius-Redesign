using System.Linq;
using NSubstitute;
using NUnit.Framework;
using Sitecore.Collections;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.FakeDb;
using Sitecore.Sites;
using Sitecore.Web;
using Thread.Feature.Navigation.Repositories;
using Thread.Foundation.Multisite.Configuration;
using Thread.Foundation.Orm.Factory;
using Thread.Foundation.Orm.Services;

namespace Thread.Feature.Navigation.Tests.Repositories
{
	[TestFixture]
	public class NavigationRepositoryTests
	{
		private INavigationRepository _repository;
		private IContextProvider _context;
		private ISitecoreConfigurationManager _configManager;
		private IItemInterfaceFactory _interfaceFactory;
		private Db _db;

		[SetUp]
		public void Setup()
		{
			_db = new Db("web")
			{
				new DbTemplate(NavigationConfigurationFolderItem.TemplateId),
				new DbTemplate(PrimaryNavigationLinksFolderItem.TemplateId),
				new DbTemplate(_NavigationBaseItem.TemplateId){ Fields = { _NavigationBaseItem.FieldIds.SuppressInNavigation}},
				new DbTemplate(LinkItem.TemplateId),
				new DbItem("Home")
				{
					TemplateID = _NavigationBaseItem.TemplateId,
					Fields = { _NavigationBaseItem.FieldIds.SuppressInNavigation, "1" },
					Children = { new DbItem("Page Item") }
				},
				new DbItem("Configuration", ID.NewID, NavigationConfigurationFolderItem.TemplateId)
				{
					new DbItem("Primary Navigation", ID.NewID, PrimaryNavigationLinksFolderItem.TemplateId)
					{
						new DbItem("Nav 1", ID.NewID, PrimaryNavigationCategoryItem.TemplateId),
						new DbItem("Nav 2", ID.NewID, PrimaryNavigationCategoryItem.TemplateId),
						new DbItem("Nav 3", ID.NewID, LinkItem.TemplateId),
						new DbItem("Nav 4", ID.NewID, LinkItem.TemplateId)
					},
					new DbItem("Primary Navigation No Items")
				},
				new DbItem("No Children"),
				new DbItem("GetChildItemsTest")
				{
					new DbItem("Child 1", ID.NewID, _NavigationBaseItem.TemplateId){
						{ _NavigationBaseItem.FieldIds.SuppressInNavigation, "0" }
					},
					new DbItem("Child 2", ID.NewID, _NavigationBaseItem.TemplateId)
					{
						{ _NavigationBaseItem.FieldIds.SuppressInNavigation, "1" }
					},
					new DbItem("Child 3"),
					new DbItem("Child 4", ID.NewID, LinkItem.TemplateId)
				}
			};

			_interfaceFactory = Substitute.For<IItemInterfaceFactory>();
			_configManager = Substitute.For<ISitecoreConfigurationManager>();
			_context = Substitute.For<IContextProvider>();
			_context.GetDatabase().Returns(_db.Database);
			_context.GetItem().Returns(_db.GetItem("/sitecore/content/Home/Page Item"));

			var site = Substitute.For<ISiteContext>();
			site.StartPath.Returns("/sitecore/content/Home");
			_context.GetSite().Returns(site);
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void GetBreadcrumb_NullCurrentItem_ReturnsEmptyList()
		{
			_context.GetItem().Returns(default(Item));
			_repository = new NavigationRepository(_context, _configManager, _interfaceFactory);

			Assert.AreEqual(0, _repository.GetBreadcrumb().Count());
		}

		[Test]
		public void GetBreadcrumb_NullHomeItem_ReturnsEmptyList()
		{
			_context.GetSite().Returns(Substitute.For<ISiteContext>());

			_repository = new NavigationRepository(_context, _configManager, _interfaceFactory);

			Assert.AreEqual(0, _repository.GetBreadcrumb().Count());
		}

		[Test]
		public void GetBreadcrumb_NoShowInNavigationItems_ReturnsCurrentItem()
		{
			_repository = new NavigationRepository(_context, _configManager, _interfaceFactory);

			Assert.AreEqual(2, _repository.GetBreadcrumb().Count());
		}

		[Test]
		public void GetBreadcrumb_CurrentIsHome_ReturnsOneItem()
		{
			_context.GetItem().Returns(_db.GetItem("/sitecore/content/Home"));
			_repository = new NavigationRepository(_context, _configManager, _interfaceFactory);

			var breadcrumbs = _repository.GetBreadcrumb();

			Assert.AreEqual(1, breadcrumbs.Count());
		}
		
		[Test]
		public void GetChildLinks_NullParent_EmptyList()
		{
			_repository = new NavigationRepository(Substitute.For<IContextProvider>(), Substitute.For<ISitecoreConfigurationManager>(), Substitute.For<IItemInterfaceFactory>());

			Assert.AreEqual(0, _repository.GetChildLinks(null).Count());
		}

		[Test]
		public void GetChildLinks_NoChildren_EmptyList()
		{
			_repository = new NavigationRepository(Substitute.For<IContextProvider>(), Substitute.For<ISitecoreConfigurationManager>(), Substitute.For<IItemInterfaceFactory>());

			var item = _db.GetItem("/sitecore/content/No Children");

			Assert.AreEqual(0, _repository.GetChildLinks(item).Count());
		}

		[Test]
		public void GetChildLinks_ChildrenPages_ReturnsListOfLinks()
		{
			_repository = new NavigationRepository(Substitute.For<IContextProvider>(), Substitute.For<ISitecoreConfigurationManager>(), Substitute.For<IItemInterfaceFactory>());

			var parent = _db.GetItem("/sitecore/content/GetChildItemsTest");

			Assert.AreEqual(3, _repository.GetChildLinks(parent).Count());
		}
		
		[Test]
		public void GetPrimaryNavigation_NullConfigurationManager_ReturnsEmptyList()
		{
			_repository = new NavigationRepository(Substitute.For<IContextProvider>(), null, Substitute.For<IItemInterfaceFactory>());

			Assert.AreEqual(0, _repository.GetPrimaryNavigation().Count());
		}

		[Test]
		public void GetPrimaryNavigation_NullPrimaryNavItems_ReturnsEmptyList()
		{
			var folder = _db.GetItem("/sitecore/content/Configuration/Primary Navigation No Items");
			
			var configManager = Substitute.For<ISitecoreConfigurationManager>();
			configManager.GetSettings(PrimaryNavigationLinksFolderItem.TemplateId).Returns(folder);

			_repository = new NavigationRepository(Substitute.For<IContextProvider>(), configManager, Substitute.For<IItemInterfaceFactory>());

			Assert.AreEqual(0, _repository.GetPrimaryNavigation().Count());
		}

		[Test]
		public void GetPrimaryNavigation_NavItemsSelected_ReturnsListOfLinks()
		{
			var navConfig = _db.GetItem("/sitecore/Content/Configuration");

			var configManager = Substitute.For<ISitecoreConfigurationManager>();
			configManager.GetSettings(NavigationConfigurationFolderItem.TemplateId).Returns(navConfig);

			_repository = new NavigationRepository(Substitute.For<IContextProvider>(), configManager, Substitute.For<IItemInterfaceFactory>());

			Assert.AreEqual(4, _repository.GetPrimaryNavigation().Count());
		}

		[Test]
		public void GetPrimaryNavigation_DatasourceSpecified_ReturnsProperNavigationItems()
		{
			var navConfig = _db.GetItem("/sitecore/content/Configuration");

			var configManager = Substitute.For<ISitecoreConfigurationManager>();
			configManager.GetSettings(NavigationConfigurationFolderItem.TemplateId).Returns(navConfig);

			_repository = new NavigationRepository(Substitute.For<IContextProvider>(), configManager, Substitute.For<IItemInterfaceFactory>());

			Assert.AreEqual(0, _repository.GetPrimaryNavigation(_db.GetItem("/sitecore/content/Configuration/Primary Navigation No Items")).Count());
		}

		[Test]
		public void GetSecondaryNavigation_CurrentItemNull_ReturnsNotNull()
		{
			var context = Substitute.For<IContextProvider>();
			context.GetItem().Returns(default(Item));

			_repository = new NavigationRepository(Substitute.For<IContextProvider>(), Substitute.For<ISitecoreConfigurationManager>(), Substitute.For<IItemInterfaceFactory>());

			Assert.NotNull(_repository.GetSecondaryNavigation());
		}
	}

	public class TestSiteContext : SiteContext
	{
		public TestSiteContext() : base(new SiteInfo(new StringDictionary()))
		{

		}

		public TestSiteContext(SiteInfo info) : base(info)
		{
		}

		protected internal TestSiteContext(SiteInfo siteInfo, bool processQueryString) : base(siteInfo, processQueryString)
		{
		}
	}
}
