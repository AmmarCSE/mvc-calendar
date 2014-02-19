var CalendarController = (function () {
    return {
	    test: function () {console.log(123)},
	    select: function (start, end, allDay) {
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
    },
    initCalendar: function (options) {
        caller = '#' + options.caller;
        modelDay = options.modelDay;


        if (typeof options.holidays != 'undefined')
            holidays = options.holidays;
        else
            holidays = [];

        displayFormatElement = options.displayFormatElement;

        if (typeof options.dayDataSource != 'undefined') {

            loadDayData(options.dayDataSource);

        } else {

            initializeDayData(new Date(options.start.getTime()), new Date(options.end.getTime()));

        }


        currentStartDate = options.start;

        //calendar = $(caller).fullCalendar({
                //theme: true,
                //defaultView: options.displayMode == 'week' ? 'basicWeek' : 'month',
                //header: {
                    //left: 'prev,next',
                    //center: 'title',
                    //right: 'month,basicWeek'
                //},
                //selectable: true,
                //disableDragging: true,
                //weekMode: 'liquid',
            //}
        }
    }
    })();
