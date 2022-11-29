using System;

namespace AtriusHealth.Feature.Navigation.Reference
{
	public static class Constants
	{
		public static class Renderings
		{
			public static Guid PrimaryNavId => new Guid("{830D2452-D221-47D7-A230-4E86123BB652}");
			public static Guid LinkListId => new Guid("{999E826B-162E-42D5-9D73-341E702F832D}");
	    }

	    public static class EditFrameButtons
	    {
	        public const string NavigationColumns = "/sitecore/content/Applications/WebEdit/Custom Experience Buttons/AtriusHealth/Feature/Navigation/Footer Navigation Columns";
	    }
    }
}
