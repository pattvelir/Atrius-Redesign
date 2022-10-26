using System.Collections.Generic;
using System.Linq;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Links;
using Sitecore.Resources.Media;
using Thread.Foundation.SitecoreExtensions.Base;

namespace Thread.Foundation.SitecoreExtensions.Item
{
	public static class ItemExtensions
	{
		public static IEnumerable<Sitecore.Data.Items.Item> Distinct(this IEnumerable<Sitecore.Data.Items.Item> source)
		{
			return source?.Distinct(new ItemEqualityComparer());
		}

		public static IEnumerable<Sitecore.Data.Items.Item> OfType(this IEnumerable<Sitecore.Data.Items.Item> items, ID templateId)
		{
			if (items == null) return Enumerable.Empty<Sitecore.Data.Items.Item>();

			return items.Where(i => i != null && i.DescendsFrom(templateId));
		}

		public static string Url(this Sitecore.Data.Items.Item item)
		{
			if (item.Paths.IsMediaItem)
			{
				return MediaManager.GetMediaUrl(item);
			}

			return LinkManager.GetItemUrl(item);
		}

		public static string GetSrc(this ImageField field, int width = 0, int height = 0)
		{
			if (field?.MediaItem == null) return string.Empty;

			return new MediaItem(field.MediaItem).GetSrc(width, height);
		}

		public static string GetSrc(this MediaItem mediaItem, int width = 0, int height = 0)
		{
			if (mediaItem == null) return string.Empty;

			var url = MediaManager.GetMediaUrl(mediaItem);

			return url.FormatImagePath(width, height);
		}
	}

	public class ItemEqualityComparer : IEqualityComparer<Sitecore.Data.Items.Item>
	{
		public bool Equals(Sitecore.Data.Items.Item x, Sitecore.Data.Items.Item y)
		{
			return x?.ID == y?.ID;
		}

		public int GetHashCode(Sitecore.Data.Items.Item obj)
		{
			return obj.TemplateID.GetHashCode();
		}

		public override bool Equals(object obj)
		{
			if (ReferenceEquals(null, obj)) return false;
			if (ReferenceEquals(this, obj)) return true;
			if (obj.GetType() != this.GetType()) return false;
			return Equals((ItemEqualityComparer) obj);
		}

		public override int GetHashCode() => base.GetHashCode();
	}
}
