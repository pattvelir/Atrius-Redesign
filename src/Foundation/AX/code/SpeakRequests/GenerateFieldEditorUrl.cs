using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore.Data;
using Sitecore.Diagnostics;
using Sitecore.ExperienceEditor.Speak.Server.Requests;
using Sitecore.ExperienceEditor.Speak.Server.Responses;
using Sitecore.Shell.Applications.ContentEditor;
using Sitecore.Text;

namespace AtriusHealth.Foundation.AX.SpeakRequests
{
	public class GenerateFieldEditorUrl : PipelineProcessorRequest<FieldEditorItemContext>
	{
		public string GenerateUrl()
		{
			var fieldList = CreateFieldDescriptors(RequestContext.Argument);
			var fieldEditorOption = new FieldEditorOptions(fieldList)
			{
				PreserveSections = true,
				SaveItem = true
			};
			return fieldList.Any() ? fieldEditorOption.ToUrlString().ToString() : null;
		}

		private IEnumerable<FieldDescriptor> CreateFieldDescriptors(string fields)
		{
			var fieldList = new List<FieldDescriptor>();
			var fieldString = new ListString(fields);
			var list = new ListString(fieldString);
			foreach (var field in list)
			{
				try
				{
					if (RequestContext.Item.Fields[field] != null)
					{
						fieldList.Add(new FieldDescriptor(RequestContext.Item, field));
					}
				}
				catch (Exception ex)
				{
					Log.Error("Could not find field: " + field, ex, typeof(GenerateFieldEditorUrl));
				}

			}
			return fieldList;
		}

		public override PipelineProcessorResponseValue ProcessRequest()
		{
			return new PipelineProcessorResponseValue
			{
				Value = GenerateUrl()
			};
		}
	}
}
