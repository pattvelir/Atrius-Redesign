using NSubstitute;
using NUnit.Framework;
using Thread.Feature.Search.Results;
using Thread.Foundation.Orm.Factory;

namespace Thread.Feature.Search.Tests.Results.Formatters
{
	[TestFixture]
	public class ThreadResultsFormatterTests
	{
		[Test]
		public void FormatResults_SearchResultsAreNull_ReturnsEmptyList()
		{
			var formatter = new ThreadResultsFormatter(Substitute.For<IItemInterfaceFactory>());
			var results = formatter.FormatResults(null);

			Assert.IsNotNull(results);
			Assert.IsEmpty(results);
		}
	}
}