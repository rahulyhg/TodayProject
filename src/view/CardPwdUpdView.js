/**
 * 登录页面显示
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Timers,
    Image,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNValidateUtils = require('../common/RNValidateUtils.js');
var RNAllService = require('../common/RNAllService.js');
var globalStyles = RNUtils.getGlobalStyles();
var FormBox = require('../component/FormBox.js');
var ButtonsBox = require('../component/ButtonsBox.js');
var ACViewBox = require('../component/ACViewBox.js');
var TipBox = require('../component/TipBox.js');
//
/**
 * 定义属性：
 */
var RegisterView = React.createClass({
    _vars:{
        param:{
            siteName: "",
            accountName: "",
            pwd: "",
        },
    },
    getDefaultProps: function(){
        return ({
        });
    },
    getInitialState: function(){
        return ({
            isPressingRegister: false,
        });
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        var coreObj = global.YrcnApp.now.coreObj;
        this._vars.param = coreObj;
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
        var coreObj = global.YrcnApp.now.coreObj;
        this._vars.param = coreObj;
    },
    //
    render: function(){
        this.props.parent.showLeftButton();
        var coreObj = global.YrcnApp.now.coreObj;
        return (
            <View style={[styles.container]}>
                <TipBox>
                    <TipBox.Tip text={"1、为了安全起见，请输入您能明白的提示，而不是具体的账号和密码"}/>
                    <TipBox.Tip text={"2、提示语长度须在50个字内"}/>
                </TipBox>
                <FormBox>
                    <FormBox.Input placeholder={"卡属公司名称提示"} keyboardType={"default"} maxLength={50}
                                   parent={this} paramName={"siteName"} defaultValue={coreObj.siteName} height={30}/>
                    <FormBox.Input placeholder={"卡号提示"} keyboardType={"default"}  maxLength={50}
                                   parent={this} paramName={"accountName"} defaultValue={coreObj.accountName} height={30}/>
                    <FormBox.Input placeholder={"密码提示"} keyboardType={"default"}  maxLength={50}
                                   parent={this} paramName={"pwd"} defaultValue={coreObj.pwd} height={30}/>
                </FormBox>
                <ButtonsBox>
                    <ButtonsBox.Button btnText={"编辑"} onPress={this._onPressRegister} isPressing={this.state.isPressingRegister}/>
                </ButtonsBox>
            </View>
        );
    },
    changeParam: function(paramName,paramValue){
        this._vars.param[paramName] = paramValue;
    },
    _onPressRegister: function(){
        var _this = this;
        //console.log(this._vars.param);
        var param = this._vars.param;
        if(!param.siteName){
            RNUtils.alert("请输入卡属公司名称提示");
            return;
        }
        if(!param.accountName){
            RNUtils.alert("请输入卡号提示");
            return;
        }
        if(!param.pwd){
            RNUtils.alert("请输入密码提示");
            return;
        }
        _this.setState({
            isPressingRegister: true,
        });
        RNUtils.updJsonFromCardPwds(global.YrcnApp.now.pwdKey,param,function(){
            global.YrcnApp.now.rootNavigator.pop();
            global.YrcnApp.now.prevListView.refreshDs();
        });
    }
});
//
module.exports = RegisterView;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#fafafa',
        paddingTop: 70,
    },
});