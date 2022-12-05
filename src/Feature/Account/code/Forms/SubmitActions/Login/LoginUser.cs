using Sitecore.Diagnostics;
using Sitecore.ExperienceForms.Models;
using Sitecore.ExperienceForms.Processing;
using AtriusHealth.Foundation.Abstractions.Account;
using AtriusHealth.Foundation.Forms.SubmitActions;

namespace AtriusHealth.Feature.Account.Forms.SubmitActions.Login
{
	/// <summary>
	/// Adapted from: https://doc.sitecore.com/developers/91/sitecore-experience-management/en/walkthrough--creating-a-login-page.html
	/// </summary>
	public class LoginUser : AccountSubmitActionBase<LoginUserData>
	{
		public LoginUser(ISubmitActionData submitActionData) : base(submitActionData)
		{
		}

		protected override bool Execute(LoginUserData data, FormSubmitContext formSubmitContext)
		{
			Assert.ArgumentNotNull(data, nameof(data));
			Assert.ArgumentNotNull(formSubmitContext, nameof(formSubmitContext));

			var input = GetFormValues(data, formSubmitContext);

			Assert.IsNotNull(input, nameof(input));

			if (UsernameOrPasswordValueIsNull(input))
			{
				return AbortForm(formSubmitContext);
			}

			var response = MembershipProvider.Login(input);

			if (!response.Success)
			{
				return AbortForm(formSubmitContext);
			}

			return true;
		}

		private CredentialsInput GetFormValues(LoginUserData data, FormSubmitContext formSubmitContext)
		{
			Assert.ArgumentNotNull(data, nameof(data));
			Assert.ArgumentNotNull(formSubmitContext, nameof(formSubmitContext));

			return new CredentialsInput
			{
				UserName = FieldHelper.GetFieldValueById(data.UserNameFieldId, formSubmitContext.Fields),
				Password = FieldHelper.GetFieldValueById(data.PasswordFieldId, formSubmitContext.Fields)
			};
		}

		private bool UsernameOrPasswordValueIsNull(CredentialsInput values)
		{
			Assert.ArgumentNotNull(values, nameof(values));
			return string.IsNullOrEmpty(values.UserName) || string.IsNullOrEmpty(values.Password);
		}
	}
}
