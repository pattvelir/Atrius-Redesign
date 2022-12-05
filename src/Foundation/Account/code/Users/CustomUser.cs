using System;
using System.Collections.Generic;
using System.Linq;
using Sitecore.Data;
using AtriusHealth.Foundation.Account.Attributes;

namespace AtriusHealth.Foundation.Account.Users
{
    public class CustomUser : BaseUser
    {
        [SitecoreField(FieldName = "ProfileImage")]
        public string ProfileImage { get; set; }

        [SitecoreField(FieldName = "FirstName")]
        public string FirstName { get; set; }

        [SitecoreField(FieldName = "LastName")]
        public string LastName { get; set; }

        [SitecoreField(FieldName = "CompanyName")]
        public string CompanyName { get; set; }

        [SitecoreField(FieldName = "CompanyWebsiteUrl")]
        public string CompanyWebsiteUrl { get; set; }

        [SitecoreField(FieldName = "JobTitle")]
        public string JobTitle { get; set; }

        [SitecoreField(FieldName = "PhoneNumber")]
        public string PhoneNumber { get; set; }

        [SitecoreField(FieldName = "PhoneExtension")]
        public string PhoneExtension { get; set; }

        [SitecoreField(FieldName = "Country")]
        public string Country { get; set; }

        [SitecoreField(FieldName = "StreetAddress1")]
        public string StreetAddress1 { get; set; }

        [SitecoreField(FieldName = "StreetAddress2")]
        public string StreetAddress2 { get; set; }


        [SitecoreField(FieldName = "City")]
        public string City { get; set; }


        [SitecoreField(FieldName = "State")]
        public string State { get; set; }


        [SitecoreField(FieldName = "ZipCode")]
        public string ZipCode { get; set; }


        [SitecoreField(FieldName = "LinkedInProfileUrl")]
        public string LinkedInProfileUrl { get; set; }


        [SitecoreField(FieldName = "FacebookProfileUrl")]
        public string FacebookProfileUrl { get; set; }


        [SitecoreField(FieldName = "TwitterProfileUrl")]
        public string TwitterProfileUrl { get; set; }


        [SitecoreField(FieldName = "ShortBiography")]
        public string ShortBiography { get; set; }

        [SitecoreField(FieldName = "Interests")]
        public string Interests { get; set; }

        [SitecoreField(FieldName = "Email Frequency")]
        public string EmailFrequency { get; set; }

        [SitecoreField(FieldName = "Email Lists")]
        public string EmailListsField
        {
            get { return String.Join("|", EmailLists ?? new List<ID>()); }
            set { EmailLists = value.Split('|').Where(ID.IsID).Select(i => new ID(i)).ToList(); }
        }

        public List<ID> EmailLists { get; set; }

        [SitecoreField(FieldName = "Opt Out")]
        public string OptOut { get; set; }

        [SitecoreField(FieldName = "PasswordToken")]
        public string PasswordToken { get; set; }
    }
}
