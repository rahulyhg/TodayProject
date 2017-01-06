/**
 * 首页
 */
'use strict';
//
import React from 'react';
import {AppRegistry} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
//
import YrcnApp from './src/common/YrcnApp.js';
import {NavigatorRoot} from './src/navigator';
//
var YrcnAppProject = React.createClass({
    componentDidMount: function() {
        SplashScreen.hide();//关闭启动屏幕
    },
    render: function(){
        return (
            <NavigatorRoot />
        );
    }
});
//启动项目
AppRegistry.registerComponent('YrcnAppProject', () => YrcnAppProject);
