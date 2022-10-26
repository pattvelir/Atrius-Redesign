using System.Linq;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Thread.Foundation.Taxonomy;
using Velir.Search.Core.ComputedFields;

namespace Thread.Foundation.Search.ComputedFields
{
	public class AuthorsFacetField : BaseContentComputedField
	{
		public override object GetFieldValue(Item indexItem)
		{
			MultilistField peopleField = indexItem.Fields[_PeopleBaseItem.FieldIds.People];

			var people = peopleField?.GetItems() ?? Enumerable.Empty<Item>();

			return people.Select(p => $"{p[_NameBaseItem.FieldIds.FirstName]} {p[_NameBaseItem.FieldIds.LastName]}").ToList();
		}
	}
}