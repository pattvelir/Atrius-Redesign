using Sitecore.Pipelines;

namespace Thread.Foundation.Dictionary.Pipelines.Initialize
{
    public class InitializeDictionary
    {
        public void Process(PipelineArgs args)
        {
            Sitecore.Globalization.Translate.ResetCache(true);
        }
    }
}