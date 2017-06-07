/**
 * 封装RN的Image 防止RN升级改动太大
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    Platform,
    StatusBar,
} from 'react-native';
/**
 * 定义属性：
 */
var YRStatusBar = {
    setBarStyle: function (style, animated,backgroundColor) {
        style = style||'dark-content';
        if(Platform.OS === 'ios'){
            StatusBar.setBarStyle(style, animated);
        }else{
            backgroundColor = backgroundColor || '#ffffff';
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor(backgroundColor,false);
            StatusBar.setBarStyle(style, true);
        }
    },
    setHidden: function(isHidden,type){
        StatusBar.setHidden(isHidden,type);
    }
};
//
module.exports = YRStatusBar;