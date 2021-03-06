function CalendarModel() {
    var args = arguments[0];

    this.modelDay = args.modelDay;
    this.initializeToDefault = args.initializeToDefault || false;

    this.start = args.start;
    this.end = args.end;

    this.weekendDays = args.weekendDays || [];
    this.holidays = args.holidays || [];

    this.modelDayData = {};

    this.weekEndWalker = function (key, value) {
        this.modelDayData[currentDate][key] = value;

        if (value !== null && typeof value === "object")
            if (this.modelDayData[currentDate].IsWeekEndDay)
                this.modelDayData[currentDate][key] = this.modelDay[key].isWeekEnd;
            else
                this.modelDayData[currentDate][key] = this.modelDay[key].notWeekEnd;
    };

    if (typeof args.dayDataSource != 'undefined') {

        loadDayData(args.dayDataSource);

    } else if (this.initializeToDefault) {

        this.initializeDefaultDayData(new Date(this.start.getTime()), new Date(this.end.getTime()));

    }

}

CalendarModel.prototype.initializeDefaultDayData = function (start, end) {
    currentDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    var isWeekEnd;

    while (currentDate <= end) {
        isWeekEnd = jQuery.inArray(currentDate.getDay(), weekendDays) != -1;
        this.modelDayData[currentDate] = {};
        this.modelDayData[currentDate].DateEpoch = currentDate.getFullYear() + ',' + (currentDate.getMonth() + 1) + ',' + currentDate.getDate();
        this.modelDayData[currentDate].IsWeekEndDay = isWeekEnd;
        $.each(this.modelDay, this.weekEndWalker.bind(this));

        var newDate = currentDate.setDate(currentDate.getDate() + 1);
        currentDate = new Date(newDate);
    }
};

CalendarModel.prototype.loadDayData = function (data) {
    for (var i = 0; i < data.length; i++) {

        currentDate = new Date(data[i].DateEpoch);

        this.modelDayData[currentDate] = {};
        this.modelDayData[currentDate].DateEpoch = data[i].DateEpoch;
        this.modelDayData[currentDate].IsWeekEndDay = data[i].IsWeekEndDay;

        delete data[i].DateEpoch;
        delete data[i].IsWeekEndDay;

        $.each(data[i], weekEndWalker);
    }
};


CalendarModel.prototype.updateDayWalker = function (key, value, currentDate) {
    if (key !== 'weekend') {
        this.modelDayData[currentDate][key] = $("[data-dayModelKey='" + key + "']").val() === undefined ?

        value : $("[data-dayModelKey='" + key + "']").val();

    }
};
CalendarModel.prototype.updateDayData = function (startDate, endDate) {
    var currentDate = new Date(startDate);
    var numDaysSelected = dateDiffInDays(currentDate, endDate);

    for (var i = 0; i < numDaysSelected; i++) {
        $.each(this.modelDayData[currentDate], (function (key, value) {
            this.updateDayWalker(key, value, currentDate)
        }).bind(this));
	
        currentDate.setDate(currentDate.getDate() + 1);
    }
};

CalendarModel.prototype.retrieveData = function () {
    var allotmentPricings = [];

    for (var dayItem in this.modelDayData) {

        var currentDayItemDate = new Date(this.modelDayData[dayItem].DateEpoch);

        this.modelDayData[dayItem].DateEpoch = currentDayItemDate.getFullYear() + ',' +
            (currentDayItemDate.getMonth() + 1) + ',' +
            currentDayItemDate.getDate();
        allotmentPricings.push(this.modelDayData[dayItem]);

    }

    return allotmentPricings;
};

function dateDiffInDays(start, end) {
    return Math.ceil((new Date(end) - new Date(start)) / 86400000) + 1;
}
