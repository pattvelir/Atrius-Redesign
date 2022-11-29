using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtriusHealth.Foundation.Taxonomy;

namespace AtriusHealth.Feature.PageContent.Extensions
{
	public static class AuthorExtensions
	{
		public static string GetByline(this IEnumerable<PersonItem> authors)
		{
			string[] authorNames = authors?.Where(a => a != null).Select(a => $"{a.FirstName?.Value} {a.LastName?.Value}").ToArray() ?? new string[0];
			StringBuilder byline = new StringBuilder();

			for (int i = 0; i < authorNames.Length; i++)
			{
				if (i > 0)
				{
					byline.Append(i == authorNames.Length - 1 ? " and " : ", ");
				}
				
				byline.Append(authorNames[i]);
			}
			
			return byline.ToString();
		}
	}
}
