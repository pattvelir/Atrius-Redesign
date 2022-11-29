using NSubstitute;
using NUnit.Framework;
using Sitecore.Data;
using Sitecore.FakeDb;
using AtriusHealth.Foundation.Multisite.Configuration;
using AtriusHealth.Foundation.Orm.Services;

namespace AtriusHealth.Foundation.Multisite.Tests.Sitecore
{
	[TestFixture]
	public class SitecoreConfigurationManagerTests
	{
		private IContextProvider _context;
		private Db _db;

		[SetUp]
		public void Setup()
		{
			_db = new Db("web")
			{
				new DbItem("Test")
				{
					new DbItem("Home")
				},
				new DbItem("HasConfiguration")
				{
					new DbItem("Home"),
					new DbItem("Configuration", ID.NewID, SiteConfigurationFolderItem.TemplateId)
				}
			};

			_context = Substitute.For<IContextProvider>();
			_context.GetDatabase().Returns(_db.Database);
			
			var site = Substitute.For<ISiteContext>();
			site.StartPath.Returns("/sitecore/content/Test/Home");
			_context.GetSite().Returns(site);
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void GetConfigurationFolder_StartItemDoesNotExist_ReturnsNull()
		{
			var configManager = new SitecoreConfigurationManager(Substitute.For<IContextProvider>());
			Assert.IsNull(configManager.GetConfigurationFolderItem());
		}

		[Test]
		public void GetConfigurationFolder_ConfigurationFolderDoesNotExist_ReturnsNull()
		{
			var configManager = new SitecoreConfigurationManager(_context);
			
			Assert.IsNull(configManager.GetConfigurationFolderItem());
		}

		[Test]
		public void GetConfigurationFolder_ConfigurationFolderExists_ReturnsItem()
		{
			var site = Substitute.For<ISiteContext>();
			site.StartPath.Returns("/sitecore/content/HasConfiguration/Home");
			_context.GetSite().Returns(site);

			var configManager = new SitecoreConfigurationManager(_context);

			Assert.IsNotNull(configManager.GetConfigurationFolderItem());
		}
	}
}
