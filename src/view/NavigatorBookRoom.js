/**
 * 书房首页
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    NavigatorBar,
    Image,
    Text,
    TouchableOpacity,
    View,
    StatusBar,
    TextInput,
    Dimensions,
    Timers,
    ActionSheetIOS,
    ListView,
    ScrollView,
    TouchableHighlight,
    Modal,
    Navigator,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var ListViewBookRoom = require('./ListViewBookRoom.js');
//
var navigationBarRouteMapper = {
    titleStr: "书房",
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
            <global.YrcnApp.components.NavigatorRightBtnView />
        );
    },
    _onPressLeftButton: function(){
        //console.log("_onPressLeftButton");
        navigationBarRouteMapper.navigator.pop();
    },
}
//
var NavigatorBookRoom = React.createClass({
    render: function(){
        //console.log("NavigatorBookRoom render");
        YrcnApp.components.StatusBar.setBarStyle('light-content',true);
        StatusBar.setHidden(true,'slide');
        return (
            <Navigator
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={navigationBarRouteMapper}
                        style={styles.navBar}/>
                }
                initialRoute={{name: 'ListViewBookRoom', index: 0,title:'书房'}}
                renderScene={this._renderScene}/>
        );
    },
    _renderScene: function(route, navigator){
        //
        navigationBarRouteMapper.navigator = navigator;
        navigationBarRouteMapper.titleStr = route.title;
        //
        var Component = null;
        switch (route.name){
            default: {//书库分类
                Component = ListViewBookRoom;
            }
        }
        //
        return <Component
            NavigatorRoot_route={this.props.NavigatorRoot_route}
            NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}
            NavigatorBookLibrary_route={route}
            NavigatorBookLibrary_navigator={navigator}
            uuid={Math.uuidFast()}
            navigatorBookLibrary={this}/>
    }
});
var styles = StyleSheet.create({
    navBar: {
        height: 50,
        backgroundColor:'#4ab854',
        borderBottomColor:'#4ab854',
        borderBottomWidth:1,
        position: 'absolute',
    },
    leftButton: {
        width: 22,
        top: -8,
        marginLeft:5
    },
    rightButton: {
        width: 22,
        top: -20,
        marginRight:5
    }
});
//
module.exports = NavigatorBookRoom;