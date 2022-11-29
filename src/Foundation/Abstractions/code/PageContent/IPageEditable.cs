using Sitecore.Data.Fields;

namespace AtriusHealth.Foundation.Abstractions.PageContent
{
	public interface IPageEditable
	{
		Field HeaderTitleField { get; }
		Field SubtitleField { get; }
	}
}
