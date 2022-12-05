using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.DependencyInjection;
using AtriusHealth.Foundation.Abstractions.Account;
using AtriusHealth.Foundation.Abstractions.PageContent;
using AtriusHealth.Foundation.Orm.Factory;
using AtriusHealth.Foundation.Orm.Services;
using AtriusHealth.Foundation.SitecoreExtensions.DependencyInjection;

namespace AtriusHealth.Feature.Account.Models
{
    public abstract class MemberProfileBaseModel
    {
        private readonly IContextProvider _context;
        private readonly IItemInterfaceFactory _interfaceFactory;

        protected MemberProfileBaseModel()
        {
            _context = ServiceLocator.ServiceProvider.GetService<IContextProvider>();
            _interfaceFactory = ServiceLocator.ServiceProvider.GetService<IItemInterfaceFactory>();
        }

        public virtual string Title => GetPageTitle();
        public abstract string Description { get; }

        public virtual MembershipProviderResponse Response { get; set; }

        private string GetPageTitle()
        {
            return _interfaceFactory.GetItem<IPageEditable>(_context.GetItem())?.HeaderTitleField?.Value ?? string.Empty;
        }
    }
}
