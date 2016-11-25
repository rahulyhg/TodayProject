/**
 * react native工具
 */
'use strict';

class RNValidateUtils{
    static email(str){
        var reyx= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        return(reyx.test(str));
    }
    static password(str){
        if(str.length < 6 || str.length > 20){
            return false;
        }
        return true;
    }
    static niCheng(str){
        if(str.length < 2 || str.length > 10){
            return false;
        }
        return true;
    }
    static vc(str){
        if(str.length != 4){
            return false;
        }
        return true;
    }
}
module.exports = RNValidateUtils;
