/**
 * 读书页面显示
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Timers,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
var ReadingBookParagraphsView = require('../component/ReadingBookParagraphsView.js');
var ReadingBookBottomView = require('../component/ReadingBookBottomView.js');
//
/**
 * 定义属性：
 * backgroundColor 背景颜色
 */
var ReadingBookPageView = React.createClass({
    mixins: [],
    _vars:{},
    getDefaultProps: function(){
        return ({
            sectionTitle: "",
        });
    },
    getInitialState: function(){
        // 获取电池对象!
        var battery = window.navigator.battery || window.navigator.webkitBattery || window.navigator.mozBattery;

        // 显示一些有用属性值
        //console.warn("电池充电状态: ", battery.charging); // true
        //console.warn("电量水平: ", battery.level); // 0.58
        //console.warn("电池使用时间: ", battery.dischargingTime);
        //
        //// 设置一些事件监听器
        //battery.addEventListener("chargingchange", function(e) {
        //    console.warn("电池充电状态变化: ", battery.charging);
        //}, false);
        //battery.addEventListener("chargingtimechange", function(e) {
        //    console.warn("电池充电时间变化: ", battery.chargingTime);
        //}, false);
        //battery.addEventListener("dischargingtimechange", function(e) {
        //    console.warn("电池使用时间变化: ", battery.dischargingTime);
        //}, false);
        //battery.addEventListener("levelchange", function(e) {
        //    console.warn("电量水平变化: ", battery.level);
        //}, false);
        return ({
            battery:battery||"0%",
        });
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
        this.props.textArray = this.props.textArray || [];
        //console.log(this.props.textArray.length)
        var hadReading = this.props.hadReading || '0.00%';
        //
        var backgroundColor = this.props.backgroundColor || '#efefef';
        //
        var textArray = this.props.textArray || [];
        return (
            <View style={[styles.container,{
                backgroundColor: backgroundColor}]}>
                <View style={styles.topView}>
                    <Text style={styles.text}>{this.props.sectionTitle}</Text>
                </View>
                <ReadingBookParagraphsView textArray={textArray} fontSize={this.props.fontSize}/>
                <ReadingBookBottomView hadReading={hadReading}/>
            </View>
        );
    }
});
//
module.exports = ReadingBookPageView;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        left: 0,
        top: 0,
        paddingLeft: 0,
        paddingRight: 0,
        overflow:'hidden',
    },
    topView:{
        height:35,
        overflow:'hidden',
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        marginLeft: 15,
        marginRight: 15,
    },
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
    text:{
        fontSize: 13,
        lineHeight: 25,
        color: '#cccccc',
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