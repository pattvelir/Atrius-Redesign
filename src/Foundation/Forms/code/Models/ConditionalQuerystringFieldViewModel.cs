using System.Web;
using Sitecore;
using Sitecore.Data.Items;
using Sitecore.ExperienceForms.Mvc.Models.Fields;

namespace AtriusHealth.Foundation.Forms.Models
{
    public class ConditionalQuerystringFieldViewModel : FieldViewModel
    {
        public string QueryStringKey { get; set; }
        public string QueryStringValue { get; set; }
        public bool ShouldDisplay { get; set; }
        protected override void InitItemProperties(Item item)
        {
            // on load of the form
            base.InitItemProperties(item);
            
            QueryStringKey = StringUtil.GetString(item.Fields["Query String Key"]);
            QueryStringValue = StringUtil.GetString(item.Fields["Query String Value"]);
            ShouldDisplay = string.IsNullOrEmpty(QueryStringKey) || string.IsNullOrEmpty(QueryStringValue) || HttpContext.Current.Request.QueryString[QueryStringKey] == QueryStringValue;

        }
        protected override void UpdateItemFields(Item item)
        {
            // upon save
            base.UpdateItemFields(item);
            
            item.Fields["Query String Key"]?.SetValue(QueryStringKey, true);
            item.Fields["Query String Value"]?.SetValue(QueryStringValue, true);
        }
    }
}
