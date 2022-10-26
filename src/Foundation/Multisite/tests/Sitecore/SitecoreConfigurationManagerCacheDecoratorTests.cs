using System;
using Jabberwocky.Core.Caching;
using NSubstitute;
using NUnit.Framework;
using Sitecore.Data.Items;
using Thread.Foundation.Multisite.Configuration;

namespace Thread.Foundation.Multisite.Tests.Sitecore
{
	[TestFixture]
	public class SitecoreConfigurationManagerCacheDecoratorTests
	{
		private ISitecoreConfigurationManager _innerSitecoreConfigurationManager;
		private ICacheProvider _cacheProvider;
		
		[SetUp]
		public void Setup()
		{
			_innerSitecoreConfigurationManager = Substitute.For<ISitecoreConfigurationManager>();
			_cacheProvider = Substitute.For<ICacheProvider>();
		}

		[Test]
		public void GetConfigurationFolder_NullConfigurationManager_DoesNotThrow()
		{
			Assert.DoesNotThrow(() => new SitecoreConfigurationManagerCacheDecorator(null, _cacheProvider));
		}

		[Test]
		public void GetConfigurationFolder_NullCacheProvider_DoesNotThrow()
		{
			Assert.DoesNotThrow(() => new SitecoreConfigurationManagerCacheDecorator(_innerSitecoreConfigurationManager, null));
		}

		[Test]
		public void GetConfigurationFolder_CallsGetFromCache()
		{
			var decorator = new SitecoreConfigurationManagerCacheDecorator(_innerSitecoreConfigurationManager, _cacheProvider);

			decorator.GetConfigurationFolderItem();

			_cacheProvider.Received(1).GetFromCache(Arg.Any<string>(), Arg.Any<Func<SiteConfigurationFolderItem>>());
		}

		[Test]
		public void GetSettings_CallsInnerGetConfigurationFolder()
		{
			var decorator = new SitecoreConfigurationManagerCacheDecorator(_innerSitecoreConfigurationManager, _cacheProvider);

			decorator.GetSettings(SiteFolderItem.TemplateId);

			_cacheProvider.Received(1).GetFromCache(Arg.Any<string>(), Arg.Any<Func<Item>>());
		}

		[Test]
		public void GettSettings_SpecifiesType_ClassGetFromCacheWithUniqueKey()
		{
			var decorator = new SitecoreConfigurationManagerCacheDecorator(_innerSitecoreConfigurationManager, _cacheProvider);

			decorator.GetSettings(SiteFolderItem.TemplateId);

			_cacheProvider.Received(1).GetFromCache($"SitecoreConfigurationManager:GetSettings:TemplateId={SiteFolderItem.TemplateId}", Arg.Any<Func<Item>>());
		}
	}
}