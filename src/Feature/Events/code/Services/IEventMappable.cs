namespace Thread.Feature.Events.Services
{
	public interface IEventMappable
	{
		bool ServiceIsProperlyConfigured { get; }
		string GetEmbeddableMapLink(_EventDetailsItem details);
	}
}