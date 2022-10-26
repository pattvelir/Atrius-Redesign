using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Security.Authentication;
using Thread.Feature.Account.Models;
using Thread.Foundation.Account.Users;
using Thread.Foundation.Abstractions.Account;
using Thread.Foundation.Account.Services;
using Thread.Foundation.Enumerations;
using Thread.Foundation.Orm.Factory;
using Thread.Foundation.Orm.Services;
using Thread.Foundation.Taxonomy;
using Thread.Foundation.Taxonomy.Extensions;

namespace Thread.Feature.Account.Services
{
    [AutowireService]
    public class MemberProfileService : IMemberProfileService
    {
        private readonly IContextProvider _context;
        private readonly IItemInterfaceFactory _interfaceFactory;
        private readonly IUserService _userService;

        public MemberProfileService(IContextProvider context, IItemInterfaceFactory interfaceFactory, IUserService userService)
        {
            _context = context;
            _interfaceFactory = interfaceFactory;
            _userService = userService;
        }

        public MemberProfileModel UpdateProfile(MemberProfileModel model)
        {
            var response = new MembershipProviderResponse();
            try
            {
                CustomUser customUser = _userService.Load(Sitecore.Context.User);

                model.ShortBiography = HttpUtility.UrlDecode(model.ShortBiography);

                customUser.FirstName = model.FirstName;
                customUser.LastName = model.LastName;
                customUser.CompanyName = model.CompanyName;
                customUser.CompanyWebsiteUrl = model.CompanyWebsiteUrl;
                customUser.JobTitle = model.JobTitle;
                customUser.PhoneNumber = model.PhoneNumber;
                customUser.PhoneExtension = model.PhoneExtension;
                customUser.Country = model.Country;
                customUser.StreetAddress1 = model.StreetAddress1;
                customUser.StreetAddress2 = model.StreetAddress2;
                customUser.City = model.City;
                customUser.State = model.State;
                customUser.ZipCode = model.ZipCode;
                customUser.LinkedInProfileUrl = model.LinkedInProfileUrl;
                customUser.FacebookProfileUrl = model.FacebookProfileUrl;
                customUser.TwitterProfileUrl = model.TwitterProfileUrl;
                customUser.ShortBiography = model.ShortBiography;

                if (model.ProfileImage != null)
                {
                    using (var binaryReader = new BinaryReader(model.ProfileImage.InputStream))
                    {
                        byte[] fileData = binaryReader.ReadBytes(model.ProfileImage.ContentLength);
                        var base64 = Convert.ToBase64String(fileData);
                        var imgSrc = String.Format($"data:{model.ProfileImage.ContentType};base64,{base64}");
                        customUser.ProfileImage = imgSrc;
                    }
                }

                response.Success = _userService.UpdateUser(customUser);
            }
            catch (Exception e)
            {
                Sitecore.Diagnostics.Log.Error($"An error occurred trying to update user profile fields for user {Sitecore.Context.User.LocalName}.", e, this);
                response.Success = false;
            }

            var returnModel = GetProfileModel();
            returnModel.Response = response;

            return returnModel;
        }

        public MembershipProviderResponse UpdateInterests(FormCollection collection)
        {
            var response = new MembershipProviderResponse();
            try
            {
                var values = String.Join("|", collection.AllKeys.Where(ID.IsID));

                CustomUser customUser = _userService.Load(Sitecore.Context.User);

                customUser.Interests = values;
                
                response.Success = _userService.UpdateUser(customUser);
            }
            catch (Exception e)
            {
                Sitecore.Diagnostics.Log.Error("An error occurred trying to update interests.", e, this);
                response.Success = false;
            }

            return response;
        }

        public MembershipProviderResponse UpdateEmailPreferences(MemberEmailPreferencesModel model)
        {
            var response = new MembershipProviderResponse();
            try
            {
                CustomUser customUser = _userService.Load(Sitecore.Context.User);

                customUser.EmailFrequency = model.EmailFrequencyOptions?.FirstOrDefault(i => i.Id == model.SelectedEmailFrequency)?.Id;
                customUser.EmailLists = model.EmailListOptions?.Where(i => i.Selected).Select(i => new ID(i.Id)).ToList();
                customUser.OptOut = model.OptOut ? "1" : "0";

                response.Success = _userService.UpdateUser(customUser);
            }
            catch (Exception e)
            {
                Sitecore.Diagnostics.Log.Error("An error occurred trying to update email preferences.", e, this);
                response.Success = false;
            }
            
            return response;
        }

        public MembershipProviderResponse UpdateAccountSecurity(MemberAccountSecurityModel model)
        {
            var response = new MembershipProviderResponse
            {
                Success = true
            };

            CustomUser customUser = _userService.Load(Sitecore.Context.User);

            if (!_userService.IsValidEmail(model.Email))
            {
                return new MembershipProviderResponse{ Success = false, Message = "Invalid email." };
            }
            if (string.IsNullOrEmpty(model.Email))
            {
                return new MembershipProviderResponse { Success = false, Message = "Email cannot be empty." };
            }
            if (string.IsNullOrEmpty(model.CurrentPassword))
            {
                return new MembershipProviderResponse { Success = false, Message = "Password cannot be empty." };
            }
            if (!Membership.ValidateUser(customUser.DomainUsername, model.CurrentPassword))
            {
                return new MembershipProviderResponse { Success = false, Message = "Invalid password." };
            }

            var newUsername = $@"{_context.GetDomain().Name}\{model.Email}";

            var emailIsInUse = _userService.IsUsernameInUse(newUsername);
            if (customUser.Email != model.Email && emailIsInUse)
            {
                return new MembershipProviderResponse { Success = false, Message = "Email is already in use." };
            }

            if (customUser.Email != model.Email && !emailIsInUse)
            {
                var updatedRows = _userService.UpdateUsername(newUsername, customUser.DomainUsername);

                if (updatedRows > 0)
                {
                    AuthenticationManager.Logout();
                    AuthenticationManager.Login(newUsername);

                    customUser = _userService.Load(Sitecore.Context.User);

                    customUser.Email = model.Email;
                    if (!_userService.UpdateUser(customUser))
                    {
                        return new MembershipProviderResponse { Success = false, Message = "Error updating email address." };
                    }
                }
                else
                {
                    return new MembershipProviderResponse { Success = false, Message = "Error updating username." };
                }
            }

            if (!string.IsNullOrEmpty(model.NewPassword))
            {
                var user = Membership.GetUser(customUser.DomainUsername);
                var changePasswordSuccess = user?.ChangePassword(model.CurrentPassword, model.NewPassword) ?? false;

                if (!changePasswordSuccess)
                {
                    return new MembershipProviderResponse { Success = false, Message = "Error changing password." };
                }
            }

            return new MembershipProviderResponse { Success = true };
        }

        public MemberProfileModel GetProfileModel()
        {
            CustomUser customUser = _userService.Load(Sitecore.Context.User);

            return new MemberProfileModel
            {
                ProfileImageRaw = customUser.ProfileImage,
                FirstName = customUser.FirstName,
                LastName = customUser.LastName,
                CompanyName = customUser.CompanyName,
                CompanyWebsiteUrl = customUser.CompanyWebsiteUrl,
                JobTitle = customUser.JobTitle,
                EmailAddress = customUser.Email,
                PhoneNumber = customUser.PhoneNumber,
                PhoneExtension = customUser.PhoneExtension,
                Country = customUser.Country,
                StreetAddress1 = customUser.StreetAddress1,
                StreetAddress2 = customUser.StreetAddress2,
                City = customUser.City,
                State = customUser.State,
                ZipCode = customUser.ZipCode,
                LinkedInProfileUrl = customUser.LinkedInProfileUrl,
                FacebookProfileUrl = customUser.FacebookProfileUrl,
                TwitterProfileUrl = customUser.TwitterProfileUrl,
                ShortBiography = customUser.ShortBiography
            }; 
        }

        public MemberInterestsModel GetInterests(InterestsItem datasource)
        {
            CustomUser customUser = _userService.Load(Sitecore.Context.User);

            var userSelectedIds = customUser?.Interests?.Split('|')?.Where(ID.IsID)?.Select(i => new ID(i)) ?? Enumerable.Empty<ID>();

            var items = new List<KeyValuePair<string, List<ProfileFieldListItem>>>();
            foreach (var taxonomyFolder in datasource.Interests.GetItems())
            {
                var taxonomyItems = taxonomyFolder.Axes.GetDescendants().Select(i => GetTaxonomyItems(i, userSelectedIds))
                    .Where(i => i != null);
                items.Add(new KeyValuePair<string, List<ProfileFieldListItem>>(taxonomyFolder.DisplayName, taxonomyItems.ToList()));
            }

            return new MemberInterestsModel
            {
                InterestItems = items
            };
        }

        public MemberEmailPreferencesModel GetEmailPreferences(EmailPreferencesItem datasource)
        {
            CustomUser customUser = _userService.Load(Sitecore.Context.User);

            var emailFrequencies = datasource.EmailFrequencies.GetItems().Select(i => new ProfileFieldListItem
            {
                Id = i.ID.ToString(),
                Name = i.Fields[EmailFrequencyItem.FieldIds.Value]?.Value ?? i.DisplayName,
                Selected = ID.IsID(customUser.EmailFrequency) && new ID(customUser.EmailFrequency) == i.ID
            });

            var emailLists = datasource.EmailLists.GetItems().Select(i => new ProfileEmailListItem
            {
                Id = i.ID.ToString(),
                Name = i.Fields[EmailFrequencyItem.FieldIds.Value]?.Value ?? i.DisplayName,
                Description = i.Fields[EmailListItem.FieldIds.ShortDescription]?.Value ?? string.Empty,
                Selected = customUser?.EmailLists?.Contains(i.ID) ?? false
            });

            return new MemberEmailPreferencesModel
            {
                EmailFrequencyOptions = emailFrequencies.ToList(),
                EmailListOptions = emailLists.ToList(),
                OptOut = customUser.OptOut == "1"
            };
        }

        public MemberAccountSecurityModel GetAccountSecurityModel()
        {
            return new MemberAccountSecurityModel
            {
                Email = Sitecore.Context.User.Profile.Email
            };
        }

        private ProfileFieldListItem GetTaxonomyItems(Item item, IEnumerable<ID> userSelectedIds)
        {
            ID[] taxonomyTemplates = new[] { TopicItem.TemplateId, LocationItem.TemplateId, ContentTypeItem.TemplateId, PersonItem.TemplateId };

            if (taxonomyTemplates.Any(item.DescendsFrom))
            {
                string name = item.DisplayName;
                if (item.DescendsFrom(PersonItem.TemplateId))
                {
                    var fullName = _interfaceFactory.GetItem<PersonItem>(item)?.GetFullName();
                    name = string.IsNullOrEmpty(fullName) ? item.DisplayName : fullName;
                }

                return new ProfileFieldListItem
                {
                    Name = name,
                    Id = item.ID.ToString(),
                    Selected = userSelectedIds.Contains(item.ID)
                };
            }

            return null;
        }
    }

    public interface IMemberProfileService
    {
        MemberProfileModel UpdateProfile(MemberProfileModel model);
        MembershipProviderResponse UpdateInterests(FormCollection collection);
        MembershipProviderResponse UpdateEmailPreferences(MemberEmailPreferencesModel model);
        MembershipProviderResponse UpdateAccountSecurity(MemberAccountSecurityModel model);
        MemberProfileModel GetProfileModel();
        MemberInterestsModel GetInterests(InterestsItem datasource);
        MemberEmailPreferencesModel GetEmailPreferences(EmailPreferencesItem datasource);
        MemberAccountSecurityModel GetAccountSecurityModel();
    }
}