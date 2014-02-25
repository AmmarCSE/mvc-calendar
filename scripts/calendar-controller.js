(function ($, undefined) {
    var controller = new Controller();

    $.ControllerRouter = function (request) {

	if(typeof request == 'string') {
		var res;
            var args = Array.prototype.slice.call(arguments, 1);
                if ($.isFunction(controller[request])) {
                    var r = controller[request].apply(controller, args);
                    if (request == 'destroy') {
                        $.removeData(this, 'fullCalendar');
                    }
                }
            if (res !== undefined) {
                return res;
            }
            return this;
        }

        return this;

    };

    function Controller() {
        this.initCalendar = initCalendar;
        this.select = select;

        function initCalendar(modelArgs, viewArgs) {
            caller = viewArgs.container = '#' + viewArgs.container;
            var model = new CalendarModel(modelArgs);
            var view = new CalendarView(model, viewArgs);
            //currentStartDate = options.start;
            calendar = $(caller).fullCalendar({
                theme: view.useTheme,
                defaultView: view.displayMode,
                year: model.start.getFullYear(),
                month: model.start.getMonth(),
                date: model.start.getDate(),
                viewDisplay: view.ViewDisplay.bind(view),
                header: view.header,
                selectable: view.isReadOnly,
                select: this.select.bind(model),
                weekMode: view.weekMode,
                dayRender: view.DayRender.bind(view)
            });
        }

        function select(start, end, allDay) {
            //currentCalendar = options.caller;
            var currentDate = new Date(start);
            var currentEndDate = end;

            if (currentDate.getTime() >= this.start && currentDate.getTime() <= this.end.getTime() && currentEndDate.getTime() <= this.end.getTime()) {

                var isWeekEnd;
this.initializeDefaultDayData(currentDate, currentEndDate);
                //while (currentDate.getTime() <= currentEndDate.getTime()) {

                    //if (typeof modelDayData[currentDate] == 'undefined') {

                        //isWeekEnd = jQuery.inArray(currentDate.getDay(), weekendDays) != -1;
                        //modelDayData[currentDate] = {};
                        //modelDayData[currentDate].DateEpoch = currentDate;
                        //modelDayData[currentDate].IsWeekEndDay = isWeekEnd;
                        //$.each(modelDay, weekEndWalker);

                    //}
                    //var newDate = currentDate.setDate(currentDate.getDate() + 1);
                    //currentDate = new Date(newDate);

                //}
var dialogView = new DialogView(this, 'test');
                var formattedDate = $.fullCalendar.formatDate(new Date(start), "Day Pricing: MMM dd");
                //var isWeekEnd = modelDayData[currentDate].IsWeekEndDay;

                //$('#roomQuantitySpinner').val(modelDay.NumberOfRooms);
                //$('#freeRoomQuantitySpinner').val(modelDay.NumberOfFreeRooms);
                //$('#costSpinner').val(modelDay.RoomCost.notWeekEnd);

                if (isWeekEnd) {

                    //$('#costSpinner').val(modelDay.RoomCost.isWeekEnd);

                }

                if (start.getTime() == end.getTime()) {

                    //$('#roomQuantitySpinner').val(modelDayData[currentDate].NumberOfRooms);
                    //$('#freeRoomQuantitySpinner').val(modelDayData[currentDate].NumberOfFreeRooms);
                    //$('#costSpinner').val(modelDayData[currentDate].RoomCost);

                } else {

                    formattedDate += $.fullCalendar.formatDate(end, " - dd");

                }

                $("#isWeekEnd").prop("checked", false);

                if (isWeekEnd) {

                    $("#isWeekEnd").prop("checked", true);

                }

                //dialogView.dialog("option", "title", formattedDate);

                calendar.fullCalendar('unselect');

                dialogView.DialogOpen();
            } else {

                alert('Date selected out of range!');

            }
        }
    }
})(jQuery);
