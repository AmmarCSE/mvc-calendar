function DialogView(model, title) {
	this.dialogContainer = $('<div></div>');
BuildDialogInnards(this.dialogContainer, model);
Dialogize(this.dialogContainer);
console.log(this.dialogContainer);

function BuildDialogInnards(dialogContainer, model) {
	var day = model.modelDay;
for (var key in day) {
  if (day.hasOwnProperty(key)) {
        dialogContainer.append('</br>');
        dialogContainer.append('<label>Room Quantity:</label>');
        dialogContainer.append('<input> data-dayModelKey="' + day[key] + '" />');
        dialogContainer.append('</br>');
        //<input id="roomQuantitySpinner" name="value" data-dayModelKey="roomNum" />
        //<br/>
        //<br/>
  }
}
}
function Dialogize(dialogContainer) {
            dialogContainer.dialog({
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
DialogView.prototype.DialogOpen =  function() {
                this.dialogContainer.dialog("open");
}
        //$(document).ready(function () {
            //$("#roomQuantitySpinner").spinner();
            //$("#freeRoomQuantitySpinner").spinner();
            //$("#costSpinner").spinner();
            //});


    ////<div id="calendarDialog">
        //<label for="roomQuantitySpinner">Room Quantity:</label>
        //<input id="roomQuantitySpinner" name="value" data-dayModelKey="roomNum" />
        //<br/>
        //<br/>
        //<label for="freeRoomQuantitySpinner">Free Quantity:</label>
        //<input id="freeRoomQuantitySpinner" name="value" data-dayModelKey="freeNum" />
        //<br/>
        //<br/>
        //<label for="costSpinner">Room Cost:</label>
        //<input id="costSpinner" name="value" data-dayModelKey="cost" />
        //<br/>
        //<br/>
        //<label>
            //<input id="isWeekEnd" type="checkbox" name="value" value="false" data-dayModelKey="isWeekEnd">Weekend</label>
    //</div>
