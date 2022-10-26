using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.DependencyInjection;
using Thread.Foundation.Abstractions.Account;
using Thread.Foundation.Abstractions.PageContent;
using Thread.Foundation.Orm.Factory;
using Thread.Foundation.Orm.Services;
using Thread.Foundation.SitecoreExtensions.DependencyInjection;

namespace Thread.Feature.Account.Models
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