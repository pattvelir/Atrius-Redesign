using System;
using System.Collections.Generic;
using System.Reflection;
using Sitecore.Security.Accounts;
using Sitecore.SecurityModel;
using Thread.Foundation.Account.Attributes;

namespace Thread.Foundation.Account.Users
{
    public class BaseUser
    {
        //TODO: Maybe add some caching to some of these calls?
        protected virtual User InnerUser { get; private set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string DomainUsername { get; set; }
        public bool IsAuthenticated => InnerUser.IsAuthenticated;
        
        public bool Load(User sitecoreUser)
        {
            List<string> customPropertyNames = sitecoreUser.Profile.GetCustomPropertyNames();
            foreach (PropertyInfo property in this.GetType().GetProperties())
            {
                foreach (object customAttribute in property.GetCustomAttributes(false))
                {
                    if (customAttribute.GetType() == typeof(SitecoreFieldAttribute))
                    {
                        SitecoreFieldAttribute sitecoreFieldAttribute = (SitecoreFieldAttribute)customAttribute;
                        string str = !string.IsNullOrEmpty(sitecoreFieldAttribute.FieldName) ? sitecoreFieldAttribute.FieldName : property.Name;
                        if (customPropertyNames.Contains(str))
                        {
                            if (property.CanWrite)
                            {
                                string sitecoreFieldValue = sitecoreUser.Profile.GetCustomProperty(str);
                                try
                                {
                                    property.SetValue(this, sitecoreFieldValue, null);
                                }
                                catch (Exception ex)
                                {
                                    Sitecore.Diagnostics.Log.Error("Error by setting value of custom property {0}.", ex, this);
                                    throw ex;
                                }
                            }
                            else
                                Sitecore.Diagnostics.Log.Error($"Cannot write property {property.Name}.", this);
                        }
                        else
                            Sitecore.Diagnostics.Log.Error($"Property '{str}' not found in persisted properties.", this);
                    }
                }
            }

            this.InnerUser = sitecoreUser;
            this.Email = sitecoreUser.Profile.Email;
            this.Username = sitecoreUser.GetLocalName();
            this.DomainUsername = sitecoreUser.Profile.UserName;
            this.FullName = sitecoreUser.Profile.FullName;

            return true;
        }

        public bool Update()
        {
            var customProperties = GetCustomProperties();
            bool flag = false;

            using (new SecurityDisabler())
            {
                if (customProperties != null)
                {
                    foreach (KeyValuePair<string, string> keyValuePair in customProperties)
                    {
                        InnerUser.Profile.SetCustomProperty(keyValuePair.Key, keyValuePair.Value);
                    }

                    flag = true;
                }

                InnerUser.Profile.ProfileItemId = Reference.Constants.Profile;
                InnerUser.Profile.Email = this.Email;
                InnerUser.Profile.FullName = this.FullName;
                InnerUser.Profile.Save();
            }

            return flag;
        }

        private Dictionary<string, string> GetCustomProperties()
        {
            Dictionary<string, string> customProperties = new Dictionary<string, string>();
            foreach (PropertyInfo property in this.GetType().GetProperties())
            {
                try
                {
                    foreach (object customAttribute in property.GetCustomAttributes(false))
                    {
                        if (customAttribute.GetType() == typeof(SitecoreFieldAttribute))
                        {
                            SitecoreFieldAttribute customProperty = (SitecoreFieldAttribute)customAttribute;
                            string key = string.IsNullOrEmpty(customProperty.FieldName) ? property.Name : customProperty.FieldName;
                            string propertyValue;
                            try
                            {
                                propertyValue = property.GetValue(this, null).ToString();
                            }
                            catch (NullReferenceException ex)
                            {
                                Sitecore.Diagnostics.Log.Error($"Error getting property value for {property.Name} for user {this.Email}.", ex, this);
                                propertyValue = string.Empty;
                            }
                            customProperties.Add(key, propertyValue);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Sitecore.Diagnostics.Log.Error($"Error getting custom properties for {this.Email}.", ex, this);
                }
            }
            return customProperties;
        }
    }
}