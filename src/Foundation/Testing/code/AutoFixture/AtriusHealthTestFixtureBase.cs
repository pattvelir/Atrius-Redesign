using NUnit.Framework;

namespace AtriusHealth.Foundation.Testing.AutoFixture
{
	public abstract class AtriusHealthTestFixtureBase
	{
		protected AtriusHealthFixture AtriusHealthFixture;

		[SetUp]
		public virtual void SetUp()
		{
			AtriusHealthFixture = new AtriusHealthFixture();
		}
	}
}
