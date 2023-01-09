
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
// ReSharper disable All

					namespace AtriusHealth.Project.AtriusHealth
					{
						using Sitecore.Data;
						using Sitecore.Data.Fields;
						using Sitecore.Data.Items;
							
						public partial class DetailPageItem : CustomItem
						{
							
			public static readonly ID TemplateId = new ID("cdc8c7d0-90a0-48e7-be0e-c029a6a062d5");
							public static class FieldIds
		{

			public static readonly string DisplayDate = "3927b1aa-347c-4d88-9b93-b327eae1b6d0";

			public static readonly string Image16x9 = "f0e8ca34-1117-486d-88a8-ff0ab471e9c4";

			public static readonly string Image1x1 = "89f4ee5e-3e89-4e75-816b-5049d563b287";

			public static readonly string NoFollow = "1bd0fef8-5ee5-435b-bde3-a332a0709e8e";

			public static readonly string NoIndex = "497a98de-d47a-4da9-931e-100fc84d5ab1";

			public static readonly string SuppressInNavigation = "1ccdab5f-8819-4a04-a09a-4f66dfb65d12";

			public static readonly string Summary = "19d48702-b149-4a2d-b72d-e3e8b5cf3bcc";

			public static readonly string ContentType = "d7b9c27c-79e3-42a7-9b46-bff652ef0981";

			public static readonly string Topics = "027f5e1e-d0e5-4afd-9b7a-90a563504d47";

			public static readonly string Locations = "7928f523-5727-4843-ba3d-60874d4e6f6b";

			public static readonly string People = "bef10252-ea97-4433-a7e3-d924796e3950";

			public static readonly string Title = "91573f05-edb0-43cf-ac81-a6ca06c7fc0d";

			public static readonly string ShortTitle = "10e9213f-9aad-4979-a6a4-912a36275bb9";

			public static readonly string HeaderTitle = "d64a69f6-1317-47a1-a78b-2e22423c8133";

			public static readonly string Subtitle = "cb8dc0b3-f344-4cb0-b9f2-79eb4da005a9";
}

							public DetailPageItem(Item innerItem) : base(innerItem) {}
public static implicit operator DetailPageItem(Item innerItem)
	{
		return innerItem != null && innerItem.DescendsFrom(TemplateId) ? new DetailPageItem(innerItem) : null;
	}
public static implicit operator Item(DetailPageItem customItem)
	{
		return customItem?.InnerItem;
	}

							
			public virtual DateField DisplayDate => InnerItem.Fields[FieldIds.DisplayDate];

			public virtual ImageField Image16x9 => InnerItem.Fields[FieldIds.Image16x9];

			public virtual ImageField Image1x1 => InnerItem.Fields[FieldIds.Image1x1];

			public virtual CheckboxField NoFollow => InnerItem.Fields[FieldIds.NoFollow];

			public virtual CheckboxField NoIndex => InnerItem.Fields[FieldIds.NoIndex];

			public virtual CheckboxField SuppressInNavigation => InnerItem.Fields[FieldIds.SuppressInNavigation];

			public virtual TextField Summary => InnerItem.Fields[FieldIds.Summary];

			public virtual LookupField ContentType => InnerItem.Fields[FieldIds.ContentType];

			public virtual MultilistField Topics => InnerItem.Fields[FieldIds.Topics];

			public virtual MultilistField Locations => InnerItem.Fields[FieldIds.Locations];

			public virtual MultilistField People => InnerItem.Fields[FieldIds.People];

			public virtual TextField Title => InnerItem.Fields[FieldIds.Title];

			public virtual TextField ShortTitle => InnerItem.Fields[FieldIds.ShortTitle];

			public virtual TextField HeaderTitle => InnerItem.Fields[FieldIds.HeaderTitle];

			public virtual TextField Subtitle => InnerItem.Fields[FieldIds.Subtitle];

						}
					}
				

					namespace AtriusHealth.Project.AtriusHealth
					{
						using Sitecore.Data;
						using Sitecore.Data.Fields;
						using Sitecore.Data.Items;
							
						public partial class EventDetailPageItem : CustomItem
						{
							
			public static readonly ID TemplateId = new ID("edeb2c49-9782-4516-a356-5ab0c099759c");
							public static class FieldIds
		{

			public static readonly string Image16x9 = "f0e8ca34-1117-486d-88a8-ff0ab471e9c4";

			public static readonly string Image1x1 = "89f4ee5e-3e89-4e75-816b-5049d563b287";

			public static readonly string NoFollow = "1bd0fef8-5ee5-435b-bde3-a332a0709e8e";

			public static readonly string NoIndex = "497a98de-d47a-4da9-931e-100fc84d5ab1";

			public static readonly string SuppressInNavigation = "1ccdab5f-8819-4a04-a09a-4f66dfb65d12";

			public static readonly string EndDate = "1fa41737-7a7b-484d-ae33-49be52a1af41";

			public static readonly string StartDate = "4037909f-26bb-42b7-9f37-7cd0b5e941bb";

			public static readonly string Address1 = "99f3f951-5ae8-4777-b705-354e7f9e4f9a";

			public static readonly string Address2 = "701473a3-bf78-46eb-b37d-d581fda816be";

			public static readonly string City = "6081c484-0ec5-4aac-bcfc-9d1a38b68900";

			public static readonly string RegistrationLink = "7fe91416-7d9a-491b-a738-1566d402bd4b";

			public static readonly string ShortDescription = "7cff50ee-ac60-4ab8-a0ca-d43df14bac2d";

			public static readonly string State = "750276e5-5ffa-4afe-9d5d-2db3a199c7e4";

			public static readonly string ZipCode = "6592df0a-5b31-402b-ba41-db4137d0e260";

			public static readonly string Summary = "19d48702-b149-4a2d-b72d-e3e8b5cf3bcc";

			public static readonly string ContentType = "d7b9c27c-79e3-42a7-9b46-bff652ef0981";

			public static readonly string Topics = "027f5e1e-d0e5-4afd-9b7a-90a563504d47";

			public static readonly string Locations = "7928f523-5727-4843-ba3d-60874d4e6f6b";

			public static readonly string People = "bef10252-ea97-4433-a7e3-d924796e3950";

			public static readonly string Title = "91573f05-edb0-43cf-ac81-a6ca06c7fc0d";

			public static readonly string ShortTitle = "10e9213f-9aad-4979-a6a4-912a36275bb9";

			public static readonly string HeaderTitle = "d64a69f6-1317-47a1-a78b-2e22423c8133";

			public static readonly string Subtitle = "cb8dc0b3-f344-4cb0-b9f2-79eb4da005a9";
}

							public EventDetailPageItem(Item innerItem) : base(innerItem) {}
public static implicit operator EventDetailPageItem(Item innerItem)
	{
		return innerItem != null && innerItem.DescendsFrom(TemplateId) ? new EventDetailPageItem(innerItem) : null;
	}
public static implicit operator Item(EventDetailPageItem customItem)
	{
		return customItem?.InnerItem;
	}

							
			public virtual ImageField Image16x9 => InnerItem.Fields[FieldIds.Image16x9];

			public virtual ImageField Image1x1 => InnerItem.Fields[FieldIds.Image1x1];

			public virtual CheckboxField NoFollow => InnerItem.Fields[FieldIds.NoFollow];

			public virtual CheckboxField NoIndex => InnerItem.Fields[FieldIds.NoIndex];

			public virtual CheckboxField SuppressInNavigation => InnerItem.Fields[FieldIds.SuppressInNavigation];

			public virtual DateField EndDate => InnerItem.Fields[FieldIds.EndDate];

			public virtual DateField StartDate => InnerItem.Fields[FieldIds.StartDate];

			public virtual TextField Address1 => InnerItem.Fields[FieldIds.Address1];

			public virtual TextField Address2 => InnerItem.Fields[FieldIds.Address2];

			public virtual TextField City => InnerItem.Fields[FieldIds.City];

			public virtual LinkField RegistrationLink => InnerItem.Fields[FieldIds.RegistrationLink];

			public virtual TextField ShortDescription => InnerItem.Fields[FieldIds.ShortDescription];

			public virtual LookupField State => InnerItem.Fields[FieldIds.State];

			public virtual TextField ZipCode => InnerItem.Fields[FieldIds.ZipCode];

			public virtual TextField Summary => InnerItem.Fields[FieldIds.Summary];

			public virtual LookupField ContentType => InnerItem.Fields[FieldIds.ContentType];

			public virtual MultilistField Topics => InnerItem.Fields[FieldIds.Topics];

			public virtual MultilistField Locations => InnerItem.Fields[FieldIds.Locations];

			public virtual MultilistField People => InnerItem.Fields[FieldIds.People];

			public virtual TextField Title => InnerItem.Fields[FieldIds.Title];

			public virtual TextField ShortTitle => InnerItem.Fields[FieldIds.ShortTitle];

			public virtual TextField HeaderTitle => InnerItem.Fields[FieldIds.HeaderTitle];

			public virtual TextField Subtitle => InnerItem.Fields[FieldIds.Subtitle];

						}
					}
				

					namespace AtriusHealth.Project.AtriusHealth
					{
						using Sitecore.Data;
						using Sitecore.Data.Fields;
						using Sitecore.Data.Items;
							
						public partial class EventDetailPageFolderItem : CustomItem
						{
							
			public static readonly ID TemplateId = new ID("3da13764-97d3-4342-b26f-b14d0e4d3219");
							public static class FieldIds
		{
}

							public EventDetailPageFolderItem(Item innerItem) : base(innerItem) {}
public static implicit operator EventDetailPageFolderItem(Item innerItem)
	{
		return innerItem != null && innerItem.DescendsFrom(TemplateId) ? new EventDetailPageFolderItem(innerItem) : null;
	}
public static implicit operator Item(EventDetailPageFolderItem customItem)
	{
		return customItem?.InnerItem;
	}

							
						}
					}
				

					namespace AtriusHealth.Project.AtriusHealth
					{
						using Sitecore.Data;
						using Sitecore.Data.Fields;
						using Sitecore.Data.Items;
							
						public partial class FormPageItem : CustomItem
						{
							
			public static readonly ID TemplateId = new ID("039d4323-8c75-4824-86a3-4ff09eb87aad");
							public static class FieldIds
		{

			public static readonly string SuppressInNavigation = "1ccdab5f-8819-4a04-a09a-4f66dfb65d12";

			public static readonly string NoFollow = "1bd0fef8-5ee5-435b-bde3-a332a0709e8e";

			public static readonly string NoIndex = "497a98de-d47a-4da9-931e-100fc84d5ab1";

			public static readonly string Summary = "19d48702-b149-4a2d-b72d-e3e8b5cf3bcc";

			public static readonly string Title = "91573f05-edb0-43cf-ac81-a6ca06c7fc0d";

			public static readonly string ShortTitle = "10e9213f-9aad-4979-a6a4-912a36275bb9";

			public static readonly string HeaderTitle = "d64a69f6-1317-47a1-a78b-2e22423c8133";

			public static readonly string Subtitle = "cb8dc0b3-f344-4cb0-b9f2-79eb4da005a9";
}

							public FormPageItem(Item innerItem) : base(innerItem) {}
public static implicit operator FormPageItem(Item innerItem)
	{
		return innerItem != null && innerItem.DescendsFrom(TemplateId) ? new FormPageItem(innerItem) : null;
	}
public static implicit operator Item(FormPageItem customItem)
	{
		return customItem?.InnerItem;
	}

							
			public virtual CheckboxField SuppressInNavigation => InnerItem.Fields[FieldIds.SuppressInNavigation];

			public virtual CheckboxField NoFollow => InnerItem.Fields[FieldIds.NoFollow];

			public virtual CheckboxField NoIndex => InnerItem.Fields[FieldIds.NoIndex];

			public virtual TextField Summary => InnerItem.Fields[FieldIds.Summary];

			public virtual TextField Title => InnerItem.Fields[FieldIds.Title];

			public virtual TextField ShortTitle => InnerItem.Fields[FieldIds.ShortTitle];

			public virtual TextField HeaderTitle => InnerItem.Fields[FieldIds.HeaderTitle];

			public virtual TextField Subtitle => InnerItem.Fields[FieldIds.Subtitle];

						}
					}
				

					namespace AtriusHealth.Project.AtriusHealth
					{
						using Sitecore.Data;
						using Sitecore.Data.Fields;
						using Sitecore.Data.Items;
							
						public partial class HomepageItem : CustomItem
						{
							
			public static readonly ID TemplateId = new ID("ce166101-2f7f-4fcd-a95c-1bf48fb682cb");
							public static class FieldIds
		{

			public static readonly string MetaHtml = "f7504c40-7c68-42c2-be36-8bb61072f21b";

			public static readonly string Summary = "19d48702-b149-4a2d-b72d-e3e8b5cf3bcc";

			public static readonly string Title = "91573f05-edb0-43cf-ac81-a6ca06c7fc0d";

			public static readonly string ShortTitle = "10e9213f-9aad-4979-a6a4-912a36275bb9";

			public static readonly string HeaderTitle = "d64a69f6-1317-47a1-a78b-2e22423c8133";

			public static readonly string Subtitle = "cb8dc0b3-f344-4cb0-b9f2-79eb4da005a9";
}

							public HomepageItem(Item innerItem) : base(innerItem) {}
public static implicit operator HomepageItem(Item innerItem)
	{
		return innerItem != null && innerItem.DescendsFrom(TemplateId) ? new HomepageItem(innerItem) : null;
	}
public static implicit operator Item(HomepageItem customItem)
	{
		return customItem?.InnerItem;
	}

							
			public virtual TextField MetaHtml => InnerItem.Fields[FieldIds.MetaHtml];

			public virtual TextField Summary => InnerItem.Fields[FieldIds.Summary];

			public virtual TextField Title => InnerItem.Fields[FieldIds.Title];

			public virtual TextField ShortTitle => InnerItem.Fields[FieldIds.ShortTitle];

			public virtual TextField HeaderTitle => InnerItem.Fields[FieldIds.HeaderTitle];

			public virtual TextField Subtitle => InnerItem.Fields[FieldIds.Subtitle];

						}
					}
				

					namespace AtriusHealth.Project.AtriusHealth
					{
						using Sitecore.Data;
						using Sitecore.Data.Fields;
						using Sitecore.Data.Items;
							
						public partial class LandingPageItem : CustomItem
						{
							
			public static readonly ID TemplateId = new ID("0c887ab2-fb9c-42cd-bd93-b89041cf01fe");
							public static class FieldIds
		{

			public static readonly string Image16x9 = "f0e8ca34-1117-486d-88a8-ff0ab471e9c4";

			public static readonly string Image1x1 = "89f4ee5e-3e89-4e75-816b-5049d563b287";

			public static readonly string NoFollow = "1bd0fef8-5ee5-435b-bde3-a332a0709e8e";

			public static readonly string NoIndex = "497a98de-d47a-4da9-931e-100fc84d5ab1";

			public static readonly string SuppressInNavigation = "1ccdab5f-8819-4a04-a09a-4f66dfb65d12";

			public static readonly string Summary = "19d48702-b149-4a2d-b72d-e3e8b5cf3bcc";

			public static readonly string ContentType = "d7b9c27c-79e3-42a7-9b46-bff652ef0981";

			public static readonly string Topics = "027f5e1e-d0e5-4afd-9b7a-90a563504d47";

			public static readonly string Locations = "7928f523-5727-4843-ba3d-60874d4e6f6b";

			public static readonly string People = "bef10252-ea97-4433-a7e3-d924796e3950";

			public static readonly string Title = "91573f05-edb0-43cf-ac81-a6ca06c7fc0d";

			public static readonly string ShortTitle = "10e9213f-9aad-4979-a6a4-912a36275bb9";

			public static readonly string HeaderTitle = "d64a69f6-1317-47a1-a78b-2e22423c8133";

			public static readonly string Subtitle = "cb8dc0b3-f344-4cb0-b9f2-79eb4da005a9";
}

							public LandingPageItem(Item innerItem) : base(innerItem) {}
public static implicit operator LandingPageItem(Item innerItem)
	{
		return innerItem != null && innerItem.DescendsFrom(TemplateId) ? new LandingPageItem(innerItem) : null;
	}
public static implicit operator Item(LandingPageItem customItem)
	{
		return customItem?.InnerItem;
	}

							
			public virtual ImageField Image16x9 => InnerItem.Fields[FieldIds.Image16x9];

			public virtual ImageField Image1x1 => InnerItem.Fields[FieldIds.Image1x1];

			public virtual CheckboxField NoFollow => InnerItem.Fields[FieldIds.NoFollow];

			public virtual CheckboxField NoIndex => InnerItem.Fields[FieldIds.NoIndex];

			public virtual CheckboxField SuppressInNavigation => InnerItem.Fields[FieldIds.SuppressInNavigation];

			public virtual TextField Summary => InnerItem.Fields[FieldIds.Summary];

			public virtual LookupField ContentType => InnerItem.Fields[FieldIds.ContentType];

			public virtual MultilistField Topics => InnerItem.Fields[FieldIds.Topics];

			public virtual MultilistField Locations => InnerItem.Fields[FieldIds.Locations];

			public virtual MultilistField People => InnerItem.Fields[FieldIds.People];

			public virtual TextField Title => InnerItem.Fields[FieldIds.Title];

			public virtual TextField ShortTitle => InnerItem.Fields[FieldIds.ShortTitle];

			public virtual TextField HeaderTitle => InnerItem.Fields[FieldIds.HeaderTitle];

			public virtual TextField Subtitle => InnerItem.Fields[FieldIds.Subtitle];

						}
					}
				

					namespace AtriusHealth.Project.AtriusHealth
					{
						using Sitecore.Data;
						using Sitecore.Data.Fields;
						using Sitecore.Data.Items;
							
						public partial class LongFormPageItem : CustomItem
						{
							
			public static readonly ID TemplateId = new ID("fcd3bd0d-71bd-45f7-a758-6ababcf3f0f6");
							public static class FieldIds
		{

			public static readonly string DisplayDate = "3927b1aa-347c-4d88-9b93-b327eae1b6d0";

			public static readonly string Image16x9 = "f0e8ca34-1117-486d-88a8-ff0ab471e9c4";

			public static readonly string Image1x1 = "89f4ee5e-3e89-4e75-816b-5049d563b287";

			public static readonly string NoFollow = "1bd0fef8-5ee5-435b-bde3-a332a0709e8e";

			public static readonly string NoIndex = "497a98de-d47a-4da9-931e-100fc84d5ab1";

			public static readonly string SuppressInNavigation = "1ccdab5f-8819-4a04-a09a-4f66dfb65d12";

			public static readonly string Summary = "19d48702-b149-4a2d-b72d-e3e8b5cf3bcc";

			public static readonly string ContentType = "d7b9c27c-79e3-42a7-9b46-bff652ef0981";

			public static readonly string Topics = "027f5e1e-d0e5-4afd-9b7a-90a563504d47";

			public static readonly string Locations = "7928f523-5727-4843-ba3d-60874d4e6f6b";

			public static readonly string People = "bef10252-ea97-4433-a7e3-d924796e3950";

			public static readonly string Title = "91573f05-edb0-43cf-ac81-a6ca06c7fc0d";

			public static readonly string ShortTitle = "10e9213f-9aad-4979-a6a4-912a36275bb9";

			public static readonly string HeaderTitle = "d64a69f6-1317-47a1-a78b-2e22423c8133";

			public static readonly string Subtitle = "cb8dc0b3-f344-4cb0-b9f2-79eb4da005a9";
}

							public LongFormPageItem(Item innerItem) : base(innerItem) {}
public static implicit operator LongFormPageItem(Item innerItem)
	{
		return innerItem != null && innerItem.DescendsFrom(TemplateId) ? new LongFormPageItem(innerItem) : null;
	}
public static implicit operator Item(LongFormPageItem customItem)
	{
		return customItem?.InnerItem;
	}

							
			public virtual DateField DisplayDate => InnerItem.Fields[FieldIds.DisplayDate];

			public virtual ImageField Image16x9 => InnerItem.Fields[FieldIds.Image16x9];

			public virtual ImageField Image1x1 => InnerItem.Fields[FieldIds.Image1x1];

			public virtual CheckboxField NoFollow => InnerItem.Fields[FieldIds.NoFollow];

			public virtual CheckboxField NoIndex => InnerItem.Fields[FieldIds.NoIndex];

			public virtual CheckboxField SuppressInNavigation => InnerItem.Fields[FieldIds.SuppressInNavigation];

			public virtual TextField Summary => InnerItem.Fields[FieldIds.Summary];

			public virtual LookupField ContentType => InnerItem.Fields[FieldIds.ContentType];

			public virtual MultilistField Topics => InnerItem.Fields[FieldIds.Topics];

			public virtual MultilistField Locations => InnerItem.Fields[FieldIds.Locations];

			public virtual MultilistField People => InnerItem.Fields[FieldIds.People];

			public virtual TextField Title => InnerItem.Fields[FieldIds.Title];

			public virtual TextField ShortTitle => InnerItem.Fields[FieldIds.ShortTitle];

			public virtual TextField HeaderTitle => InnerItem.Fields[FieldIds.HeaderTitle];

			public virtual TextField Subtitle => InnerItem.Fields[FieldIds.Subtitle];

						}
					}
				

					namespace AtriusHealth.Project.AtriusHealth
					{
						using Sitecore.Data;
						using Sitecore.Data.Fields;
						using Sitecore.Data.Items;
							
						public partial class MemberAccountPageItem : CustomItem
						{
							
			public static readonly ID TemplateId = new ID("dc59a232-3274-4de7-b3bb-0ae7594c9659");
							public static class FieldIds
		{

			public static readonly string SuppressInNavigation = "1ccdab5f-8819-4a04-a09a-4f66dfb65d12";

			public static readonly string NoFollow = "1bd0fef8-5ee5-435b-bde3-a332a0709e8e";

			public static readonly string NoIndex = "497a98de-d47a-4da9-931e-100fc84d5ab1";

			public static readonly string Summary = "19d48702-b149-4a2d-b72d-e3e8b5cf3bcc";

			public static readonly string Title = "91573f05-edb0-43cf-ac81-a6ca06c7fc0d";

			public static readonly string ShortTitle = "10e9213f-9aad-4979-a6a4-912a36275bb9";

			public static readonly string HeaderTitle = "d64a69f6-1317-47a1-a78b-2e22423c8133";

			public static readonly string Subtitle = "cb8dc0b3-f344-4cb0-b9f2-79eb4da005a9";
}

							public MemberAccountPageItem(Item innerItem) : base(innerItem) {}
public static implicit operator MemberAccountPageItem(Item innerItem)
	{
		return innerItem != null && innerItem.DescendsFrom(TemplateId) ? new MemberAccountPageItem(innerItem) : null;
	}
public static implicit operator Item(MemberAccountPageItem customItem)
	{
		return customItem?.InnerItem;
	}

							
			public virtual CheckboxField SuppressInNavigation => InnerItem.Fields[FieldIds.SuppressInNavigation];

			public virtual CheckboxField NoFollow => InnerItem.Fields[FieldIds.NoFollow];

			public virtual CheckboxField NoIndex => InnerItem.Fields[FieldIds.NoIndex];

			public virtual TextField Summary => InnerItem.Fields[FieldIds.Summary];

			public virtual TextField Title => InnerItem.Fields[FieldIds.Title];

			public virtual TextField ShortTitle => InnerItem.Fields[FieldIds.ShortTitle];

			public virtual TextField HeaderTitle => InnerItem.Fields[FieldIds.HeaderTitle];

			public virtual TextField Subtitle => InnerItem.Fields[FieldIds.Subtitle];

						}
					}
				

					namespace AtriusHealth.Project.AtriusHealth
					{
						using Sitecore.Data;
						using Sitecore.Data.Fields;
						using Sitecore.Data.Items;
							
						public partial class PageFolderItem : CustomItem
						{
							
			public static readonly ID TemplateId = new ID("c94896a0-d089-41df-8533-f901666bb959");
							public static class FieldIds
		{
}

							public PageFolderItem(Item innerItem) : base(innerItem) {}
public static implicit operator PageFolderItem(Item innerItem)
	{
		return innerItem != null && innerItem.DescendsFrom(TemplateId) ? new PageFolderItem(innerItem) : null;
	}
public static implicit operator Item(PageFolderItem customItem)
	{
		return customItem?.InnerItem;
	}

							
						}
					}
				

					namespace AtriusHealth.Project.AtriusHealth
					{
						using Sitecore.Data;
						using Sitecore.Data.Fields;
						using Sitecore.Data.Items;
							
						public partial class SearchPageItem : CustomItem
						{
							
			public static readonly ID TemplateId = new ID("42f8bf91-2d37-4eda-9c9e-879a831927eb");
							public static class FieldIds
		{

			public static readonly string NoFollow = "1bd0fef8-5ee5-435b-bde3-a332a0709e8e";

			public static readonly string NoIndex = "497a98de-d47a-4da9-931e-100fc84d5ab1";

			public static readonly string Summary = "19d48702-b149-4a2d-b72d-e3e8b5cf3bcc";

			public static readonly string Title = "91573f05-edb0-43cf-ac81-a6ca06c7fc0d";

			public static readonly string ShortTitle = "10e9213f-9aad-4979-a6a4-912a36275bb9";

			public static readonly string HeaderTitle = "d64a69f6-1317-47a1-a78b-2e22423c8133";

			public static readonly string Subtitle = "cb8dc0b3-f344-4cb0-b9f2-79eb4da005a9";
}

							public SearchPageItem(Item innerItem) : base(innerItem) {}
public static implicit operator SearchPageItem(Item innerItem)
	{
		return innerItem != null && innerItem.DescendsFrom(TemplateId) ? new SearchPageItem(innerItem) : null;
	}
public static implicit operator Item(SearchPageItem customItem)
	{
		return customItem?.InnerItem;
	}

							
			public virtual CheckboxField NoFollow => InnerItem.Fields[FieldIds.NoFollow];

			public virtual CheckboxField NoIndex => InnerItem.Fields[FieldIds.NoIndex];

			public virtual TextField Summary => InnerItem.Fields[FieldIds.Summary];

			public virtual TextField Title => InnerItem.Fields[FieldIds.Title];

			public virtual TextField ShortTitle => InnerItem.Fields[FieldIds.ShortTitle];

			public virtual TextField HeaderTitle => InnerItem.Fields[FieldIds.HeaderTitle];

			public virtual TextField Subtitle => InnerItem.Fields[FieldIds.Subtitle];

						}
					}
				







// AtriusHealth.Project.AtriusHealth.Detail_Page (/sitecore/templates/Project/AtriusHealth/Pages/Detail Page cdc8c7d0-90a0-48e7-be0e-c029a6a062d5)

// AtriusHealth.Project.AtriusHealth.Event_Detail_Page (/sitecore/templates/Project/AtriusHealth/Pages/Event Detail Page edeb2c49-9782-4516-a356-5ab0c099759c)

// AtriusHealth.Project.AtriusHealth.Event_Detail_Page_Folder (/sitecore/templates/Project/AtriusHealth/Folders/Event Detail Page Folder 3da13764-97d3-4342-b26f-b14d0e4d3219)

// AtriusHealth.Project.AtriusHealth.Form_Page (/sitecore/templates/Project/AtriusHealth/Pages/Form Page 039d4323-8c75-4824-86a3-4ff09eb87aad)

// AtriusHealth.Project.AtriusHealth.Homepage (/sitecore/templates/Project/AtriusHealth/Pages/Homepage ce166101-2f7f-4fcd-a95c-1bf48fb682cb)

// AtriusHealth.Project.AtriusHealth.Landing_Page (/sitecore/templates/Project/AtriusHealth/Pages/Landing Page 0c887ab2-fb9c-42cd-bd93-b89041cf01fe)

// AtriusHealth.Project.AtriusHealth.Long_Form_Page (/sitecore/templates/Project/AtriusHealth/Pages/Long Form Page fcd3bd0d-71bd-45f7-a758-6ababcf3f0f6)

// AtriusHealth.Project.AtriusHealth.Member_Account_Page (/sitecore/templates/Project/AtriusHealth/Pages/Member Account Page dc59a232-3274-4de7-b3bb-0ae7594c9659)

// AtriusHealth.Project.AtriusHealth.Page_Folder (/sitecore/templates/Project/AtriusHealth/Folders/Page Folder c94896a0-d089-41df-8533-f901666bb959)

// AtriusHealth.Project.AtriusHealth.Search_Page (/sitecore/templates/Project/AtriusHealth/Pages/Search Page 42f8bf91-2d37-4eda-9c9e-879a831927eb)

