using Sitecore.Data;
using Sitecore.Diagnostics;
using Sitecore.ExperienceForms.Models;
using Sitecore.ExperienceForms.Processing;
using Thread.Foundation.Abstractions.Account;
using Thread.Foundation.Forms.SubmitActions;

namespace Thread.Feature.Account.Forms.SubmitActions.Register
{
	/// <summary>
	/// Adapted from: https://doc.sitecore.com/developers/91/sitecore-experience-management/en/walkthrough--creating-a-register-page.html
	/// </summary>
	public class RegisterUser : AccountSubmitActionBase<RegisterUserData>
	{
		public RegisterUser(ISubmitActionData submitActionData) : base(submitActionData)
		{
		}

		protected override bool Execute(RegisterUserData data, FormSubmitContext formSubmitContext)
		{
			Assert.ArgumentNotNull(data, nameof(data));
			Assert.ArgumentNotNull(formSubmitContext, nameof(formSubmitContext));

			var input = GetFormValues(data, formSubmitContext);

			if (EmailOrPasswordsIsNull(input))
			{
				return AbortForm(formSubmitContext);
			}

			var response = MembershipProvider.Register(input);

			if (!response.Success)
			{
				return AbortForm(formSubmitContext);
			}

			return true;
		}

		private RegisterUserInput GetFormValues(RegisterUserData data, FormSubmitContext formSubmitContext)
		{
			Assert.ArgumentNotNull(data, nameof(data));
			Assert.ArgumentNotNull(formSubmitContext, nameof(formSubmitContext));

			return new RegisterUserInput
			{
				UserName = FieldHelper.GetFieldValueById(data.EmailAddressFieldId, formSubmitContext.Fields),
				Password = FieldHelper.GetFieldValueById(data.PasswordFieldId, formSubmitContext.Fields),
				EmailAddress = FieldHelper.GetFieldValueById(data.EmailAddressFieldId, formSubmitContext.Fields),
				FirstName = FieldHelper.GetFieldValueById(data.FirstNameFieldId, formSubmitContext.Fields),
				LastName = FieldHelper.GetFieldValueById(data.LastNameFieldId, formSubmitContext.Fields)
			};
		}

		private bool EmailOrPasswordsIsNull(RegisterUserInput values)
		{
			Assert.ArgumentNotNull(values, nameof(values));
			return string.IsNullOrEmpty(values.UserName) || string.IsNullOrEmpty(values.Password);
		}
	}
}