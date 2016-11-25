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
//
/**
 * 定义属性：
 */
var RegisterView = React.createClass({
    _vars:{
        param:{
            method: "POST",
            userName: "",
            pwd: "",
            vc: "",
            niCheng: "",
        },
    },
    getDefaultProps: function(){
        return ({
        });
    },
    getInitialState: function(){
        return ({
            uuid:Math.uuidFast(),
            isPressingRegister: false,
        });
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        _this._vars = {
            param:{
                method: "POST",
                userName: "",
                pwd: "",
                vc: "",
                niCheng: "",
            },
        };
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
        _this._vars = {
            param:{
                method: "POST",
                userName: "",
                pwd: "",
                vc: "",
                niCheng: "",
            },
        };
    },
    //
    render: function(){
        this.props.parent.showLeftButton();
        return (
            <View style={[styles.container]}>
                <View style={{alignItems: 'center',}}>
                    <Image source={require('image!MyLogo')} style={[{width:100,height:100,}]} resizeMode="cover"/>
                </View>
                <FormBox>
                    <FormBox.Input placeholder={"邮箱"} keyboardType={"email-address"} maxLength={50}
                                   parent={this} paramName={"userName"}/>
                    <FormBox.Password placeholder={"密码"} keyboardType={"default"}  maxLength={20}
                                      parent={this} paramName={"pwd"}/>
                    <FormBox.Input placeholder={"昵称"} keyboardType={"default"}  maxLength={10}
                                   parent={this} paramName={"niCheng"}/>
                    <FormBox.InputImage placeholder={"验证码"} keyboardType={"numeric"} borderBottomWidth={0}
                                        maxLength={4} uuid={this.state.uuid}
                                        imageUri={global.YrcnApp.services.getValidateCodeRegister()}
                                        parent={this} paramName={"vc"}/>
                </FormBox>
                <ButtonsBox>
                    <ButtonsBox.Button btnText={"注册"} onPress={this._onPressRegister} isPressing={this.state.isPressingRegister}/>
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
        if(!RNValidateUtils.email(param.userName)){
            RNUtils.alert("请输入正确格式的邮箱");
            return;
        }
        if(!RNValidateUtils.password(param.pwd)){
            RNUtils.alert("请输入正确格式的密码");
            return;
        }
        if(!RNValidateUtils.niCheng(param.niCheng)){
            RNUtils.alert("请输入正确格式的昵称");
            return;
        }
        if(!RNValidateUtils.vc(param.vc)){
            RNUtils.alert("请输入正确格式的验证码");
            return;
        }
        param.address = "";
        param.email = param.userName;
        param.requestFlag = "0";
        _this.setState({
            isPressingRegister: true,
        });
        RNAllService.register(param,function(registerObj){
            _this.setState({
                isPressingRegister: false,
            });
            RNUtils.alert("恭喜您注册成功，请登录...",function(){
                _this.props.parent_navigator.pop();
            })
        },function(msg){
            _this.setState({
                isPressingRegister: false,
                uuid:Math.uuidFast(),
            });
            RNUtils.alert(msg);
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