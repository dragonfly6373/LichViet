var _amlich = require('./amlich-aa98');

var Can = ["Giap", "At", "Binh", "Dinh", "Mau", "Ky", "Canh", "Tan", "Nham", "Quy"];
var Chi = ["Ty", "Suu", "Dan", "Meo", "Thinh", "Ty", "Ngo", "Mui", "Than", "Dau", "Tuat", "Hoi"];

function LunarDate() {
    this.date = (arguments.length > 2 ? parseInt(arguments[0]) : 1);
    this.month = (arguments.length > 2 ? parseInt(arguments[1]) : 1);
    this.year = (arguments.length > 2 ? parseInt(arguments[2]) : 1990);
    this.leap = (arguments.length >= 4 ? arguments[3] : false);
    this.tz = (arguments.length > 4 ? parseInt(arguments[4]) : 7);
}

Object.keys(_amlich).forEach((key) => {
    LunarDate[key] = _amlich[key];
});

LunarDate.prototype.clone = function() {
    return new LunarDate(this.date, this.month, this.year, this.leap, this.tz);
};

LunarDate.prototype.toString = function() {
    return "" + this.date + "/" + this.month + "/" + this.year + (this.leap ? "(N)" : "");
};

LunarDate.prototype.toSolarDate = function() {
    var arr = _amlich.convertLunar2Solar(this.day, this.month, this.year, this.leap, this.tz);
    arr[1] -= 1;
    return new Date(Date.UTC.apply(null, arr.reverse()));
};

LunarDate.prototype.getYCan = function() {
    var i = (this.year + 6) % 10;
    return Can[i];
};

LunarDate.prototype.getYChi = function() {
    var i = (this.year + 8) % 12;
    return Chi[i];
};

LunarDate.prototype.getMCan = function() {
    var i = (this.year * 12 + this.month + 3) % 10;
    return Can[i];
};

LunarDate.prototype.getMChi = function() {
    var i = (this.month + 1) % 12;
    return Chi[i];
};

LunarDate.create = function() {
    console.log("# LunarDate create", arguments);
    switch (arguments.length) {
        case 1:
        case 2:
            var date = arguments[0];
            var tz = arguments.length == 2 ? arguments[1] : 7;
            if (Object.prototype.toString.call(date) === '[object Date]' && date.getMonth()) {
                var lunarDate = Object.create(LunarDate.prototype);
                LunarDate.apply(lunarDate, _amlich.convertSolar2Lunar(date.getDate(), date.getMonth() + 1, date.getFullYear(), tz));
                return lunarDate;
            }
            return null;
        case 3:
        case 4:
            var params = [...arguments];
            if (params.length == 3) params.push(7);
            var lunarDate = Object.create(LunarDate.prototype);
            LunarDate.apply(lunarDate, _amlich.convertSolar2Lunar.apply(null, params));
            return lunarDate;
        default:
            return null;
    }
};

module.exports = LunarDate;
