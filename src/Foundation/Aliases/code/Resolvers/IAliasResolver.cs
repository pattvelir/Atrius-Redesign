using Sitecore.Data;

namespace AtriusHealth.Foundation.Aliases.Resolvers
{
	public interface IAliasResolver
	{
		bool Exists(string alias);
		ID GetTargetID(string alias);
		string GetTargetUrl(string alias);
	}
}
