using System.Collections.Generic;

namespace AtriusHealth.Feature.Navigation.Models
{
	public class FooterNavigationLinksColumnsFolderModel
	{
		public virtual IEnumerable<FooterNavigationLinksColumnModel> LinkHeaders { get; set; }
	}
}
