using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Thread.Foundation.Mvc.ViewModels;

namespace Thread.Feature.RichText.Models
{
    public class RichTextComponentModel : ThreadViewModel<RichTextItem, RichTextRenderingParameters>
    {
        
        public string TextAllignment => RenderingParameters.Alignment?.Value?.Value ?? string.Empty;
    }
}