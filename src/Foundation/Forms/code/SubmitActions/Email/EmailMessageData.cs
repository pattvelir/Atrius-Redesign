using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.Pipelines.GetAboutInformation;

namespace Thread.Foundation.Forms.SubmitActions.Email
{
    public class EmailMessageData
    {
        public Guid FromFieldId { get; set; }
        public Guid NameFieldId { get; set; }
        public Guid SubjectFieldId { get; set; }
        public Guid MessageFieldId { get; set; }
        public Guid EmailTemplateId { get; set; }
    }

    public class EmailMessageInput
    {
        public virtual string To { get; set; }
        public virtual string From { get; set; }
        public virtual string Name { get; set; }
        public virtual string Subject { get; set; }
        public virtual string Message { get; set; }
    }
}