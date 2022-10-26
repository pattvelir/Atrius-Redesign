<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ImageCropperTool.aspx.cs" Inherits="Sitecore.ImageCropper.Web.Modules.Shell.ImageCropper.ImageCropperTool" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>
	<link rel="stylesheet" id="lnkStylesImageCropper" runat="server" type="text/css" />
	<link rel="stylesheet" type="text/css" href="css/ui-lightness/jquery-ui-1.10.4.custom.css" />
	<link rel="stylesheet" type="text/css" href="css/imgareaselect-default.css" />
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/underscore-min.js"></script>
	<script type="text/javascript" src="js/jquery-ui-1.10.4.custom.min.js"></script>
	<script type="text/javascript" src="js/jquery.imgareaselect.js"></script>
	<script type="text/javascript" src="js/json2.js"></script>
	<script type="text/javascript" src="js/imageCropper.js"></script>
	<script type="text/javascript">
		var fileName = '<asp:Literal runat="server" ID="litFileName" />';
		var currentItemId = '<asp:Literal runat="server" ID="litCurrentItemId" />';
		var imgHeight = '<asp:Literal ID="ImgHeight" runat="server" />';
		var imgWidth = '<asp:Literal ID="ImgWidth" runat="server" />';
		imgData.normalHeight = imgHeight; imgData.normalWidth = imgWidth;
	</script>
</head>
<body>
	<form id="form1" runat="server">
		<asp:ScriptManager ID="ScriptManager1" runat="server" />
		<div class="header">
			<img src="img/velir-logo.png" alt="Velir" />
			<h1>Image Cropper</h1>
		</div>
		<div class="tool-wrapper">
			<asp:Panel ID="pnlImageCropperFileSelect" CssClass="row"
				runat="server">
				<asp:FileUpload ID="fileUpload" runat="server" />
				<asp:Button ID="btnFileUpload" runat="server"
					OnClick="FileUploadClick" Text="Upload" />
				<br />
				<asp:RequiredFieldValidator ID="rfvFileUpload"
					runat="server" ControlToValidate="fileUpload"
					Display="Dynamic" ForeColor="red"
					Text="Please select a file to upload." />
			</asp:Panel>
			<div id="UploadProgress" class="row uploadprogress hidden">
				Uploading File
        <br />
				<img alt="" src="ajax-loader-circle.gif" />
			</div>
			<asp:Panel ID="pnlImageCropperCrop" runat="server"
				Visible="false">
				<div class="row image">
					<div class="section main-image section1">
						<div class="loading">
							<img class="loading" alt="" src="ajax-loader-circle.gif" />
							Loading image, please wait...
						</div>
						<asp:Image ID="SelectorImage" CssClass="imgSelect"
							runat="server" Style="width: 400px; display: none" />
						<div id="quality">
							<p>
							  <label for="image-quality">Image Quality:</label>
							  <input type="text" id="image-quality" disabled="disabled"> / 100
							</p>
							<div class="slider"></div>
						</div>
					</div>
					<div class="section options section2">
						<asp:Repeater runat="server" ID="rptCrops" OnItemDataBound="rptCrops_ItemDataBound">
							<ItemTemplate>
								<div class="crop-group">
									<div class="crop-input">
										<asp:Literal runat="server" ID="litCrop" />
									</div>
								</div>
							</ItemTemplate>
						</asp:Repeater>
					</div>
				</div>
				<div class="row buttons min-padding">
					<div class="right">
						<input type="button" id="btnNextToCrop" value="Next &#8250;" />
						<input type="button" id="btnNextToMetadata" value="Next &#8250;" disabled="disabled" style="display: none" />
					</div>
					<div class="right">
						<input type="button" id="btnCancel" value="Cancel" />
						<input type="button" id="btnBackToSelect" value="Back" style="display: none" />
					</div>
				</div>
				<div class="row buttons"></div>
			</asp:Panel>
			<asp:Panel ID="pnlImageCropperMetadata" runat="server">
				<div class="row buttons">
					<asp:Panel runat="server" ID="Panel2" CssClass="row metadata">
						<table class="meta-fields">
							<asp:Repeater runat="server" ID="rptMetaDataFields" OnItemDataBound="rptMetaDataFields_DataBound">
								<ItemTemplate>
									<tr>
										<td valign="top" style="width: 25%">
											<label class="meta-input">
												<asp:Literal runat="server" ID="litFieldLabel"></asp:Literal>	
											</label>
										</td>
										<td>
											<asp:Literal id="litField" runat="server" />
										</td>
									</tr>
								</ItemTemplate>
							</asp:Repeater>		
							<tr>
								<td colspan="2">
									<p class="footnote">*Required</p>
								</td>
							</tr>			
						</table>
				</asp:Panel>
				</div>
				<div class="row buttons min-padding">
					<div class="right">
						<div id="ProgressSpinner" style="margin-bottom: 5px;" class="hidden">
							<img alt="" src="ajax-loader-circle.gif" />
						</div>
						<input type="button" id="btnSave" onclick="javascript: return saveImage(false);" value="Save" />
						<input type="button" id="btnPublish" onclick="javascript: return saveImage(true);" value="Save and Publish" />
					</div>
					<div class="right">
						<input type="button" id="btnBackToCrop"
							value="Back" />
					</div>
				</div>
			</asp:Panel>
		</div>
	</form>
</body>
</html>
