using System;
using Thread.Feature.RichText.Tokens;

namespace Thread.Feature.RichText.Reference
{
	public static class Constants
	{
		public static class Placeholder
		{
			public const string ExperienceEditorFormat = "<div class=\"{0}\">{1}</div>";
			public const string StandardFormat = "<section class=\"{0}\">{1}</section>";
		}
		
		public static class Tokens
		{
			public static Token CurrentYear => new Token { Key = "##CURRENTYEAR##", Value = () => DateTime.Now.Year.ToString() };

			public static Token[] All => new [] { CurrentYear };
		}
	}
}