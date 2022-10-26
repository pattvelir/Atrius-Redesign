namespace Thread.Foundation.Search.Areas.Thread.Models.Search
{
	public class SortOptionModel	
	{
		public virtual string Id { get; set; }
		public virtual string Label { get; set; }
		public virtual string Value { get; set; }
		public virtual string Direction { get; set; }
		public virtual bool IsActive { get; set; }
	}
}