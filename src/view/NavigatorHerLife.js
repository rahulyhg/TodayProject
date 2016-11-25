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
var ListViewHerLifes = require('./ListViewHerLifes.js');
//
var navigationBarRouteMapper = {
    titleStr: "她的生活",
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
var NavigatorHerLife = React.createClass({
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
        return (
            <Navigator
                initialRoute={{name: 'ListViewBookDesk', index: 0,title:"她的生活"}}
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
                Component = ListViewHerLifes;
        }
        return <Component
                    parent_route={route}
                    parent_navigator={navigator}
                    parent={this}/>
    }
});
//
module.exports = NavigatorHerLife;