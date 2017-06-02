/**
 * 引导页首页
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
    TouchableHighlight,
    View,
    StatusBar,
    TextInput,
    Dimensions,
    Timers,
    ActionSheetIOS,
    ListView,
    ScrollView,
} from 'react-native';
//
var RNUtils = require('../../common/RNUtils.js');
var RNValidateUtils = require('../../common/RNValidateUtils.js');
var RNAllService = require('../../common/RNAllService.js');
var ButtonsBox = require('../../component/ButtonsBox.js');
var ACViewBox = require('../../component/ACViewBox.js')
var FormBox = require('../../component/FormBox.js')
var BottomCancelBtn = require('../../component/BottomCancelBtn.js')
//
/**
 * 定义属性：
 */
var LoginEmailView = React.createClass({
    _vars:{
        param:{
            method: "POST",
            userName: "",
            pwd: "",
        },
    },
    getDefaultProps: function(){
        return ({

        });
    },
    getInitialState: function(){
        return ({
            isPressingLogin: false,
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
            },
        };
    },
    //
    render: function(){
        var _this = this;
        global.YrcnApp.components.StatusBar.setHidden(false,'slide');
        global.YrcnApp.components.StatusBar.setBarStyle('light-content',false);
        //this.props.parent.showLeftButton();
        //
        return (
            <View style={[styles.container]}>
                <View style={[styles.topView]}>
                    <View style={[styles.topViewColumn]}>
                        <Text style={[styles.topViewColumnText]}>登录</Text>
                    </View>
                    <View style={[styles.topViewColumn]}>
                        <Text style={[styles.topViewColumnText]}>请输入您的Today账号</Text>
                    </View>
                </View>
                <View style={[styles.centerView]}>
                    <FormBox>
                        <FormBox.Input placeholder={"邮箱"} keyboardType={"email-address"} maxLength={50}
                                       parent={this} paramName={"userName"}/>
                        <FormBox.Password placeholder={"密码"} keyboardType={"default"}  maxLength={20}
                                          parent={this} paramName={"pwd"}/>
                    </FormBox>
                    <ButtonsBox marginBottom={0}>
                        <ButtonsBox.Button btnText={"登录"} onPress={this._onPressLogin} isPressing={this.state.isPressingLogin}/>
                    </ButtonsBox>
                </View>
                <View style={[styles.bottomView]}>
                </View>
                <BottomCancelBtn />
            </View>
        );
    },
    changeParam: function(paramName,paramValue){
        this._vars.param[paramName] = paramValue;
    },
    _onPressLogin: function () {
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
        param.address = "";
        param.email = param.userName;
        param.requestFlag = "0";
        _this.setState({
            isPressingLogin: true,
        });
        RNAllService.login(param,function(registerObj){
            RNUtils.pushLoginInfo(registerObj,function(){
                YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex'});
            })
        },function(msg){
            _this.setState({
                isPressingLogin: false,
            });
            RNUtils.alert(msg);
        });
    },
});
//
module.exports = LoginEmailView;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#01bbfc',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems:'center',
    },
    topView:{
        width:Dimensions.get('window').width,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems:'center',
        paddingTop: 50,
    },
    topViewColumn:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems:'flex-end',
    },
    topViewColumnText:{
        fontSize: 15,
        fontWeight: '400',
        textAlign: 'center',
        color: '#ffffff',
    },
    centerView:{
        width:Dimensions.get('window').width,
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
    bottomView:{
        width:Dimensions.get('window').width,
        flex: 1,
    },
    bottomViewColumn:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    bottomViewColumnText:{
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'center',
        color: '#ffffff',
        width:Dimensions.get('window').width,
        paddingLeft: 20,
        paddingRight: 20,
    },
});