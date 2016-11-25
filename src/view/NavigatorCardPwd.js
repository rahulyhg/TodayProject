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
var ListViewCardPwd = require('./ListViewCardPwd.js');
//
var navigationBarRouteMapper = {
    titleStr: "账号类密码",
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
            <global.YrcnApp.components.NavigatorRightBtnView text={"添加"} onPress={this._onPressRightButton}/>
        );
    },
    _onPressLeftButton: function(){
        YrcnApp.components.StatusBar.setBarStyle('light-content',true);
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
var NavigatorMyLife = React.createClass({
    getInitialState: function(){
        return {
            isShowNavigationBarLeftButton: false,
            isChange: false
        };
    },
    showLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return (
                <global.YrcnApp.components.NavigatorLeftBtnView text={""}/>
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
                <global.YrcnApp.components.NavigatorRightBtnView text={"添加"} onPress={this._onPressRightButton}/>
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
        console.log("render NavigatorMyLife");
        var _this = this;
        global.YrcnApp.now.myLifeNavigator = this;
        return (
            <Navigator
                initialRoute={{name: 'ListViewMyLifes', index: 0,title:"卡类密码"}}
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
            default: //default view
                navigationBarRouteMapper.isShowNavigationBarLeftButton = false;
                Component = ListViewCardPwd;
        }
        return <Component
                    parent_route = {route}
                    parent_navigator = {navigator}
                    parent={this}/>
    }
});
//
module.exports = NavigatorMyLife;