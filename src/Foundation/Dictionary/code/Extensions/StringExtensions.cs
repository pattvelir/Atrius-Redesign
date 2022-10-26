using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Thread.Foundation.Dictionary.Statics;

namespace Thread.Foundation.Dictionary.Extensions
{
    public static class StringExtensions
    {
        public static string Translate(this string key)
        {
            return EditableTranslate.Text(key);
        }
    }
}