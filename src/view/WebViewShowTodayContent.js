/**
 * 她的生活搜索结果页面
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    WebView,
} from 'react-native';
//
//
/**
 */
var WebViewShowTodayContent = React.createClass({
    _vars:{
    },
    getInitialState: function() {
        var _this = this;
        //
        return {
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
    },
    render: function(){
        var _this = this;
        return (
            <WebView
                source={{uri: 'http://www.baidu.com'}}
                style={styles.webViewContainer}>
            </WebView>
        );
    },
});
//
var styles = StyleSheet.create({
    webViewContainer:{
        backgroundColor: '#ffffff',
        marginTop: 50
    },
});
//
module.exports = WebViewShowTodayContent;