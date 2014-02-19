TASCalendar = function () {



     var caller;
     var modelDay
     var modelDayData = [];
     var changed = [];
     var holidays;


     function initializeDayData(start, end) {
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
     }

     function loadDayData(data) {

         for (var i = 0; i < data.length; i++) {

             currentDate = new Date(data[i].DateEpoch);

             modelDayData[currentDate] = {};
             modelDayData[currentDate].DateEpoch = data[i].DateEpoch;
             modelDayData[currentDate].IsWeekEndDay = data[i].IsWeekEndDay;

             delete data[i].DateEpoch;
             delete data[i].IsWeekEndDay;

             $.each(data[i], weekEndWalker);
         }


     }

     function weekEndWalker(key, value) {
         modelDayData[currentDate][key] = value;

         if (value !== null && typeof value === "object")
             if (modelDayData[currentDate].IsWeekEndDay)
                 modelDayData[currentDate][key] = modelDay[key].isWeekEnd;
             else
                 modelDayData[currentDate][key] = modelDay[key].notWeekEnd;
     }

     function updateDayWalker(key, value) {

         if (key !== 'weekend') {

             modelDayData[currentDate][key] = $("[data-dayModelKey='" + key + "']").val() === undefined ?

             value : $("[data-dayModelKey='" + key + "']").val();

         }
     }

     return {
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

             calendar = $(caller).fullCalendar({
                 theme: true,
                 defaultView: options.displayMode == 'week' ? 'basicWeek' : 'month',
                 year: options.start.getFullYear(),
                 month: options.start.getMonth(),
                 date: options.start.getDate(),
                 viewDisplay: function (view) {
                     var start = options.start;
                     var end = options.end;

                     $(caller + ' .fc-button-prev').removeClass("fc-state-disabled");
                     $(caller + ' .fc-button-next').removeClass("fc-state-disabled");

                     if (view.name == 'month') {
                         var cal_date_string = view.start.getMonth() + '/' + view.start.getFullYear();
                         var cur_date_string = start.getMonth() + '/' + start.getFullYear();
                         var end_date_string = end.getMonth() + '/' + end.getFullYear();

                         if (cal_date_string == cur_date_string) {
                             jQuery(caller + ' .fc-button-prev').addClass("fc-state-disabled");
                         } else {
                             jQuery(caller + ' .fc-button-prev').removeClass("fc-state-disabled");
                         }

                         if (end_date_string == cal_date_string) {
                             jQuery(caller + ' .fc-button-next').addClass("fc-state-disabled");
                         } else {
                             jQuery(caller + ' .fc-button-next').removeClass("fc-state-disabled");
                         }

                         $(caller + ' tr.fc-week').not(':has("td > div.fc-day-number")').css({

                             'visibility': 'hidden',
                             'height': '0',
                             'display': 'block'

                         });
                     } else if (view.start.getTime() <= start.getTime()) {
                         jQuery(caller + ' .fc-button-prev').addClass("fc-state-disabled");

                         if ($(caller + ' tr.fc-week').not(':has("td > div.fc-day-number")').length == 1)
                             $('.fc-button-next').click();
                     } else if (view.end.getTime() > end.getTime()) {
                         jQuery(caller + ' .fc-button-next').addClass("fc-state-disabled");
                     } else {
                         jQuery(caller + ' .fc-button-prev').removeClass("fc-state-disabled");
                         jQuery(caller + ' .fc-button-next').removeClass("fc-state-disabled");
                     }
                 },
                 header: {
                     left: 'prev,next',
                     center: 'title',
                     right: 'month,basicWeek'
                 },
                 selectable: true,
                 disableDragging: true,
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
                 weekMode: 'liquid',
                 dayRender: function (daysOfWeek, cell) {
                     currentDate = daysOfWeek;
                     var dayNumber = "<div class='fc-day-number'>" + currentDate.getDate() + "</div>";
                     var formattedDate = $.fullCalendar.formatDate(currentDate, "yyyy-MM-dd");

                     if (currentDate.getTime() >= options.start.getTime() && currentDate.getTime() <= options.end.getTime()) {
                         $(caller + ' ' + 'td[data-date="' + formattedDate + '"]')
                             .append(dayNumber);

                         if (jQuery.inArray(daysOfWeek.getDay(), weekendDays) != -1 || (typeof modelDayData[currentDate] != 'undefined' && modelDayData[currentDate].IsWeekEndDay)) {

                             $(caller + ' ' + 'td[data-date="' + formattedDate + '"]')
                                 .addClass('fc-state-highlight-weekend');

                         }

                         if (typeof modelDayData[currentDate] != 'undefined' && !modelDayData[currentDate].IsWeekEndDay) {

                             $(caller + ' ' + 'td[data-date="' + formattedDate + '"]')
                                 .removeClass('fc-state-highlight-weekend');

                         }
                         var isHoliday = jQuery.inArray(daysOfWeek.getTime(), options.holidays) != -1;

                         if (isHoliday) {

                             $(caller + ' ' + 'td[data-date="' + formattedDate + '"]')
                                 .addClass('fc-state-highlight-holiday');

                         }
                     }

                     if (modelDayData[currentDate] !== undefined) {

                         var currentCost = modelDayData[currentDate].RoomCost;
                         var element = '<div class="fc-event">' +
                             'Rooms: ' + modelDayData[currentDate].NumberOfRooms + '<br/>' +
                             'Free: ' + modelDayData[currentDate].NumberOfFreeRooms + '<br/>' +
                             'Pricing: ' + currentCost + '<br/>' +
                             'Total: ' + currentCost * modelDayData[currentDate].NumberOfRooms +
                             '</div>';

                         $(caller + ' ' + 'td[data-date="' + formattedDate + '"]')
                             .append(element);
                     }
                 }
             });
         },
         updateDayData: function () {

             var numDaysSelected = dateDiff(currentDate, currentEndDate);

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
         },
         retrieveData: function () {
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

     }
 }

 function dateDiff(start, end) {
     return Math.ceil((new Date(end) - new Date(start)) / 86400000) + 1;
 }

 String.prototype.Format = function () {
     var s = this,
         i = arguments.length;

     while (i--) {
         s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
     }
     return s;
 };



 var currentStartDate;
 var currentDate;
 var currentEndDate;



 var displayFormatElement;
