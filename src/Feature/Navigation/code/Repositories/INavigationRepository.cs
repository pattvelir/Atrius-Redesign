using System;
using System.Collections.Generic;
using Sitecore.Data;
using Sitecore.Data.Items;
using AtriusHealth.Feature.Navigation.Models;

namespace AtriusHealth.Feature.Navigation.Repositories
{
	public interface INavigationRepository
	{
		IEnumerable<ILinkable> GetBreadcrumb();
		IEnumerable<ILinkable> GetChildLinks(Item parent);
		IEnumerable<Tuple<IContextualLinkable, IEnumerable<ILinkable>,ID>> GetPrimaryNavigation(Item rootItem = null);
		IEnumerable<NavItem> GetSecondaryNavigation();
        IEnumerable<NavItem> GetMemberAccountNavigation();
		IEnumerable<LanguageModel> GetLanguageList();

	}
}
