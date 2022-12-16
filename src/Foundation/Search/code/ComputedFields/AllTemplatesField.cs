using System.Collections.Generic;
using System.Linq;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.ComputedFields;
using Sitecore.ContentSearch.Utilities;
using Sitecore.Data.Items;

namespace AtriusHealth.Foundation.Search.ComputedFields
{
    public class AllTemplatesField : IComputedIndexField
    {
        public string FieldName { get; set; }
        public string ReturnType { get; set; }

        public object ComputeFieldValue(IIndexable indexable)
        {
            Item item = indexable as SitecoreIndexableItem;

            var templates = new List<string>();
            GetAllTemplates(item.Template, templates);

            return templates.Distinct().ToList();
        }

        public void GetAllTemplates(TemplateItem baseTemplate, List<string> list)
        {
            if (baseTemplate != null && baseTemplate.ID != Sitecore.TemplateIDs.StandardTemplate && baseTemplate != null)
            {
                string str = IdHelper.NormalizeGuid(baseTemplate.ID);
                list.Add(str);
                foreach (TemplateItem item in baseTemplate.BaseTemplates)
                {
                    GetAllTemplates(item, list);
                }
            }
        }
    }
}
