using Sitecore.Data.Fields;

namespace Thread.Foundation.Abstractions.PageContent
{
	public interface IPageEditable
	{
		Field HeaderTitleField { get; }
		Field SubtitleField { get; }
	}
}
