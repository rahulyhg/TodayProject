/**
 * 首页
 */
'use strict';
//
import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import {
    AppRegistry,
    StatusBar,
    AppState,
} from 'react-native';
//
var YrcnApp = require('./src/common/YrcnApp.js');
global.YrcnApp = YrcnApp;
//
YrcnApp.native.RNUtilsModule.getAppInfo([],function(arrayObj){
    var appInfo = YrcnApp.utils.parseJSON(arrayObj[0]);
    global.YrcnApp.appInfo = appInfo;
    console.log(appInfo)
    //alert(appInfo.DocumentsPath);
    YrcnApp.utils.setAppInfo(appInfo);
});
//所有的页面都在顶级导航之内
var NavigatorRoot = require('./src/view/NavigatorRoot.js');//顶级导航
//
var ReadingProject = React.createClass({
    mixins: [TimerMixin],
    componentDidMount: function() {
        //AppState.addEventListener('change', this._handleAppStateChange);
        this.setInterval(function(){
            //console.log("xxxxxxx");
        },1000)
    },
    render: function(){
        //设置状态栏
        StatusBar.setBarStyle('light-content',true);
        StatusBar.setHidden(false,'slide');
        return (
            <NavigatorRoot />
        );
    },
    _handleAppStateChange: function(currentAppState) {
        console.log(currentAppState);//inactive background active
        if(currentAppState == "inactive"){
            global.YrcnApp.now.rootNavigator.popToTop();
            global.YrcnApp.now.loginView.clearAll();
        }
    },
});
//启动项目
AppRegistry.registerComponent('ReadingProject', () => ReadingProject);
