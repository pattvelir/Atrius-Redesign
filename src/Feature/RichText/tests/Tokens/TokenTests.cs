using System;
using System.Linq;
using NUnit.Framework;
using AtriusHealth.Feature.RichText.Extensions;
using AtriusHealth.Feature.RichText.Reference;
using AtriusHealth.Feature.RichText.Tokens;

namespace AtriusHealth.Feature.RichText.Tests.Tokens
{
	[TestFixture]
	public class TokenTests
	{
		[Test]
		public void CurrentYear_NoToken_ReturnsInput()
		{
			string html = "<p>Test text with no tokens.</p>";

			Assert.AreEqual(html, html.Replace(Constants.Tokens.CurrentYear));
		}

		[Test]
		public void CurrentYear_TokenExists_ReturnsInputWithTokenReplaced()
		{
			string html = $"This is some text with {Constants.Tokens.CurrentYear.Key}.";

			Assert.AreEqual($"This is some text with {DateTime.Now.Year}.", html.Replace(Constants.Tokens.CurrentYear));
		}

		[Test]
		public void AllTokens_ContainsAllTokens_ReturnsAllTokens()
		{
			var fields = typeof(Constants.Tokens).GetProperties().Where(f => f.PropertyType == typeof(Token));

			Assert.AreEqual(fields.Count(), Constants.Tokens.All.Length);
		}
	}
}
