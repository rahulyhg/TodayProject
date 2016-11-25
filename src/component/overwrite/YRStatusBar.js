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
    setBarStyle: function (style, animated) {
        if(Platform.OS === 'ios'){
            StatusBar.setBarStyle(style, animated);
        }else{
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor("#4ab854",true);
        }
    },
    setHidden: function(isHidden,type){
        StatusBar.setHidden(isHidden,type);
    }
};
//
module.exports = YRStatusBar;