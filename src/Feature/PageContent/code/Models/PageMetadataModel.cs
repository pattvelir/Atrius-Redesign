using AtriusHealth.Foundation.Mvc.ViewModels;
using AtriusHealth.Foundation.Orm;
using AtriusHealth.Foundation.Taxonomy;

namespace AtriusHealth.Feature.PageContent.Models
{
	public class PageMetadataModel : AtriusHealthViewModel<AtriusHealthItem>
	{
		public _DateBaseItem DateItem => PageItem;
		public _PeopleBaseItem PeopleItem => PageItem;
	}
}
