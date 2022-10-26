using Thread.Foundation.Mvc.ViewModels;
using Thread.Foundation.Orm;
using Thread.Foundation.Taxonomy;

namespace Thread.Feature.PageContent.Models
{
	public class PageHeaderModel : ThreadViewModel<ThreadItem>
	{
		public _HeaderTitleBaseItem TitleItem => PageItem;
		public _SubtitleBaseItem SubTitleItem => PageItem;
		public _ContentTypeBaseItem ContentTypeItem => PageItem;
	}
}