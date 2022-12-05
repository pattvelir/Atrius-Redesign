using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Sitecore.ContentSearch.SolrProvider.Pipelines.PopulateSolrSchema;
using SolrNet.Schema;

namespace AtriusHealth.Foundation.Search.Schema
{
    public class CustomPopulateHelper : SchemaPopulateHelper
    {
        public CustomPopulateHelper(SolrSchema schema) : base(schema)
        { }

        public override IEnumerable<XElement> GetAllFields()
        {
            return base.GetAllFields().Union(GetAddCustomFields());
        }

        private IEnumerable<XElement> GetAddCustomFields()
        {
            yield return CreateField("_val_",
                "string",
                isDynamic: false,
                required: false,
                indexed: false,
                stored: false,
                multiValued: false,
                omitNorms: false,
                termOffsets: false,
                termPositions: false,
                termVectors: false);
        }

    }
}
