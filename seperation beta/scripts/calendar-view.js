function CalendarView(model) {
	var viewSettings = arguments[1];
	this.model = model;
	this.container = viewSettings.container;
        this.isReadOnly = viewSettings.isReadOnly || false;
        this.displayMode = viewSettings.displayMode || 'month';
	this.useTheme = viewSettings.useTheme || false;
	this.weekMode = viewSettings.weekMode || 'liquid';
	this.header = viewSettings.header || {
                     left: 'prev,next',
                     center: 'title',
                     right: 'month,basicWeek'
                 };
}
 
CalendarView.prototype.DayRender = function (daysOfWeek, cell) {
                     currentDate = daysOfWeek;
                     var dayNumber = "<div class='fc-day-number'>" + currentDate.getDate() + "</div>";
                     var formattedDate = $.fullCalendar.formatDate(currentDate, "yyyy-MM-dd");
                     if (currentDate.getTime() >= this.model.start.getTime() && currentDate.getTime() <= this.model.end.getTime()) {
                         $(this.container + ' ' + 'td[data-date="' + formattedDate + '"]')
                             .append(dayNumber);

                         if (jQuery.inArray(daysOfWeek.getDay(), weekendDays) != -1 || (typeof this.model.modelDayData[currentDate] != 'undefined' && this.model.modelDayData[currentDate].IsWeekEndDay)) {

                             $(this.container + ' ' + 'td[data-date="' + formattedDate + '"]')
                                 .addClass('fc-state-highlight-weekend');

                         }

                         if (typeof this.model.modelDayData[currentDate] != 'undefined' && !this.model.modelDayData[currentDate].IsWeekEndDay) {

                             $(this.container + ' ' + 'td[data-date="' + formattedDate + '"]')
                                 .removeClass('fc-state-highlight-weekend');

                         }
                         var isHoliday = jQuery.inArray(daysOfWeek.getTime(), this.model.holidays) != -1;

                         if (isHoliday) {

                             $(this.container + ' ' + 'td[data-date="' + formattedDate + '"]')
                                 .addClass('fc-state-highlight-holiday');

                         }
                     }

                     if (this.model.modelDayData[currentDate] !== undefined) {

                         var currentCost = this.model.modelDayData[currentDate].RoomCost;
                         var element = '<div class="fc-event">' +
                             'Rooms: ' + this.model.modelDayData[currentDate].NumberOfRooms + '<br/>' +
                             'Free: ' + this.model.modelDayData[currentDate].NumberOfFreeRooms + '<br/>' +
                             'Pricing: ' + currentCost + '<br/>' +
                             'Total: ' + currentCost * this.model.modelDayData[currentDate].NumberOfRooms +
                             '</div>';
                         $(this.container + ' ' + 'td[data-date="' + formattedDate + '"]')
                             .append(element);
                     }
                 };

CalendarView.prototype.ViewDisplay = function(view) {
                     var start = this.model.start;
                     var end = this.model.end;

                     $(this.container + ' .fc-button-prev').removeClass("fc-state-disabled");
                     $(this.container + ' .fc-button-next').removeClass("fc-state-disabled");

                     if (view.name == 'month') {
                         var cal_date_string = view.start.getMonth() + '/' + view.start.getFullYear();
                         var cur_date_string = start.getMonth() + '/' + start.getFullYear();
                         var end_date_string = end.getMonth() + '/' + end.getFullYear();

                         if (cal_date_string == cur_date_string) {
                             jQuery(this.container + ' .fc-button-prev').addClass("fc-state-disabled");
                         } else {
                             jQuery(this.container + ' .fc-button-prev').removeClass("fc-state-disabled");
                         }

                         if (end_date_string == cal_date_string) {
                             jQuery(this.container + ' .fc-button-next').addClass("fc-state-disabled");
                         } else {
                             jQuery(this.container + ' .fc-button-next').removeClass("fc-state-disabled");
                         }

                         $(this.container + ' tr.fc-week').not(':has("td > div.fc-day-number")').css({

                             'visibility': 'hidden',
                             'height': '0',
                             'display': 'block'

                         });
                     } else if (view.start.getTime() <= start.getTime()) {
                         jQuery(this.container + ' .fc-button-prev').addClass("fc-state-disabled");

                         if ($(this.container + ' tr.fc-week').not(':has("td > div.fc-day-number")').length == 1)
                             $('.fc-button-next').click();
                     } else if (view.end.getTime() > end.getTime()) {
                         jQuery(this.container + ' .fc-button-next').addClass("fc-state-disabled");
                     } else {
                         jQuery(this.container + ' .fc-button-prev').removeClass("fc-state-disabled");
                         jQuery(this.container + ' .fc-button-next').removeClass("fc-state-disabled");
                     }
};
