using System;
using System.Collections.Generic;
using System.Linq;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Globalization;
using Sitecore.Links;
using Thread.Feature.Navigation.Models;
using Thread.Foundation.Account;
using Thread.Foundation.Multisite.Configuration;
using Thread.Foundation.Orm.Factory;
using Thread.Foundation.Orm.Services;
using Thread.Foundation.SitecoreExtensions.Item;

namespace Thread.Feature.Navigation.Repositories
{
	[AutowireService(LifetimeScope.PerScope)]
	public class NavigationRepository : INavigationRepository
	{
		private readonly ISitecoreConfigurationManager _sitecoreConfigManager;
		private readonly IItemInterfaceFactory _interfaceFactory;

		private readonly Item _currentItem;
		private readonly Lazy<Item> _homeItem;

		public NavigationRepository(IContextProvider context, ISitecoreConfigurationManager configManager, IItemInterfaceFactory interfaceFactory)
		{
			_sitecoreConfigManager = configManager;
			_interfaceFactory = interfaceFactory;

			_currentItem = context.GetItem();
			_homeItem = new Lazy<Item>(() => context.GetDatabase().GetItem($"{context.GetSite().StartPath}"));
		}

		public virtual IEnumerable<ILinkable> GetBreadcrumb()
		{
			if (_currentItem == null || _homeItem.Value == null) return Enumerable.Empty<ILinkable>();

			var ancestors = from c in _currentItem.Axes.GetAncestors().Where(a => a.Paths.FullPath.StartsWith(_homeItem.Value.Paths.FullPath))
							let n = (_NavigationBaseItem)c
							where n == null || !n.SuppressInNavigation.Checked
							select c;

			return MapLinks(ancestors.Concat(new[] { _currentItem }));
		}

		public virtual IEnumerable<ILinkable> GetChildLinks(Item parent)
		{
			if (parent == null) return Enumerable.Empty<ILinkable>();

			var children = GetValidChildItems(parent);

			return MapLinks(children);
		}

		public virtual IEnumerable<Tuple<IContextualLinkable, IEnumerable<ILinkable>,ID>> GetPrimaryNavigation(Item rootItem = null)
		{
			var primaryNavFolder = rootItem;

			// if no datasource is provided, fallback to convention and see if primary nav folder exists in configuration folder.
			if (primaryNavFolder == null)
			{
				var navigationConfig = _sitecoreConfigManager?.GetSettings(NavigationConfigurationFolderItem.TemplateId);
				primaryNavFolder = navigationConfig?.Children.OfType(PrimaryNavigationLinksFolderItem.TemplateId).FirstOrDefault();
			}

			if (primaryNavFolder.ID.ToString() != "{64A60388-80EA-4280-8A71-DADEF9CFE961}")
			{
				var navigationConfig = _sitecoreConfigManager?.GetSettings(NavigationConfigurationFolderItem.TemplateId);
				primaryNavFolder = navigationConfig?.Children.OfType(PrimaryNavigationLinksFolderItem.TemplateId).FirstOrDefault();
			}

			if (primaryNavFolder == null) yield break;

			foreach (Item primaryNavItem in primaryNavFolder.Children)
			{
				var primaryNav = MapLink(primaryNavItem);

				if (primaryNav == null) continue;

				var secondaryNav = MapLinks(primaryNavItem.Children).ToArray();

				//primaryNav.IsAncestor = primaryNav.IsAncestor || secondaryNav.Any(s => s.IsCurrent || s.IsAncestor);

				yield return new Tuple<IContextualLinkable, IEnumerable<ILinkable>, ID>(primaryNav, secondaryNav, primaryNavItem.ID);
			}
		}

		public virtual IEnumerable<NavItem> GetSecondaryNavigation()
		{
			if (_currentItem == null) return Enumerable.Empty<NavItem>();

			var parent = _currentItem.Axes.GetAncestors().OfType(_NavigationBaseItem.TemplateId).FirstOrDefault() ?? _currentItem;

			if (parent == null) return Enumerable.Empty<NavItem>();

			var childItems = GetValidChildItems(parent);

			var grandChildItems = _currentItem.Parent.ID == parent.ID
				? GetValidChildItems(_currentItem)
				: GetValidChildItems(_currentItem.Parent);

			var navItem = new NavItem
			{
				LinkItem = MapLink(parent),
				ChildLinks = MapLinks(childItems).Select(c => new NavItem
				{
					LinkItem = c,
					ChildLinks = c.IsAncestorItem || c.IsCurrentItem ? MapLinks(grandChildItems).Select(gc => new NavItem
					{
						LinkItem = gc,
						ChildLinks = Enumerable.Empty<NavItem>()
					}) : Enumerable.Empty<NavItem>()
				})
			};

			return new[] { navItem };
		}

		public virtual IEnumerable<NavItem> GetMemberAccountNavigation()
		{
			if (_currentItem == null) return Enumerable.Empty<NavItem>();

			var parent = _currentItem.Parent ?? _currentItem;

			if (parent == null) return Enumerable.Empty<NavItem>();

			var childItems = GetValidChildItems(parent).OfType(_MemberAccountPageBaseItem.TemplateId);

			var navItems = MapLinks(childItems).Select(c => new NavItem
			{
				LinkItem = c
			});

			return navItems;
		}

		public virtual IEnumerable<LanguageModel> GetLanguageList()
		{
			List<LanguageModel> LanguageModel = new List<LanguageModel>();

			var siteLanguages = _currentItem.Database.GetLanguages();
			var orderedLanguages =  siteLanguages.OrderBy((x => x),new LanguageComparer(_currentItem.Database));
			var currentLanguage = Sitecore.Context.Language;

			if (siteLanguages.Count < 2)
				return new List<LanguageModel>();

			foreach (var language in orderedLanguages)
			{
			    using (new LanguageSwitcher(language))
				{
					var options = new UrlOptions
					{
						AlwaysIncludeServerUrl = true,
						LanguageEmbedding = LanguageEmbedding.Always,
						LowercaseUrls = true
					};

					var url = LinkManager.GetItemUrl(_currentItem, options);

					string languageNativeName = language.CultureInfo.NativeName;
					int nativeNameIndex = language.CultureInfo.NativeName.IndexOf("(");
					if (nativeNameIndex > 0)
						languageNativeName = language.CultureInfo.NativeName.Substring(0, nativeNameIndex);

					LanguageModel.Add(new LanguageModel
					{
						Name = language.Name,
						NativeName = languageNativeName,
						Url = url.ToLower(),
						IsCurrentLanguage = language == currentLanguage,
						IsoCode = language.CultureInfo.TwoLetterISOLanguageName
					});
				}
			}

			return LanguageModel;
		}

		protected virtual IEnumerable<Item> GetValidChildItems(Item parent)
		{
			return from c in parent?.Children ?? Enumerable.Empty<Item>()
				   let n = (_NavigationBaseItem)c
				   where n == null || !n.SuppressInNavigation.Checked
				   select c;
		}

		protected virtual IContextualLinkable MapLink(Item item)
		{
			return _interfaceFactory.GetItem<IContextualLinkable>(item);
		}

		protected virtual IEnumerable<IContextualLinkable> MapLinks(IEnumerable<Item> items)
		{
			return items.Select(MapLink).Where(l => l != null);
		}
	}
}