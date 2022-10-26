using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Ploeh.AutoFixture.Kernel;

namespace Thread.Foundation.Testing.AutoFixture
{
	public class PropertyNameOmitter : ISpecimenBuilder
	{
		private readonly IEnumerable<string> names;

		public PropertyNameOmitter(params string[] names)
		{
			this.names = names;
		}

		public object Create(object request, ISpecimenContext context)
		{
			var propInfo = request as PropertyInfo;
			if (propInfo != null && names.Contains(propInfo.Name))
			{
				return new OmitSpecimen();
			}

			return new NoSpecimen();
		}
	}
}
