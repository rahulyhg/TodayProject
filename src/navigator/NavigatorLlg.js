/**
 * 以前
 */
'use strict';
//导入
import React, { Component } from 'react';
import {StyleSheet,Navigator} from 'react-native';
//
var ScrollViewLlg = require('./../scrollview/ScrollViewLlg.js');
//
var navigationBarRouteMapper = {
    titleStr: "以前",
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
var NavigatorLlg = React.createClass({
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
                initialRoute={{name: 'ScrollViewToday', index: 0,title:"以前"}}
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
                Component = ScrollViewLlg;
        }
        return <Component
                    parent_route = {route}
                    parent_navigator = {navigator}
                    parent={this}/>
    }
});
//
module.exports = NavigatorLlg;