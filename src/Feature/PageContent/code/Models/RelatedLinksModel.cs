using System.Collections.Generic;
using System.Linq;
using Thread.Foundation.Mvc.ViewModels;

namespace Thread.Feature.PageContent.Models
{
    public class RelatedLinksModel : ThreadViewModel<RelatedLinksItem>
    {
        public bool IsValid() => Datasource != null && RelatedLinks.Any(r => !string.IsNullOrEmpty(r?.Link.GetFriendlyUrl()) && (r.Link.IsInternal || r.Link.IsMediaLink || !string.IsNullOrEmpty(r.Link.Text)));

        private IList<RelatedLinkItem> _relatedLinks;

        public IList<RelatedLinkItem> RelatedLinks => _relatedLinks ??
                                                      (_relatedLinks = Datasource.RelatedLinks.GetItems()
                                                          .Select(i => (RelatedLinkItem) i).ToList());
    }
}