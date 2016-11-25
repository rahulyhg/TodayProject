/**
 * 首页
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
var ListViewBookShelfBooks = require('./ListViewBookShelfBooks.js');

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
            <global.YrcnApp.components.NavigatorRightBtnView onPress={this._onPressRightButton} text={""}/>
        );
    },
    _onPressLeftButton: function(){
        //console.log("_onPressLeftButton");
        navigationBarRouteMapper.navigator.pop();
    },
}
/**
 * NavigatorRoot_route={route} NavigatorRoot_navigator={navigator} navigatorRoot={this}
 */
var NavigatorBookShelf_01 = React.createClass({
    showLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return (
                <global.YrcnApp.components.NavigatorLeftBtnView onPress={this._onPressLeftButton} text={"返回"}/>
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
                <global.YrcnApp.components.NavigatorRightBtnView onPress={this._onPressRightButton} text={"+"}/>
            );
        }
    },
    hideRightButton: function(){
        navigationBarRouteMapper.RightButton = function(){
            return (
                <global.YrcnApp.components.NavigatorRightBtnView onPress={this._onPressRightButton} text={""}/>
            );
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
                initialRoute={{name: this.props.NavigatorRoot_route.indexName, index: 0}}
                renderScene={this._renderScene}/>
        );
    },
    _renderScene: function(route, navigator){
        //
        navigationBarRouteMapper.navigator = navigator;
        navigationBarRouteMapper.titleStr = route.title;
        //console.log(route.title);
        //
        var Component = null;
        switch (route.name){
            default: {//书籍搜索
                navigationBarRouteMapper.navigator = this.props.NavigatorRoot_navigator;
                navigationBarRouteMapper.titleStr = this.props.NavigatorRoot_route.title;
                Component = ListViewBookShelfBooks;
            }
        }
        return <Component
                NavigatorRoot_route={this.props.NavigatorRoot_route}
                NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}
                NavigatorBookShelf_route={route}
                NavigatorBookShelf_navigator={navigator}
                navigatorBookShelf={this}
                shelfName={this.props.NavigatorRoot_route.title}
                />
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
    leftView:{
        width: 40,
        paddingTop: 9,
    },
    leftText:{
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 14,
    },
    rightButton: {
        width: 22,
        top: -20,
        marginRight:5
    }
});
//
module.exports = NavigatorBookShelf_01;