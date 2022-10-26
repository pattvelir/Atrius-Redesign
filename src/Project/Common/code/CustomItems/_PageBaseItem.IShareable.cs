using Thread.Foundation.Abstractions.Social;
using Thread.Foundation.SitecoreExtensions.Base;
using Thread.Foundation.SitecoreExtensions.Item;

namespace Thread.Project.Common
{
	public partial class _PageBaseItem : IShareable
	{
		public string ShareUrl => InnerItem.Url().GetFullUrl();
		public string ShareTitle => GetTitleWithFallback();
		public string ShareDescription => Summary?.Value ?? string.Empty;

		private string GetTitleWithFallback()
		{
			if (!string.IsNullOrEmpty(Title?.Value))
			{
				return Title.Value;
			}

			if (!string.IsNullOrEmpty(HeaderTitle?.Value))
			{
				return HeaderTitle.Value;
			}

			if (!string.IsNullOrEmpty(ShortTitle?.Value))
			{
				return ShortTitle.Value;
			}

			return InnerItem.DisplayName;
		}
	}
}