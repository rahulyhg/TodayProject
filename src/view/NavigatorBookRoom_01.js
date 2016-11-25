/**
 * 书房首页
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
var PersonalInfoView = require('./PersonalInfoView.js');//忘记密码
//
var navigationBarRouteMapper = {
    titleStr: "书房",
    Title: function(){
        return <Text style={{fontSize:16,top:7,color: '#ffffff',fontWeight:'800'}}>{this.titleStr}</Text>
    },
    LeftButton: function(){
        return ;
    },
    RightButton: function(){
        return ;
    },
    _onPressLeftButton: function(){
        //console.log("_onPressLeftButton");
        navigationBarRouteMapper.navigator.pop();
    },
}
//
var NavigatorBookRoom = React.createClass({
    showLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return <TouchableHighlight onPress={this._onPressLeftButton} underlayColor={"#4ab854"} style={styles.leftView}>
                <Text style={styles.leftText}>返回</Text>
            </TouchableHighlight>;
        }
    },
    hideLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return;
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
                        style={styles.navBar}/>
                }
                initialRoute={{name: this.props.NavigatorRoot_route.indexName, index: 0,title:this.props.NavigatorRoot_route.indexTitle}}
                renderScene={this._renderScene}/>
        );
    },
    _renderScene: function(route, navigator){
        //
        if(route.indexName){
            navigationBarRouteMapper.navigator = this.props.NavigatorRoot_navigator;
        }else{
            navigationBarRouteMapper.navigator = navigator;
        }
        navigationBarRouteMapper.titleStr = route.title;
        //
        var Component = null;
        switch (route.name){
            case "About": //关于
                navigationBarRouteMapper.navigator = this.props.NavigatorRoot_navigator;
                Component = AboutView;
                break;
            case "Login": //登录
                navigationBarRouteMapper.navigator = this.props.NavigatorRoot_navigator;
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
            case "PersonalInfo": //个人信息
                navigationBarRouteMapper.navigator = this.props.NavigatorRoot_navigator;
                Component = PersonalInfoView;
                break;
            default: {//书库分类
                Component = ListViewBookRoom;
            }
        }
        //
        return <Component
            NavigatorRoot_route={this.props.NavigatorRoot_route}
            NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}
            NavigatorBookRoom_route={route}
            NavigatorBookRoom_navigator={navigator}
            navigatorBookRoom={this}/>
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
module.exports = NavigatorBookRoom;