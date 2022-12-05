using System.Collections.Generic;

namespace AtriusHealth.Foundation.Abstractions.Listing
{
	public interface IListable
	{
		string ListId { get; }
		string ListTitle { get; }
		string ListUrl { get; }
		string ListDescription { get; }
		string ListImage1X1 { get; }
		string ListImage16X9 { get; }
		string ListContentType { get; }
		IEnumerable<string> ListAuthors { get; }
		string ListDate { get; }
		string ListLocation { get; }
        string ListSubtitle { get; }
        string ListShortTitle { get; }

    }
}
