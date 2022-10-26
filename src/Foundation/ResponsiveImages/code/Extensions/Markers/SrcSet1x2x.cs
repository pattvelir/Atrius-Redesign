namespace Thread.Foundation.ResponsiveImages.Extensions.Markers
{
  /// <summary>
  /// Supports rendering 1x/2x srcSet images using <code>@Html.Sitecore().Field(ImageField, new SrcSetWidth(int))</code>
  /// This intentionally only accepts a width, as passing a width and height will result in a black letter box effect if the
  /// original aspect ratio is not respected. Per Jonathan Dallas, the width is of primary concern for organizing layout.
  /// </summary>
  public class SrcSet1x2x
  {
    public SrcSet1x2x(int width1x)
    {
      Width1X = width1x;
    }

    public int Width1X { get; }
  }
}