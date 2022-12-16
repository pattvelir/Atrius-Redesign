using System;

namespace AtriusHealth.Foundation.Orm.Factory.Pipeline
{
	public abstract class InterfaceFactoryProcessor<T>
    {
        protected Type InterfaceType => typeof(T);

		public virtual void Process(InterfaceFactoryPipelineArgs args)
		{
			if (args.Result != null || args.InnerItem == null) return;

			if (!ShouldBuildResult(args)) return;

			var result = BuildResult(args);
			args.Result = args.InterfaceType.IsInstanceOfType(result) ? result : null;
		}

		protected virtual bool ShouldBuildResult(InterfaceFactoryPipelineArgs args)
		{
			return args.InterfaceType == InterfaceType || InterfaceType.IsSubclassOf(args.InterfaceType);
		}
		protected abstract object BuildResult(InterfaceFactoryPipelineArgs args);
	}
}
