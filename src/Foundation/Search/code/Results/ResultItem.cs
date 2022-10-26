using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Thread.Foundation.Search.Results
{
    [DataContract]
    public class ResultItem
    {
        [DataMember]
        public string Key { get; set; }
        [DataMember]
        public string ImageSrc { get; set; }
        [DataMember]
        public string ContentType { get; set; }
        [DataMember]
        public string Location { get; set; }
        [DataMember]
        public IEnumerable<string> Authors { get; set; }
        [DataMember]
        public string Date { get; set; }
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string Body { get; set; }
        [DataMember]
        public string DisplayUrl { get; set; }
        [DataMember]
        public string ContentUrl { get; set; }
        [DataMember]
        public bool Featured { get; set; }

    }
}