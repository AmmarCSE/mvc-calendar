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
        this.modelDayDialogClose = modelDayDialogClose;

        function initCalendar(modelArgs, viewArgs) {
            caller = viewArgs.container = '#' + viewArgs.container;

            var model = new CalendarModel(modelArgs);
            var view = new CalendarView(model, viewArgs);

            calendar = $(caller).fullCalendar({
                year: model.start.getFullYear(),
                month: model.start.getMonth(),
                date: model.start.getDate(),
                select: this.select.bind(view),
                theme: view.useTheme,
                defaultView: view.displayMode,
                viewDisplay: view.ViewDisplay.bind(view),
                header: view.header,
                selectable: view.isReadOnly,
                weekMode: view.weekMode,
                dayRender: view.DayRender.bind(view)
            });
        }

        function select(start, end, allDay) {
            var currentDate = new Date(start);
            var currentEndDate = end;

            if (currentDate.getTime() >= this.model.start && currentDate.getTime() <= this.model.end.getTime() && currentEndDate.getTime() <= this.model.end.getTime()) {
                var dialogView = new DialogView(this, start, end);
                dialogView.DialogOpen();
            } else {
                alert('Date selected out of range!');
            }
        }

        function modelDayDialogClose(model, dialogview, masterView) {

            model.updateDayData(dialogview.startDate, dialogview.endDate);
            dialogview.DialogClose();
            masterView.DayReRender(dialogview.startDate, dialogview.endDate);
        }
    }
})(jQuery);
