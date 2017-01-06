/**
 * 特别声明页面显示
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
    Image,
} from 'react-native';
//
var TextBox = require('../component/TextBox.js');
//
/**
 * 定义属性：
 */
var UseHelpView = React.createClass({
    mixins: [],
    _vars:{},
    getDefaultProps: function(){
        return ({
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
        //console.log("render");
        this.props.parent.showLeftButton();
        //
        return (
            <View style={[styles.container]}>
                <TextBox>
                    <TextBox.Title text={"如何注销当前登录用户"}/>
                    <TextBox.Text text={"设置页面右上侧按钮“注销”"}/>
                </TextBox>
            </View>
        );
    }
});
//
module.exports = UseHelpView;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#f7f7f2',
        paddingTop: 50,
    },
});