using Sitecore.Configuration;
using Sitecore.Data;

namespace Thread.Foundation.Workflow.References
{
	public class Databases
	{
		private static Database _masterDb;
		public static Database Master => _masterDb ?? (_masterDb = Factory.GetDatabase("master"));

		private static Database _webDb;
		public static Database Web => _webDb ?? (_webDb = Factory.GetDatabase("web"));
	}
}