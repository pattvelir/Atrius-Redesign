using System.Collections.Generic;
using Sitecore.Data.Items;

namespace Thread.Feature.Social.Models
{
	public class SocialFollowModel
	{
		public Item Datasource { get; set; }
		public IEnumerable<SocialMediaLinkItem> SocialFollowItems { get; set; } 
	}
}