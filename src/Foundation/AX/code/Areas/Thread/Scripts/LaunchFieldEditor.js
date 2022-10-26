define(["sitecore", "/-/speak/v1/ExperienceEditor/ExperienceEditor.js"], function (Sitecore, ExperienceEditor) {
    var dialogUrl;
    Sitecore.Commands.LaunchFieldEditor =
    {
        canExecute: function (context) {
            context.currentContext.text = context.button.viewModel.$el[0].text;
            context.currentContext.argument = context.button.viewModel.$el[0].accessKey;
            ExperienceEditor.PipelinesUtil.generateRequestProcessor("ExperienceEditor.GenerateFieldEditorUrl", function (response) {
                dialogUrl = response.responseValue.value;
            }).execute(context);
            return dialogUrl !== null;
        },
        execute: function (context) {
          if (this.canExecute(context)) {
            ExperienceEditor.Dialogs.showModalDialog(dialogUrl, '', "dialogHeight: 680px;dialogWidth: 520px;", null);
          }
        }
    };
});