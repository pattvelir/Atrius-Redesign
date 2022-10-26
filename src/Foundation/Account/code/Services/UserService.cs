using System;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Security;
using Jabberwocky.Core.Caching;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using Sitecore.Security.Accounts;
using Thread.Foundation.Account.Users;

namespace Thread.Foundation.Account.Services
{
    [AutowireService]
    public class UserService : IUserService
    {
        private readonly ICacheProvider _cacheProvider;
        public UserService(ICacheProvider cacheProvider)
        {
            _cacheProvider = cacheProvider;
        }
        private CustomUser LoadFromCache(User user)
        {
            var cacheKey = $"UserService:LoadFromCache:uid:{user.Profile.UserName}";
            return _cacheProvider.GetFromCache(cacheKey, new TimeSpan(0, 30, 0), () =>
            {
                CustomUser customUser = new CustomUser();
                customUser.Load(user);

                return customUser;
            });
        }

        public bool UpdateUser(CustomUser user)
        {
            bool updatedUser = user.Update();

            var cacheKey = $"UserService:LoadFromCache:uid:{user.Email}";
            _cacheProvider.AddToCache(cacheKey, user);

            return updatedUser;
        }

        public CustomUser Load(User user)
        {
            return LoadFromCache(user);
        }

        public int UpdateUsername(string newUsername, string oldUsername)
        {
            var connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["core"].ConnectionString;
            using (SqlConnection con = new SqlConnection(connectionString))
            using (SqlCommand cmd = con.CreateCommand())
            {
                con.Open();

                cmd.CommandText = @"UPDATE aspnet_Users SET UserName=@NewUsername,LoweredUserName=@LoweredNewUsername WHERE UserName=@OldUsername";
                cmd.Parameters.AddWithValue("@NewUsername", newUsername);
                cmd.Parameters.AddWithValue("@LoweredNewUsername", newUsername.ToLower());
                cmd.Parameters.AddWithValue("@OldUsername", oldUsername);

                return cmd.ExecuteNonQuery();
            }
        }

        public bool IsUsernameInUse(string username)
        {
            var usersWithEmail = Membership.FindUsersByName(username).Cast<MembershipUser>();
            if (usersWithEmail.Any())
            {
                return true;
            }

            return false;
        }
        public bool IsValidEmail(string source)
        {
            return new EmailAddressAttribute().IsValid(source);
        }
    }

    public interface IUserService
    {
        CustomUser Load(User user);
        bool UpdateUser(CustomUser user);
        int UpdateUsername(string newUsername, string oldUsername);
        bool IsUsernameInUse(string username);
        bool IsValidEmail(string source);
    }
}