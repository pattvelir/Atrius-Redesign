using System.Web;
using System.Web.Mvc;
using StackExchange.Profiling;

namespace AtriusHealth.Foundation.Performance.Extensions
{
	public static class HtmlHelperExtensions
	{
		public static IHtmlString RenderMiniProfilerIncludes(this HtmlHelper helper)
		{
			return MiniProfiler.Current.RenderIncludes(Sitecore.Context.PageMode.IsNormal ? RenderPosition.Left : RenderPosition.BottomLeft);
		}

        public static bool IncludeMiniProfiler(this HtmlHelper helper)
        {
            return Sitecore.Configuration.Settings.GetBoolSetting("Counters.Enabled", false);
        }
	}
}
