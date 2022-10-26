using NUnit.Framework;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.FakeDb;
using Thread.Feature.Listing.Services;
using Thread.Foundation.Taxonomy;

namespace Thread.Feature.Listing.Tests.Services
{
	[TestFixture]
	public class TaxonomyHelperServiceTests
	{
		private ITaxonomyHelperService _service;
		private Db _db;

		[SetUp]
		public void SetUp()
		{
			_db = new Db("web")
			{
				new DbItem("Content Type", ID.NewID,  ContentTypeItem.TemplateId)
			};

			_service = new TaxonomyHelperService();
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void GetContentTypesFilter_HasContentTypes_ReturnsExpression()
		{
			var contentType = _db.GetItem("/sitecore/content/Content Type");

			var expression = _service.GetContentTypesFilter(new[] {contentType});

			Assert.IsNotNull(expression);
		}

		[Test]
		public void GetContentTypesFilter_EmptyListOfContentTypes_ReturnsNull()
		{
			var expression = _service.GetContentTypesFilter(new Item[0]);

			Assert.IsNull(expression);
		}

		[Test]
		public void GetContentTypesFilter_NullListOfContentTypes_ReturnsNull()
		{
			var expression = _service.GetContentTypesFilter(null);

			Assert.IsNull(expression);
		}
	}
}
