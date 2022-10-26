using System;
using System.Collections.Generic;

namespace Thread.Foundation.SitecoreExtensions.Base
{
    public static class EnumerableExtensions
    {
        public static IEnumerable<T> ForEach<T>(this IEnumerable<T> list, Action<T> action)
        {
            if (list == null) return null;

            if (action != null)
            {
                foreach (T item in list)
                {
                    action(item);
                }
            }
                
            return list;
        }
    }
}
