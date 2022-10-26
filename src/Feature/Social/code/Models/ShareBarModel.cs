using System.Text.RegularExpressions;
using Thread.Foundation.Abstractions.Social;
using Thread.Foundation.Multisite.Configuration;
using Thread.Foundation.Orm.Factory;
using Thread.Foundation.Orm.Services;

namespace Thread.Feature.Social.Models
{
	public class ShareBarModel : AddThisModel
	{
		private readonly IItemInterfaceFactory _interfaceFactory;
        private readonly IContextProvider _context;
        public ShareBarModel(ISitecoreConfigurationManager configManager, IItemInterfaceFactory interfaceFactory, IContextProvider context) : base(configManager)
		{
			_interfaceFactory = interfaceFactory;
            _context = context;

        }

		public bool IsValid() => IsAccountIdValid(AccountId) && ShareItem != null;

		private IShareable _shareItem;
		public IShareable ShareItem => _shareItem ?? (_shareItem = _interfaceFactory.GetItem<IShareable>(_context.GetItem()));

		private bool IsAccountIdValid(string accountId)
		{
			var regexExpression = @"[A-Za-z]{2}-[A-Za-z\d]{16}";
			return accountId.Length == 19 && Regex.IsMatch(accountId, regexExpression);
		}
	}
}