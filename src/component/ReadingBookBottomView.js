/**
 * 读书多个段落显示
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';
//
var moment = require('moment/moment.js');
//
import TimerMixin from 'react-timer-mixin';
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
/**
 * 定义属性：
 * fontSize 文字大小 12-30
 * lineHeight 行间距 -1紧凑 0正常 1松散
 * marginTop 与上一个段落的间距
 * color 文字颜色
 * text 这个页面大概要展示多少文字
 * height 展示高度
 */
var ReadingBookBottomView = React.createClass({
    mixins: [TimerMixin],
    _vars:{},
    getInitialState:function(){
        //
        return ({
            nowTime: RNUtils.nowTimeHHmm(),
        });
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        _this._vars.nowTimeInterval = this.setInterval(function(){
            _this.setState({
                nowTime: RNUtils.nowTimeHHmm(),
            });
        },1000)
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
        this.clearInterval(_this._vars.nowTimeInterval);
    },
    //
    render: function(){
        //
        return (
            <View style={styles.bottomView}>
                <Text style={styles.text_bottomLeft}>已阅{this.props.hadReading}</Text>
                <Text style={styles.text_bottomRight}>{this.state.nowTime}</Text>
            </View>
        );
    },
});
//
module.exports = ReadingBookBottomView;
//
var styles = StyleSheet.create({
    bottomView:{
        height:35,
        overflow:'hidden',
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    text_bottomLeft:{
        fontSize: 13,
        flex: 1,
        textAlign: 'left',
        color: '#cccccc',
    },
    text_bottomRight:{
        fontSize: 13,
        flex: 3,
        textAlign: 'right',
        color: '#cccccc',
    },
});