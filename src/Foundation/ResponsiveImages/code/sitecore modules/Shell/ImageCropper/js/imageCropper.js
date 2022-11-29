var imgData = new ImageData();
var cropIndex = 0;
var imageInitialized = false;

jQuery(document).ready(function ($) {

	updateCoordinates = function (img, selection) {
		var selected = $('input[name=groupCheckBox]:eq(' + cropIndex + ')');
		var ias = $('img.imgSelect').imgAreaSelect({ instance: true });
		var options = ias.getOptions();
		if (selection.y2 == $('img.imgSelect').height()) {
			selection.y1 = selection.y1 - 1;
			selection.y2 = selection.y2 - 1;
		}

		imgData.data[selected.val()] = {
			'x1': selection.x1,
			'x2': selection.x2,
			'y1': selection.y1,
			'y2': selection.y2,
			'width': selection.width,
			'height': selection.height
		};

		var checkDiv = $(selected.parent());
		checkDiv.addClass('check');

		checkCropsSelected();
	};

	startCropping = function () {
		var index = 0;
		var indexSet = false;
		var checkBoxes = $('input[name=groupCheckBox]');
		checkBoxes.each(function () {
			var checked = $(this).attr('checked');
			if (checked == "checked" && indexSet == false) {
				var radioButton = $('input#' + index);
				radioButton.attr('checked', 'checked');
				nextCrop(index);
				checkCropsSelected();
				indexSet = true;
			}
			index++;
		});
	};

	nextCrop = function (index) {
		cropIndex = index;
		var scriptText = $('input[name=groupRadioButton]:eq(' + cropIndex + ')').attr('javascript');

		//$.globalEval(scriptText);
		// IE 9 doesn't like this the first time.  Calling again just in case.
		$.globalEval(scriptText);
	};

	cancelCropping = function () {
		imgData = new ImageData();
		cropIndex = 0;
		window.close();
	};

	nextToCrop = function () {
		$('#SelectorImage').show();
		$('#pnlMetadata').show();
		$('#btnNextToCrop').hide();
		$('#btnNextToMetadata').show();
		$('#btnCancel').hide();
		$('#btnBackToSelect').show();

		/* Added for styling */
		$('div.crop-group').addClass('crop-screen');
		$('div.options').addClass('margin-left');
		$('div.section1').removeClass('main-image');
		$('label.groupCheckBox-Label').hide();
		$('label.cropInput-Label').show();
		/* End Styling */
		var checkBoxes = $('input[name=groupCheckBox]');
		checkBoxes.each(function () {
			$(this).hide();
			var checked = $(this).attr('checked');
			if (checked != "checked") {
				var inputParent = $(this).parent().parent();
				inputParent.hide();
			}
		});

		var radioButtons = $('input[name=groupRadioButton]');
		radioButtons.each(function () {
			$(this).show();
			$(this).click(function () {
				nextCrop($(this).attr('id'));
			});
		});

		startCropping();
	};

	backToSelect = function () {
		$('#SelectorImage').hide();
		$('#pnlMetadata').hide();
		$('#btnNextToCrop').show();
		$('#btnNextToMetadata').hide();
		$('#btnCancel').show();
		$('#btnBackToSelect').hide();

		/* Added for styling */
		$('div.crop-group').removeClass('crop-screen');
		$('div.options').removeClass('margin-left');
		$('div.section1').addClass('main-image');
		$('label.groupCheckBox-Label').show();
		$('label.cropInput-Label').hide();
		/* End Styling */
		var checkBoxes = $('input[name=groupCheckBox]');
		checkBoxes.each(function () {
			$(this).show();
			var inputParent = $(this).parent();
			var inputParentContainer = $(this).parent().parent();
			inputParentContainer.show();
			inputParent.removeClass('check');
			imgData.data[$(this).val()] = undefined;
		});

		var radioButtons = $('input[name=groupRadioButton]');
		radioButtons.each(function () {
			$(this).hide();
		});

		clearSelection();
	};

	nextToMetadata = function () {
		$('#pnlImageCropperCrop').hide();
		$('#pnlImageCropperMetadata').show();

		checkRequiredFields();
		clearSelection();
	};

	backToCrop = function () {
		$('#pnlImageCropperCrop').show();
		$('#pnlImageCropperMetadata').hide();
	};

	checkCropsSelected = function () {
		var radioButtons = $('input[name=groupCheckBox]:checked');
		var nextToMetadata = $('#btnNextToMetadata');
		var nextEnabled = true;
		radioButtons.each(function () {
			var value = $(this).val();
			var dataValue = imgData.data[value];
			if (dataValue == undefined) {
				nextEnabled = false;
			}
		});

		nextToMetadata.attr('disabled', !nextEnabled);
	};

	checkRequiredFields = function() {
		var enableNext = true;
		$('.meta-fields input[data-required="True"], .meta-fields textarea[data-required="True"]').each(function() {
			if (!$(this).val()) {
				enableNext = false;
			}
		});
		$("#btnSave").attr('disabled', !enableNext);
		$("#btnPublish").attr('disabled', !enableNext);
	};

	clearSelection = function () {
		if (imageInitialized) {
			var ias = $('img.imgSelect').imgAreaSelect({ instance: true });
			if (ias) {
				ias.setSelection(null, null, null, null);
				ias.setOptions({ hide: true });
				ias.update();
			}
		}

	};

	resetRecord = function () {
		var selected = $('input[name=groupCheckBox]:checked');
		var checkDiv = $('div', selected.parent());
		checkDiv.removeClass('check');

		imgData.data[selected.val()] = undefined;
		imgData.quality[selected.val()] = undefined;
		checkCropsSelected();
	};

	uploadFile = function () {
		var fileUpload = $('#fileUpload');
		if (fileUpload.val() != '') {
			var fileSelect = $('#btnFileUpload');
			var emptyInputMessage = $('#rfvFileUpload');
			fileSelect.addClass('hidden');
			emptyInputMessage.addClass('hidden');
			var uploadProgress = $('#UploadProgress');
			uploadProgress.removeClass('hidden');
		}
	};

	loadSelectionOptions = function (type, width, height, defaultQuality, clearselection) {
		if (clearselection) {
			clearSelection();
		}
		var options = {
			handles: true,
			onSelectEnd: updateCoordinates,
			onCancelSelection: resetRecord
		};

		var displayAspectRatio = imgData.normalWidth / 400;

		var ratio = (width / height);
		options.aspectRatio = ratio + ':1';
		options.minHeight = height / displayAspectRatio;
		options.minWidth = width / displayAspectRatio;

		if (imgData.data[type] != null) {
			options.x1 = imgData.data[type].x1;
			options.x2 = imgData.data[type].x2;
			options.y1 = imgData.data[type].y1;
			options.y2 = imgData.data[type].y2;
		}
		if (!imgData.quality[type]) {
			imgData.quality[type] = defaultQuality;
		}
		// Update the quality slider
		var $sliderContainer = $("#quality .slider");
		
		function updateQuality(value) {
			$("#image-quality").val(value);
			imgData.quality[type] = value;
		}

		$sliderContainer.slider({
			min: 0,
			max: 100,
			slide: function (event, ui) {
				updateQuality(ui.value);
			}
		});

		setQualitySlider(imgData.quality[type]);

		var areaSelect = $('img.imgSelect');
		
		// When the image is loaded hide the spinner and then bind the area select
		areaSelect.one('load', function () {
			$(this).prev('.loading').hide();
			$(this).imgAreaSelect(options);
			imageInitialized = true;
		}).each(function () {
			if (this.complete) $(this).load();
		});

	};

	setQualitySlider = function(quality) {
		$("#quality .slider").slider('value', quality);
		$("#image-quality").val(quality);
	};

	saveImage = function (publish) {
		imgData.publish = publish;

		sendPostBack('SaveImage', imgData);
		var progress = $('#ProgressSpinner');
		progress.removeClass('hidden');
		$('#btnSave').hide();
		$('#btnPublish').hide();
	};

	sendPostBack = function (methodName, data) {
		updateImageDataValues();
		var args = '{ "args":' + JSON.stringify(data) + '}';
		$.ajax({
			type: 'POST',
			url: '/sitecore modules/Shell/ImageCropper/ImageCropper.asmx/' + methodName,
			data: args.toString(),
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			success: function (msg) {
				if (msg.d) {
					var response = $.parseJSON(msg.d);
					alert(response.Message);
					if (!response.HasError) {
						window.close();
					}
					if (response.HasError) {
						var progress = $('#ProgressSpinner');
						progress.addClass('hidden');
						publishButton.show();
					}
				}
			}
		});
	};

	onPageLoad = function () {
		isPostBack = true;

		$('#btnCancel').click(function () {
			cancelCropping();
		});

		$('#btnNextToCrop').click(function () {
			nextToCrop();
		});

		$('#btnBackToSelect').click(function () {
			backToSelect();
		});

		$('#btnNextToMetadata').click(function () {
			nextToMetadata();
		});

		$('#btnBackToCrop').click(function () {
			backToCrop();
		});

		$('.meta-fields input[data-required="True"], .meta-fields textarea[data-required="True"]').keyup(function() {
			checkRequiredFields();
		});

		$('#pnlImageCropperMetadata').hide();
	};

	updateImageDataValues = function () {


		imgData.metaData = _.map($('.meta-fields input[type="text"], .meta-fields textarea'), function(input) {
			return {
				name: $(input).data('configname'),
				fieldName: $(input).data('fieldname'),
				value: $(input).val()
			}
		});

		imgData.currentItemId = currentItemId;
		imgData.filename = fileName;
		imgData.newfilename = fileName.replace('.jpg', '').replace('/temp/', '');

	};

	onPageLoad();
});



function ImageData() {
	this.data = {};
	this.quality = {};
	this.normalHeight = 400;
	this.normalWidth = 400;
	this.metaData = [],
	this.currentItemId = '';
	this.filename = '';
	this.newfilename = '';
	this.publish = true;
}

