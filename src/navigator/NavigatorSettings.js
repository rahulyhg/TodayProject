/**
 * 设置
 */
'use strict';
//导入
import React, { Component } from 'react';
import {StyleSheet,Navigator} from 'react-native';
//
var SettingsView = require('./../view/ViewSettings.js');
//
var navigationBarRouteMapper = {
    titleStr: "设置",
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
            <global.YrcnApp.components.NavigatorRightBtnView text={"注销"} onPress={this._onPressRightButton}/>
        );
    },
    _onPressLeftButton: function(){
        //console.log("_onPressLeftButton");
        navigationBarRouteMapper.navigator.pop();
    },
    _onPressRightButton: function(){
        global.YrcnApp.utils.confirm("您确定要注销当前账户么？",function(){
            global.YrcnApp.utils.removeLoginInfo(function(){
                global.YrcnApp.now.rootNavigator.replace({name:'NavigatorGuidePages'});
            })
        })
    }
}
//
var NavigatorBookSettings = React.createClass({
    render: function(){
        return (
            <Navigator
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={navigationBarRouteMapper}
                        style={global.YrcnApp.styles.common.navBar}/>
                }
                initialRoute={{name: 'SettingsView', index: 0,title:'设置'}}
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
            default: {//
                Component = SettingsView;
            }
        }
        //
        return <Component />
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
module.exports = NavigatorBookSettings;