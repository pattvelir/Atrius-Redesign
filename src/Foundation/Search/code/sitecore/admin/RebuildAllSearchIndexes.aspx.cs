using System;
using System.Linq;
using Sitecore.ContentSearch.Maintenance;
using Sitecore.sitecore.admin;

namespace AtriusHealth.Foundation.Search.sitecore.admin
{
    public partial class RebuildAllSearchIndexes : AdminPage
    {
        protected override void OnInit(EventArgs e)
        {
            CheckSecurity(true);
            base.OnInit(e);
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            IndexCustodian.RebuildAll().ToList();
        }
    }
}
