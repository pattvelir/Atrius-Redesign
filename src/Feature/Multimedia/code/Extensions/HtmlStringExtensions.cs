using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Practices.EnterpriseLibrary.Common.Utility;

namespace Thread.Feature.Multimedia.Extensions
{
	public static class HtmlStringExtensions
	{
		/// <summary>
		/// Sets all descendant img elements to have alt="". If alt attribute missing, it will be added.
		/// This is useful in some accessibility scenarios.
		/// </summary>
		/// <param name="input"></param>
		/// <returns></returns>
		public static HtmlString ClearAltTagFromImgNodes(this HtmlString input)
		{
			var doc = new HtmlAgilityPack.HtmlDocument();
			doc.LoadHtml(input.ToString());

			if (!doc.DocumentNode.Descendants("img").Any())
			{
				return input;
			}

			doc.DocumentNode.Descendants("img").ForEach(n => n.Attributes["alt"].Value = "");

			return new HtmlString(doc.DocumentNode.OuterHtml);
		}
	}
}