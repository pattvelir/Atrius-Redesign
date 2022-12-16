using System.Collections.Generic;
using AtriusHealth.Foundation.Dictionary.Repositories;

namespace AtriusHealth.Feature.Account.Models
{
    public class MemberInterestsModel : MemberProfileBaseModel
    {
        public MemberInterestsModel()
        {
            InterestItems = new List<KeyValuePair<string, List<ProfileFieldListItem>>>();
        }

        public List<KeyValuePair<string, List<ProfileFieldListItem>>> InterestItems { get; set; }
        public override string Description => Dictionary.Current.Get("Account.Interests.HeadingSubtitle");
    }
}
