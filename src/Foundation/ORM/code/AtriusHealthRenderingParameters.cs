using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;

namespace AtriusHealth.Foundation.Orm
{
	public class AtriusHealthRenderingParameters : RenderingParameters
	{
		public AtriusHealthRenderingParameters() : base(string.Empty)
		{

		}
		public AtriusHealthRenderingParameters(string parametersAsQueryString) : base(parametersAsQueryString)
		{
			
		}

		protected virtual string GetFieldValue(string fieldName)
		{
			return Values.ContainsKey(fieldName) ? Values[fieldName] : string.Empty;
		}

		protected virtual bool GetBoolValue(string fieldName)
		{
			string val = GetFieldValue(fieldName);

			return val == "1";
		}

		protected virtual int GetIntValue(string fieldName)
		{
			int val;
			int.TryParse(GetFieldValue(fieldName), out val);
			return val;
		}

		protected virtual float GetFloatValue(string fieldName)
		{
			float val;
			float.TryParse(GetFieldValue(fieldName), out val);
			return val;
		}

		protected virtual DateTime GetDateValue(string fieldName)
		{
			DateTime val;
			DateTime.TryParse(GetFieldValue(fieldName), out val);
			return val;
		}

		protected virtual Item GetItemValue(string fieldName)
		{
			string val = GetFieldValue(fieldName);
			if (!string.IsNullOrEmpty(val))
			{
				return Sitecore.Context.Database.GetItem(val);
			}
			return null;
		}

		protected virtual IEnumerable<Item> GetItemValues(string fieldName)
		{
			string val = GetFieldValue(fieldName);
			if (!string.IsNullOrEmpty(val))
			{
				return val.Split('|').Select(v => Sitecore.Context.Database.GetItem(v));
			}
			return null;
		}
	}
}
