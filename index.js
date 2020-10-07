var {LunarCalendar, LunarDate} = require("LunarCalendar");

var dates = LunarCalendar.getDaysOfMonth(new Date());
console.log("# Show Month: ", new Date());
for (var d in dates) {
    console.log(dates[d].toString());
}
