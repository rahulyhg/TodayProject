/**
 * 首页
 */
'use strict';
//
import React, { Component } from 'react';
import {
    AppRegistry,
    StatusBar,
} from 'react-native';
//
var YrcnApp = require('./src/common/YrcnApp.js');
global.YrcnApp = YrcnApp;
//
YrcnApp.native.RNUtilsModule.getAppInfo([],function(arrayObj){
    var appInfo = YrcnApp.utils.parseJSON(arrayObj[0]);
    global.YrcnApp.appInfo = appInfo;
    //console.log(appInfo)
    YrcnApp.utils.setAppInfo(appInfo);
});
//所有的页面都在顶级导航之内
var NavigatorRoot = require('./src/view/NavigatorRoot.js');//顶级导航
//
var ReadingProject = React.createClass({
    render: function(){
        //设置状态栏
        YrcnApp.components.StatusBar.setBarStyle('light-content',true);
        StatusBar.setHidden(false,'slide');
        return (
            <NavigatorRoot />
        );
    }
});
//启动项目
AppRegistry.registerComponent('ReadingProject', () => ReadingProject);
