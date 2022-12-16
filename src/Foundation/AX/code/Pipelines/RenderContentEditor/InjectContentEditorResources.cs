using System.Collections.Generic;
using System.Web.UI;
using Sitecore.Shell.Applications.ContentEditor.Pipelines.RenderContentEditor;

namespace AtriusHealth.Foundation.AX.Pipelines.RenderContentEditor
{
	public class InjectContentEditorResources
	{
		private readonly IList<string> _scripts = new List<string>();
		private readonly IList<string> _styles = new List<string>();

		private const string CssLinkPattern = @"<link href=""{0}"" rel=""stylesheet"" />";
		private const string JsScriptPattern = @"<script src=""{0}""></script>";

		public virtual void Process(RenderContentEditorArgs args)
		{
            foreach (string style in _styles)
			{
				AddResource(CssLinkPattern, style);
			}

			foreach (string script in _scripts)
			{
				AddResource(JsScriptPattern, script);
			}
        }

		protected virtual void AddResource(string pattern, string resource)
		{
			string resourceTag = string.Format(pattern, resource);
			Sitecore.Context.Page.Page.Header.Controls.Add(new LiteralControl(resourceTag));
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
