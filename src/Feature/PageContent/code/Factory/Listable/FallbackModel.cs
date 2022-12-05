using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore.Data.Items;
using Sitecore.StringExtensions;
using AtriusHealth.Foundation.Abstractions.Listing;
using AtriusHealth.Foundation.SitecoreExtensions.Base;
using AtriusHealth.Foundation.SitecoreExtensions.Item;
using AtriusHealth.Foundation.Taxonomy;

namespace AtriusHealth.Feature.PageContent.Factory.Listable
{
	public class FallbackModel : IListable
	{
		protected Item InnerItem { get; set; }

		protected _TitleBaseItem TitleItem => InnerItem;
		protected _HeaderTitleBaseItem HeaderTitleItem => InnerItem;
		protected _ShortTitleBaseItem ShortTitleItem => InnerItem;
		protected _ContentTypeBaseItem ContentTypeItem => InnerItem;
		protected _SummaryBaseItem SummaryItem => InnerItem;
		protected _PeopleBaseItem PeopleItem => InnerItem;
		protected _ImageBaseItem ImageItem => InnerItem;
		protected _DateBaseItem DateItem => InnerItem;
        protected _SubtitleBaseItem SubritleItem => InnerItem;


        public FallbackModel(Item innerItem)
		{
			InnerItem = innerItem;
		}

		public virtual string ListId => InnerItem.ID.ToString();
		public virtual string ListTitle => GetTitleWithFallback();

        public virtual string ListShortTitle =>(!ShortTitleItem?.ShortTitle?.Value.IsNullOrEmpty() ?? false? ShortTitleItem?.ShortTitle?.Value : GetTitleWithFallback());


        private string GetTitleWithFallback()
		{
			if (!TitleItem?.Title?.Value.IsNullOrEmpty() ?? false)
			{
				return TitleItem.Title.Value;
			}

			if (!HeaderTitleItem?.HeaderTitle?.Value.IsNullOrEmpty() ?? false)
			{
				return HeaderTitleItem.HeaderTitle.Value;
			}

			if (!ShortTitleItem?.ShortTitle?.Value.IsNullOrEmpty() ?? false)
			{
				return ShortTitleItem.ShortTitle.Value;
			}

			return InnerItem.DisplayName;
		}

		public virtual string ListUrl => InnerItem.Url();
		public virtual string ListDescription => SummaryItem?.Summary?.Value ?? string.Empty;
		public virtual string ListImage1X1 => ImageItem?.Image1x1?.GetSrc() ?? string.Empty;
		public virtual string ListImage16X9 => ImageItem?.Image16x9?.GetSrc() ?? string.Empty;
		public virtual string ListContentType => ContentTypeItem?.ContentType?.TargetItem?.DisplayName ?? string.Empty;
		public virtual IEnumerable<string> ListAuthors => PeopleItem?.People?.GetItems().OfType(PersonItem.TemplateId).Select(a => (PersonItem)a).Select(p => $"{p.FirstName.Value} {p.LastName.Value}") ?? Enumerable.Empty<string>();
		public virtual string ListDate => DateItem?.DisplayDate?.DateTime > DateTime.MinValue
			? DateItem.DisplayDate.DateTime.ToAtriusHealthFormat()
			: string.Empty;

		public virtual string ListLocation => string.Empty;
        public virtual string ListSubtitle => SubritleItem?.Subtitle?.Value ?? string.Empty;
    }
}
