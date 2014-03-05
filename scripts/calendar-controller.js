(function ($, undefined) {
    var controller = new Controller();

    $.ControllerRouter = function (request) {
        if (typeof request == 'string') {
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
            var currentDate = new Date(start);
            var currentEndDate = end;

            if (currentDate.getTime() >= this.start && currentDate.getTime() <= this.end.getTime() && currentEndDate.getTime() <= this.end.getTime()) {
                this.initializeDefaultDayData(currentDate, currentEndDate);

                var dialogView = new DialogView(this, start, end);
                dialogView.DialogOpen();

                calendar.fullCalendar('unselect');
            } else {
                alert('Date selected out of range!');
            }
        }
    }
})(jQuery);
