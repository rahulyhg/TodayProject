/**
 * 智能提醒
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
    Timers,
    DatePickerIOS,
    Switch,
} from 'react-native';
import todayNofifications from "../common/config/today_notifications.json";
var ViewHeader = require('../component/ViewHeader.js');
//
var moment = require('moment/moment.js');
moment.locale('zh-cn');
var RNUtils = global.YrcnApp.utils;
//
/**
 * 定义属性：
 */
var ViewTime = React.createClass({
    mixins: [],
    _vars:{},
    getDefaultProps: function(){
        return ({
        });
    },
    getInitialState: function(){
        return ({
            date: new Date(),
            timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
            falseSwitchIsOn: false
        });
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var userLogin = global.YrcnApp.loginUser.userLogin;
        //console.log(userLogin)
        //alert(global.YrcnApp.appInfo.isOpenNotification+"===="+userLogin.appNotificationTime);
        if(global.YrcnApp.appInfo.isOpenNotification == "1" && userLogin.appNotificationTime){
            var hour = userLogin.appNotificationTime.split(":")[0];
            var minute = userLogin.appNotificationTime.split(":")[1];
            var date = moment();
            date.set('hour', hour);
            date.set('minute', minute);
            this.setState({
                date: date.toDate(),
                falseSwitchIsOn: true
            });
        }else{
            var date = moment();
            date.set('hour', 21);
            date.set('minute', 0);
            this.setState({
                date: date.toDate(),
            });
        }
        //YrcnApp.utils.setAppInfo(appInfo);
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
    },
    //
    render: function(){
        //console.log("render");
        //
        return (
            <View style={[styles.container]}>
                <ViewHeader title="智能提醒" onPressLeft={this._onPressLeft}/>
                <View style={[styles.controlView]}>
                    <View style={[styles.controlLeftView]}>
                        <Text style={[styles.controlText]}>开关控制</Text>
                    </View>
                    <View style={[styles.controlRightView]}>
                        <Switch
                            onValueChange={this._onValueChange}
                            style={[styles.controlSwitch]}
                            value={this.state.falseSwitchIsOn} />
                    </View>
                </View>
                <DatePickerIOS
                    date={this.state.date}
                    mode="time"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={this._onDateChange}
                    minuteInterval={1}
                    style={[styles.DatePickerIOS]}
                    />
                {
                    global.YrcnApp.appInfo.isOpenNotification == "0"?(
                        <View style={[styles.tipsView]}>
                            <Text style={[styles.tipsText]}>如需开启，请在iPhone的【设置】-【通知】中，找到【{YrcnApp.configs.AppName}】打开提醒样式。</Text>
                        </View>
                    ):(null)
                }
            </View>
        );
    },
    _onDateChange: function(date){
        this.setState({
            date: date,
            timeZoneOffsetInHours: (-1) * (date).getTimezoneOffset() / 60,
        });
    },
    _onValueChange: function(value){
        //console.log(value);
        var time = moment(this.state.date).format("HH:mm");
        console.log(time);
        if(value){//开启智能提醒
            if(global.YrcnApp.appInfo.isOpenNotification == "0"){
                //
                YrcnApp.native.RNUtilsModule.getAppInfo([],function(arrayObj){
                    var appInfo = YrcnApp.utils.parseJSON(arrayObj[0]);
                    global.YrcnApp.appInfo = appInfo;
                    YrcnApp.utils.setAppInfo(appInfo);
                    //
                    if(global.YrcnApp.appInfo.isOpenNotification == "0"){
                        YrcnApp.utils.confirm("请允许"+YrcnApp.configs.AppName+"向您发送【通知】",function(){
                            global.YrcnApp.native.RNUtilsModule.gotoAppSystemSetting([]);
                        });
                        return;
                    }else{
                        innerFunc();
                        this.setState({falseSwitchIsOn: value});
                    }
                });
                return;
            }else{
                innerFunc();
                this.setState({falseSwitchIsOn: value});
            }
        }else{//取消智能提醒
            var userLogin = global.YrcnApp.loginUser.userLogin;
            userLogin.appNotificationTime = "";
            YrcnApp.utils.pushLoginInfo(global.YrcnApp.loginUser);
            global.YrcnApp.native.RNUtilsModule.appNotification(["0",time,""]);
            //
            this.setState({falseSwitchIsOn: value});
        }
        function innerFunc(){
            var userLogin = global.YrcnApp.loginUser.userLogin;
            userLogin.appNotificationTime = time;
            YrcnApp.utils.pushLoginInfo(global.YrcnApp.loginUser);
            global.YrcnApp.native.RNUtilsModule.appNotification(["1",time,todayNofifications["Time"+time.split(":")[0]].content]);
        }
    },
    _onPressLeft: function(){
        YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex',selectedTab:'myLife'});
    }
});
//
module.exports = ViewTime;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#ffffff',
    },
    controlView:{
        width:Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    controlLeftView:{
        flex:4,
    },
    controlRightView:{
        flex:1,
    },
    controlText:{
        fontSize: 16,
    },
    Switch:{
        alignSelf: 'flex-end',
    },
    DatePickerIOS:{
    },
    tipsView:{
        width:Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 20,
    },
    tipsText:{
        color: '#444444',
        lineHeight: 20,
        fontSize: 13,
    }
});