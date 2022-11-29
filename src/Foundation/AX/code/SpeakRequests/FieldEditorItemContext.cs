using Newtonsoft.Json;
using Sitecore.ExperienceEditor.Speak.Server.Contexts;


namespace AtriusHealth.Foundation.AX.SpeakRequests
{
    public class FieldEditorItemContext : ItemContext
    {
        [JsonProperty("text")]
        public string Text { get; set; }
    }
}
