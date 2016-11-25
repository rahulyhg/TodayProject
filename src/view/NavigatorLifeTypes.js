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
var ScrollViewLifeTypes = require('./ScrollViewLifeTypes.js');
//
var navigationBarRouteMapper = {
    titleStr: "分类",
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
            <global.YrcnApp.components.NavigatorRightBtnView text={"搜索"} onPress={this._onPressRightButton}/>
        );
    },
    _onPressLeftButton: function(){
        YrcnApp.components.StatusBar.setBarStyle('light-content',true);
        navigationBarRouteMapper.navigator.pop();
    },
    _onPressRightButton: function(){
        global.YrcnApp.now.rootNavigator.push({
            name: 'LifeHerSearchView'
        });
    },
}
//

//
var NavigatorLifeTypes = React.createClass({
    getInitialState: function(){
        return {
            isShowNavigationBarLeftButton: false
        };
    },
    showLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return <TouchableOpacity onPress={this._onPressLeftButton}>
            </TouchableOpacity>;
        }
    },
    hideLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return;
        }
    },
    showRightButton: function(){
        navigationBarRouteMapper.RightButton = function(){
            return (
                <global.YrcnApp.components.NavigatorRightBtnView text={"搜索"} onPress={this._onPressRightButton}/>
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
        return (
            <Navigator
                initialRoute={{name: 'ListViewBookDesk', index: 0,title:"分类"}}
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
                Component = ScrollViewLifeTypes;
        }
        return <Component
                    parent_route={route}
                    parent_navigator={navigator}
                    parent={this}/>
    }
});
//
module.exports = NavigatorLifeTypes;