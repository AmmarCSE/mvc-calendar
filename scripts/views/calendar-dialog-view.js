function DialogView(model, start, end) {
    this.dialogContainer = $('<div></div>');
    this.labels = {
        NumberOfRooms: 'Number of Rooms:',
        NumberOfFreeRooms: 'Number of Free Rooms:',
        RoomCost: 'Room Cost:'
    };

    BuildDialogInnards(this.dialogContainer, model, this.labels);
    Dialogize(this.dialogContainer, start, end);

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

    function Dialogize(dialogContainer, start, end) {
        var formattedDate = $.fullCalendar.formatDate(new Date(start), "Day Pricing: MMM dd") +
            (start.getTime() != end.getTime() ? $.fullCalendar.formatDate(end, " - dd") : '');

        dialogContainer.dialog({
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

                    //calendars[currentCalendar].updateDayData();
                    $(this).dialog("close");
                }
            }
        });
    }
}

DialogView.prototype.DialogOpen = function () {
    this.dialogContainer.dialog("open");
}
