using System.Text.RegularExpressions;
using AtriusHealth.Foundation.Abstractions.Social;
using AtriusHealth.Foundation.Multisite.Configuration;
using AtriusHealth.Foundation.Orm.Factory;
using AtriusHealth.Foundation.Orm.Services;

namespace AtriusHealth.Feature.Social.Models
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
