using Thread.Foundation.Mvc.ViewModels;
using Thread.Foundation.Orm;
using Thread.Foundation.Taxonomy;

namespace Thread.Feature.PageContent.Models
{
	public class PageMetadataModel : ThreadViewModel<ThreadItem>
	{
		public _DateBaseItem DateItem => PageItem;
		public _PeopleBaseItem PeopleItem => PageItem;
	}
}