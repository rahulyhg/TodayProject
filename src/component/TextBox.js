/**
 * 表单
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    NavigatorBar,
    Image,
    Text,
    TouchableOpacity,
    View,
    StatusBar,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
var TextBoxTitle = require('./TextBoxTitle.js');
var TextBoxText = require('./TextBoxText.js');
//
/**
 * 定义属性：
 */
var TextBox = React.createClass({
    _vars:{},
    getDefaultProps: function(){
        return ({

        });
    },
    getInitialState: function(){
        return ({

        });
    },
    //statics 对象允许你定义静态的方法，这些静态的方法可以在组件类上调用。
    statics: {
        Title: TextBoxTitle,
        Text: TextBoxText,
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
    },
    //
    render: function(){
        //console.log("render TextBox");
        //
        return (
            <View style={[styles.container]}>
                {this.props.children}
            </View>
        );
    }
});
//
module.exports = TextBox;
//
var styles = StyleSheet.create({
    container:{
        margin: 10,
        backgroundColor: '#ffffff',
    },

});