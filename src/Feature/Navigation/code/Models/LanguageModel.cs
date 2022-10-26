using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Thread.Feature.Navigation.Models
{
	public class LanguageModel
	{
		public string Name { get; set; }
		public string NativeName { get; internal set; }
		public string Url { get; internal set; }
		public bool IsCurrentLanguage { get; internal set; }
		public string IsoCode { get; internal set; }
	}
}