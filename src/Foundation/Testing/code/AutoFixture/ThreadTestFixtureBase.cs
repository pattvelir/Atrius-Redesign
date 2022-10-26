using NUnit.Framework;

namespace Thread.Foundation.Testing.AutoFixture
{
	public abstract class ThreadTestFixtureBase
	{
		protected ThreadFixture ThreadFixture;

		[SetUp]
		public virtual void SetUp()
		{
			ThreadFixture = new ThreadFixture();
		}
	}
}
