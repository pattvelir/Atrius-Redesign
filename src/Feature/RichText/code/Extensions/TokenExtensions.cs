using AtriusHealth.Feature.RichText.Tokens;

namespace AtriusHealth.Feature.RichText.Extensions
{
	public static class TokenExtensions
	{
		public static string Replace(this string html, Token token)
		{
			return html.Replace(token.Key, token.Value.Invoke());
		}
	}
}
