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
            <global.YrcnApp.components.NavigatorRightBtnView text={""} onPress={this._onPressRightButton}/>
        );
    },
    _onPressLeftButton: function(){
        if(navigationBarRouteMapper.route.name == "ScrollViewHerLife"||navigationBarRouteMapper.route.name == "ListViewSearchHerLifes"){
            global.YrcnApp.now.rootNavigator.pop();
        }else{
            navigationBarRouteMapper.navigator.pop();
        }
    },
    _onPressRightButton: function(){

    },
}
//

//
var NavigatorHerLifeInner = React.createClass({
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
                <global.YrcnApp.components.NavigatorRightBtnView text={""} onPress={this._onPressRightButton}/>
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
        console.log(this.props.indexName)
        if(this.props.indexName == "ListViewSearchHerLifes"){
            initRoute = {name: 'ListViewSearchHerLifes', index: 0,title: this.props.title};
        }else{
            initRoute = {name: 'ScrollViewHerLife', index: 0,title: global.YrcnApp.now.coreObj.title};
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
            case "ScrollViewHerLifeAnswer": //
                Component = ScrollViewHerLifeAnswer;
                break;
            case "ListViewSearchHerLifes": //
                props.searchKey = this.props.searchKey;
                Component = ListViewSearchHerLifes;
                break;
            default: //default view
                Component = ScrollViewHerLife;
        }
        console.log(props);
        return <Component
                    parent_route={route}
                    parent_navigator={navigator}
                    parent={this} {...props}/>
    }
});
//
module.exports = NavigatorHerLifeInner;