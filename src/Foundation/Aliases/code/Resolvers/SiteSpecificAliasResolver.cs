using Sitecore.Data;
using Sitecore.Sites;

namespace AtriusHealth.Foundation.Aliases.Resolvers
{
	public class SiteSpecificAliasResolver : AliasResolver, IAliasResolver
	{
		private readonly SiteContext _site;

		public SiteSpecificAliasResolver(SiteContext site, Database database) : base(database)
		{
			_site = site;
		}

		public override bool Exists(string alias)
		{
			if (!base.Exists($"/global{alias}"))
			{
				return base.Exists($"/{_site.Name}{alias}");
			}

			return true;
		}

		public override ID GetTargetID(string alias)
		{
			var id = base.GetTargetID($"/global{alias}");
			if (id.IsNull)
			{
				return base.GetTargetID($"/{_site.Name}{alias}");
			}

			return id;
		}

		public override string GetTargetUrl(string alias)
		{
			var url = base.GetTargetUrl($"/global{alias}");
			if (string.IsNullOrEmpty(url))
			{
				return base.GetTargetUrl($"/{_site.Name}{alias}");
			}

			return url;
		}
	}
}
