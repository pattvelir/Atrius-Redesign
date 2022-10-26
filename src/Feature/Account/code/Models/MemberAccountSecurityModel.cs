using Thread.Foundation.Abstractions.Account;
using Thread.Foundation.Dictionary.Repositories;

namespace Thread.Feature.Account.Models
{
    public class MemberAccountSecurityModel : MemberProfileBaseModel
    {
        public override string Description => Dictionary.Current.Get("Account.AccountSecurity.HeadingSubtitle");
        public string Email { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}