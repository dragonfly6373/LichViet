var LunarDate = require("./LunarDate");

function Calendar(date) {
    this.sdate = new Date(date.getTime());
    this.mdate = LunarDate.create(date);
}

Calendar.prototype.getDay = function() {
    return this.sdate.getDay();
};

Calendar.prototype.clone = function() {
    return new Calendar(this.sdate);
};

Calendar.prototype.toString = function() {
    return "" + this.mdate + " " + this.getMCan() + " " + this.getMChi();
};

Calendar.prototype.getYCan = function() {
    return this.mdate.getYCan();
};

Calendar.prototype.getYChi = function() {
    return this.mdate.getYChi();
};

Calendar.prototype.getMCan = function() {
    return this.mdate.getMCan();
};

Calendar.prototype.getMChi = function() {
    return this.mdate.getMChi();
};

Calendar.getDaysOfMonth = function(date) {
    var cal = new Calendar(new Date(date.getFullYear(), date.getMonth(), 1));
    var nextMoon = cal.mdate.clone();
    nextMoon.date = 1;
    nextMoon.month += 1;
    var fold = nextMoon.toSolarDate();
    var m = cal.sdate.getMonth();
    var results = [];
    console.log("# Calendar getDaysOfMonth:", cal.sdate, m);
    while (cal.sdate.getMonth() == m) {
        results.push(cal.clone());
        cal.sdate.setDate(cal.sdate.getDate() + 1);
        if (cal.sdate == fold) {
            cal.mdate.month += 1;
            cal.mdate.date = 0;
        }
        cal.mdate.date += 1;
        console.log(" - ", cal.sdate);
    }
    return results;
};

module.exports = Calendar;