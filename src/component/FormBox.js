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
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    Keyboard,
} from 'react-native';
//var KeyboardEvents = require('react-native-keyboardevents');
//var KeyboardEventEmitter = KeyboardEvents.Emitter;
//
var FormBoxInput = require('./FormBoxInput');
var FormBoxInputArea = require('./FormBoxInputArea');
var FormBoxPassword = require('./FormBoxPassword');
var FormBoxInputImage = require('./FormBoxInputImage');
var FormBoxSwitch = require('./FormBoxSwitch.js');
var FormBoxRadio = require('./FormBoxRadio.js');
//
/**
 * 定义属性：
 */
var FormBox = React.createClass({
    _vars:{
        y: 0,
        bottom: 0,
        viewHeaderHeight: 60
    },
    getDefaultProps: function(){
        return ({
            paddingLeft: 0,
            paddingRight: 0,
            heightStyle: {},
        });
    },
    getInitialState: function(){
        return ({
            keyboardSpace: 0,
            visibleHeight: Dimensions.get('window').height-this._vars.viewHeaderHeight,
        });
    },
    //statics 对象允许你定义静态的方法，这些静态的方法可以在组件类上调用。
    statics: {
        Input: FormBoxInput,
        InputArea: FormBoxInputArea,
        InputImage: FormBoxInputImage,
        Password: FormBoxPassword,
        Switch: FormBoxSwitch,
        Radio: FormBoxRadio,
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        if(YrcnApp.Platform.isIOS && this.props.handleKeyboard == '2'){
            //KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
            //KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
        }
    },
    componentWillMount: function() {
        if(this.props.handleKeyboard == '1'){
            Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
            Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        }
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
        if(this.props.handleKeyboard == '2'){
            //KeyboardEventEmitter.off(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
            //KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
        }
        if(this.props.handleKeyboard == '1'){
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        }
    },
    //
    render: function(){
        //console.log("render FormBox");
        //
        if(this.props.handleKeyboard == '1'){
            YrcnApp.utils.logObj("YrcnApp.utils.appVersonGe 2.1.0",YrcnApp.utils.appVersonGe("2.1.0"));
            if(YrcnApp.utils.appVersonGe("2.1.0")){
                return (
                    <View behavior="height" keyboardVerticalOffset={0}
                          style={[styles.contentContainerStyle,{height: this.state.visibleHeight}]}
                        >
                        <ScrollView style={[styles.container,this.props.heightStyle,{paddingLeft: this.props.paddingLeft,paddingRight: this.props.paddingRight}]}>
                            {this.props.children}
                        </ScrollView>
                    </View>
                );
            }else{
                return (
                    <View behavior="height" keyboardVerticalOffset={0}
                          style={[styles.contentContainerStyle,{height: Dimensions.get('window').height-276}]}
                        >
                        <ScrollView style={[styles.container,this.props.heightStyle,{paddingLeft: this.props.paddingLeft,paddingRight: this.props.paddingRight}]}>
                            {this.props.children}
                        </ScrollView>
                    </View>
                );
            }
        }else{
            return (
                <ScrollView style={[styles.container,this.props.heightStyle,{paddingLeft: this.props.paddingLeft,paddingRight: this.props.paddingRight}]}>
                    {this.props.children}
                </ScrollView>
            );
        }
        //return (
        //    <ScrollView style={[styles.container,{paddingLeft: this.props.paddingLeft,paddingRight: this.props.paddingRight}]}>
        //        {this.props.children}
        //    </ScrollView>
        //);
        //return (
        //    <ScrollView style={[styles.container,{paddingLeft: this.props.paddingLeft,paddingRight: this.props.paddingRight}]}
        //                scrollEventThrottle={1}
        //                onScroll={this._onScroll}
        //                ref='scrollViewFormBox'
        //                keyboardDismissMode='interactive'
        //                contentInset={{bottom: this.state.keyboardSpace}}
        //                showsVerticalScrollIndicator={true}>
        //        {this.props.children}
        //    </ScrollView>
        //);
    },
    updateKeyboardSpace: function (frames) {
        //YrcnApp.utils.logObj("FormBox.js updateKeyboardSpace",frames)
        //if(frames&&frames.end){
        //    //YrcnApp.utils.logObj("FormBox.js updateKeyboardSpace",this.refs.scrollViewFormBox)
        //    //YrcnApp.utils.logObj("FormBox.js updateKeyboardSpace this._vars.bottom",this._vars.bottom)
        //    if(this._vars.bottom == 0){
        //        //YrcnApp.utils.logObj("FormBox.js updateKeyboardSpace this._vars.y",this._vars.y)
        //        this.refs.scrollViewFormBox.scrollTo({x:0, y:this._vars.y, animated:true});
        //        this.setState({keyboardSpace: frames.end.height});
        //    }
        //}
    },
    resetKeyboardSpace: function () {
        //this.setState({keyboardSpace: 0});
    },
    _keyboardDidShow:function(frames) {
        YrcnApp.utils.logObj("FormBox.js _keyboardDidShow",frames)
        if(frames&&frames.end){
            this.setState({visibleHeight: Dimensions.get('window').height -this._vars.viewHeaderHeight - frames.end.height})
        }else if(frames&&frames.endCoordinates){
            this.setState({visibleHeight: Dimensions.get('window').height -this._vars.viewHeaderHeight - frames.endCoordinates.height})
        }
    },
    _keyboardDidHide:function(e) {
        YrcnApp.utils.logObj("FormBox.js _keyboardDidHide",e)
        this.setState({visibleHeight: Dimensions.get('window').height-this._vars.viewHeaderHeight})
    },
    _onScroll: function(e){
        //YrcnApp.utils.logObj("FormBox.js _onScroll",e.nativeEvent)
        //this._vars.y = e.nativeEvent.contentOffset.y;
        //this._vars.bottom = e.nativeEvent.contentInset.bottom;
    },
    _relativeKeyboardHeight:function(keyboardFrame){
        YrcnApp.utils.logObj("FormBox.js _relativeKeyboardHeight",keyboardFrame)
    },
    _onKeyboardChange:function(e){
        YrcnApp.utils.logObj("FormBox.js _onKeyboardChange",e.nativeEvent)
    },
    _onLayout:function(e){
        YrcnApp.utils.logObj("FormBox.js _onLayout",e.nativeEvent)
    }
});
//
module.exports = FormBox;
//
var styles = StyleSheet.create({
    container:{
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        borderWidth: 0,
        borderColor: '#cccccc',
    },
    contentContainerStyle:{
        //position: 'absolute',
        //top: 0,
        //left: 0,
        //width:Dimensions.get('window').width,
        //height:Dimensions.get('window').height-216,
        borderBottomWidth: 3,
        borderBottomColor: '#eeeeee',
    }
});