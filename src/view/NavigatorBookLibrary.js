/**
 * 书库
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
var ListViewBookLibrary = require('./ListViewBookLibrary.js');
var InfoBook = require('./InfoBook.js');
var ListViewBookLibrarySearchBooks = require('./ListViewBookLibrarySearchBooks.js');
var NavigatorBookLibrary_01 = require('./NavigatorBookLibrary_01.js');
//
var navigationBarRouteMapper = {
    titleStr: "书库",
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
    _onPressRightButton: function(){
        //console.log("_onPressRightButton");
        navigationBarRouteMapper.NavigatorRoot_navigator.push({
            name:"ReadingSearchView",
        });
    }
}
/**
 * NavigatorRoot_route={route} NavigatorRoot_navigator={navigator} navigatorRoot={this}
 */
var NavigatorBookLibrary = React.createClass({
    showLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return <TouchableOpacity onPress={this._onPressLeftButton} style={styles.leftView}>
                <Text style={styles.leftText}>返回</Text>
            </TouchableOpacity>;
        }
    },
    hideLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return;
        }
    },
    showRightButton: function(){
        navigationBarRouteMapper.NavigatorRoot_navigator = this.props.NavigatorRoot_navigator;
        navigationBarRouteMapper.RightButton = function(){
            return (
                <global.YrcnApp.components.NavigatorRightBtnView onPress={this._onPressRightButton} text={"搜索"}/>
            );
        }
    },
    hideRightButton: function(){
        navigationBarRouteMapper.RightButton = function(){
            return;
        }
    },
    render: function(){
        return (
            <Navigator
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={navigationBarRouteMapper}
                        style={styles.navBar}/>
                }
                initialRoute={{name: 'ListViewBookLibrary', index: 0,title:'书库'}}
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
                Component = ListViewBookLibrary;
            }
        }
        //
        return <Component
            NavigatorRoot_route={this.props.NavigatorRoot_route}
            NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}
            NavigatorBookLibrary_route={route}
            NavigatorBookLibrary_navigator={navigator}
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
    leftView:{
        width: 40,
        height: 40,
        paddingTop: 9
    },
    leftText:{
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 14,
    },
    rightView:{
        width: 40,
        paddingTop: 9
    },
    rightText:{
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 14,
    }
});
//
module.exports = NavigatorBookLibrary;