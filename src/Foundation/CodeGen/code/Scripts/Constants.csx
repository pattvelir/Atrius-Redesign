// Generates Sitecore Habitat-style constants classes

Log.Debug($"Emitting constants templates for {ConfigurationName}...");

public string RenderFields(TemplateCodeGenerationMetadata template)
{
	if (template.OwnFields.Length == 0)
	{
		return string.Empty;
	}

	var localCode = new System.Text.StringBuilder();

	

	foreach (var field in template.OwnFields)
	{
		localCode.AppendLine($@"
				public static readonly ID {field.CodeName}FieldId = new ID(""{field.Id}"");
				public const string {field.CodeName}FieldIdString = ""{field.Id}"";
				public const string {field.CodeName}FieldName = ""{field.Name}"";");
		
		if (field.Type.ToLower() == "rich text")
		{
			localCode.AppendLine($@"
				public static readonly ID {field.CodeName}__RawFieldId = new ID(""{field.Id}"");
				public const string {field.CodeName}__RawFieldIdString = ""{field.Id}"";
				public const string {field.CodeName}__RawFieldName = ""{field.Name}"";");
		}
	}

	
	return localCode.ToString();
}
public string RenderTemplates()
{
	var localCode = new System.Text.StringBuilder();
	
	foreach(var template in Templates)
	{
		localCode.AppendLine($@"
		public static partial class I{template.CodeName}Constants
		{{
            public const string TemplateIdString = ""{template.Id}"";
			public static readonly ID TemplateId = new ID(TemplateIdString);
			{RenderFields(template)}
		}}");
	}

	return localCode.ToString();
}

Code.AppendLine($@"
namespace {GenericRootNamespace}
{{
	using global::Sitecore.Data;
	{RenderTemplates()}
}}");