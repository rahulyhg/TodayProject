/**
 * 她的生活搜索结果页面
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TextInput,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
//
/**
 */
var WebViewEditTodayContent = React.createClass({
    _vars:{
    },
    getDefaultProps: function(){
        return ({
            placeholder:"请输入...",
            multiline: true,
            maxLength: 50000,
            placeholderTextColor: '#fefefe',
            keyboardType: 'default',
            defaultValue: '',
        });
    },
    getInitialState: function() {
        var _this = this;
        //
        return {
            textInputHeight: Dimensions.get('window').height-50,
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
    },
    render: function(){
        var _this = this;
        this.props.parent.showRightButton();
        //console.log(this.props.type);
        //console.log(this.props.coreObj);
        var coreObj = this.props.coreObj||{};
        var val = coreObj.content||"";
        return (
            <View style={styles.webViewContainer}>
                <TextInput
                    style={[styles.textInput,{height:_this.state.textInputHeight}]}
                    onChangeText={this._onChangeText}
                    onFocus={this._onFocusText}
                    onBlur={this._onBlurText}
                    autoCorrect={false}
                    autoFocus={true}
                    maxLength={this.props.maxLength}
                    keyboardType={this.props.keyboardType}
                    placeholder={this.props.placeholder}
                    defaultValue={val}
                    multiline={this.props.multiline}
                    placeholderTextColor={this.props.placeholderTextColor}
                    />
            </View>
        );
    },
    _onChangeText: function(text){
        var _this = this;
        this._vars.text = text.trim();
        var contentOneObj = {
            typeCode: this.props.type.typeCode,
            day: RNUtils.nowDate(),
            content: this._vars.text,
        };
        RNUtils.getJsonTodayContent(RNUtils.nowDate(),function(contentObj){
            contentObj[_this.props.type.typeCode] = contentOneObj;
            RNUtils.sycnJsonTodayContent(RNUtils.nowDate(),contentObj,function(){
                if(global.YrcnApp.now.scrollViewLlg){
                    global.YrcnApp.now.scrollViewLlg.refreshView();
                }
            });
        })
    },
    _onFocusText: function(text){
        var _this = this;
        this.setState({
            textInputHeight: Dimensions.get('window').height/2
        });
    },
    _onBlurText: function(text){
        var _this = this;
        this.setState({
            textInputHeight: Dimensions.get('window').height-50
        });
    },
});
//
var styles = StyleSheet.create({
    webViewContainer:{
        backgroundColor: '#ffffff',
        marginTop: 50
    },
    textInput:{
        width: Dimensions.get('window').width,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 16,
        color: '#444444',
    }
});
//
module.exports = WebViewEditTodayContent;