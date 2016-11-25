
//
var RNUtils = require('../common/RNUtils.js');
var RNLoginUser = {};
RNUtils.getLoginInfo(function(loginInfoObj){
    global.YrcnApp.loginUser = loginInfoObj;
})
//
module.exports = RNLoginUser;
