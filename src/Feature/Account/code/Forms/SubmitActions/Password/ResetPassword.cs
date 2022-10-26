using System;
using Sitecore.Diagnostics;
using Sitecore.ExperienceForms.Models;
using Sitecore.ExperienceForms.Processing;
using Thread.Foundation.Abstractions.Account;
using Thread.Foundation.Forms.SubmitActions;

namespace Thread.Feature.Account.Forms.SubmitActions.Password
{
	public class ResetPassword : AccountSubmitActionBase<ResetPasswordData>
	{
		public ResetPassword(ISubmitActionData submitActionData) : base(submitActionData)
		{
		}

		protected override bool Execute(ResetPasswordData data, FormSubmitContext formSubmitContext)
		{
			Assert.ArgumentNotNull(data, nameof(data));
			Assert.ArgumentNotNull(formSubmitContext, nameof(formSubmitContext));

			var input = GetFormValues(data, formSubmitContext);

			Assert.IsNotNull(input, nameof(input));

			if (PasswordValueIsNull(input))
			{
				return AbortForm(formSubmitContext);
			}

			var response = MembershipProvider.ResetPassword(input);

			if (!response.Success)
			{
				return AbortForm(formSubmitContext, response.Message);
			}

			return true;
		}

		private CredentialsInput GetFormValues(ResetPasswordData data, FormSubmitContext formSubmitContext)
		{
			Assert.ArgumentNotNull(data, nameof(data));
			Assert.ArgumentNotNull(formSubmitContext, nameof(formSubmitContext));

			return new CredentialsInput
			{
				Password = FieldHelper.GetFieldValueById(data.PasswordFieldId, formSubmitContext.Fields)
			};
		}

		private bool PasswordValueIsNull(CredentialsInput values)
		{
			Assert.ArgumentNotNull(values, nameof(values));
			return string.IsNullOrEmpty(values.Password);
		}
	}

	public class ResetPasswordData
	{
		public Guid PasswordFieldId { get; set; }
	}
}