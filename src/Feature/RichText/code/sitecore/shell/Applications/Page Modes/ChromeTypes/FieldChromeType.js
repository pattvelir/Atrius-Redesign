Sitecore.PageModes.ChromeTypes.Field = Sitecore.PageModes.ChromeTypes.ChromeType.extend({
    constructor: function () {
        this.base();
        //Key codes which aren't tracked as ones that modify contenteditable fields
        this._ignoreKeyCodes = [16, 17, 18, 27, 35, 36, 37, 38, 39, 40];
        this.scanTypingKeys;
        this.eventRegistered = false;
        this.regExpWWWPattern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        //this.regExpWWWPattern = /((http|ftp|https):\/\/w{3}[\d]*.|(http|ftp|https):\/\/|w{3}[\d]*.)([\w\d\._\-#\(\)\[\]\\,;:]+@[\w\d\._\-#\(\)\[\]\\,;:])?([a-z0-9]+.)*[a-z\-0-9]+.([a-z]{2,3})?[a-z]{2,6}(:[0-9]+)?(\/[\/a-z0-9\._\-,]+)*[a-z0-9\-_\.\s\%]+(\?[a-z0-9=%&amp;\.\-,#]+)?/gi
        //this.regExpPattern = _ ^ (?: (?: https ?| ftp)://)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}-\x{ffff}]{2,})))(?::\d{2,5})?(?:/[^\s]*)?$_iuS
    },

    load: function () {
        var persistedValue = Sitecore.PageModes.ChromeManager.getFieldValueContainerById(this.controlId());
        var fieldValueInput = this.chrome.element.prev().prev(".scFieldValue");
        if (fieldValueInput.length == 0) {
            fieldValueInput = null;
        }

        //Comment this because it caused the bug:343755
        //it removed the duplicate, so it caused the problem when that's more than 3 associated contents.
        if (persistedValue) {
            this.fieldValue = $sc(persistedValue);
            if (fieldValueInput) {
                fieldValueInput.remove();
            }
        } else {
            if (fieldValueInput) {
                this.fieldValue = fieldValueInput;
                Sitecore.PageModes.ChromeManager.addFieldValue(this.fieldValue);
            } else {
                this.fieldValue = $sc({});
            }
        }
        Sitecore.PageModes.ChromeManager.rebuildScFieldValueItems();
        var modifiedControlId = this.fieldValue.data("modified");
        if (modifiedControlId && modifiedControlId !== this.controlId()) {
            this.setReadOnly();
            var notification = new Sitecore.PageModes.Notification("fieldchanges",
                Sitecore.PageModes.Texts.ContentWasEdited,
                {
                    actionText: Sitecore.PageModes.Texts.SaveThePageToSeeTheChanges,
                    onActionClick: $sc.proxy(Sitecore.PageModes.PageEditor.save, Sitecore.PageModes.PageEditor),
                    type: "warning"
                });

            if (typeof (Sitecore.PageModes.PageEditor.notificationBar) != "undefined") {
                Sitecore.PageModes.PageEditor.notificationBar.addNotification(notification);
                Sitecore.PageModes.PageEditor.showNotificationBar();
            }
        }

        this.initialAttributes = new Object();
        if (this.chrome.element.attr("sc_parameters")) {
            this.parameters = $sc.parseQuery(this.chrome.element.attr("sc_parameters"));
        } else {
            this.parameters = new Object();
        }

        this.parentLink = this.chrome.element.closest("a").get(0);
        this.fieldType = this.chrome.element.attr("scfieldtype");
        this.onMouseDownHandler = $sc.proxy(this.onMouseDown, this);
        this.chrome.element.mousedown(this.onMouseDownHandler);

        if (this.contentEditable()) {
            if (this.chrome.element.attr("scWatermark") == "true") {
                this.watermarkHTML = this.chrome.element.html();
            } else if ((
                $sc.removeTags(this.fieldValue[0].defaultValue.replace(/(?:&nbsp;|<br\s*\/?>)/gi, ''))
                    .trim() ===
                "" &&
                this.fieldValue[0].defaultValue.trim().indexOf('<img') === -1
            ) &&
                this.chrome.element.attr("scWatermark") == null) {
                this.watermarkHTML = this.chrome.element.attr("scDefaultText");
                this._tryUpdateFromWatermark();
            }

            this.onFocusHandler = $sc.proxy(this.onFocus, this);
            this.onKeyDownHandler = $sc.proxy(this.onKeyDown, this);
            this.onKeyUpHandler = $sc.proxy(this.onKeyUp, this);
            this.onKeyPressHandler = $sc.proxy(this.onKeyPress, this);

            this.onCopyHandler = $sc.proxy(this.onCopy, this);
            this.onCutPasteHandler = $sc.proxy(this.onCutPaste, this);
            this.onClickHandler = $sc.proxy(this.onClick, this);
            this.onBlurHandler = $sc.proxy(this.onBlur, this);
            this.capabilityChangedHandler = $sc.proxy(this.setContentEditableState, this);
            Sitecore.PageModes.PageEditor.onCapabilityChanged.observe(this.capabilityChangedHandler);
            this.saveHandler = $sc.proxy(this.onSave, this);
            Sitecore.PageModes.PageEditor.onSave.observe(this.saveHandler);
            this.setContentEditableState();
            // IE doesn't return calculated values for current style.
            if ($sc.util().isIE) {
                var dummy = $sc("<div style='height:0px;width:1em;position:absolute'></div>");
                this.chrome.element.parent().append(dummy);
                this.fontSize = dummy.get(0).offsetWidth;
                dummy.remove();
            } else {
                this.fontSize = parseInt(this.chrome.element.css("font-size"));
            }
        }

        if (Sitecore.PageModes.Personalization) {
            Sitecore.PageModes.ChromeControls.registerCommandRenderer(
                "chrome:rendering:personalize",
                Sitecore.PageModes.ChromeTypes.Field.renderPersonalizationCommand,
                this);
        }

        if (Sitecore.PageModes.Testing) {
            Sitecore.PageModes.ChromeControls.registerCommandRenderer(
                "chrome:rendering:editvariations",
                Sitecore.PageModes.ChromeTypes.Field.renderEditVariationsCommand,
                this);
        }

        this.chrome.fieldIdentifier = this.id();

        // attach new line breaks handler.
        if (this.fieldType === "rich text") {
            document.addEventListener("selectionchange",
                function (event) {
                    this.onSelectionChanged(event);
                }.bind(this));
        }

        if (!this.preventLineBreak()) {
            Sitecore.PageModes.InlineEditingUtil.processNewLineBreaks(this.chrome.element[0]);
        }
    },

    filter: function (content, items) {
        for (var i = 0; i < items.length; i++) {
            v = items[i];
            if (v.constructor == RegExp) {
                content = content.replace(v, '');
            } else {
                content = content.replace(v[0], v[1]);
            }
        }
        return content;
    },

    trimHtml: function (html) {
        function trimSpaces(all, s1, s2) {
            // WebKit &nbsp; meant to preserve multiple spaces but instead inserted around all inline tags,
            // including the spans with inline styles created on paste
            if (!s1 && !s2) {
                return ' ';
            }

            return '\u00a0';
        }

        html = this.filter(html,
            [
                /^[\s\S]*<body[^>]*>\s*|\s*<\/body[^>]*>[\s\S]*$/ig, // Remove anything but the contents within the BODY element
                /<!--StartFragment-->|<!--EndFragment-->/g, // Inner fragments (tables from excel on mac)
                [/( ?)<span class="Apple-converted-space">\u00a0<\/span>( ?)/g, trimSpaces],
                /<br class="Apple-interchange-newline">/g,
                /<br>$/i // Trailing BR elements
            ]);

        return html;
    },

    onSelectionChanged: function (event) {
        if (!(this.chrome.element[0].id === event.currentTarget.activeElement.getAttribute("id"))) {
            return;
        }

        this.updateRemoveLinkState();
    },

    updateRemoveLinkState: function () {
        this.updateSelection();
        var removeCommand;
        var commands = this.chrome.commands();
        for (var i = 0; i < commands.length; i++) {
            if (commands[i].click === "chrome:field:removelink") {
                removeCommand = commands[i];
                break;
            }
        }
        if (removeCommand == null) {
            return;
        }

        var removeDisabled = !this.isLinkSelected();

        if (removeCommand.disabled !== removeDisabled) {
            removeCommand.disabled = removeDisabled;
            Sitecore.PageModes.ChromeManager.resetSelectionFrame();
        }
    },

    // attaches content editable elements specific event handlers
    attachEventHandlers: function () {
        this.chrome.element.bind("keyup", this.onKeyUpHandler);
        this.chrome.element.bind("copy", this.onCopyHandler);
        this.chrome.element.bind("paste", this.onCutPasteHandler);
        this.chrome.element.bind("cut", this.onCutPasteHandler);
        this.chrome.element.bind("click", this.onClickHandler);
        this.chrome.element.bind("blur", this.onBlurHandler);
        this.chrome.element.bind("focus", this.onFocusHandler);

        if ((this.fieldType != "rich text" && this.fieldType != "multi-line text") || this.preventLineBreak()) {
            this.chrome.element.bind("keydown", this.onKeyDownHandler);
        }

        if ((this.fieldType == "rich text")) {
            if (!this.eventRegistered) {
                this.chrome.element.unbind("keypress", this.onKeyPressHandler);
                this.chrome.element.bind("keypress", this.onKeyPressHandler);
                this.eventRegistered = true;
            }
        }
    },

    preventLineBreak: function () {
        return this.parameters["prevent-line-break"] === "true";
    },

    contentEditable: function () {
        var attrValue = this.chrome.element.attr(Sitecore.PageModes.ChromeTypes.Field.contentEditableAttrName);
        return attrValue === "true" || attrValue === "false";
    },

    // detaches content editable elements specific event handlers
    detachEventHandlers: function () {
        this.chrome.element.unbind("keyup", this.onKeyUpHandler);
        this.chrome.element.unbind("paste", this.onCutPasteHandler);
        this.chrome.element.unbind("cut", this.onCutPasteHandler);
        this.chrome.element.unbind("click", this.onClickHandler);
        this.chrome.element.unbind("blur", this.onBlurHandler);
        this.chrome.element.unbind("focus", this.onFocusHandler);

        if (this.fieldType != "rich text" || this.preventLineBreak()) {
            this.chrome.element.unbind("keydown", this.onKeyDownHandler);
        }

        if (this.fieldType == "rich text") {
            this.chrome.element.unbind("keypress", this.onKeyPressHandler);
            this.eventRegistered = false;
            //this.chrome.element.unbind("keydown", this.onKeyDownHandler);
        }
    },

    dataNode: function (domElement) {
        return domElement.prev(".scChromeData");
    },

    handleMessage: function (message, params) {
        switch (message) {
            case "chrome:field:insertimage":
                this.insertImage();
                break;
            case "chrome:field:imageinserted":
                this.imageInserted(params.html);
                break;
            case "chrome:field:insertlink":
                this.insertLink();
                break;
            case "chrome:field:insertexternallink":
                this.insertExternalLink();
                break;
            case "chrome:field:linkinserted":
                this.linkInserted(params.url);
                break;
            case "chrome:field:externallinkinserted":
                this.externalLinkInserted(params);
                break;
            case "chrome:field:removelink":
                this.removeLink();
                break;
            case "chrome:field:editcontrol":
                var chars = this.characteristics();
                this.editControl(chars.itemId,
                    chars.language,
                    chars.version,
                    chars.fieldId,
                    this.controlId(),
                    params.command);
                break;
            case "chrome:field:editcontrolcompleted":
                this.editControlCompleted(params.value, params.plainValue, params.preserveInnerContent);
                break;
            case "chrome:field:execute":
                this.execute(params.command, params.userInterface, params.value);
                break;
            case "chrome:personalization:conditionchange":
            case "chrome:rendering:personalize":
            case "chrome:rendering:editvariations":
            case "chrome:testing:variationchange":
                this.delegateMessageHandling(this.chrome, this.parentRendering(), message, params);
                break;
            case "chrome:rendering:personalizationcompleted":
            case "chrome:rendering:editvariationscompleted":
                Sitecore.PageModes.ChromeManager.select(this.chrome);
                this.delegateMessageHandling(this.chrome, this.parentRendering(), message, params);
                break;
        }
    },

    isEnabled: function () {
        return $sc.inArray(Sitecore.PageModes.Capabilities.edit, Sitecore.PageModes.PageEditor.getCapabilities()) >
            -1 &&
            this.base();
    },

    isFieldValueContainer: function (node) {
        return this.fieldValue && this.fieldValue.get(0) == node;
    },

    layoutRoot: function () {
        if (this.contentEditable()) {
            return this.chrome.element;
        }

        var children = this.chrome.element.children();
        if (children.length == 1) {
            return $sc(children[0]);
        }
        return this.chrome.element;
    },

    persistValue: function () {
        if (this.isWatermark()) return;

        var html = this.chrome.element.html();

        if (this._extraLineBreakAdded) {
            var clone = this.chrome.element.clone();
            clone.find(".scExtraBreak").remove();
            html = clone.html();
        }

        if (this.watermarkHTML == null) {
            this.watermarkHTML = this.chrome.element.attr("scDefaultText");
        }

        this.fieldValue.val(html);
        this.chrome.element.removeAttr("scWatermark");
    },

    refreshValue: function () {
        if (this.contentEditable()) {
            this.chrome.element.update(this.fieldValue.val());
            this._tryUpdateFromWatermark();
            this.setModified();
        }
    },

    // Sets whether content editable elements are editable (depends on the mode(Edit, Design etc.))
    setContentEditableState: function () {
        if (this.contentEditable()) {
            var isEditable = this.isEnabled() && !this.isReadOnly();
            this.chrome.element.attr(Sitecore.PageModes.ChromeTypes.Field.contentEditableAttrName,
                isEditable.toString());
            if (isEditable) {
                this.attachEventHandlers();
            } else {
                this.detachEventHandlers();
            }
        }
    },

    setReadOnly: function () {
        this.base();
        this.setContentEditableState();
    },

    /*--- Helpers section ---*/
    controlId: function () {
        return this.chrome.element.attr("id").replace("_edit", "");
    },

    convertToGuid: function (shortId) {
        return "{" +
            shortId.substr(0, 8) +
            "-" +
            shortId.substr(8, 4) +
            "-" +
            shortId.substr(12, 4) +
            "-" +
            shortId.substr(16, 4) +
            "-" +
            shortId.substr(20, 12) +
            "}";
    },

    characteristics: function () {
        //ID format:fld_ItemID_FieldID_Language_Version_Revision_edit
        var fieldCharacteristics = this.controlId().split('_');
        return {
            itemId: this.convertToGuid(fieldCharacteristics[1]),
            fieldId: this.convertToGuid(fieldCharacteristics[2]),
            language: fieldCharacteristics[3],
            version: fieldCharacteristics[4]
        };
    },

    id: function () {
        var chars = this.characteristics();
        return chars.fieldId;
    },

    insertHtmlFragment: function (html) {
        if (!this.selection) {
            return false;
        }

        if (document.selection && document.selection.createRange) { //IE
            this.selection.pasteHTML(html);
            return true;
        }

        if (window.getSelection && window.getSelection().getRangeAt) { //FF
            var node = this.selection.createContextualFragment(html);
            this.selection.insertNode(node);
            return true;
        }

        return false;
    },

    isWatermark: function () {
        return this.watermarkHTML == this.chrome.element.html();
    },

    surroundSelection: function (element) {
        if (this.selection) {
            element.innerHTML = this.getSelectedHtml();
            this.selection.deleteContents();
            this.selection.insertNode(element);
        }
    },

    getSelectedHtml: function () {

        var userSelection;
        if (window.getSelection) {
            // W3C Ranges
            userSelection = window.getSelection();
            if (userSelection.rangeCount === 0) {
                return "";
            }
            // Get the range:
            if (userSelection.getRangeAt)
                var range = userSelection.getRangeAt(0);
            else {
                var range = document.createRange();
                range.setStart(userSelection.anchorNode, userSelection.anchorOffset);
                range.setEnd(userSelection.focusNode, userSelection.focusOffset);
            }
            // And the HTML:
            var outerHtml = range.cloneRange().startContainer.outerHTML;
            if (outerHtml && range.cloneRange().startContainer.tagName.toLowerCase() === "a") {
                return outerHtml;
            }

            var clonedSelection = range.cloneContents();
            var div = document.createElement('div');
            div.appendChild(clonedSelection);
            return div.innerHTML;
        } else if (document.selection) {
            // Explorer selection, return the HTML
            userSelection = document.selection.createRange();
            return userSelection.htmlText;
        } else {
            return '';
        }
    },

    removeLink: function () {
        this.selection = this.getSelectedRange();

        var linkNode = this.expandLinkSelection();
        if (linkNode == null) {
            return;
        }

        var element = this.selection.createContextualFragment(linkNode.innerHTML);
        this.selection.deleteContents();
        this.selection.insertNode(element);
        this.persistValue();
        this.setModified();

        // Clear removeLink button state
        this.updateRemoveLinkState();
    },

    isLinkSelected: function () {
        var node = this.selection.startContainer;
        while (!(node == null || !node.getAttribute || node.getAttribute("scfieldtype") === "rich text")) {
            if (node.tagName === "A") {
                return true;
            }
            node = node.parentNode;
        }
        return node != null && node.parentNode.tagName === "A";
    },

    //It is not allowed to nest link inside link, so if selection inside link - expand selection to whole link node
    expandLinkSelection: function () {
        //case when there is no text in field
        var endContainer = this.selection.endContainer;
        if (endContainer.nodeType === Node.ELEMENT_NODE &&
            endContainer.getAttribute("scfieldtype") === "rich text") {
            return null;
        }
        var node = endContainer.tagName === "A" ? endContainer : endContainer.parentNode;
        while (!(node == null || node.getAttribute("scfieldtype") === "rich text")) {
            if (node.tagName === "A") {
                this.selection.selectNode(node);
                return node;
            }
            node = node.parentNode;
        }
        return null;
    },

    /*--- Commands section---*/
    editControl: function (itemid, language, version, fieldid, controlid, message) {
        var control = Sitecore.PageModes.ChromeManager.getFieldValueContainerById(controlid);
        if (control == null) {
            console.error("control with id " + controlid + " not found");
            return;
        }

        var plainValue = control.value;//.replace("</p>", "").replace("<p>", "");
        /** BEGIN: Thread UPDATE FOR Placeholders in RTE **/
        if (message === "webedit:edithtml") {
          var rte = document.createElement('div');
          rte.innerHTML = control.value;
          var placeholders = rte.getElementsByTagName('div');

          for (var i = 0; i < placeholders.length; i++) {
            if (placeholders[i].className.includes('rich-text__embed')) {
              placeholders[i].innerHTML = "###PLACEHOLDER###";
            }
          }

          plainValue = rte.innerHTML;
        }
        /** END: Thread UPDATE FOR Placeholders in RTE **/

        control = $sc("#" + controlid + "_edit");
        var value = control.html();
        var parameters = control.attr("sc_parameters");

        var ribbon = Sitecore.PageModes.PageEditor.ribbon();
        if (ribbon != null) {
            if (!ribbon.contentWindow.scForm) {
                ribbon.contentWindow.scForm = scForm;
            }
            ribbon.contentWindow.scForm.browser.getControl("scHtmlValue").value = value;
            ribbon.contentWindow.scForm.browser.getControl("scPlainValue").value = plainValue;
            Sitecore.PageModes.PageEditor.postRequest(
                message +
                '(itemid=' +
                itemid +
                ',language=' +
                language +
                ',version=' +
                version +
                ',fieldid=' +
                fieldid +
                ',controlid=' +
                controlid +
                (message === "webedit:insertexternallink" ? ',selection=' + this.getSelectedHtml() : "") +
                ',webeditparams=' +
                parameters +
                ')',
                null,
                false);
        }

        return false;
    },


    editControlCompleted: function (value, plainValue, preserveInnerContent) {
        this.fieldValue.val(typeof (plainValue) != "undefined" ? plainValue : value);
        if (!preserveInnerContent) {
            this.chrome.element.update(value);
        } else {
            var targetCtl = this.chrome.element.get(0).firstChild;
            var wrapper = document.createElement("span");
            wrapper.innerHTML = value;
            var sourceCtl = wrapper.firstChild;
            $sc.util().copyAttributes(sourceCtl, targetCtl);
            delete wrapper;
        }

        this.setModified();
    },

    execute: function (command, userInterface, value) {
        if ($sc.browser.mozilla) {
            document.execCommand(command, null, null);
        } else {
            document.execCommand(command, userInterface, value);
        }

        // OnTime issue #341414
        this.persistValue();
        this.setModified();
        return false;
    },

    hasParentLink: function () {
        return this.parentLink != null;
    },

    insertImage: function () {
        this.chrome.element.focus();
        if (document.selection && document.selection.createRange) {
            this.selection = document.selection.createRange();
        } else if (window.getSelection && window.getSelection().getRangeAt) {
            this.selection = window.getSelection().getRangeAt(0);
        }

        var chars = this.characteristics();
        var parameters = this.chrome.element.attr("sc_parameters");
        Sitecore.PageModes.PageEditor.postRequest(
            "webedit:insertimage" +
            '(placement=cursor,itemid=' +
            chars.itemId +
            ',language=' +
            chars.language +
            ',version=' +
            chars.version +
            ',fieldid=' +
            chars.fieldId +
            ',controlid=' +
            this.controlId() +
            ',webeditparams=' +
            parameters +
            ')',
            null,
            false);

        return false;
    },

    imageInserted: function (html) {
        this.chrome.element.focus();
        if (this.insertHtmlFragment(html)) {
            this.setModified();
        }
    },

    insertLink: function () {
        if (!this.updateSelection()) {
            alert(Sitecore.PageModes.Texts.SelectSomeText);
            return;
        }
        var chars = this.characteristics();
        this.editControl(chars.itemId,
            chars.language,
            chars.version,
            chars.fieldId,
            this.controlId(),
            "webedit:insertlink");
    },

    getSelectedRange: function () {
        if (document.selection && document.selection.createRange) {
            return document.selection.createRange();
        } else if (window.getSelection && window.getSelection().getRangeAt) {
            return window.getSelection().getRangeAt(0);
        }
    },

    updateSelection: function () {
        var selectionText;
        // MSIE
        if (document.selection && document.selection.createRange) {
            this.selection = document.selection.createRange();
            selectionText = this.selection.htmlText;
        } else if (window.getSelection && window.getSelection().getRangeAt) {
            this.selection = window.getSelection().getRangeAt(0);
            selectionText = !this.selection.commonAncestorContainer.innerHTML
                ? this.selection.toString()
                : this.selection.commonAncestorContainer.innerHTML;
        }

        if ($sc.trim(selectionText) == "") {
            return false;
        }

        return true;
    },

    insertExternalLink: function () {
        this.updateSelection();
        this.expandLinkSelection();
        var chars = this.characteristics();
        this.editControl(chars.itemId,
            chars.language,
            chars.version,
            chars.fieldId,
            this.controlId(),
            "webedit:insertexternallink");
    },

    linkInserted: function (url) {
        var isIE = document.selection && document.selection.createRange;

        if (!this.selection) {
            return;
        }

        // TODO: add preserving link contents for FF.
        var selectionText;
        if (isIE) {
            selectionText = this.selection.htmlText;
        } else {
            selectionText = !this.selection.commonAncestorContainer.innerHTML
                ? this.selection.toString()
                : this.selection.commonAncestorContainer.innerHTML;
        }

        var data = {
            html: selectionText,
            url: url
        };

        // If link is selected, replace it with a new one, preserving link contents.
        if (isIE) {
            // OT issue#338106
            data.html = this._processHtml(data.html);
            var htmlSelection = $sc.trim(data.html.toLowerCase()) || "";
            if (htmlSelection.indexOf("<a ") == 0 &&
                htmlSelection.indexOf("</a>") == (htmlSelection.length - "</a>".length)) {
                htmlSelection = data.html.substring(data.html.indexOf(">") + 1);
                htmlSelection = htmlSelection.substring(0, htmlSelection.length - "</a>".length);
                data.html = htmlSelection;
            }
        }

        var htmlToInsert = "<a href='" + data.url + "'>" + data.html + "</a>";
        if (isIE) {
            this.selection.pasteHTML(htmlToInsert);
        } else {
            var node = this.selection.createContextualFragment(htmlToInsert);
            this.selection.deleteContents();
            this.selection.insertNode(node);
        }

        this.persistValue();
        this.setModified();
    },

    externalLinkInserted: function (url) {
        if (this.isWatermark()) {
            this.chrome.element.update("");
        }
        var outerHtml = this.selection.startContainer.outerHTML;
        if (outerHtml && outerHtml.toLowerCase().startsWith("<a ")) {
            this.selection.startContainer.outerHTML = url;
        } else {
            var element = this.selection.createContextualFragment(url);
            this.selection.deleteContents();
            this.selection.insertNode(element);
        }

        this.persistValue();
        this.setModified();
    },

    key: function () {
        return "field";
    },

    parentRendering: function () {
        var excludeFake = true;
        // The designing capablity may be turned off or user may not have designing rights    
        var enabledOnly = false;
        var chrome = this.chrome.parent(excludeFake, enabledOnly);
        if (!this._parentRendering) {
            while (chrome && chrome.key() != "rendering") {
                chrome = chrome.parent(excludeFake, enabledOnly);
            }

            this._parentRendering = chrome;
        }

        return this._parentRendering;
    },

    surrondConentWithLineBreaks: function (content, lineBreak, contentSeparator) {
        if (!content) {
            return null;
        }

        if (!lineBreak) {
            lineBreak = Sitecore.WebEditSettings.newLineBreak;
        }

        if (!contentSeparator) {
            contentSeparator = "\r\n";
        }

        var lines = content.split(contentSeparator);
        if (lines.length < 2) {
            return null;
        }

        for (var i = 0; i < lines.length; i++) {
            var lineBreakWrapper = document.createElement(lineBreak);
            lineBreakWrapper.innerText = lines[i];
            lines[i] = lineBreakWrapper.outerHTML.indexOf(lines[i]) === -1
                ? lines[i] + lineBreakWrapper.outerHTML
                : lineBreakWrapper.outerHTML;
        }

        return lines.join("");
    },

    processPastedContent: function (e) {
        var clipboardData = e.clipboardData || window.clipboardData || e.originalEvent.clipboardData;
        if (clipboardData.getData("text/html")) {
            var wordContentFilter = this.wordContentFilter(clipboardData.getData("text/html"));
            e.preventDefault();
            e.stopImmediatePropagation();
            window.document.execCommand('insertHTML', false, wordContentFilter);
            return;
        }

        var processedContent = this.surrondConentWithLineBreaks(clipboardData.getData("text/plain"));
        if (!processedContent) {
            //e.preventDefault();
            //e.stopImmediatePropagation();
            //this.pasteContent(clipboardData.getData("text/plain"));    
            return;
        }

        e.preventDefault();
        e.stopImmediatePropagation();
        this.pasteContent(processedContent);
    },

    wordContentFilter: function (input) {

        // 1. remove line breaks / Mso classes
        var stringStripper = /(\|\\r|class=(")?Mso[a-zA-Z]+(")?)/g;
        var output = input.replace(stringStripper, '');
        //var styleMsoStripper = /style=(".*?"|'.*?'|[^"'][^\s]*)/s

        //1.5 remove unecessary mso- style.
        //var styleMsoStripper = /mso-+?.*[;]/g
        //var styleMsoStripper = /mso-+?.*[;]/g
        //output = output.replace(styleMsoStripper, '');


        // 2. strip Word generated HTML comments
        var commentSripper = new RegExp('<!--(.*?)-->', 'g');
        output = output.replace(commentSripper, '');
        commentSripper = /<!--[\s\S]*?-->/g
        output = output.replace(commentSripper, '');

        // 3. remove tags leave content if any
        var tagStripper = new RegExp('<(/)*(meta|link|\\\\?xml:|st1:|o)(.*?)>', 'gi');
        output = output.replace(tagStripper, '');

         //4. Remove everything in between and including tags '<style(.)style(.)>'
        var badTags = ['script', 'applet', 'embed', 'noframes', 'noscript'];
        
        for (var i = 0; i < badTags.length; i++) {
            tagStripper = new RegExp('<' + badTags[i] + '.*?' + badTags[i] + '(.*?)>', 'gi');
            output = output.replace(tagStripper, '');
        }

         //5. remove attributes ' style="..."'
        var badAttributes = ['start'];
        for (var i = 0; i < badAttributes.length; i++) {
            var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"', 'gi');
            output = output.replace(attributeStripper, '');
        }

        // 6. remove html comment 
        while (true) {
            if (output.indexOf("<!--") >= 0) {
                output = output.replace(output.substring(output.indexOf("<!--"), output.indexOf("-->") + 3), "");
            } else {
                break;
            }
        }

        return output;
    },

    pasteContent: function (content) {
        content = this.preModifiedPasteContent(content);

        if (document.queryCommandSupported("insertHtml")) {
            document.execCommand("insertHtml", false, content);
        } else {
            document.execCommand("paste", false, content);
        }
    },
    _generateUUID: function () {
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
            function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
    },
    preModifiedPasteContent: function (content) {

        var newContent = content;
        var replacementValues = new Array();
        while (match = this.regExpWWWPattern.exec(newContent)) {
            var guid = this._generateUUID();
            var a = document.createElement('a');
            a.href = match[0];
            a.title = match[0];
            a.innerHTML = match[0];
            a.innerText = match[0];
            replacementValues.push(guid + "^" + a.outerHTML);
            newContent = newContent.substr(0, match.index) +
                guid +
                newContent.substr(match.index + match[0].toString().length);
        }

        replacementValues.forEach(function (item) {
            newContent = newContent.replace(new RegExp(item.split("^")[0], "gi"), item.split("^")[1]);
        });
        return newContent;
    },

    setModified: function () {
        if (!Sitecore.PageModes.PageEditor.isLoaded()) {
            return;
        }

        Sitecore.PageModes.PageEditor.setModified(true);
        this.fieldValue.data("modified", this.controlId());
    },

    /*---Event handlers section---*/
    onBlur: function (e) {
        this.persistValue();
        this._tryUpdateFromWatermark();
    },

    onClick: function (e) {
        if (!this.active) {
            return;
        }

        if (this.isWatermark()) {
            this.chrome.element.update("");
            //Trick to make Chrome set focus on content editable element
            if ($sc.browser.webkit) {
                var range = document.createRange();
                range.selectNodeContents(this.chrome.element.get(0));
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
        // Restore original values saved in MouseDown handler
        this._restoreInitialStyles();
    },

    onCopy: function (e) {
        if (!this.active) {
            return;
        }

        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if (!isChrome) {
            return;
        }

        // Retrieve selected html content
        var selection = window.getSelection();
        if (!selection) {
            return;
        }

        var clonedSelection = selection.getRangeAt(0).cloneContents();
        var contentContainer = document.createElement(selection.getRangeAt(0).startContainer.parentNode.localName);
        contentContainer.appendChild(clonedSelection);
        var selectedText;
        var contentType;
        if (contentContainer.innerHTML !== contentContainer.innerText) {
            contentType = "text/html";
            selectedText = contentContainer.outerHTML;
        } else {
            contentType = "text/plain";
            selectedText = contentContainer.innerHTML;
        }

        var clipboardData = e.clipboardData || window.clipboardData || e.originalEvent.clipboardData;
        if (!selectedText || !clipboardData || !clipboardData.setData) {
            return;
        }

        e.preventDefault();
        clipboardData.setData(contentType, selectedText);
    },

    onCutPaste: function (e) {
        if (!this.active) {
            e.preventDefault();
            return;
        }

        this.processPastedContent(e);
        this.setModified();
    },

    onDelete: function (preserveData) {
        if (this.saveHandler) {
            Sitecore.PageModes.PageEditor.onSave.stopObserving(this.saveHandler);
        }

        if (this.capabilityChangedHandler) {
            Sitecore.PageModes.PageEditor.onCapabilityChanged.stopObserving(this.capabilityChangedHandler);
        }

        if (!preserveData) {
            $sc(this.fieldValue).remove();
        }
    },

    onHide: function () {
        this.active = false;
        if (this.parentLink && this.initialAttributes.linkTextDecoration != null) {
            this.parentLink.style.textDecoration = this.initialAttributes.linkTextDecoration;
        }

        this._restoreInitialStyles();
    },

    onFocus: function (e) {
        if (!this.active) {
            var el = this.chrome.element;
            setTimeout(function () {
                if (el) {
                    el.click();
                }
            }, 100);
        }
    },

    onKeyDown: function (e) {
        if (!this.active) {
            e.preventDefault();
            return;
        }

        if (e.keyCode == 13) {
            if (this.parameters["prevent-line-break"] === "true") {
                e.stop();
                return;
            }

            if (this.parameters["linebreak"] == "br") {
                e.stop();
                if (this.fieldType == "multi-line text") {
                    var linebreakTimesParamterName = "linebreak-times";
                    var linebreakTimesParamter = this.parameters[linebreakTimesParamterName];
                    var linebreakTimes = !linebreakTimesParamter || linebreakTimesParamter > 2
                        ? 0
                        : linebreakTimesParamter;
                    linebreakTimes++;
                    this.parameters[linebreakTimesParamterName] = linebreakTimes;
                    if (linebreakTimes > 1) {
                        return;
                    }
                }

                this._insertLineBreak();
            }
        }
    },

    _getSurroundedText: function (el, scanTypings) {
        var ranges = document.getSelection().getRangeAt(0);
        var pos = {
            start: {
                container: ranges.startContainer,
                offset: ranges.startOffset
            },
            end: {
                container: ranges.endContainer,
                offset: ranges.endOffset
            }
        };

        //var counter = 0;

        var sel;
        var fnPasteHtmlAtCaret = this._pasteHtmlAtCaret;
        var fnReformatSelection = this._reformatSelection;
        var convertText;
        sel = document.getSelection();

        var length = scanTypings.length;
        var startOffSet = 0;
        var counterCheck = 0;
        while (counterCheck <= 500) {
            if (sel.focusNode.wholeText === null)
                break;

            if (startOffSet == sel.anchorOffset) {
                break;
            }

            if (typeof sel.focusNode.wholeText === 'undefined') {
                break;
            }

            convertText = sel.focusNode.wholeText.toString().slice(startOffSet, sel.anchorOffset);

            if (convertText.slice(0, 1).charCodeAt(0) != 160 && convertText.slice(0, 1).charCodeAt(0) != 32) {
                startOffSet += 1;
                //length += 1;

            } else {

                //if the first char(left position) is a whitespace. We retain the right position as it was trigger by whitespace or enter keypress
                if (convertText.slice(-1).charCodeAt() != 160 && convertText.slice(-1).charCodeAt() != 32) {
                    convertText = sel.focusNode.wholeText.toString().slice(startOffSet, sel.anchorOffset + 1);
                } else {
                    break;
                }

                //if (convertText.slice(-1) == " ") {
                //    convertText = sel.focusNode.wholeText.toString().substr(sel.anchorOffset + startOffSet+1, length-2);
                //    break;
                //}
                //length += 1;
            }
            if (convertText.toString().match(this.regExpWWWPattern)) {
                break;
            }
            //if (convertText.toString().match(this.regExpPattern)) {
            //    break;
            //}
            counterCheck += 1;
        }

        if (typeof convertText !== 'undefined') {


            var wwwMatches = convertText.toString().match(this.regExpWWWPattern);

            if (wwwMatches !== null) {
                wwwMatches.forEach(function (www) {
                    var result = fnReformatSelection(www.trim(), "");
                    if (event.keyCode == 32 || result) {
                        fnPasteHtmlAtCaret('<a  href="' +
                            (www.indexOf("@") >= 0
                                ? "mailto:" + www.toString().trim()
                                : (www.indexOf("http")) < 0
                                    ? "http://" + www.toString().trim()
                                    : www.toString().trim()) +
                            '" target="_blank">' +
                            www.toString().trim() +
                            '</a>');
                    }
                });
            }
        }
        return sel;
    },

    onKeyPress: function (event) {


        var x = event.charCode || event.keyCode;
        if (typeof this.scanTypingKeys === "undefined") {
            this.scanTypingKeys = "";
        }
        this.scanTypingKeys = this.scanTypingKeys + String.fromCharCode(x);

        if (event.keyCode == 32 || event.keyCode == 13) {
            var sel = this._getSurroundedText(this.fieldValue.context.id, this.scanTypingKeys);
            this.scanTypingKeys = "";
            return;
        }

    },

    onKeyUp: function (event) {

        if ($sc.inArray(event.keyCode, this._ignoreKeyCodes) > -1) return;
        if (this.chrome.element.attr("scfieldtype") == "rich text" &&
            event.currentTarget.innerText != null &&
            event.currentTarget.innerText.trim() == "" &&
            $sc.removeTags(event.currentTarget.innerHTML) == "") {
            event.currentTarget.innerHTML = "";
        }
        if (this.fieldValue.val() != event.currentTarget.innerHTML) {
            this.setModified();
            //at least one modification has been done, so we don't need to check for modifications any more
            if (this.chrome.element.attr("scfieldtype") != "rich text" &&
                this.chrome.element.attr("scfieldtype") != "multi-line text") {
                this.chrome.element.unbind("keyup", this.onKeyUpHanler);
            }
        }

    },

    onMouseDown: function (e) {
        if (!e.isLeftButton()) {
            return;
        }

        if (e.ctrlKey) {
            if (!this.isEnabled()) {
                return;
            }

            var href = null;
            if (this.hasParentLink()) {
                href = this.parentLink.href;
                this.parentLink.onclick = function () { return false; };
                // For IE
                this.parentLink.href = "javascript:return false";
            }

            var sender = e.target;
            if (sender.tagName.toUpperCase() == "A") {
                href = sender.href;
                sender.onclick = function () { return false; };
                // For IE
                sender.href = "javascript:return false";
            }

            if (!href || href.indexOf("javascript:") == 0) {
                return;
            }

            e.stop();
            try {
                window.location.href = href;
            } catch (ex) {
                //silent
            }
        } else if (this.isEnabled() && this.contentEditable() && Sitecore.PageModes.Utility.isNoStandardsIE()) {
            // HACK FOR IE 7 issue with wrong cursor positioning in contentEditableElements
            this.initialAttributes.position = this.chrome.element.css("position");
            this.initialAttributes.zIndex = this.chrome.element.css("z-index");
            this.chrome.element.css("position", "relative");
            this.chrome.element.css("z-index", "9085");
        }
    },

    onSave: function () {
        if (!this.isReadOnly() &&
            Sitecore.PageModes.ChromeManager.selectedChrome() == this.chrome &&
            this.contentEditable()) {
            this.persistValue();
        }

        if (this.fieldValue) {
            this.fieldValue.removeData("modified");
        }
    },

    onShow: function () {
        this.active = true;
        if (this.parentLink) {
            this.initialAttributes.linkTextDecoration = this.parentLink.style.textDecoration;
            this.parentLink.style.textDecoration = 'none';
        }
    },

    getConditions: function () {
        var r = this.parentRendering();

        if (!r) {
            return [];
        }

        return r.type.getConditions();
    },

    getVariations: function () {
        var r = this.parentRendering();

        if (!r) {
            return [];
        }

        return r.type.getVariations();
    },

    _reformatSelection: function (search, replace) {
        var sel = window.getSelection();
        if (!sel.focusNode) {
            return;
        }

        if (sel.focusNode.nodeValue == null) {
            sel.focusNode.childNodes.forEach(function (child) {
                if (child.nodeValue !== null) {
                    if (child.nodeValue.indexOf(search) >= 0) {
                        var a = document.createElement('a');
                        a.href = search;
                        a.title = search;
                        a.innerHTML = search;
                        a.innerText = search;
                        var d = document.createElement("div");
                        d.innerHTML = child.textContent.replace(search, a.outerHTML);
                        sel.focusNode.replaceChild(d, child);
                    }
                } else if (sel.focusNode.previousSibling !== null) {
                    if (sel.focusNode.previousSibling.hasChildNodes()) {
                    }
                    sel.focusNode.previousSibling.childNodes.forEach(function (child) {
                        if (child.nodeValue !== null) {


                            if (child.nodeValue.indexOf(search) > 0) {
                                var a = document.createElement('a');
                                a.href = search;
                                a.title = search;
                                a.innerHTML = search;
                                a.innerText = search;
                                var d = document.createElement("div");
                                d.innerHTML = child.textContent.replace(search, a.outerHTML);
                                sel.focusNode.previousSibling.replaceChild(d, child);
                            }
                        }
                    });
                }
            });
            return false;
        } else {
            var startIndex = sel.focusNode.nodeValue.indexOf(search);
            var endIndex = startIndex + search.length;
            if (startIndex === -1) {
                return;
            }
            var range = document.createRange();
            //Set the range to contain search text
            range.setStart(sel.focusNode, startIndex);
            range.setEnd(sel.focusNode, endIndex);
            //Delete search text
            range.deleteContents();
            //Insert replace text
            range.insertNode(document.createTextNode(replace));
            //Move the caret to end of replace text
            var replacement = document.createTextNode(replace);
            range.insertNode(replacement);
            range.setStartAfter(replacement);
            // Chrome fix
            sel.removeAllRanges();
            sel.addRange(range);
            return true;
        }
    },

    _pasteHtmlAtCaret: function (html, selectPastedContent) {
        var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // only relatively recently standardized and is not supported in
                // some browsers (IE9, for one)
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                var firstNode = frag.firstChild;
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    if (selectPastedContent) {
                        range.setStartBefore(firstNode);
                    } else {
                        range.collapse(true);
                    }
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if ((sel = document.selection) && sel.type != "Control") {
            // IE < 9
            var originalRange = sel.createRange();
            originalRange.collapse(true);
            sel.createRange().pasteHTML(html);
            if (selectPastedContent) {
                range = sel.createRange();
                range.setEndPoint("StartToStart", originalRange);
                range.select();
            }
        }
    },

    _insertLineBreak: function () {
        var range, tmpRange, lineBreak, extraLineBreak, selection;

        // Unsupported browser
        if (!document.createRange || !window.getSelection) {
            // MSIE
            if (document.selection && document.selection.createRange) {
                this.insertHtmlFragment("<br/>");
                // Moving caret to new position
                range = document.selection.createRange();
                range.select();
                return;
            }

            return;
        }

        // W3C compatible browser
        lineBreak = document.createElement("br");
        range = window.getSelection().getRangeAt(0);
        tmpRange = document.createRange();
        tmpRange.selectNodeContents(this.chrome.element[0]);
        tmpRange.collapse(false);
        tmpRange.setStart(range.startContainer, range.startOffset);
        // Adding 2 <br/> tags in case of pressing 'enter' while cursor is in the last position.
        // This trick forces cursor to move to the new line
        if (!tmpRange.toString() && !this.chrome.element.find(".scExtraBreak").length) {
            var extraLineBreak = document.createElement("br");
            extraLineBreak.className = "scExtraBreak";
            range.insertNode(extraLineBreak);
            this._extraLineBreakAdded = true;
        }

        range.insertNode(lineBreak);
        tmpRange = document.createRange();
        tmpRange.selectNode(lineBreak);
        tmpRange.collapse(false);
        // Moving cursor
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(tmpRange);
    },

    _processHtml: function (html) {
        if (!html) {
            return html;
        }

        var tmp, fieldContainer;
        try {
            tmp = $sc("<div></div>").html(html);
            fieldContainer = tmp.children(".scWebEditInput").eq(0);
        } catch (e) {
            Sitecore.PageModes.Utility.log("Failed to process html: " + html);
        }

        return fieldContainer && fieldContainer.length ? fieldContainer.html() : html;
    },

    _restoreInitialStyles: function () {
        if (this.initialAttributes.position != null && this.initialAttributes.zIndex != null) {
            this.chrome.element.css("position", this.initialAttributes.position);
            this.chrome.element.css("z-index", this.initialAttributes.zIndex);
            this.initialAttributes.position = null;
            this.initialAttributes.zIndex = null;
        }
    },

    _tryUpdateFromWatermark: function () {

        var defaultValue = this.fieldValue[0].defaultValue;

        if (this.watermarkHTML &&
            $sc.removeTags(this.chrome.element.html().replace(/(?:&nbsp;|<br\s*\/?>)/gi, '')).trim() === "" &&
            $sc.removeTags(defaultValue.replace(/(?:&nbsp;|<br\s*\/?>)/gi, '')).trim() === "" &&
            defaultValue.trim().indexOf('<img') === -1) {

            this.chrome.element.update(this.watermarkHTML);
            this.chrome.element.attr("scWatermark", "true");
        }
    }
},
    {
        contentEditableAttrName: $sc.util().isNoStandardsIE() ? "contentEditable" : "contenteditable",
        renderPersonalizationCommand: function (command, isMoreCommand, chromeControls) {
            //Avoid duplication of condition personalization controls when there are nested fields.
            if (this.chrome.isFake()) {
                return null;
            }

            var rendering = this.parentRendering();
            if (!rendering) {
                return null;
            }

            command.disabled = false;
            var showVariations = rendering.type.hasVariations();
            if (showVariations || !Sitecore.PageModes.PageEditor.isPersonalizationAccessible()) {
                command.disabled = true;
                if (showVariations) {
                    return false;
                }
            }

            // Personalization command should be enabled even for readonly fields
            command.enabledWhenReadonly = true;
            if (isMoreCommand) {
                return false;
            }

            var conditions = this.getConditions();
            var tag = null;
            if (conditions.length <= 1) {
                if (!Sitecore.PageModes.PageEditor.isPersonalizationAccessible()) {
                    return null;
                }

                tag = chromeControls.renderCommandTag(command, this.chrome, isMoreCommand);
                if (!tag) {
                    return false;
                }
            }

            var retValue;
            if (!tag) {
                var context =
                    new Sitecore.PageModes.Personalization.ControlsContext(this.chrome, chromeControls, command);
                if (!Sitecore.PageModes.ChromeTypes.Rendering.personalizationBar) {
                    Sitecore.PageModes.ChromeTypes.Rendering.personalizationBar =
                        new Sitecore.PageModes.RichControls.Bar(
                            new Sitecore.PageModes.Personalization.Panel(),
                            new Sitecore.PageModes.Personalization.DropDown());
                }

                window.setChromePositionFunc = function () { };
                var context =
                    new Sitecore.PageModes.Personalization.ControlsContext(this.chrome, chromeControls, command);
                if (!Sitecore.PageModes.PageEditor.isControlBarVisible()) {
                    tag = Sitecore.PageModes.ChromeTypes.Rendering.personalizationBar.renderHidden(
                        context,
                        Sitecore.PageModes.Texts.Analytics.ChangeCondition,
                        "/sitecore/shell/~/icon/Office/16x16/users3.png");
                } else {
                    tag = Sitecore.PageModes.ChromeTypes.Rendering.personalizationBar.render(context);
                    chromeControls.commands.append(tag);
                    retValue = false;
                }
            }

            if (tag) {
                tag.mouseenter($sc.proxy(function () {
                    var r = this.parentRendering();
                    if (r) {
                        r.showHover();
                    }
                },
                    this));

                tag.mouseleave($sc.proxy(function () {
                    var r = this.parentRendering();
                    if (r) {
                        r.hideHover();
                    }
                },
                    this));
            }

            if (typeof (retValue) == "undefined") {
                retValue = tag;
            }

            if (window.setChromePositionFunc) {
                window.setChromePositionFunc();
            }

            return retValue;
        },

        renderEditVariationsCommand: function (command, isMoreCommand, chromeControls) {
            if (this.chrome.isFake()) {
                return null;
            }

            var rendering = this.parentRendering();
            if (!rendering) {
                return null;
            }

            command.disabled = false;
            var showConditions = rendering.type.hasConditions();
            if (showConditions ||
                Sitecore.PageModes.PageEditor.isTestRunning() ||
                !Sitecore.PageModes.PageEditor.isTestingAccessible()) {
                command.disabled = true;
                if (showConditions) {
                    return false;
                }
            }

            var tag = null;
            var variations = this.getVariations();
            command.disabled = false;
            if (!Sitecore.PageModes.PageEditor.isTestingAccessible()) {
                command.disabled = true;
            }

            if (variations.length <= 1) {
                if (!Sitecore.PageModes.PageEditor.isTestingAccessible()) {
                    return null;
                }

                tag = chromeControls.renderCommandTag(command, this.chrome, isMoreCommand);
                if (!tag) {
                    return false;
                }
            }

            // Personalization command should be enabled even for readonly fields
            command.enabledWhenReadonly = true;
            if (isMoreCommand) {
                return false;
            }

            var retValue;
            if (!tag) {
                if (!Sitecore.PageModes.ChromeTypes.Rendering.testingBar) {
                    Sitecore.PageModes.ChromeTypes.Rendering.testingBar = new Sitecore.PageModes.RichControls.Bar(
                        new Sitecore.PageModes.Testing.Panel("scTestingPanel"),
                        new Sitecore.PageModes.Testing.DropDown()
                    );
                }

                var context = new Sitecore.PageModes.Testing.ControlsContext(this.chrome, chromeControls, command);
                if (!Sitecore.PageModes.PageEditor.isControlBarVisible()) {
                    tag = Sitecore.PageModes.ChromeTypes.Rendering.testingBar.renderHidden(
                        context,
                        Sitecore.PageModes.Texts.Analytics.ChangeVariation);
                } else {
                    tag = Sitecore.PageModes.ChromeTypes.Rendering.testingBar.render(context);
                    chromeControls.commands.append(tag);
                    retValue = false;
                }
            }

            if (tag) {
                tag.mouseenter($sc.proxy(function () {
                    var r = this.parentRendering();
                    if (r) {
                        r.showHover();
                    }
                },
                    this));

                tag.mouseleave($sc.proxy(function () {
                    var r = this.parentRendering();
                    if (r) {
                        r.hideHover();
                    }
                },
                    this));
            }

            if (typeof (retValue) == "undefined") {
                retValue = tag;
            }

            return retValue;
        }
    });