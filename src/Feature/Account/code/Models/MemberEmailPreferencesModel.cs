using System.Collections.Generic;
using AtriusHealth.Foundation.Dictionary.Repositories;

namespace AtriusHealth.Feature.Account.Models
{
    public class MemberEmailPreferencesModel : MemberProfileBaseModel
    {
        public override string Description => Dictionary.Current.Get("Account.EmailPreferences.HeadingSubtitle");
        public List<ProfileFieldListItem> EmailFrequencyOptions { get; set; }
        public string SelectedEmailFrequency { get; set; }
        public List<ProfileEmailListItem> EmailListOptions { get; set; }
        public bool OptOut { get; set; }
    }
}
