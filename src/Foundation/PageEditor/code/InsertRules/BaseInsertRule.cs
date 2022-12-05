using System.Collections.Generic;
using System.Linq;
using Sitecore.Data.Items;
using Sitecore.Data.Masters;

namespace AtriusHealth.Foundation.PageEditor.InsertRules
{
    public abstract class BaseInsertRule : InsertRule
    {
        protected BaseInsertRule(object obj)
        {
        }

        public override void Expand(List<Item> masters, Item item)
        {
            if (masters == null || item == null)
                return;

            var insertItems = GetInsertItems(masters, item);

            if (insertItems == null)
                return;

            var enumerable = insertItems as Item[] ?? insertItems.ToArray();
            if (!enumerable.Any())
                return;

            if (OverrideMasters)
            {
                masters.Clear();
                masters.AddRange(enumerable);
                return;
            }

            foreach (var obj in enumerable)
                masters.Add(obj);
        }

        public abstract IEnumerable<Item> GetInsertItems(IList<Item> masters, Item item);
        public virtual bool OverrideMasters => false;
    }
}
