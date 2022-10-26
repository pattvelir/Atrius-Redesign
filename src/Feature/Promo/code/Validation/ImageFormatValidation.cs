using System;
using System.Runtime.Serialization;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Data.Validators;

namespace Thread.Feature.Promo.Validation
{
    [Serializable]
    public class ImageFormatValidation : StandardValidator
    {
        public ImageFormatValidation()
        { }

        public ImageFormatValidation(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        protected override ValidatorResult Evaluate()
        {
            string val = base.GetControlValidationValue();
            if(string.IsNullOrWhiteSpace(val))
            {
                this.Text = $"An Image Format must be selected.";
                return ValidatorResult.CriticalError;
            }
            else
            {
                return ValidatorResult.Valid;
            }
        }
        protected override ValidatorResult GetMaxValidatorResult() { return GetFailedResult(ValidatorResult.CriticalError); }
        public override string Name => "End Date Validator";
    }
}
