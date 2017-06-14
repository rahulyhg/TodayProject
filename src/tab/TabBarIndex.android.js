/**
 * 首页
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    TabBarIOS,
    Image,
    Text,
    StatusBar,
    View,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
//
var RNUtils = require('../common/RNUtils.js');
//var NavigatorToday = require('./../navigator/NavigatorToday.js');
//var NavigatorYesterday = require('./../navigator/NavigatorYesterday.js');
//var NavigatorLlg = require('./../navigator/NavigatorLlg.js');
//var NavigatorSettings = require('./../navigator/NavigatorSettings.js');


var ScrollViewToday = require('./../scrollview/ScrollViewToday.js');
var ScrollViewYesterday = require('./../scrollview/ScrollViewYesterday.js');
var ScrollViewLlg = require('./../scrollview/ScrollViewLlg.js');
var SettingsView = require('./../view/ViewSettings.js');
//
var TabBarIndex = React.createClass({
    getInitialState: function(){
        var _this = this;
        return {
            selectedTab: _this.props.selectedTab||'todayIcon',
        };
    },
    render: function(){
        //console.log("TabBarIndex.js render");
        global.YrcnApp.components.StatusBar.setBarStyle('light-content',false,'#01bbfc');
        YrcnApp.components.StatusBar.setHidden(false,'slide');
        return (
            <TabNavigator tabBarStyle={{ height: 50, overflow: 'hidden',paddingBottom:0}}
                          sceneStyle={{ }}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'todayIcon'}
                    title="今天"
                    titleStyle={{color:'#444444'}}
                    selectedTitleStyle={{color:'#4ab854'}}
                    tabStyle={{}}
                    renderIcon={() => <Image source={require('../images/hotLife.png')} />}
                    renderSelectedIcon={() => <Image source={require('../images/hotLife.png')} />}
                    onPress={(item)=>{this._onPressTabItem('todayIcon')}}>
                    <ScrollViewToday />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'yesterdayIcon'}
                    title="昨天"
                    titleStyle={{color:'#444444'}}
                    selectedTitleStyle={{color:'#4ab854'}}
                    renderIcon={() => <Image source={require('../images/yesterdayIcon.png')} />}
                    renderSelectedIcon={() => <Image source={require('../images/yesterdayIcon.png')} />}
                    onPress={(item)=>{this._onPressTabItem('yesterdayIcon')}}>
                    <ScrollViewYesterday contentDay = {global.YrcnApp.utils.yesterdayDate()}
                                         backgroundColor = "#ffffff"/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'llgIcon'}
                    title="以前"
                    titleStyle={{color:'#444444'}}
                    selectedTitleStyle={{color:'#4ab854'}}
                    renderIcon={() => <Image source={require('../images/llgIcon.png')} />}
                    renderSelectedIcon={() => <Image source={require('../images/llgIcon.png')} />}
                    onPress={(item)=>{this._onPressTabItem('llgIcon')}}>
                    <ScrollViewLlg />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'myLife'}
                    title="设置"
                    titleStyle={{color:'#444444'}}
                    selectedTitleStyle={{color:'#4ab854'}}
                    renderIcon={() => <Image source={require('../images/myLife.png')} />}
                    renderSelectedIcon={() => <Image source={require('../images/myLife.png')} />}
                    onPress={(item)=>{this._onPressTabItem('myLife')}}>
                    <SettingsView />
                </TabNavigator.Item>
            </TabNavigator>
        );
    },
    _onPressTabItem: function(item){
        var _this = this;
        this.setState({
            selectedTab: item,
        });
    }
});
const styles = StyleSheet.create({
    container: {
        borderTopWidth:1,
        borderTopColor:'#000000',
        borderStyle:'solid',
        backfaceVisibility:'hidden',
    },
});
//
module.exports = TabBarIndex;