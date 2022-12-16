using AtriusHealth.Foundation.Mvc.ViewModels;
using AtriusHealth.Foundation.Orm;
using AtriusHealth.Foundation.Taxonomy;

namespace AtriusHealth.Feature.PageContent.Models
{
	public class PageHeaderModel : AtriusHealthViewModel<AtriusHealthItem>
	{
		public _HeaderTitleBaseItem TitleItem => PageItem;
		public _SubtitleBaseItem SubTitleItem => PageItem;
		public _ContentTypeBaseItem ContentTypeItem => PageItem;
	}
}
