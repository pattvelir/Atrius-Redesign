using System.Linq;
using System.Web;
using Sitecore;
using Sitecore.Diagnostics;
using Sitecore.Pipelines.GetPlaceholderRenderings;

namespace AtriusHealth.Foundation.Multisite.Pipelines.GetPlaceholderRenderings
{
    public class GetSiteSpecificRenderings : GetAllowedRenderings
    {
        public new void Process(GetPlaceholderRenderingsArgs args)
        {
            Assert.IsNotNull(args, "args");

            var definition = Client.Page.GetPlaceholderDefinition(args.LayoutDefinition, args.PlaceholderKey);

            string siteName = StringUtil.ExtractParameter("sc_site", HttpContext.Current.Request.QueryString["url"] ?? string.Empty);

            if (string.IsNullOrEmpty(definition?.MetaDataItemId) && !string.IsNullOrEmpty(siteName))
            {
                var siteArgs = new GetPlaceholderRenderingsArgs($"{siteName}-{args.PlaceholderKey}",
                    args.LayoutDefinition, args.ContentDatabase, args.DeviceId);
                base.Process(siteArgs);

                args.PlaceholderRenderings = siteArgs.PlaceholderRenderings;
                args.HasPlaceholderSettings = siteArgs.HasPlaceholderSettings;
                args.Options.ShowTree = siteArgs.Options.ShowTree;
            }

            if (args.PlaceholderRenderings == null || !args.PlaceholderRenderings.Any())
            {
                base.Process(args);
            }
        }
    }
}
