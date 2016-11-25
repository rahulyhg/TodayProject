/**
 * 首页
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
    View,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var LoginView = require('./LoginView.js');
var ForgetPwdView = require('./ForgetPwdView.js');
var RegisterView = require('./RegisterView.js');
var PersonalInfoView = require('./PersonalInfoView.js');
var ScrollViewHerLife = require('./ScrollViewMyLife.js');
var ScrollViewMyLifeAnswer = require('./ScrollViewMyLifeAnswer.js');
//
var navigationBarRouteMapper = {
    titleStr: "",
    Title: function(){
        return (
            <global.YrcnApp.components.NavigatorTitleView title={this.titleStr}/>
        );
    },
    LeftButton: function(){
        return (
            <global.YrcnApp.components.NavigatorLeftBtnView text={"返回"} onPress={this._onPressLeftButton}/>
        );
    },
    RightButton: function(){
        return (
            <global.YrcnApp.components.NavigatorRightBtnView text={""}/>
        );
    },
    _onPressLeftButton: function(){
        navigationBarRouteMapper.navigator.pop();
    },
    _onPressRightButton: function(){

    },
}
//

//
var NavigatorMyLifeInner = React.createClass({
    getInitialState: function(){
        return {
            isShowNavigationBarLeftButton: false
        };
    },
    showLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return (
                <global.YrcnApp.components.NavigatorLeftBtnView text={"返回"} onPress={this._onPressLeftButton}/>
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
    showRightButton: function(){
        navigationBarRouteMapper.RightButton = function(){
            return (
                <global.YrcnApp.components.NavigatorRightBtnView text={""}/>
            );
        }
    },
    hideRightButton: function(){
        navigationBarRouteMapper.RightButton = function(){
            return (
                <global.YrcnApp.components.NavigatorRightBtnView text={""}/>
            );
        }
    },
    render: function(){
        //console.log("render");
        var _this = this;
        var initRoute = {};
        //console.log(this.props.indexName)
        if(this.props.indexName == "LoginView" || this.props.indexName == "PersonalInfoView"){
            initRoute = {name: this.props.indexName, index: 0,title: this.props.title};
        }else{
            initRoute = {name: 'ScrollViewMyLife', index: 0,title: global.YrcnApp.now.coreObj.title};
        }
        return (
            <Navigator
                initialRoute={initRoute}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={navigationBarRouteMapper}
                        style={global.YrcnApp.styles.common.navBar}/>
                }
                renderScene={this._renderScene}
                />
        );
    },
    _renderScene: function(route, navigator){
        console.log(route.name);
        //
        navigationBarRouteMapper.navigator = navigator;
        navigationBarRouteMapper.titleStr = route.title;
        navigationBarRouteMapper.route = route;
        var Component = null;
        var props = {};
        switch(route.name){
            case "LoginView": //
                navigationBarRouteMapper.navigator = global.YrcnApp.now.rootNavigator;
                Component = LoginView;
                break;
            case "ForgetPwdView": //
                Component = ForgetPwdView;
                break;
            case "RegisterView": //
                Component = RegisterView;
                break;
            case "PersonalInfoView": //
                navigationBarRouteMapper.navigator = global.YrcnApp.now.rootNavigator;
                Component = PersonalInfoView;
                break;
            case "ScrollViewHerLife": //
                Component = ScrollViewHerLife;
                break;
            case "ScrollViewMyLifeAnswer": //
                Component = ScrollViewMyLifeAnswer;
                break;
        }
        console.log(props);
        return <Component
                    parent_route={route}
                    parent_navigator={navigator}
                    parent={this} {...props}/>
    }
});
//
module.exports = NavigatorMyLifeInner;