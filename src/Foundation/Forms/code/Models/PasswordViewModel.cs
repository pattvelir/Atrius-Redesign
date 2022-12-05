using Sitecore;
using Sitecore.Data.Items;
using Sitecore.ExperienceForms.Mvc.Models.Fields;

namespace AtriusHealth.Foundation.Forms.Models
{
	public class PasswordViewModel : StringInputViewModel
	{
		public bool ShowHidePassword { get; set; }

		protected override void InitItemProperties(Item item)
		{
			base.InitItemProperties(item);

			ShowHidePassword = MainUtil.GetBool(item.Fields["Show Hide Password"]?.Value, false);
		}

		protected override void UpdateItemFields(Item item)
		{
			base.UpdateItemFields(item);

			item.Fields["Show Hide Password"]?.SetValue(ShowHidePassword ? "1" : string.Empty, true);
		}
	}
}
