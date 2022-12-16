using System;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Links;
using Sitecore.Text;

namespace AtriusHealth.Foundation.PageEditor.FieldTypes
{
	public class DatasourceField : Sitecore.Data.Fields.DatasourceField
	{
		public DatasourceField(Field innerField) : base(innerField)
		{
		}

		public DatasourceField(Field innerField, string runtimeValue) : base(innerField, runtimeValue)
		{
		}

		/// <summary>Validates the links.</summary>
		/// <param name="result">The result.</param>
		/// <contract>
		///   <requires name="result" condition="not null" />
		/// </contract>
		public override void ValidateLinks(LinksValidationResult result)
		{
			string path = Path;
			if (string.IsNullOrEmpty(path))
				return;
			foreach (string str in new ListString(path))
			{
				if (str != null && 
				    !str.StartsWith("./", StringComparison.InvariantCulture) && 
				    !str.StartsWith("query:", StringComparison.InvariantCulture) &&
				    !str.StartsWith("../", StringComparison.InvariantCulture) &&
				    !str.StartsWith("[root]", StringComparison.InvariantCulture))
				{
					Item targetItem = Database.GetItem(str);
					if (targetItem == null)
					{
						result.AddBrokenLink(str);
					}
					else
					{
						result.AddValidLink(targetItem, str);
					}
				}
			}
		}
	}
}
