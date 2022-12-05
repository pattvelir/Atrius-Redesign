using NSubstitute;
using NUnit.Framework;
using AtriusHealth.Feature.Search.Results;
using AtriusHealth.Foundation.Orm.Factory;

namespace AtriusHealth.Feature.Search.Tests.Results.Formatters
{
	[TestFixture]
	public class AtriusHealthResultsFormatterTests
	{
		[Test]
		public void FormatResults_SearchResultsAreNull_ReturnsEmptyList()
		{
			var formatter = new AtriusHealthResultsFormatter(Substitute.For<IItemInterfaceFactory>());
			var results = formatter.FormatResults(null);

			Assert.IsNotNull(results);
			Assert.IsEmpty(results);
		}
	}
}
