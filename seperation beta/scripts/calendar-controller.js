(function ($, undefined) {
    var controller = new Controller();

    $.ControllerRouter = function (request) {

	if(typeof request == 'string') {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                if ($.isFunction(controller[request])) {
                    var r = controller[request].apply(controller);
                    if (options == 'destroy') {
                        $.removeData(this, 'fullCalendar');
                    }
                }
            });
            if (res !== undefined) {
                return res;
            }
            return this;
        }



        return this;

    };

    function Controller() {
        var that = this;


        // exports
        that.initCalendar = initCalendar;
        that.select = select;

        function initCalendar(caller, modelArgs, viewArgs) {
            console.log('chitchat');
            caller = '#' + caller;
            var view = new CalendarView(viewArgs);
            var model = new CalendarModel(modelArgs);
            //currentStartDate = options.start;

            calendar = $(caller).fullCalendar({
                theme: view.useTheme,
                defaultView: view.displayMode,
                year: model.year,
                month: model.month,
                date: model.date,
                viewDisplay: view.viewDisplay,
                header: view.header,
                selectable: view.isReadOnly,
                select: function () {},
                weekMode: view.weekMode,
                dayRender: view.dayRender
            });
        }

        function select(start, end, allDay) {
            currentCalendar = options.caller;
            currentDate = new Date(start);
            currentEndDate = end;

            if (currentDate.getTime() >= options.start && currentDate.getTime() <= options.end.getTime() && currentEndDate.getTime() <= options.end.getTime()) {

                var isWeekEnd;

                while (currentDate.getTime() <= currentEndDate.getTime()) {

                    if (typeof modelDayData[currentDate] == 'undefined') {

                        isWeekEnd = jQuery.inArray(currentDate.getDay(), weekendDays) != -1;
                        modelDayData[currentDate] = {};
                        modelDayData[currentDate].DateEpoch = currentDate;
                        modelDayData[currentDate].IsWeekEndDay = isWeekEnd;
                        $.each(modelDay, weekEndWalker);

                    }
                    var newDate = currentDate.setDate(currentDate.getDate() + 1);
                    currentDate = new Date(newDate);

                }

                currentDate = new Date(start);;

                var formattedDate = $.fullCalendar.formatDate(currentDate, "Day Pricing: MMM dd");
                var isWeekEnd = modelDayData[currentDate].IsWeekEndDay;

                $('#roomQuantitySpinner').val(modelDay.NumberOfRooms);
                $('#freeRoomQuantitySpinner').val(modelDay.NumberOfFreeRooms);
                $('#costSpinner').val(modelDay.RoomCost.notWeekEnd);

                if (isWeekEnd) {

                    $('#costSpinner').val(modelDay.RoomCost.isWeekEnd);

                }

                if (start.getTime() == end.getTime()) {

                    $('#roomQuantitySpinner').val(modelDayData[currentDate].NumberOfRooms);
                    $('#freeRoomQuantitySpinner').val(modelDayData[currentDate].NumberOfFreeRooms);
                    $('#costSpinner').val(modelDayData[currentDate].RoomCost);

                } else {

                    formattedDate += $.fullCalendar.formatDate(end, " - dd");

                }

                $("#isWeekEnd").prop("checked", false);

                if (isWeekEnd) {

                    $("#isWeekEnd").prop("checked", true);

                }

                $('#calendarDialog').dialog("option", "title", formattedDate);
                $("#calendarDialog").dialog("open");

                calendar.fullCalendar('unselect');

            } else {

                alert('Date selected out of range!');

            }
        }
    }
})(jQuery);
