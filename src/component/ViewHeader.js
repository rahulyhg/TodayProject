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
    Dimensions,
    Button,
} from 'react-native';
//
var ButtonsBoxButton = require('./ButtonsBoxButton.js');
//
/**
 * 定义属性：
 */
var ViewHeader = React.createClass({
    _vars:{},
    getDefaultProps: function(){
        return ({
            leftText: '返回',
            onPressLeft: function(){},
            onPressRight: function(){},
        });
    },
    getInitialState: function(){
        return ({
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
        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.header_left} onPress={this._onPressComplete}>
                    <Text style={[styles.header_left_text,{color:'#01bbfc'}]} numberOfLines={1} onPress={this._onPressComplete}>{this.props.leftText}</Text>
                </TouchableOpacity>
                <View style={styles.header_center}><Text style={styles.header_center_text} numberOfLines={1}>{this.props.title}</Text></View>
                <TouchableOpacity onPress={this._onPressRight} style={styles.header_right}>
                    <Text style={[styles.header_right_text,{color:'#01bbfc'}]} numberOfLines={1}>{this.props.rightText}</Text>
                </TouchableOpacity>
            </View>
        );
    },
    _onPressComplete: function () {
        this.props.onPressLeft();
    },
    _onPressRight: function () {
        this.props.onPressRight();
    }
});
//
module.exports = ViewHeader;
//
var styles = StyleSheet.create({
    header:{
        width: Dimensions.get('window').width,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee'
    },
    header_left:{
        flex: 1,
        borderWidth: 0,
        paddingTop:30,
        paddingBottom: 10,
    },
    header_left_text:{
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '700',
        paddingLeft: 10
    },
    header_center:{
        flex: 4,
        paddingTop:30,
        paddingBottom: 10,
    },
    header_center_text:{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
    },
    header_right:{
        flex: 1,
        paddingTop:30,
        paddingBottom: 10,
    },
    header_right_text:{
        textAlign: 'right',
        fontSize: 16,
        fontWeight: '700',
        paddingRight: 10,
    },
});