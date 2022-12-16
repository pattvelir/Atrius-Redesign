using NUnit.Framework;
using Sitecore.Data;
using Sitecore.FakeDb;
using Sitecore.Sites;
using AtriusHealth.Foundation.Aliases.Resolvers;

namespace AtriusHealth.Foundation.Aliases.Tests.Resolvers
{
	[TestFixture]
	public class SiteSpecificAliasResolverTests
	{
		private SiteContext _site1;
		private Db _db;

		private IAliasResolver _aliasResolver;
		
		[SetUp]
		public void SetUp()
		{
			_site1 = new Sitecore.FakeDb.Sites.FakeSiteContext(
				new Sitecore.Collections.StringDictionary
				{
					{ "name", "site1" }, { "database", "web" }
				});

			ID globalLinkItem = ID.NewID;
			ID site1LinkItem = ID.NewID;
			ID site2LinkItem = ID.NewID;

			_db = new Db("web")
			{
				new DbItem("Global Linked Item", globalLinkItem),
				new DbItem("Site1 Linked Item", site1LinkItem),
				new DbItem("Site2 Linked Item", site2LinkItem),
				new DbItem("Aliases")
				{
					ParentID = Sitecore.ItemIDs.SystemRoot,
					Children =
					{
						new DbItem("Global")
						{
							new DbItem("GlobalAliasTest")
							{
								new DbLinkField("Linked item")
								{
									LinkType = "internal",
									TargetID = globalLinkItem
								}
							},
							new DbItem("GlobalExternalAliasTest")
							{
								new DbLinkField("Linked item")
								{
									LinkType = "external",
									Url = "http://www.velir.com"
								}
							}
						},
						new DbItem("Site1")
						{
							new DbItem("Site1AliasTest")
							{
								new DbLinkField("Linked item")
								{
									LinkType = "internal",
									TargetID = site1LinkItem
								}
							},
							new DbItem("Site1ExternalAliasTest")
							{
								new DbLinkField("Linked item")
								{
									LinkType = "external",
									Url = "http://www.velir.com"
								}
							}
						},
						new DbItem("Site2")
						{
							new DbItem("Site2AliasTest")
							{
								new DbLinkField("Linked item")
								{
									LinkType = "internal",
									TargetID = site2LinkItem
								}
							},
							new DbItem("Site2ExternalAliasTest")
							{
								new DbLinkField("Linked item")
								{
									LinkType = "external",
									Url = "http://www.velir.com"
								}
							}
						}
					}
				}
			};

			_aliasResolver = new SiteSpecificAliasResolver(_site1, _db.Database);
		}
		
		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void Exists_GlobalAliasExists_ReturnsTrue()
		{
			Assert.True(_aliasResolver.Exists("/globalaliastest"));
		}

		[Test]
		public void Exists_SiteSpecificAliasExists_ReturnsTrue()
		{
			Assert.True(_aliasResolver.Exists("/site1aliastest"));
		}

		[Test]
		public void Exists_SiteSpecificAliasExistsForOtherSite_ReturnsFalse()
		{
			Assert.False(_aliasResolver.Exists("/site2aliastest"));
		}

		[Test]
		public void GetTargetID_GlobalAliasExists_ReturnsID()
		{
			Assert.AreNotEqual(ID.Null, _aliasResolver.GetTargetID("/globalaliastest"));
		}

		[Test]
		public void GetTargetID_SiteSpecificAliasExists_ReturnsID()
		{
			Assert.AreNotEqual(ID.Null, _aliasResolver.GetTargetID("/site1aliastest"));
		}

		[Test]
		public void GetTargetID_SiteSpecificAliasExistsForOtherSite_ReturnsNull()
		{
			Assert.AreEqual(ID.Null, _aliasResolver.GetTargetID("/site2aliastest"));
		}

		[Test]
		public void GetTargetUrl_GlobalAliasExists_ReturnsString()
		{
			Assert.IsNotEmpty(_aliasResolver.GetTargetUrl("/globalexternalaliastest"));
		}

		[Test]
		public void GetTargetUrl_SiteSpecificAliasExists_ReturnsString()
		{
			Assert.IsNotEmpty(_aliasResolver.GetTargetUrl("/site1externalaliastest"));
		}

		[Test]
		public void GetTargetUrl_SiteSpecificAliasExistsForOtherSite_ReturnsNull()
		{
			Assert.IsEmpty(_aliasResolver.GetTargetUrl("/site2externalaliastest"));
		}
	}
}
