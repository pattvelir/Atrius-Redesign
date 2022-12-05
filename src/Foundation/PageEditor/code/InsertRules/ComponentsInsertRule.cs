using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore.Data.Items;
using AtriusHealth.Foundation.PageEditor.Reference;
using AtriusHealth.Foundation.SitecoreExtensions.Item;

namespace AtriusHealth.Foundation.PageEditor.InsertRules
{
	public class ComponentsInsertRule : BaseInsertRule
	{
		public ComponentsInsertRule(object obj) : base(obj)
		{
		}

		public override IEnumerable<Item> GetInsertItems(IList<Item> masters, Item item)
		{
			var rootItem = item.Database.GetItem("/sitecore/layout/renderings");

			var renderings = rootItem.Axes.GetDescendants()
				.Where(i => i.Template.InnerItem.Paths.FullPath.StartsWith("/sitecore/templates/System/Layout/Renderings/", StringComparison.InvariantCultureIgnoreCase));

			var renderingsWithComponents = renderings.Where(r => !string.IsNullOrEmpty(r.Fields[Constants.DatasourceLocationFieldName]?.Value)).Where(r => r.Fields[Constants.DatasourceLocationFieldName].Value.Contains("/Components/") || r.Fields[Constants.DatasourceLocationFieldName].Value.Contains("/Shared Components/"));

			return renderingsWithComponents.Select(r => r.Fields[Constants.DatasourceTemplateFieldName].Value).Select(t => item.Database.GetItem(t)).Where(i => !i.Paths.FullPath.Contains("/Project/")).Distinct();
		}
	}
}
