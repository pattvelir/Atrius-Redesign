using System;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;

namespace AtriusHealth.Foundation.Mvc.ViewModels
{
	public class AtriusHealthViewModel<TDatasource, TRenderingParameter> : AtriusHealthViewModel<TDatasource>
		where TDatasource : CustomItem
		where TRenderingParameter : RenderingParameters
	{
		public virtual TRenderingParameter RenderingParameters { get; internal set; }

		public override void Initialize(Rendering rendering)
		{
			base.Initialize(rendering);

			RenderingParameters = (TRenderingParameter)Activator.CreateInstance(typeof(TRenderingParameter), Rendering.Properties["Parameters"]);
		}
	}

	public class AtriusHealthViewModel<TDatasource> : RenderingModel where TDatasource : CustomItem
	{
		public virtual TDatasource Datasource { get; internal set; }

		public override void Initialize(Rendering rendering)
		{
			base.Initialize(rendering);

			Datasource = (TDatasource)Activator.CreateInstance(typeof(TDatasource), (Item)Item);
		}
	}
}
