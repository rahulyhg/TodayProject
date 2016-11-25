
'use strict';
import { NativeModules,Platform } from 'react-native';
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var styles = require('../common/RNStyles.js');
var RNConfigs = require('../common/RNConfigs.js');
var RNLoginUser = require('../common/RNLoginUser.js');
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
var YrcnApp = {
    native: NativeModules,
    Platform: Platform,
    utils: RNUtils,
    services: RNAllService,
    styles: styles,
    loginUser: RNLoginUser,
    components: components,
    configs: RNConfigs,
    now: {},
};

module.exports = YrcnApp;
