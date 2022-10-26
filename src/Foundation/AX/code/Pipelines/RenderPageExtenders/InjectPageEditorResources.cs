using System.Collections.Generic;
using System.IO;
using Sitecore.Mvc.ExperienceEditor.Pipelines.RenderPageExtenders;

namespace Thread.Foundation.AX.Pipelines.RenderPageExtenders
{
	public class InjectPageEditorResources : RenderPageExtendersProcessor
	{
		private readonly IList<string> _scripts = new List<string>();
		private readonly IList<string> _styles = new List<string>();

		private const string CssLinkPattern = @"<link href=""{0}"" rel=""stylesheet"" />";

		public override void Process(RenderPageExtendersArgs args)
		{
			Render(args.Writer);
		}

		protected override bool Render(TextWriter output)
		{
			foreach (string style in _styles)
			{
				output.Write(CssLinkPattern, style);
			}

			foreach (string script in _scripts)
			{
				output.Write(Sitecore.Web.HtmlUtil.GetClientScriptIncludeHtml(script));
			}

			return true;
		}

		public void AddStyleResource(string resource)
		{
			_styles.Add(resource);
		}

		public void AddScriptResource(string resource)
		{
			_scripts.Add(resource);
		}
	}
}