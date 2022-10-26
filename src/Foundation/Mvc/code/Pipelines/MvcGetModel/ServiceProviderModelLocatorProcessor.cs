using System;
using Sitecore.Mvc.Helpers;
using Sitecore.Mvc.Pipelines.Response.GetModel;
using Sitecore.Mvc.Presentation;
using Sitecore.StringExtensions;

namespace Thread.Foundation.Mvc.Pipelines.MvcGetModel
{
	public class ServiceProviderModelLocatorProcessor : GetModelProcessor
	{
        private readonly IServiceProvider _provider;

        public ServiceProviderModelLocatorProcessor(IServiceProvider provider)
        {
            _provider = provider;
        }

        public override void Process(GetModelArgs args)
        {
            args.ModelLocator = new ServiceProviderModelLocator(_provider);
        }
    }

    public class ServiceProviderModelLocator : ModelLocator
    {
        private readonly IServiceProvider _sp;

        public ServiceProviderModelLocator(IServiceProvider provider)
        {
            _sp = provider;
        }

        protected override object GetModelFromTypeName(string typeName, string model, bool throwOnTypeCreationError)
        {
            Type type = TypeHelper.GetType(typeName);
            if (type == null)
            {
                if (throwOnTypeCreationError)
                {
                    throw new InvalidOperationException("Could not locate type '{0}'. Model reference: '{1}'".FormatWith(typeName, model));
                }
                return null;
            }

            object obj = _sp.GetService(type);
            if (obj == null)
            {
                obj = TypeHelper.CreateObject(type, Array.Empty<object>());
                if (obj == null & throwOnTypeCreationError)
                {
                    throw new InvalidOperationException("Could not create a model object of type '{0}'. Model reference: '{1}'".FormatWith(typeName, model));
                }
            }

            return obj;
        }
    }
}