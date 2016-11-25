/**
 * react native工具
 */
'use strict';
var LunarCalendar = require('lunar-calendar');
class RNLunarCalendar{
    static solarToLunar(year,month,day){
        return LunarCalendar.solarToLunar(year,month,day);
    }
}
module.exports = RNLunarCalendar;
