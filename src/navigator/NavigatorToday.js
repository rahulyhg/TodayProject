/**
 * Navigator 今天
 */
'use strict';
//导入
import React, { Component } from 'react';
import {StyleSheet,Navigator} from 'react-native';
//
var ScrollViewToday = require('./../scrollview/ScrollViewToday.js');
//
var navigationBarRouteMapper = {
    titleStr: "今天",
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
            <global.YrcnApp.components.NavigatorRightBtnView text={"显设"} onPress={this._onPressRightButton}/>
        );
    },
    _onPressLeftButton: function(){
    },
    _onPressRightButton: function(){
        global.YrcnApp.now.rootNavigator.push({name:"NavigatorSettingsInner",indexName:"ScrollViewSettingTodayType",indexTitle:'显示设置'});
    },
}
//

//
var NavigatorToday = React.createClass({
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
                <global.YrcnApp.components.NavigatorRightBtnView text={"显设"}/>
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
                initialRoute={{name: 'ScrollViewToday', index: 0,title:"今天"}}
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
                props.contentDay = global.YrcnApp.utils.nowDate();
                props.ViewEdit = "ViewEditTodayContent";
                props.NavigatorInner = "NavigatorTodayInner";
                props.scrollView = "scrollViewToday";
                props.backgroundColor = "#ffffff";
                Component = ScrollViewToday;
        }
        return <Component
                    parent_route = {route}
                    parent_navigator = {navigator}
                    parent={this} {...props}/>
    }
});
//
module.exports = NavigatorToday;