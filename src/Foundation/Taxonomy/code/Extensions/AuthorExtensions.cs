using System.Linq;

namespace AtriusHealth.Foundation.Taxonomy.Extensions
{
	public static class AuthorExtensions
	{
		public static string GetFullName(this PersonItem author)
		{
			if (author == null) return null;

			return string.Join(" ", new[] { author.FirstName?.Value, author.LastName?.Value }.Where(s => !string.IsNullOrEmpty(s)));
		}
	}
}
