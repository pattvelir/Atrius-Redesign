using System;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;
using System.Web.Http.ValueProviders;
using Jabberwocky.DependencyInjection.Autowire.Attributes;
using AtriusHealth.Feature.Listing.Page;
using AtriusHealth.Feature.Listing.Reference;
using AtriusHealth.Foundation.SitecoreExtensions.DependencyInjection;
using Velir.Search.Core.Reference;

namespace AtriusHealth.Feature.Listing.Models
{
	[AutowireService]
	public class DynamicContentConfigurationBinder : IModelBinder
	{
		private readonly IServiceProvider _provider;

		public DynamicContentConfigurationBinder(IServiceProvider provider)
		{
			_provider = provider;
		}

		public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
		{
			if (bindingContext.ModelType != typeof(DynamicContentListingConfiguration)) return false;

			var pageId = GetBindingParameter(bindingContext, SiteSettings.QueryString.PageIdKey);
			var listingId = GetBindingParameter(bindingContext, QueryString.ListingIdKey);

			if (string.IsNullOrEmpty(pageId) || string.IsNullOrEmpty(listingId)) return false;

			var model = _provider.GetService<DynamicContentListingConfiguration>();
			model.PageItem = Sitecore.Context.Database.GetItem(pageId);
			model.Datasource = Sitecore.Context.Database.GetItem(listingId);

			bindingContext.Model = model;

			return true;
		}

		protected static string GetBindingParameter(ModelBindingContext bindingContext, string parameterName)
		{
			ValueProviderResult valueProviderResult = bindingContext.ValueProvider.GetValue(parameterName);

			if (valueProviderResult == null) return null;
			
			return HttpUtility.HtmlEncode(valueProviderResult.RawValue);
		}
	}
}
