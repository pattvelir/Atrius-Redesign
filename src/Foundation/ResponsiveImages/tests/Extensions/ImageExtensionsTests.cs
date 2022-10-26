using Glass.Mapper.Sc.Fields;
using NUnit.Framework;
using Thread.Foundation.ResponsiveImages.Extensions;

namespace Thread.Foundation.ResponsiveImages.Tests.Extensions
{
	[TestFixture]
	public class ImageExtensionsTests
	{
		[Test]
		public void GetSrcSet_ImageIsNull_ReturnsEmptyString()
		{
			Image image = null;

			string srcset = image.GetSrcSet(50, 50);

			Assert.AreEqual(string.Empty, srcset);
		}
	}
}
