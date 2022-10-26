using NUnit.Framework;
using Sitecore.Data;
using Sitecore.FakeDb;
using Thread.Foundation.Taxonomy.Extensions;

namespace Thread.Foundation.Taxonomy.Tests.Extensions
{
	[TestFixture]
	public class AuthorExtensionsTests
	{
		private Db _db;

		[SetUp]
		public void Setup()
		{
			_db = new Db("web")
			{
				new DbTemplate(PersonItem.TemplateId) { Fields = { _NameBaseItem.FieldIds.FirstName, _NameBaseItem.FieldIds.LastName}},
				new DbItem("Joe Smith", ID.NewID, PersonItem.TemplateId)
				{
					{ _NameBaseItem.FieldIds.FirstName, "Joe" },
					{ _NameBaseItem.FieldIds.LastName, "Smith" }
				},
				new DbItem("No Name", ID.NewID, PersonItem.TemplateId),
				new DbItem("First Name", ID.NewID, PersonItem.TemplateId){
					{ _NameBaseItem.FieldIds.FirstName, "Joe" }
				},
				new DbItem("Last Name", ID.NewID, PersonItem.TemplateId)
				{
					{ _NameBaseItem.FieldIds.LastName, "Smith" }
				}
			};
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void GetFullName_AuthorIsNull_ReturnsNull()
		{
			PersonItem author = null;

			Assert.IsNull(author.GetFullName());
		}

		[Test]
		public void GetFullName_AuthorHasFirstNameLastName_ReturnsFullName()
		{
			PersonItem author = _db.GetItem("/sitecore/content/Joe Smith");
			
			Assert.AreEqual("Joe Smith", author.GetFullName());
		}

		[Test]
		public void GetFullName_AuthorNoFirstName_ReturnsLastName()
		{
			PersonItem author = _db.GetItem("/sitecore/content/Last Name");

			Assert.AreEqual("Smith", author.GetFullName());
		}

		[Test]
		public void GetFullName_AuthorNoLastName_ReturnsFirstName()
		{
			PersonItem author = _db.GetItem("/sitecore/content/First Name");

			Assert.AreEqual("Joe", author.GetFullName());
		}

		[Test]
		public void GetFullName_AuthorNoFirstOrLastName_ReturnsEmptyString()
		{
			PersonItem author = _db.GetItem("/sitecore/content/No Name");

			Assert.AreEqual(string.Empty, author.GetFullName());
		}
	}
}
