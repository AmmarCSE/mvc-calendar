(function ($, undefined) {
    $.CalendarController = function (options) {


        // method calling
        if (typeof options == 'string') {
            var args = Array.prototype.slice.call(arguments, 1);
            var res;

            this.each(function () {
                var calendar = $.data(this, 'fullCalendar');

                console.log(this);
                console.log(calendar);
                if (calendar && $.isFunction(calendar[options])) {
                    var r = calendar[options].apply(calendar, args);
                    if (res === undefined) {
                        res = r;
                    }
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

        options = options || {};

        var eventSources = options.eventSources || [];;
        delete options.eventSources;
        if (options.events) {
            eventSources.push(options.events);
            delete options.events;
        }


        options = $.extend(true, {},
            defaults, (options.isRTL || options.isRTL === undefined && defaults.isRTL) ? rtlDefaults : {},
            options
        );


        this.each(function (i, _element) {
            var element = $(_element);
            var calendar = new Calendar(element, options, eventSources);
            element.data('fullCalendar', calendar); // TODO: look into memory leak implications
            calendar.render();
        });


        return this;

    };

    function initCalendar(caller, viewArgs, modelArgs) {
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
                 select: ,
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
})(jQuery);
