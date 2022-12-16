using System.Web;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Mvc.Helpers;
using CustomField = Sitecore.Data.Fields.CustomField;

namespace AtriusHealth.Foundation.Mvc.Extensions
{
	public static class SitecoreHelperExtensions
	{
		public static bool HasValueOrEditing(this SitecoreHelper helper, string fieldName, Item item = null)
		{
			return helper.HasValue(fieldName, item) || Sitecore.Context.PageMode.IsExperienceEditorEditing;
		}

		public static bool HasValueOrEditing(this SitecoreHelper helper, Field field)
		{
			return helper.HasValue(field.Name, field.Item) || Sitecore.Context.PageMode.IsExperienceEditorEditing;
		}

		public static bool HasValueOrEditing(this SitecoreHelper helper, CustomField field)
		{
            try { return helper.HasValueOrEditing(field.InnerField); }
            catch { }

            return false;
        }

		public static HtmlString RawFieldValue(this SitecoreHelper helper, TextField field)
		{
			return Sitecore.Context.PageMode.IsExperienceEditorEditing ? helper.Field(field) : new HtmlString(field.Value);
		}

		public static HtmlString Field(this SitecoreHelper helper, Field field, object parameters = null)
		{
			return helper.Field(field.ID.ToString(), field.Item, parameters);
		}

		public static HtmlString Field(this SitecoreHelper helper, CustomField field, object parameters = null)
		{
			return helper.Field(field.InnerField, parameters);
		}

		public static HtmlString BeginField(this SitecoreHelper helper, Field field, object parameters = null)
		{
			return helper.BeginField(field.ID.ToString(), field.Item, parameters);
		}

		public static HtmlString BeginField(this SitecoreHelper helper, CustomField field, object parameters = null)
		{
			return helper.BeginField(field.InnerField, parameters);
		}
	}
}
