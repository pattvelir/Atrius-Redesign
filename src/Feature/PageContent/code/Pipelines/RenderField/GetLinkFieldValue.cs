using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Pipelines.RenderField;

namespace AtriusHealth.Feature.PageContent.Pipelines.RenderField
{
	public class GetLinkFieldValue : Sitecore.Pipelines.RenderField.GetLinkFieldValue
	{
		private const string LinkTextParameterKey = "text";
        private const string WrapParameterKey = "wrap";

		private static readonly string[] FieldNames =
		{
			_ShortTitleBaseItem.FieldIds.ShortTitle,
			_HeaderTitleBaseItem.FieldIds.HeaderTitle,
			_TitleBaseItem.FieldIds.Title
		};

		protected override bool SkipProcessor(RenderFieldArgs args)
		{
			var skip = base.SkipProcessor(args);

			if (!skip)
			{
				UpdateTextArgs(args);
                UpdateWrapArgs(args);
			}

			return skip;
		}

        private void UpdateWrapArgs(RenderFieldArgs args)
        {
			if (!args.Parameters.ContainsKey(WrapParameterKey) || string.IsNullOrEmpty(args.Parameters[WrapParameterKey])) return;

            string tag = args.Parameters[WrapParameterKey];
            string text = args.Parameters[LinkTextParameterKey];
            if (string.IsNullOrEmpty(text))
            {
                var linkField = new LinkField(args.GetField());

                text = linkField.Text;
            }

            args.RawParameters = $"<{tag}>{text}</{tag}>";
        }

        protected virtual void UpdateTextArgs(RenderFieldArgs args)
		{
			if (args.Parameters.ContainsKey(LinkTextParameterKey) && !string.IsNullOrEmpty(args.Parameters[LinkTextParameterKey])) return;

			var linkField = new LinkField(args.GetField());

            if (!string.IsNullOrEmpty(linkField.Text)) return;

            string linkText = string.Empty;
			if (linkField.IsInternal)
			{
				for (int i = 0; string.IsNullOrEmpty(linkText) && i < FieldNames.Length; i++)
				{
					string fieldName = FieldNames[i];
					linkText = linkField.TargetItem?[fieldName] ?? string.Empty;
				}

				if (string.IsNullOrEmpty(linkText))
				{
					linkText = linkField.TargetItem?.DisplayName ?? string.Empty;
				}
			}
			else if (linkField.IsMediaLink)
            {
				MediaItem mediaItem = new MediaItem(linkField.TargetItem);
                if (string.IsNullOrEmpty(linkText))
                {
                    linkText = $"{mediaItem.Name}.{mediaItem.Extension}";
                }
            }
            else
            {
                linkText = linkField.GetFriendlyUrl();
            }

            if (!string.IsNullOrEmpty(linkText))
            {
                args.Parameters.Add(LinkTextParameterKey, linkText);
			}
		}
	}
}
