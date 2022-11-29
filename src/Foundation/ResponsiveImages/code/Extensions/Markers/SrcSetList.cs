namespace AtriusHealth.Foundation.ResponsiveImages.Extensions.Markers
{
  /// <summary>
  /// Supports rendering srcsets with a range of widths, using default values if no values passed.
  /// See <see cref="MediaItemExtensions.GetSrcSetWidths(Sitecore.Data.Items.MediaItem,int[])"/>
  /// </summary>
  public class SrcSetList
  {
    public SrcSetList(params int[] widths)
    {
      Widths = widths;
    }

    public int[] Widths { get; }
  }
}
