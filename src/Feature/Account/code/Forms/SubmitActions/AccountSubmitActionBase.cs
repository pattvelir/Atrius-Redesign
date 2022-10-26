using Sitecore.DependencyInjection;
using Sitecore.ExperienceForms.Models;
using Sitecore.ExperienceForms.Processing;
using Sitecore.ExperienceForms.Processing.Actions;
using Sitecore.StringExtensions;
using Thread.Foundation.Abstractions.Account;
using Thread.Foundation.SitecoreExtensions.DependencyInjection;

namespace Thread.Feature.Account.Forms.SubmitActions
{
	public abstract class AccountSubmitActionBase<TParametersData> : SubmitActionBase<TParametersData>
	{
		protected IMembershipProvider MembershipProvider => ServiceLocator.ServiceProvider.GetService<IMembershipProvider>();

		protected AccountSubmitActionBase(ISubmitActionData submitActionData) : base(submitActionData)
		{
		}

		protected virtual bool AbortForm(FormSubmitContext formSubmitContext, string errorMessage = null)
		{
			if (!errorMessage.IsNullOrEmpty())
			{
				formSubmitContext.Errors.Add(new FormActionError
				{
					ErrorMessage = errorMessage
				});
			}

			formSubmitContext.Abort();
			return false;
		}
	}
}