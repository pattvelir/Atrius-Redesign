using Thread.Feature.RichText.Tokens;

namespace Thread.Feature.RichText.Extensions
{
	public static class TokenExtensions
	{
		public static string Replace(this string html, Token token)
		{
			return html.Replace(token.Key, token.Value.Invoke());
		}
	}
}