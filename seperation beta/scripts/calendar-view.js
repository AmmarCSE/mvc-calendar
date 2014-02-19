                 dayRender: ,
                 viewDisplay: function (view) {
                 },
function CalendarView() {
}
 
CalendarView.prototype.dayRender = function (daysOfWeek, cell) {
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
         };

CalendarView.prototype.viewDisplay = function(view) {
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
};
