/**
 * 表单
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TextInput,
    Dimensions,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
//var globalStyles = RNUtils.getGlobalStyles();
//
/**
 * 定义属性：
 */
var FormBoxInput = React.createClass({
    _vars:{},
    getDefaultProps: function(){
        return ({
            placeholder:"",
            borderBottomWidth: 0.5,
            multiline: false,
            height: 20,
            maxLength: 50,
            placeholderTextColor: '#fefefe',
            keyboardType: 'default',
            defaultValue: '',
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
        //console.log("render FormBoxInput");
        //
        return (
            <View style={[styles.container,{borderBottomWidth:this.props.borderBottomWidth}]}>
                <TextInput
                    style={[styles.textInput,{height: this.props.height,borderBottomWidth:1,}]}
                    onChangeText={this._onChangeText}
                    autoCorrect={false}
                    autoFocus={false}
                    maxLength={this.props.maxLength}
                    keyboardType={this.props.keyboardType}
                    placeholder={this.props.placeholder}
                    defaultValue={this.props.defaultValue}
                    multiline={this.props.multiline}
                    placeholderTextColor={this.props.placeholderTextColor}
                    />
            </View>
        );
    },
    _onChangeText: function(text){
        this._vars.text = text.trim();
        this.props.parent.changeParam(this.props.paramName,text);
    }
});
//
module.exports = FormBoxInput;
//
var styles = StyleSheet.create({
    container:{
        borderBottomWidth: 0,
        borderBottomColor: '#efefef',
        marginLeft: 0,
        marginBottom: 10,
        paddingTop: 10,
    },
    textInput:{
        width: Dimensions.get('window').width-50,
        color:'#ffffff',
    }
});