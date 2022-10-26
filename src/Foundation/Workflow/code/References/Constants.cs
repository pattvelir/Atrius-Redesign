using System;

namespace Thread.Foundation.Workflow.References
{
	public static class Constants
	{
		public static class Workflow
		{
            public const string PublishDateField = "Publish Date";
            public const string WorkflowId = "{F904F489-7129-4A77-8791-59662AB2B399}";
            public const string UnPublishDateField = "Unpublish Date";
			public static class States
			{	
				public const string ScheduledStateId = "{AD1C366A-7190-4C82-9BF9-4B4250FC4A43}";
				public const string PublishedStateId = "{4458FD36-EEF2-40B7-8BA3-A8ED0E41CDAC}";
				public const string UnPublishedStateId = "{60389BC3-874B-4BBE-BF53-1C8D64710B85}";
				public const string AwaitingApprovalStateId = "{B5DEA01F-928E-4D12-B7F5-43D2657BDF31}";
			}

        }

		public static class TemplateIds
		{
			public static Guid Folder => new Guid("{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}");
			public static Guid ComponentsFolder => new Guid("{B5E1A562-1A76-49BE-A899-1D5CA76703B2}");
		}

		#region Constants
		/// <summary>
		/// Constant for: /sitecore/system/Tasks/Schedules
		/// </summary>
		public static readonly string SchedulesFolder = "/sitecore/system/Tasks/Schedules";
		/// <summary>
		/// Constant for: System/Tasks/Schedule
		/// </summary>
		public static readonly string ScheduleTemplatePath = "System/Tasks/Schedule";
		/// <summary>
		/// Constant for the format for AutomatedPublisher ItemId
		/// </summary>
		public static readonly string AutomatedPublisherItemNameFormat = "ItemId_{0}_AutoPub";
		/// <summary>
		/// Constant for the format for AutomatedUnPublisher ItemId
		/// </summary>
		public static readonly string AutomatedUnPublisherItemNameFormat = "ItemId_{0}_AutoUnPub";
		/// <summary>
		/// Constant for: /sitecore/system/Tasks/Commands/Auto Publish
		/// </summary>
		public static readonly string AutoPublishCommandPath = "/sitecore/system/Tasks/Commands/Auto Publish";
		/// <summary>
		/// Constant for the format for AutomatedPublisher ItemVersionId
		/// </summary>
		public static readonly string AutomatedPublisherItemVersionNameFormat = "ItemId_{0}_{1}_V_{2}_AutoPub";
		/// <summary>
		/// Constant for the format for AutomatedUnPublisher ItemVersionId
		/// </summary>
		public static readonly string AutomatedUnPublisherItemVersionNameFormat = "ItemId_{0}_{1}_V_{2}_AutoUnPub";

		/// <summary>
		/// Constant for: [orphan]
		/// </summary>
		public static readonly string Orphan = "[orphan]";

		/// <summary>
		/// Constant for: shell
		/// </summary>
		public static readonly string SiteNameShell = "shell";
		/// <summary>
		/// Constant for the database name: master
		/// </summary>
		public static readonly string MasterDatabaseName = "master";
		/// <summary>
		/// Constant for: /sitecore/system/publishing targets
		/// </summary>
		public static readonly string PublishingTargetsFolder = "/sitecore/system/publishing targets";
		/// <summary>
		/// Constant for: target database
		/// </summary>
		public static readonly string TargetDatabase = "target database";

		/// <summary>
		/// Constant for field name Command
		/// </summary>
		public static readonly string Command = "Command";
		/// <summary>
		/// Constant for field name Items 
		/// </summary>
		public static readonly string Items = "Items";
		/// <summary>
		/// Constant for field name Schedule 
		/// </summary>
		public static readonly string Schedule = "Schedule";
		/// <summary>
		/// Constant for field name Last run 
		/// </summary>
		public static readonly string LastRun = "Last run";
        /// <summary>
		/// The ID of the 'Workflow state' field.
		/// </summary>
		public static readonly string WorkflowState = "{3E431DE1-525E-47A3-B6B0-1CCBEC3A8C98}";
		#endregion
	}
}