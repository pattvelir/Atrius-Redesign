using System;
using System.Text.RegularExpressions;
using Leprechaun.MetadataGeneration;

namespace Thread.Foundation.CodeGen
{
	public class FlatTypeNameGenerator : ITypeNameGenerator
	{
		private readonly string _namespaceRoot;

		public FlatTypeNameGenerator(string namespaceRootPath)
		{
			if (namespaceRootPath == "/") throw new NotSupportedException("Namespace root cannot be /, please use a sub-path e.g. /sitecore/templates");

			_namespaceRoot = namespaceRootPath;
		}

		public virtual string GetFullTypeName(string fullPath)
		{
			string str1 = fullPath.Trim('/');
			if (fullPath.StartsWith(_namespaceRoot, StringComparison.OrdinalIgnoreCase))
			{
				str1 = str1.Substring(_namespaceRoot.Length);
			}
				
			string[] strArray = str1.Split('/');
			for (int index = 0; index < strArray.Length; ++index)
			{
				string str2 = strArray[index];

				if (int.TryParse(str2.Substring(0, 1), out int result))
				{
					str2 = "_" + str2;
				}
					
				strArray[index] = str2;
			}
			string name1 = string.Join(".", strArray);
			string identifier;
			if (name1.Contains("."))
			{
				string name2 = name1.Substring(name1.LastIndexOf('.') + 1);
				ConvertToIdentifier(name1.Substring(0, name1.LastIndexOf('.')));
				identifier = ConvertToIdentifier(name2);
			}
			else
			{
				identifier = ConvertToIdentifier(name1);
			}
				
			return identifier;
		}

		public virtual string ConvertToIdentifier(string name)
		{
			name = Regex.Replace(name, "^([a-z])", match => match.Value.ToUpperInvariant());
			name = Regex.Replace(name, " ([a-z])", match => match.Value.ToUpperInvariant());
			name = Regex.Replace(name, "([A-Z]{3,})", match => match.Value[0].ToString() + match.Value.Substring(1).ToLowerInvariant());

			if (char.IsDigit(name[0]))
			{
				name = "_" + name;
			}
			name = name.Trim();
			name = name.Replace(" ", "_");

			return Regex.Replace(name, "[^a-zA-Z0-9_\\.]+", string.Empty);
		}
	}
}
