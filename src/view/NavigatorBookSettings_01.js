/**
 * 设置01
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
    ActionSheetIOS,
    ListView,
    ScrollView,
    TouchableHighlight,
    Modal,
    Navigator,
} from 'react-native';
//
var ListViewBookRoom = require('./ListViewBookRoom.js');
var AboutView = require('./AboutView.js');//关于
var LoginView = require('./LoginView.js');//登录
var RegisterView = require('./RegisterView.js');//注册
var ForgetPwdView = require('./ForgetPwdView.js');//忘记密码
var SpecialStatementView = require('./SpecialStatementView.js');//特别声明
var UseHelpView = require('./UseHelpView.js');//使用帮助
var ReadingStatisticsView = require('./ReadingStatisticsView.js');//阅读统计
var PersonalInfoView = require('./PersonalInfoView.js');//忘记密码
var ScrollViewSettingTodayType = require('./ScrollViewSettingTodayType.js');//事件显示
var ScrollViewAddTodayType = require('./ScrollViewAddTodayType.js');//事件新增
var ScrollViewUpdTodayType = require('./ScrollViewUpdTodayType.js');//事件编辑
var ViewTime = require('./ViewTime.js');//事件编辑
//
var navigationBarRouteMapper = {
    titleStr: "书房",
    Title: function(){
        return (
            <global.YrcnApp.components.NavigatorTitleView title={this.titleStr}/>
        );
    },
    LeftButton: function(){
        return (
            <global.YrcnApp.components.NavigatorLeftBtnView text={"<"}/>
        );
    },
    RightButton: function(){
        return (
            <global.YrcnApp.components.NavigatorRightBtnView />
        );
    },
    _onPressLeftButton: function(){
        //console.log("_onPressLeftButton");
        navigationBarRouteMapper.navigator.pop();
    },
}
//
var NavigatorBookSettings_01 = React.createClass({
    showLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return (
                <global.YrcnApp.components.NavigatorLeftBtnView onPress={this._onPressLeftButton} text={"<"}/>
            );
        }
    },
    hideLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return (
                <global.YrcnApp.components.NavigatorLeftBtnView text={""}/>
            );
        }
    },
    render: function(){
        //console.log("NavigatorBookRoom_01 render");
        //
        return (
            <Navigator
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={navigationBarRouteMapper}
                        style={global.YrcnApp.styles.common.navBar}/>
                }
                initialRoute={{name: global.YrcnApp.now.rootRoute.indexName, index: 0,title: global.YrcnApp.now.rootRoute.indexTitle}}
                renderScene={this._renderScene}/>
        );
    },
    _renderScene: function(route, navigator){
        //console.log(route);
        //
        navigationBarRouteMapper.navigator = global.YrcnApp.now.rootNavigator;
        navigationBarRouteMapper.titleStr = route.title;
        //
        var Component = null;
        var props = {};
        switch (route.name){
            case "About": //关于
                Component = AboutView;
                break;
            case "Login": //登录
                Component = LoginView;
                break;
            case "Register": //注册
                Component = RegisterView;
                break;
            case "ForgetPwd": //忘记密码
                Component = ForgetPwdView;
                break;
            case "SpecialStatementView": //特别声明
                Component = SpecialStatementView;
                break;
            case "UseHelpView": //使用帮助
                Component = UseHelpView;
                break;
            case "ViewTime": //智能提醒
                Component = ViewTime;
                break;
            case "ReadingStatisticsView": //阅读统计
                Component = ReadingStatisticsView;
                break;
            case "PersonalInfo": //个人信息
                Component = PersonalInfoView;
                break;
            case "ScrollViewSettingTodayType": //事件显示
                Component = ScrollViewSettingTodayType;
                break;
            case "ScrollViewAddTodayType": //事件新增
                props.prevView = route.prevView;
                navigationBarRouteMapper.navigator = navigator;
                Component = ScrollViewAddTodayType;
                break;
            case "ScrollViewUpdTodayType": //事件编辑
                props.prevView = route.prevView;
                props.typeObj = route.typeObj;
                navigationBarRouteMapper.navigator = navigator;
                Component = ScrollViewUpdTodayType;
                break;
            default: {//书库分类
                Component = ListViewBookRoom;
            }
        }
        //
        return <Component parent={this} parent_navigator={navigator} {...props}/>
    }
});
var styles = StyleSheet.create({
    navBar: {
        height: 50,
        backgroundColor:'#4ab854',
        borderBottomColor:'#4ab854',
        borderBottomWidth:1,
        position: 'absolute',
    },
    leftView:{
        width: 40,
        paddingTop: 9,
    },
    leftText:{
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 14,
    },
    rightButton: {
        width: 22,
        top: -20,
        marginRight:5
    }
});
//
module.exports = NavigatorBookSettings_01;