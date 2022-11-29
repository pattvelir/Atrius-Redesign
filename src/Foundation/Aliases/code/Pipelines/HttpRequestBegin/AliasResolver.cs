using System;
using System.Web;
using Sitecore;
using Sitecore.Pipelines.HttpRequest;
using Sitecore.Configuration;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Web;
using AtriusHealth.Foundation.Aliases.Resolvers;
using Sitecore.Pipelines.HttpRequest.HandlerMapping;
using Sitecore.Abstractions;

namespace AtriusHealth.Foundation.Aliases.Pipelines.HttpRequestBegin
{
	public class AliasResolver : Sitecore.Pipelines.HttpRequest.AliasResolver
	{
		private readonly Func<IAliasResolver> _aliasResolverThunk;
        private readonly BaseFactory _baseFactory;

        public AliasResolver(
            Func<IAliasResolver> aliasResolverThunk,
            BaseFactory baseFactory)
		{
			_aliasResolverThunk = aliasResolverThunk;
            _baseFactory = baseFactory;
		}

		public override void Process(HttpRequestArgs args)
		{
			Assert.ArgumentNotNull(args, nameof(args));
			if (!Settings.AliasesActive)
			{
				Tracer.Warning("Aliases are not active.");
				return;
			}

			Database database = Context.Database;
			if (database == null)
			{
				Tracer.Warning("There is no context database in AliasResover.");
				return;
			}

            var resolver = _aliasResolverThunk();

			Profiler.StartOperation("Resolve alias.");
			if (resolver.Exists(args.LocalPath))
			{
				if (!ProcessItem(resolver, args))
				{
					if (ProcessExternalUrl(resolver, args))
					{
						string path = Context.Page?.FilePath;
						if (!string.IsNullOrEmpty(path) && WebUtil.IsExternalUrl(path))
						{
							RedirectToExternalLink(path);
						}
					}
				}
				else if (IsMediaItem(Context.Item))
				{
					string mediaUrl = MediaManager.GetMediaUrl(Context.Item);
					if (!string.IsNullOrEmpty(mediaUrl))
					{
                        var handlerMapper = new DirectHandlerMapper(_baseFactory);
                        if (handlerMapper.TryFindMatchingHandler(mediaUrl, out CustomHandler customHandler))
                        {
                            Context.Data.RawUrl = mediaUrl;
                            HttpContext.Current.RewritePath(customHandler.Handler, mediaUrl, args.Url.QueryString, true);
                            args.AbortPipeline();
                        }
					}
				}
			}
			Profiler.EndOperation();
		}

		protected virtual bool IsMediaItem(Item item)
		{
			return item != null && item.Paths.IsMediaItem && item.TemplateID != TemplateIDs.MediaFolder;
		}

		protected virtual bool ProcessItem(IAliasResolver resolver, HttpRequestArgs args)
		{
			ID targetId = resolver.GetTargetID(args.LocalPath);
			if (!targetId.IsNull)
			{
				Item target = args.GetItem(targetId);
				if (target != null && Context.Item == null)
				{
					Context.Item = target;
					Tracer.Info($"Using alias for \"{args.LocalPath}\" which points to \"{target.ID}\"");
				}

				return true;
			}

			Tracer.Error($"An alias for \"{args.LocalPath}\" exists, but points to a non-existing item.");
			return false;
		}

		protected virtual bool ProcessExternalUrl(IAliasResolver resolver, HttpRequestArgs args)
		{
			string targetUrl = resolver.GetTargetUrl(args.LocalPath);
			if (targetUrl.Length > 0)
			{
				return ProcessExternalUrl(targetUrl);
			}
			return false;
		}

		private bool ProcessExternalUrl(string path)
		{
			if (Context.Page.FilePath.Length > 0)
			{
				return false;
			}
				
			Context.Page.FilePath = path;
			return true;
		}
	}
}
