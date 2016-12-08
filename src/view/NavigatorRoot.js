/**
 * 顶级导航器
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    Navigator,
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
var RNUtilsModule = global.YrcnApp.native.RNUtilsModule;
//
var RNUtils = global.YrcnApp.utils;
var RNAllService = global.YrcnApp.services;
var TabBarIndex = require('./TabBarIndex');//选项卡首页
var NavigatorGuidePages = require('./NavigatorGuidePages.js');
var NavigatorSettingsInner = require('./NavigatorSettingsInner.js');
var NavigatorTodayInner = require('./NavigatorTodayInner.js');
var NavigatorYesterdayInner = require('./NavigatorYesterdayInner.js');
var ViewNewFunc = require('../view/ViewNewFunc');

//
var NavigatorRoot = React.createClass({
    //在组件挂载之前调用一次。返回值将会作为 this.state 的初始值。
    getInitialState: function(){
        return ({
            appUpgrade: false,
            appUpgradeVersion: "",
            appBundleUpgradeVersion: "",
            appUpgradeDesp: "",
            contentBottomText: "下载升级",
            isShowNewFunc: false
        });
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNUtils.getAppInfo(function(appInfo){
            RNAllService.checkVersions(function(checkVersionsObj){
                console.log(checkVersionsObj);
                //checkVersionsObj.appUpgrade = "1";
                if(checkVersionsObj.appUpgrade == "1"){//app客户端需要升级

                    if(global.YrcnApp.Platform.OS === "ios"){
                        _this.setState({
                            appUpgrade: true,
                            appUpgradeVersion: checkVersionsObj.appUpgradeVersion,
                            appUpgradeMust: checkVersionsObj.appUpgradeMust,
                            appUpgradeDesp: checkVersionsObj.appUpgradeDesp,
                        });
                    }else{
                        RNUtilsModule.appUpgrade([],function(){});
                    }
                }else if(checkVersionsObj.appBundleUpgrade == "1"){
                    if(global.YrcnApp.Platform.OS === "ios"){
                        _this.setState({
                            appBundleUpgrade: true,
                            appBundleUpgradeVersion: checkVersionsObj.appBundleUpgradeVersion,
                            appBundleUpgradeMust: checkVersionsObj.appBundleUpgradeMust,
                            appBundleUpgradeDesp: checkVersionsObj.appBundleUpgradeDesp,
                        });
                    }else{
                        RNUtilsModule.appUpgrade([],function(){});
                    }
                }
            })
        })
    },
    render: function(){
        //
        var _this = this;
        global.YrcnApp.now.$NavigatorRoot = this;
        return (
            <View style={[global.YrcnApp.styles.common.container]}>
                <Navigator
                    initialRoute={{name: 'NavigatorGuidePages', index: 0,title: ''}}
                    renderScene={this._renderScene}/>
                {(this.state.appUpgrade||this.state.appBundleUpgrade)?function(){
                    //YrcnApp.components.StatusBar.setHidden(true,'slide');
                    return (
                        <View style={styles.appUpgradeView}>
                            <TouchableOpacity style={styles.appUpgradeViewInner} onPress={_this._onPressBackView}></TouchableOpacity>
                        </View>
                    );
                }():function(){}()}
                {(this.state.appUpgrade||this.state.appBundleUpgrade)?function(){
                    return (
                        <View style={styles.appUpgradeContentView}>
                            <View style={styles.contentTopView}>
                                <Text style={styles.contentTopText}>{_this.state.appUpgradeVersion||_this.state.appBundleUpgradeVersion}</Text>
                                <Text style={styles.contentTopText2}>升级提醒</Text>
                            </View>
                            <View style={styles.contentCenterView}>
                                <Text style={styles.contentCenterText1}>{global.YrcnApp.configs.AppName}已更新到{_this.state.appUpgradeVersion||_this.state.appBundleUpgradeVersion}版本了</Text>
                                <Text style={styles.contentCenterText2}>{_this.state.appUpgradeDesp||_this.state.appBundleUpgradeDesp}</Text>
                            </View>
                            <View style={styles.contentBottomView}>
                                <TouchableOpacity style={styles.contentBottomButton} onPress={_this._onPressUpgradeBtn}>
                                    <Text style={styles.contentBottomText}>{_this.state.contentBottomText}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }():function(){}()}
                {(this.state.isShowNewFunc)?function(){
                    return (
                        <ViewNewFunc onPress={_this._onPressNewFunc}/>
                    );
                }():function(){}()}
            </View>
        );
    },
    _renderScene: function(route, navigator){
        //
        global.YrcnApp.now.rootNavigator = navigator;
        global.YrcnApp.now.rootRoute = route;
        //
        var Component = null;
        var props = route || {};
        switch (route.name){
            case "NavigatorSettingsInner": //
                Component = NavigatorSettingsInner;
                break;
            case "TabBarIndex": //
                Component = TabBarIndex;
                break;
            case "NavigatorGuidePages": //
                Component = NavigatorGuidePages;
                break;
            case "NavigatorTodayInner": //
                Component = NavigatorTodayInner;
                break;
            case "NavigatorYesterdayInner": //
                Component = NavigatorYesterdayInner;
                break;
        }
        //console.log(props);
        return <Component parent={this} {...props}/>
    },
    _onPressBackView: function(){
        var _this = this;
        if(this.state.appUpgrade && this.state.appUpgradeMust != "1" && this.state.contentBottomText == "下载升级"){
            _this.setState({
                appUpgrade: false,
            });
        }
        if(this.state.appBundleUpgrade && this.state.appBundleUpgradeMust != "1" && this.state.contentBottomText == "下载升级"){
            _this.setState({
                appBundleUpgrade: false,
            });
        }
    },
    _onPressUpgradeBtn: function(){
        this.setState({
            contentBottomText: "正在努力升级..."
        });
        if(this.state.contentBottomText == "下载升级"){
            if(this.state.appUpgrade){
                RNUtilsModule.appUpgrade([global.YrcnApp.configs.IOS_APP_URL]);
            }else{
                RNUtilsModule.appBundleUpgrade([""]);
            }
        }
    },
    renderNewFunc: function(){
        this.setState({
            isShowNewFunc: true
        });
    },
    _onPressNewFunc: function(){
        RNUtils.setJsonNewFunc("xian_she");
        this.setState({
            isShowNewFunc: false
        });
    }
});
//
var styles = StyleSheet.create({
    appUpgradeView:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        top: 0,
        opacity: 0.7,
        backgroundColor: '#333333',
    },
    appUpgradeViewInner:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    appUpgradeContentView:{
        width: Dimensions.get('window').width/5*3.6,
        height: Dimensions.get('window').height/7*2.7,
        position: 'absolute',
        top: Dimensions.get('window').height/7*2,
        left: Dimensions.get('window').width/5*0.7,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        opacity: 1,
        borderRadius: 10,
    },
    contentTopView:{
        flex: 2,
        backgroundColor: '#01bbfc',
        paddingTop: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
    },
    contentTopText: {
        color: '#ffffff',
        fontSize: 33,
        textAlign: 'center',
    },
    contentTopText2: {
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'center',
        //marginTop: 10,
    },
    contentCenterView:{
        flex: 2,
        backgroundColor: '#ffffff',
    },
    contentCenterText1:{
        color: '#6d6d6d',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 25,
    },
    contentCenterText2:{
        color: '#6d6d6d',
        textAlign: 'left',
        fontSize: 13,
        paddingTop: 10,
        paddingLeft: 10,
    },
    contentBottomView:{
        flex: 1,
        justifyContent: 'center',
    },
    contentBottomButton:{
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#01bbfc',
        padding: 5,
        borderRadius: 5,
    },
    contentBottomText:{
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 15,
    },
});
//
module.exports = NavigatorRoot;
