using Sitecore.Data;

namespace Thread.Foundation.Aliases.Resolvers
{
	public interface IAliasResolver
	{
		bool Exists(string alias);
		ID GetTargetID(string alias);
		string GetTargetUrl(string alias);
	}
}