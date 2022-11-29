using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AtriusHealth.Foundation.Mvc.ViewModels;

namespace AtriusHealth.Feature.RichText.Models
{
    public class RichTextComponentModel : AtriusHealthViewModel<RichTextItem, RichTextRenderingParameters>
    {
        
        public string TextAllignment => RenderingParameters.Alignment?.Value?.Value ?? string.Empty;
    }
}
