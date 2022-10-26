namespace Thread.Foundation.Abstractions.Social
{
	public interface IShareable
	{
		string ShareUrl { get; }
		string ShareTitle { get; }
		string ShareDescription { get; }
	}
}
