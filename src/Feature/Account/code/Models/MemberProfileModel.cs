using System;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using HtmlAgilityPack;
using AtriusHealth.Foundation.Dictionary.Repositories;

namespace AtriusHealth.Feature.Account.Models
{
    public class MemberProfileModel : MemberProfileBaseModel
    {
        public override string Description => Dictionary.Current.Get("Account.Profile.HeadingSubtitle");

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string CompanyWebsiteUrl { get; set; }
        public string JobTitle { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string PhoneExtension { get; set; }
        public string Country { get; set; }
        public string StreetAddress1 { get; set; }
        public string StreetAddress2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string LinkedInProfileUrl { get; set; }
        public string FacebookProfileUrl { get; set; }
        public string TwitterProfileUrl { get; set; }

        [AllowHtml]
        public string ShortBiography { get; set; }
        public HttpPostedFileBase ProfileImage { get; set; }
        public string ProfileImageRaw { get; set; }

        public string DisplayPhoneNumber
        {
            get
            {
                if (string.IsNullOrEmpty(PhoneNumber))
                    return string.Empty;

                var builder = new StringBuilder(PhoneNumber);
                if (!string.IsNullOrEmpty(PhoneExtension))
                    builder.Append($" ext. {PhoneExtension}");

                return builder.ToString();
            }
        }
        public string ProfileTitle
        {
            get
            {
                var builder = new StringBuilder();
                if (!string.IsNullOrEmpty(JobTitle))
                    builder.Append(JobTitle);

                if (!string.IsNullOrEmpty(JobTitle) && !string.IsNullOrEmpty(CompanyName))
                    builder.Append(" at ");

                if (!string.IsNullOrEmpty(CompanyName))
                    builder.Append($"<a href=\"{CompanyWebsiteUrl}\">{CompanyName}</a>");

                return builder.ToString();
            }
        }

        public string DisplayAddress
        {
            get
            {
                var builder = new StringBuilder(StreetAddress1);
                if (!string.IsNullOrEmpty(StreetAddress2))
                    builder.Append($" {StreetAddress2}");

                if (!string.IsNullOrEmpty(City))
                    builder.Append($", {City}");

                if (!string.IsNullOrEmpty(State))
                    builder.Append($" {State}");

                if (!string.IsNullOrEmpty(ZipCode))
                    builder.Append($" {ZipCode}");

                return builder.ToString();
            }
        }

        public bool IsEmptyShortBio()
        {
            if (!string.IsNullOrEmpty(ShortBiography))
            {
                try
                {
                    HtmlDocument doc = new HtmlDocument();

                    doc.LoadHtml(ShortBiography);

                    if (doc.DocumentNode.SelectNodes("//text()") != null)
                    {
                        foreach (HtmlNode node in doc.DocumentNode.SelectNodes("//text()"))
                        {
                            if (!string.IsNullOrEmpty(node.InnerText))
                                return false;
                        }
                    }
                }
                catch { }
            }

            return true;
        }
    }
}
