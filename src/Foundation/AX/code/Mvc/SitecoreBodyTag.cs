using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Reflection;
using System.Web.UI;
using Sitecore.Collections;

namespace Thread.Foundation.AX.Mvc
{
	public class SitecoreBodyTag : IDisposable
	{
		private const string ClassAttribute = "class";
		private const string PreviewModeClass = "is-preview";
		private const string PageEditorModeClass = "is-page-editor";

		private readonly HtmlTextWriter _textWriter;
		private readonly SafeDictionary<string> _attributes;

		public SitecoreBodyTag(TextWriter writer, object attributes)
		{
			_textWriter = new HtmlTextWriter(writer);
			_attributes = FormatAttributes(attributes);
		}

		public void Dispose()
		{
			RenderEnd();
		}

		public virtual void RenderStart()
		{
			RenderAttributes();
			_textWriter.RenderBeginTag(HtmlTextWriterTag.Body);
		}

		public virtual void RenderEnd()
		{
			_textWriter.RenderEndTag();
		}

		protected virtual void RenderAttributes()
		{
			foreach (var pair in _attributes)
			{
				_textWriter.AddAttribute(pair.Key, pair.Value);
			}
		}

		private SafeDictionary<string> FormatAttributes(object attributes)
		{
			var attrs = Utilities.GetPropertiesCollection(attributes, true).ToSafeDictionary() ?? new SafeDictionary<string>();

			attrs = AddCustomClass(attrs);

			return attrs;
		}

		private SafeDictionary<string> AddCustomClass(SafeDictionary<string> attributes)
		{
			string customClass = string.Empty;

			if (Sitecore.Context.PageMode.IsExperienceEditor)
			{
				customClass = PageEditorModeClass;
			}
			else if (Sitecore.Context.PageMode.IsPreview)
			{
				customClass = PreviewModeClass;
			}

			if (!string.IsNullOrEmpty(customClass))
			{
				if (attributes.ContainsKey(ClassAttribute))
				{
					attributes[ClassAttribute] = $"{attributes[ClassAttribute]} {customClass}";
				}
				else
				{
					attributes.Add(ClassAttribute, customClass);
				}
			}

			return attributes;
		} 
	}

	public class Utilities
	{
		public static BindingFlags Flags = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.FlattenHierarchy;
		/// <summary>Gets a property based on the type and name</summary>
		/// <param name="type">The type.</param>
		/// <param name="name">The name.</param>
		/// <returns>PropertyInfo.</returns>
		public static PropertyInfo GetProperty(Type type, string name)
		{
			PropertyInfo propertyInfo = null;
            try
            {
                propertyInfo = type.GetProperty(name, Flags);
            }
            catch { }
			if (propertyInfo == null)
			{
				foreach (Type type1 in type.GetInterfaces())
				{
					try
					{
						propertyInfo = type1.GetProperty(name);
						if (propertyInfo != null)
							return propertyInfo;
					}
					catch { }
				}
			}
			return propertyInfo;
		}

		/// <summary>Gets all properties on a type</summary>
		/// <param name="type">The type.</param>
		/// <returns>IEnumerable{PropertyInfo}.</returns>
		public static IEnumerable<PropertyInfo> GetAllProperties(Type type)
		{
			List<Type> typeList = new List<Type>();
			typeList.Add(type);
			if (type.IsInterface)
				typeList.AddRange(type.GetInterfaces());
			List<PropertyInfo> propertyInfoList = new List<PropertyInfo>();
			foreach (Type type1 in typeList)
			{
				foreach (PropertyInfo property1 in type1.GetProperties(Flags))
				{
					PropertyInfo property2 = GetProperty(property1.DeclaringType, property1.Name);
					propertyInfoList.Add(property2);
				}
			}
			return propertyInfoList;
		}

		public static NameValueCollection GetPropertiesCollection(
			object target,
			bool lowerCaseName = false,
			bool underscoreForHyphens = true)
		{
			NameValueCollection nameValueCollection = new NameValueCollection();
			if (target != null)
			{
				foreach (PropertyInfo allProperty in GetAllProperties(target.GetType()))
				{
					object obj = allProperty.GetValue(target, null);
					string name = lowerCaseName ? allProperty.Name.ToLower() : allProperty.Name;
					if (underscoreForHyphens)
						name = name.Replace("_", "-");
					nameValueCollection.Add(name, obj == null ? string.Empty : obj.ToString());
				}
			}
			return nameValueCollection;
		}

	}

	public static class ExtensionMethods
	{
		public static SafeDictionary<string> ToSafeDictionary(
			this NameValueCollection collection)
		{
			SafeDictionary<string> safeDictionary = new SafeDictionary<string>();
			if (collection != null)
			{
				foreach (string allKey in collection.AllKeys)
					safeDictionary.Add(allKey, collection[allKey]);
			}
			return safeDictionary;
		}
	}
}