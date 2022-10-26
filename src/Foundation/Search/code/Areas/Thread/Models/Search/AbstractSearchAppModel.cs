using System.Collections.Generic;
using System.IO;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using Thread.Foundation.Mvc.ViewModels;
using Thread.Foundation.Orm.Services;
using Velir.Search.Core.Models;
using Velir.Search.Core.Reference;


namespace Thread.Foundation.Search.Areas.Thread.Models.Search
{


	public abstract class AbstractSearchResultsModel<TDatasource, TParameters> : ThreadViewModel<TDatasource, TParameters> where TDatasource : CustomItem where TParameters : RenderingParameters
	{
        protected readonly IContextProvider _contextProvider;
		protected AbstractSearchResultsModel(IContextProvider contextProvider) 
		{
			_contextProvider = contextProvider;
		}
		public abstract string SearchId { get; }
        public virtual string PageId => _contextProvider.GetItem().ID.Guid.ToString();
        public virtual string Site => _contextProvider.GetSite().Name;



        protected virtual object Query => new { PageId, Site };
		protected virtual object Dictionary => new Dictionary<string, string>();

        protected virtual object Config => new {SearchId, Url, Pagination, Sorters};
        public string SerializedQuery => ConvertToJson(Query, true);
        public string SerializedDictionary => ConvertToJson(Dictionary, true);
        public string SerializedConfig => ConvertToJson(Config, true);
		public abstract string Url { get; }
        
		public abstract bool Pagination { get; }
        
		public abstract IEnumerable<SortOptionModel> Sorters { get; }

		
		protected virtual string GetSortDirection(Item direction)
		{
			if (direction == null) return null;

			return direction.ID.Guid == Constants.SortDirections.Ascending ? SiteSettings.QueryString.SortAscendingValue : SiteSettings.QueryString.SortDescendingValue;
		}

		protected virtual bool IsActiveOption(SortOptionItem option)
		{
			var paramValue = HttpContext.Current?.Request.QueryString[SiteSettings.QueryString.SortKey];

			if (string.IsNullOrEmpty(paramValue) && string.IsNullOrEmpty(option?.SearchFieldName?.Value)) return true;

			return paramValue == option?.Key?.Value;
		}

		private  string ConvertToJson(object obj, bool quoteNames = false)
		{
			var serializer = new JsonSerializer
			{
				ContractResolver = new CamelCasePropertyNamesContractResolver()
			};

			using (var stringWriter = new StringWriter())
			using (var writer = new JsonTextWriter(stringWriter))
			{
				writer.QuoteName = quoteNames;
				serializer.Serialize(writer, obj);

				return stringWriter.ToString();
			}
		}
        
	}
    

    
}