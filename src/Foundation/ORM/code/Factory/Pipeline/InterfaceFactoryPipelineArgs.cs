using System;
using Sitecore.Data.Items;
using Sitecore.Pipelines;

namespace AtriusHealth.Foundation.Orm.Factory.Pipeline
{
	public class InterfaceFactoryPipelineArgs : PipelineArgs
	{
		public Type InterfaceType { get; set; }
		public Item InnerItem { get; set; }
		public object Result { get; set; }
	}
}
