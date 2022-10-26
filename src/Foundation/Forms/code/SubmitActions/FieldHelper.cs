using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore.ExperienceForms.Models;

namespace Thread.Foundation.Forms.SubmitActions
{
	public static class FieldHelper
	{
		public static IViewModel GetFieldById(Guid id, IList<IViewModel> fields)
		{
			return fields.FirstOrDefault(f => Guid.Parse(f.ItemId) == id);
		}

		public static string GetFieldValueById(Guid id, IList<IViewModel> fields)
		{
			var field = fields.FirstOrDefault(f => Guid.Parse(f.ItemId) == id);

			return GetValue(field);
		}

		public static string GetValue(object field)
		{
			return
				field?.GetType().GetProperty("Value")?.GetValue(field, null)?.ToString()
				?? string.Empty;
		}
	}
}