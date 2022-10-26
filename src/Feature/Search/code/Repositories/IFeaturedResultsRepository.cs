using System.Collections.Generic;
using Thread.Foundation.Abstractions.Listing;

namespace Thread.Feature.Search.Repositories
{
	public interface IFeaturedResultsRepository
    {
        IEnumerable<IListable> Get(string keyword);
    }
}
