using System.Collections.Generic;

namespace Thread.Feature.Navigation.Models
{
	public class FooterNavigationLinksColumnsFolderModel
	{
		public virtual IEnumerable<FooterNavigationLinksColumnModel> LinkHeaders { get; set; }
	}
}