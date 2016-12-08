/**
 *
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
var ScrollViewHerLife = require('./ScrollViewHerLife.js');
var ScrollViewHerLifeAnswer = require('./ScrollViewHerLifeAnswer.js');
var ListViewSearchHerLifes = require('./ListViewSearchHerLifes.js');
var WebViewEditTodayContent = require('./WebViewEditTodayContent.js');
var ViewEditTodayContent = require('./ViewEditTodayContent');
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
            <global.YrcnApp.components.NavigatorRightBtnView text={"完成"} onPress={this._onPressRightButton}/>
        );
    },
    _onPressLeftButton: function(){
        global.YrcnApp.now.rootNavigator.pop();
    },
    _onPressRightButton: function(){
        global.YrcnApp.now.rootNavigator.pop();
    },
}
//

//
var NavigatorLlgInner = React.createClass({
    getInitialState: function(){
        return {
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
                <global.YrcnApp.components.NavigatorRightBtnView text={"完成"} onPress={this._onPressRightButton}/>
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
        var initRoute = {name: this.props.indexName, index: 0,title: this.props.indexTitle};
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
        var props = this.props||{};
        switch(route.name){
            case "ScrollViewHerLifeAnswer": //
                Component = ScrollViewHerLifeAnswer;
                break;
            case "ListViewSearchHerLifes": //
                props.searchKey = this.props.searchKey;
                Component = ListViewSearchHerLifes;
                break;
            default: //default view
                Component = ViewEditTodayContent;
        }
        console.log(props);
        return <Component
                    parent_route={route}
                    parent_navigator={navigator}
                    parent={this} {...props}/>
    }
});
//
module.exports = NavigatorLlgInner;