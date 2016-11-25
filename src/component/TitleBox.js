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
    TextInput,
    Dimensions,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
//
/**
 * 定义属性：
 */
var TitleBox = React.createClass({
    _vars:{},
    getDefaultProps: function(){
        return ({
            leftBtnText: "返回",
            rigthBtnText: "",
            backgroundColor: '#ffffff',
            color: '#ffffff',
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
        //console.log("render TitleBox");
        //
        return (
            <View style={[styles.container,{backgroundColor: this.props.backgroundColor}]}>
                <TouchableOpacity style={styles.leftView} onPress={this.props.onPressLeft}>
                    <Text style={[styles.leftText,{color: this.props.color}]}>{this.props.leftBtnText}</Text>
                </TouchableOpacity>
                <View style={styles.centerView}>
                    <Text style={[styles.centerText,{color: this.props.color}]}>{this.props.title}</Text>
                </View>
                <TouchableOpacity style={styles.rightView} onPress={this.props.onPressRight}>
                    <Text style={[styles.rightText,{color: this.props.color}]}>{this.props.rigthBtnText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
});
//
module.exports = TitleBox;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height: 50,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#ffffff',
    },
    leftView:{
        width: 50,
    },
    leftText:{
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        color: '#ffffff',
    },
    centerView:{
        flex: 1,
    },
    centerText:{
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        color: '#ffffff',
    },
    rightView:{
        width: 50,
    },
    rightText:{
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        color: '#ffffff',
    },
});