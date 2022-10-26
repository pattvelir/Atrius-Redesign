using System.Collections.Generic;
using Thread.Foundation.Dictionary.Repositories;

namespace Thread.Feature.Account.Models
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