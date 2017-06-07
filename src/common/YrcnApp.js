/**
 * 自定义APP全局变量YrcnApp
 */
'use strict';
//
import { NativeModules,Platform } from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var styles = require('../common/RNStyles.js');
var RNConfigs = require('../common/RNConfigs.js');
var RNLoginUser = require('../common/RNLoginUser.js');
var RNBASE64 = require('../common/RNBASE64.js');
//组件
var YRImage = require('../component/overwrite/YRImage.js');
var YRStatusBar = require('../component/overwrite/YRStatusBar.js');
var YRNavigatorTitleView = require('../component/overwrite/YRNavigatorTitleView');
var YRNavigatorLeftBtnView = require('../component/overwrite/YRNavigatorLeftBtnView');
var YRNavigatorRightBtnView = require('../component/overwrite/YRNavigatorRightBtnView');
var components = {
    Image: YRImage,
    StatusBar: YRStatusBar,
    NavigatorTitleView: YRNavigatorTitleView,
    NavigatorLeftBtnView: YRNavigatorLeftBtnView,
    NavigatorRightBtnView: YRNavigatorRightBtnView,
};
//
Platform.isIOS = Platform.OS == 'ios';
var YrcnApp = {
    native: NativeModules,
    Platform: Platform,
    utils: RNUtils,
    base64: RNBASE64,
    services: RNAllService,
    styles: styles,
    loginUser: RNLoginUser,
    components: components,
    configs: RNConfigs,
    now: {},
};
global.YrcnApp = YrcnApp;
//
YrcnApp.native.RNUtilsModule.getAppInfo([],function(arrayObj){
    var appInfo = YrcnApp.utils.parseJSON(arrayObj[0]);
    global.YrcnApp.appInfo = appInfo;
    YrcnApp.utils.log("YrcnApp.js",JSON.stringify(appInfo),"info");
    //alert(appInfo.DocumentsPath);
    YrcnApp.utils.setAppInfo(appInfo);
});
//module.exports = YrcnApp;
export default YrcnApp;

//
