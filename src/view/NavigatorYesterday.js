/**
 * Navigator 昨天
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
var ScrollViewYesterday = require('./ScrollViewYesterday.js');
//
var navigationBarRouteMapper = {
    titleStr: "昨天",
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
    },
    _onPressRightButton: function(){
    },
}
//

//
var NavigatorYesterday = React.createClass({
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
        var _this = this;
        return (
            <Navigator
                initialRoute={{name: 'ScrollViewToday', index: 0,title:"昨天"}}
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
        var props = {};
        switch(route.name){
            default: //default view
                navigationBarRouteMapper.isShowNavigationBarLeftButton = false;
                props.contentDay = RNUtils.yesterdayDate();
                props.ViewEdit = "ViewEditYesterdayContent";
                props.NavigatorInner = "NavigatorYesterdayInner";
                props.scrollView = "scrollViewYesterday";
                props.backgroundColor = "#eeeeee";
                Component = ScrollViewYesterday;
        }
        return <Component
                    parent_route = {route}
                    parent_navigator = {navigator}
                    parent={this} {...props}/>
    }
});
//
module.exports = NavigatorYesterday;