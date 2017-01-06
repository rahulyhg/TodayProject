/**
 * 引导页
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
import {GuideIndexView } from '../view/guide';
import {LoginIndexView, LoginEmailView } from '../view/login';
import {RegisterIndexView, RegisterEmailView } from '../view/register';
//
var navigationBarRouteMapper = {
    titleStr: "Today",
    Title: function(){
        return (
            <global.YrcnApp.components.NavigatorTitleView title={this.titleStr}/>
        );
    },
    LeftButton: function(){
        return (
            <global.YrcnApp.components.NavigatorLeftBtnView text={""}/>
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
        global.YrcnApp.now.rootNavigator.push({
            name:"NavigatorCardPwdInner",
            title:"添加",
            indexName:"CardPwdAddView",
        });
    },
}
//

//
var NavigatorGuidePages = React.createClass({
    getInitialState: function(){
        return {
            isShowNavigationBarLeftButton: false,
            isChange: false
        };
    },
    showLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return (
                <global.YrcnApp.components.NavigatorLeftBtnView text={"<返回"} onPress={this._onPressLeftButton}/>
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
        this.setState({
            isChange: true
        });
    },
    hideRightButton: function(){
        navigationBarRouteMapper.RightButton = function(){
            return (
                <global.YrcnApp.components.NavigatorRightBtnView text={""}/>
            );
        }
    },
    render: function(){
        console.log("render NavigatorGuidePages");
        var _this = this;
        return (
            <Navigator
                initialRoute={{name: 'GuideIndexView', index: 0,title:"Today"}}
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
        //
        navigationBarRouteMapper.navigator = navigator;
        navigationBarRouteMapper.titleStr = route.title;
        var Component = null;
        switch(route.name){
            case "LoginIndexView": //
                navigationBarRouteMapper.isShowNavigationBarLeftButton = true;
                Component = LoginIndexView;
                break;
            case "LoginEmailView": //
                navigationBarRouteMapper.isShowNavigationBarLeftButton = true;
                Component = LoginEmailView;
                break;
            case "RegisterIndexView": //
                navigationBarRouteMapper.isShowNavigationBarLeftButton = true;
                Component = RegisterIndexView;
                break;
            case "RegisterEmailView": //
                navigationBarRouteMapper.isShowNavigationBarLeftButton = true;
                Component = RegisterEmailView;
                break;
            case "GuideProfessionView": //
                navigationBarRouteMapper.isShowNavigationBarLeftButton = true;
                Component = GuideProfessionView;
                break;
            case "GuidePersonalInfoView": //
                navigationBarRouteMapper.isShowNavigationBarLeftButton = true;
                Component = GuidePersonalInfoView;
                break;
            default: //default view
                navigationBarRouteMapper.isShowNavigationBarLeftButton = false;
                Component = GuideIndexView;
        }
        return <Component
                    parent_route = {route}
                    parent_navigator = {navigator}
                    parent={this}/>
    }
});
//
module.exports = NavigatorGuidePages;