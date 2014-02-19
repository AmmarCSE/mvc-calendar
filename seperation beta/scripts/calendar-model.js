function CalendarModel () {
	var args = arguments[0];

        this.modelDay = args.modelDay;
        this.year = args.year;
        this.month = args.month;
        this.date = args.date;

        this.weekendDays = args.weekendDays || [];
	this.holidays = args.holidays || [];

        if (typeof options.dayDataSource != 'undefined') {

            loadDayData(options.dayDataSource);

        } else {

            initializeDayData(new Date(options.start.getTime()), new Date(options.end.getTime()));

        }

}
 
CalendarModel.prototype.initializeDayData = function(start, end) {
         currentDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
         var isWeekEnd;

         while (currentDate <= end) {

             isWeekEnd = jQuery.inArray(currentDate.getDay(), weekendDays) != -1;
             modelDayData[currentDate] = {};
             modelDayData[currentDate].DateEpoch = currentDate.getFullYear() + ',' + (currentDate.getMonth() + 1) + ',' + currentDate.getDate();
             modelDayData[currentDate].IsWeekEndDay = isWeekEnd;
             $.each(modelDay, weekEndWalker);

             var newDate = currentDate.setDate(currentDate.getDate() + 1);
             currentDate = new Date(newDate);
         }
};

CalendarModel.prototype.loadDayData = function(data) {
         for (var i = 0; i < data.length; i++) {

             currentDate = new Date(data[i].DateEpoch);

             modelDayData[currentDate] = {};
             modelDayData[currentDate].DateEpoch = data[i].DateEpoch;
             modelDayData[currentDate].IsWeekEndDay = data[i].IsWeekEndDay;

             delete data[i].DateEpoch;
             delete data[i].IsWeekEndDay;

             $.each(data[i], weekEndWalker);
         }
};

CalendarModel.prototype.weekEndWalker = function (key, value) {
         modelDayData[currentDate][key] = value;

         if (value !== null && typeof value === "object")
             if (modelDayData[currentDate].IsWeekEndDay)
                 modelDayData[currentDate][key] = modelDay[key].isWeekEnd;
             else
                 modelDayData[currentDate][key] = modelDay[key].notWeekEnd;
};

CalendarModel.prototype.updateDayWalker = function (key, value) {
         if (key !== 'weekend') {

             modelDayData[currentDate][key] = $("[data-dayModelKey='" + key + "']").val() === undefined ?

             value : $("[data-dayModelKey='" + key + "']").val();

         }
};
CalendarModel.prototype.updateDayData = function () {
             var numDaysSelected = dateDiffInDays(currentDate, currentEndDate);

             var formattedDate;
             var eventContainer;

             for (var i = 0; i < numDaysSelected; i++) {
                 changed.push(currentDate.getTime());

                 formattedDate = $.fullCalendar.formatDate(currentDate, "yyyy-MM-dd");
                 eventContainer = $(caller + ' td[data-date="' + formattedDate + '"]');

                 eventContainer.children('.fc-event').remove();

                 var numRooms = $('#roomQuantitySpinner').val();
                 var freeRooms = $('#freeRoomQuantitySpinner').val();
                 var pricing = $('#costSpinner').val();

                 $.each(modelDayData[currentDate], updateDayWalker);

                 var isWeekEnd = false;

                 var cell = $(caller + ' .fc-day[data-date="' + formattedDate + '"]');
                 cell.removeClass('fc-state-highlight-weekend');

                 if ($('#isWeekEnd').is(':checked')) {
                     cell.addClass('fc-state-highlight-weekend');
                     isWeekEnd = true;
                 }

                 var isHoliday = jQuery.inArray(currentDate.getTime(), holidays) != -1;
                 if (isHoliday)
                     cell.addClass('fc-state-highlight-holiday');


                 modelDayData[currentDate].IsWeekEndDay = isWeekEnd;

                 var element = '<div class="fc-event">' +
                     'Rooms: ' + numRooms + '<br/>' +
                     'Free: ' + freeRooms + '<br/>' +
                     'Pricing: ' + pricing + '<br/>' +
                     'Total: ' + pricing * numRooms +
                     '</div>';
                 eventContainer.append(element);

                 currentDate.setDate(currentDate.getDate() + 1);
             }
             calendar.fullCalendar('unselect');
};

CalendarModel.prototype.retrieveData = function () {
             var allotmentPricings = [];

             for (var dayItem in modelDayData) {

                 var currentDayItemDate = new Date(modelDayData[dayItem].DateEpoch);

                 modelDayData[dayItem].DateEpoch = currentDayItemDate.getFullYear() + ',' +
                     (currentDayItemDate.getMonth() + 1) + ',' +
                     currentDayItemDate.getDate();
                 allotmentPricings.push(modelDayData[dayItem]);

             }

             return allotmentPricings;
         }
};

function dateDiffInDays(start, end) {
    return Math.ceil((new Date(end) - new Date(start)) / 86400000) + 1;
}
		 
