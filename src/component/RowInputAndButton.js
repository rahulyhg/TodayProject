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
    TouchableOpacity,
} from 'react-native';
//
//
/**
 * 定义属性：
 */
var RowInputAndButton = React.createClass({
    _vars:{},
    getDefaultProps: function(){
        return ({
            placeholder:"",
            borderBottomWidth: 1,
            multiline: false,
            height: 20,
            maxLength: 50,
            placeholderTextColor: '#bcbcbc',
            keyboardType: 'default',
            defaultValue: '',
        });
    },
    getInitialState: function(){
        return ({
        });
    },
    //statics 对象允许你定义静态的方法，这些静态的方法可以在组件类上调用。
    statics: {
        
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
        var _this = this;
        //
        return (
            <View style={[styles.container,]}>
                <View style={[styles.inputView,{borderBottomWidth:this.props.borderBottomWidth}]}>
                    <TextInput
                        style={[styles.textInput,{height: this.props.height,borderWidth:0,}]}
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
                <TouchableOpacity style={[styles.btnView,]} onPress={_this._onPressBtn}>
                    <Text style={[styles.btnText,]}>确定</Text>
                </TouchableOpacity>
            </View>
        );
    },
    _onChangeText: function(text){
        this._vars.text = text.trim();
    },
    _onPressBtn: function(){
        this.props.onPressBtn(this._vars.text);
    }
});
//
module.exports = RowInputAndButton;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#efefef',
    },
    inputView:{
        flex: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        marginRight: 15,
    },
    textInput:{
        fontSize: 14,
    },
    btnView:{
        flex: 1,
    },
    btnText:{
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 15,
    },
});