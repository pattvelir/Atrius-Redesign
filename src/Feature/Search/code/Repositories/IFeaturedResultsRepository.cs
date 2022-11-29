using System.Collections.Generic;
using AtriusHealth.Foundation.Abstractions.Listing;

namespace AtriusHealth.Feature.Search.Repositories
{
	public interface IFeaturedResultsRepository
    {
        IEnumerable<IListable> Get(string keyword);
    }
}
