using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using Sitecore.Data;
using Sitecore.FakeDb;
using Thread.Feature.PageContent.Extensions;
using Thread.Foundation.Taxonomy;

namespace Thread.Feature.PageContent.Tests.ExtensionsTests
{
	[TestFixture]
	public class AuthorExtensionsTests
	{
		private Db _db;

		[SetUp]
		public void SetUp()
		{
			_db = new Db("web")
			{
				new DbTemplate(PersonItem.TemplateId){ Fields = { PersonItem.FieldIds.FirstName, PersonItem.FieldIds.LastName }},
				new DbItem("Kevin Mazzoni", ID.NewID, PersonItem.TemplateId)
				{
					{ PersonItem.FieldIds.FirstName, "Kevin" },
					{ PersonItem.FieldIds.LastName, "Mazzoni" }
				},
				new DbItem("Chris Smith", ID.NewID, PersonItem.TemplateId)
				{
					{ PersonItem.FieldIds.FirstName, "Chris" },
					{ PersonItem.FieldIds.LastName, "Smith" }
				},
				new DbItem("Corey Caplette", ID.NewID, PersonItem.TemplateId)
				{
					{ PersonItem.FieldIds.FirstName, "Corey" },
					{ PersonItem.FieldIds.LastName, "Caplette" }
				}
			};
		}

		[TearDown]
		public void TearDown()
		{
			_db.Dispose();
		}

		[Test]
		public void GetByline_NullEnumerable_ReturnsEmptyString()
		{
			// ARRANGE
			IEnumerable<PersonItem> authors = null;

			// ACT
			string byline = authors.GetByline();

			// ASSERT
			Assert.AreEqual(string.Empty, byline);
		}

		[Test]
		public void GetByline_EmptyEnumerable_ReturnsEmptyString()
		{
			// ARRANGE
			IEnumerable<PersonItem> authors = Enumerable.Empty<PersonItem>();

			// ACT
			string byline = authors.GetByline();

			// ASSERT
			Assert.AreEqual(string.Empty, byline);
		}

		[Test]
		public void GetByline_OneAuthor_ReturnsAuthorFullName()
		{
			// ARRANGE
			PersonItem author = _db.GetItem("/sitecore/content/Kevin Mazzoni");
			
			var authors = new[] { author };

			// ACT
			string byline = authors.GetByline();

			// Assert
			Assert.AreEqual("Kevin Mazzoni", byline);
		}

		[Test]
		public void GetByline_TwoAuthors_ReturnsAuthorFullNamesSeparatedByAnd()
		{
			// ARRANGE
			PersonItem author1 = _db.GetItem("/sitecore/content/Kevin Mazzoni");

			PersonItem author2 = _db.GetItem("/sitecore/content/Chris Smith");

			var authors = new[] { author1, author2 };

			// ACT
			string byline = authors.GetByline();

			// Assert
			Assert.AreEqual("Kevin Mazzoni and Chris Smith", byline);
		}

		[Test]
		public void GetByline_ThreeAuthors_ReturnsAuthorNamesSeparatedByCommaExceptFinalNameSeparatedByAnd()
		{
			// ARRANGE
			PersonItem author1 = _db.GetItem("/sitecore/content/Kevin Mazzoni");

			PersonItem author2 = _db.GetItem("/sitecore/content/Chris Smith");

			PersonItem author3 = _db.GetItem("/sitecore/content/Corey Caplette");

			var authors = new[] { author1, author2, author3 };

			// ACT
			string byline = authors.GetByline();

			// Assert
			Assert.AreEqual("Kevin Mazzoni, Chris Smith and Corey Caplette", byline);
		}

		[Test]
		public void GetByline_ContainsNullAuthor_ReturnsBylineWithoutAuthor()
		{
			// ARRANGE
			PersonItem author1 = _db.GetItem("/sitecore/content/Kevin Mazzoni");

			PersonItem author2 = _db.GetItem("/sitecore/content/Chris Smith");

			PersonItem author3 = default(PersonItem);

			var authors = new[] { author1, author2, author3 };

			// ACT
			string byline = authors.GetByline();

			// Assert
			Assert.AreEqual("Kevin Mazzoni and Chris Smith", byline);
		}
	}
}