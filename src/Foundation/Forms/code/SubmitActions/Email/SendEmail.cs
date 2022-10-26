using System.Net.Mail;
using Sitecore;
using Sitecore.Data;
using Sitecore.DependencyInjection;
using Sitecore.Diagnostics;
using Sitecore.ExperienceForms.Models;
using Sitecore.ExperienceForms.Processing;
using Sitecore.ExperienceForms.Processing.Actions;
using Sitecore.StringExtensions;
using Thread.Foundation.Orm.Services;
using Thread.Foundation.SitecoreExtensions.DependencyInjection;

namespace Thread.Foundation.Forms.SubmitActions.Email
{
    public class SendEmail : SubmitActionBase<EmailMessageData>
    {
        public SendEmail(ISubmitActionData submitActionData) : base(submitActionData)
        {
        }

        protected override bool Execute(EmailMessageData data, FormSubmitContext formSubmitContext)
        {
            Assert.ArgumentNotNull(data, nameof(data));
            Assert.ArgumentNotNull(formSubmitContext, nameof(formSubmitContext));

            var input = GetFormValues(data, formSubmitContext);

            Assert.IsNotNull(input, nameof(input));

            if (ValuesAreNull(input))
            {
                return AbortForm(formSubmitContext);
            }

            var context = ServiceLocator.ServiceProvider.GetService<IContextProvider>();

            EmailTemplateItem emailTemplateItem = context.GetDatabase().GetItem(new ID(data.EmailTemplateId));

            var emailMessage = new MailMessage
            {
                From = new MailAddress(PerformReplacements(emailTemplateItem.From.Value, input)),
                To = { new MailAddress(PerformReplacements(emailTemplateItem.To.Value, input)) },
                Subject = PerformReplacements(emailTemplateItem.Subject.Value, input),
                Body = PerformReplacements(emailTemplateItem.Body.Value, input),
                IsBodyHtml = true
            };

            MainUtil.SendMail(emailMessage);

            return true;
        }

        private string PerformReplacements(string message, EmailMessageInput input)
        {
            message = message.Replace("$Name$", input.Name);
            message = message.Replace("$From$", input.From);
            message = message.Replace("$Subject$", input.Subject);
            message = message.Replace("$Message$", input.Message);
            return message;
        }

        private EmailMessageInput GetFormValues(EmailMessageData data, FormSubmitContext formSubmitContext)
        {
            Assert.ArgumentNotNull(data, nameof(data));
            Assert.ArgumentNotNull(formSubmitContext, nameof(formSubmitContext));

            return new EmailMessageInput
            {
                Name = FieldHelper.GetFieldValueById(data.NameFieldId, formSubmitContext.Fields),
                From = FieldHelper.GetFieldValueById(data.FromFieldId, formSubmitContext.Fields),
                Subject = FieldHelper.GetFieldValueById(data.SubjectFieldId, formSubmitContext.Fields),
                Message = FieldHelper.GetFieldValueById(data.MessageFieldId, formSubmitContext.Fields)
            };
        }

        private bool ValuesAreNull(EmailMessageInput values)
        {
            Assert.ArgumentNotNull(values, nameof(values));
            return string.IsNullOrEmpty(values.Name) || 
                   string.IsNullOrEmpty(values.From) ||
                   string.IsNullOrEmpty(values.Subject) || 
                   string.IsNullOrEmpty(values.Message);
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