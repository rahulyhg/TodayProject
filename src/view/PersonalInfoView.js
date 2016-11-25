/**
 * 个人信息页面显示
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
var RNAllService = require('../common/RNAllService.js');
var globalStyles = RNUtils.getGlobalStyles();
var ACViewBox = require('../component/ACViewBox.js')
var InfosBox = require('../component/InfosBox.js');
var ButtonsBox = require('../component/ButtonsBox.js');
//
/**
 * 定义属性：
 */
var PersonalInfoView = React.createClass({
    _vars:{
    },
    getDefaultProps: function(){
        return ({

        });
    },
    getInitialState: function(){
        return ({
            userInfo:{},
            userLogin:{},
        });
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNUtils.getLoginInfo(function(obj){
            _this.setState({
                userInfo:obj.userInfo,
                userLogin:obj.userLogin,
            });
        })
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
    },
    //
    render: function(){
        this.props.parent.showLeftButton();
        //
        return (
            <View style={[styles.container]}>
                <InfosBox>
                    <InfosBox.Item label={"账号"} value={this.state.userLogin.userName}/>
                    <InfosBox.Item label={"昵称"} value={this.state.userInfo.niCheng} borderBottomWidth={0}/>
                </InfosBox>
                <ButtonsBox>
                    <ButtonsBox.Button btnText={"退出登录"} onPress={this._onPressRegister} isPressing={this.state.isPressingRegister}/>
                </ButtonsBox>
            </View>
        );
    },
    _onPressRegister: function(){
        var _this = this;
        RNUtils.removeLoginInfo(function(){
            RNAllService.logout({},function(){
                global.YrcnApp.loginUser = null;
                global.YrcnApp.now.myLifeNavigator.showRightButton();
                global.YrcnApp.now.rootNavigator.pop();
            });
        })
    },
});
//
module.exports = PersonalInfoView;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#fafafa',
        paddingTop: 70,
    },
});