// Generates CustomItem models
using System.Linq;
Log.Debug($"Emitting CustomItem templates for {ConfigurationName}...");

public string RenderTemplates()
{
	var localCode = new System.Text.StringBuilder();

	foreach (var template in Templates)
	{
		if (template.CodeName.EndsWith("_Parameters"))
		{
			localCode.AppendLine($@"
					namespace {template.Namespace}
					{{
						using Sitecore.Data;
						using Sitecore.Data.Fields;
						using Sitecore.Data.Items;
						using Sitecore.Mvc.Presentation;
						using Thread.Foundation.Orm;

						public partial class {RenderTemplateName(template)} : ThreadRenderingParameters
						{{
							{RenderFieldNames(template)}
							{RenderConstructors(template)}
							{RenderFieldProperties(template)}
						}}
					}}
				");
		}
	}

	return localCode.ToString();
}

Code.AppendLine($@"
{RenderTemplates()}
");

public string RenderTemplateName(TemplateCodeGenerationMetadata template)
{
	var origName = template.CodeName;
	var prefix = origName.StartsWith("_") ? "_" : string.Empty;
	var translatedName = origName.Replace("_", string.Empty);

	return $"{prefix}{translatedName}";
}

public string GetFieldName(TemplateFieldCodeGenerationMetadata field)
{
	return field.CodeName.Replace("_", string.Empty);
}

public string RenderFieldNames(TemplateCodeGenerationMetadata template)
{
	var localCode = new System.Text.StringBuilder();

	localCode.AppendLine($@"public static class Fields
		{{");
	foreach (var field in template.AllFields)
	{
		localCode.AppendLine($@"
			public static string {GetFieldName(field)} = ""{field.Name}"";");
	}
	localCode.AppendLine("}");

	return localCode.ToString();
}

public string RenderConstructors(TemplateCodeGenerationMetadata template)
{
	var localCode = new System.Text.StringBuilder();

	localCode.AppendLine($@"public {RenderTemplateName(template)}() : base(string.Empty) {{}}");
	localCode.AppendLine($@"public {RenderTemplateName(template)}(string parametersAsQueryString) : base(parametersAsQueryString) {{}}");
	
	return localCode.ToString();
}

public string RenderFieldProperties(TemplateCodeGenerationMetadata template)
{
	var localCode = new System.Text.StringBuilder();

	foreach (var field in template.AllFields)
	{
		var fieldType = GetFieldType(field);
		localCode.AppendLine($@"
				public virtual {fieldType} {GetFieldName(field)} => {GetMethodName(fieldType)}(Fields.{GetFieldName(field)});");
	}

	return localCode.ToString();
}

public string GetFieldType(TemplateFieldCodeGenerationMetadata field)
{
	if (field.Type.StartsWith("custom"))
	{
		return field.Type.Replace("custom=", "").Replace("(", "<").Replace(")", ">");
	}

	switch (field.Type.ToLower())
	{
		case "checkbox":
			return "bool";

		case "date":
		case "datetime":
			return "DateTime";

		case "number":
			return "float";

		case "integer":
			return "int";

		case "treelist with search":
		case "treelist":
		case "treelistex":
		case "treelist descriptive":
		case "multitreelist":
		case "checklist":
		case "multilist with search":
		case "multilist":
			return "IEnumerable<Item>";

		case "grouped droplink":
		case "droplink":
		case "lookup":
		case "droptree":
		case "reference":
		case "tree":
			return "Item";

		case "tristate":
		case "file":
		case "image":
		case "general link":
		case "general link with search":
		case "rules":
		case "password":
		case "icon":
		case "rich text":
		case "html":
		case "single-line text":
		case "multi-line text":
		case "frame":
		case "text":
		case "memo":
		case "droplist":
		case "grouped droplist":
		case "valuelookup":
		case "attachment":
		case "word document":
		case "name lookup value list":
		case "name value list":
			return "string";
		default:
			return "string";
	}
}

	public string GetMethodName(string type)
	{
		switch (type)
		{
			case "bool":
				return "GetBoolValue";

			case "DateTime":
				return "GetDateValue";

			case "float":
				return "GetFloatValue";

			case "int":
				return "GetIntValue";

			case "IEnumerable<Item>":
				return "GetItemValues";

			case "Item":
				return "GetItemValue";

			case "string":
				return "GetFieldValue";

			default:
				return "GetItemValue";
		}
	}
