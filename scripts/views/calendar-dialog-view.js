function DialogView(masterView, start, end) {
    this.model = masterView.model;
    this.dialogContainer = $('<div></div>');
    this.labels = {
        NumberOfRooms: 'Number of Rooms:',
        NumberOfFreeRooms: 'Number of Free Rooms:',
        RoomCost: 'Room Cost:'
    };
    this.startDate = start;
    this.endDate = end;
    BuildDialogInnards(this.dialogContainer, this.model, this.labels);
    Dialogize(this);

    function BuildDialogInnards(dialogContainer, model, labels) {
        var day = model.modelDay;
        for (var key in day) {
            if (day.hasOwnProperty(key)) {
                dialogContainer.append('</br>');
                dialogContainer.append('<label>' + labels[key] + '</label>');
                dialogContainer.append('<input data-dayModelKey="' + key + '" value="' + day[key] + '" />');
                dialogContainer.append('</br>');
            }
        }
    }

    function Dialogize(dialogRef) {
        var formattedDate = $.fullCalendar.formatDate(new Date(dialogRef.startDate), "Day Pricing: MMM dd") +
            (dialogRef.startDate.getTime() != dialogRef.endDate.getTime() ? $.fullCalendar.formatDate(dialogRef.endDate, " - dd") : '');
        dialogRef.dialogContainer.dialog({
            title: formattedDate,
            autoOpen: false,
            show: {
                effect: "size",
                duration: 250
            },
            hide: {
                effect: "explode",
                duration: 500
            },
            height: 350,
            width: 275,
            modal: true,
            buttons: {
                "Done": function () {
                    $.ControllerRouter('modelDayDialogClose', masterView.model, dialogRef, masterView);
                }
            }
        });
    }
}

DialogView.prototype.DialogOpen = function () {
    this.dialogContainer.dialog("open");
}
DialogView.prototype.DialogClose = function () {
    this.dialogContainer.dialog("close");
    this.dialogContainer.dialog('destroy').remove();
}
