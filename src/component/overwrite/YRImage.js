/**
 * 封装RN的Image 防止RN升级改动太大
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    Image,
    Platform,
} from 'react-native';
/**
 * 定义属性：
 */
var YRImage = React.createClass({
    render: function(){
        var resizeMode = this.props.resizeMode || "contain";
        var defaultSource = this.props.defaultSource || require('../../images/noFengmian.png');
        var source = this.props.source || require('../../images/noFengmian.png');
        var style = this.props.style || {width:60,};
        var type = this.props.type;
        if(this.props.source && (!this.props.source.uri || this.props.source.uri=='0')){
            source = require('../../images/noFengmian.png');
        }
        //
        return (
            <Image resizeMode={resizeMode} defaultSource={defaultSource} source={source} style={style}/>
        );
    }
});
//
module.exports = YRImage;