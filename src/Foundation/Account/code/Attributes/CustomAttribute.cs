using System;

namespace Thread.Foundation.Account.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class SitecoreFieldAttribute : Attribute
    {
        public string FieldName { get; set; }
    }
}