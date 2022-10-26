using System.Linq;
using Ploeh.AutoFixture;
using Ploeh.AutoFixture.AutoNSubstitute;
using Sitecore.FakeDb.AutoFixture;

namespace Thread.Foundation.Testing.AutoFixture
{
	public class ThreadFixture : Fixture
	{
		public ThreadFixture()
		{
			Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
				.ForEach(b => Behaviors.Remove(b));
			Behaviors.Add(new OmitOnRecursionBehavior());
			Customizations.Add(new PropertyNameOmitter("Uri"));
			Customize(new AutoDbCustomization());
			Customize(new AutoNSubstituteCustomization());
		}
	}
}
