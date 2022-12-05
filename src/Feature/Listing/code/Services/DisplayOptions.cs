using AtriusHealth.Foundation.Enumerations.References;

namespace AtriusHealth.Feature.Listing.Services
{
	public class DisplayOptions
	{
		public virtual bool DisplaySummary { get; set; }
		public virtual bool DisplayContentType { get; set; }
		public virtual bool DisplayDate { get; set; }
		public virtual ImageFormat DisplayImageFormat { get; set; } = ImageFormat.None;

	}
}
