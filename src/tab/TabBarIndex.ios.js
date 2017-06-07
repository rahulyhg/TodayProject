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
            selectedTab: this.props.selectedTab||'todayIcon',
        };
    },
    render: function(){
        //
        var _this = this;
        global.YrcnApp.now.$TabBarIndex = this;
        global.YrcnApp.components.StatusBar.setBarStyle('dark-content',false);
        return (
            <TabBarIOS barTintColor={'#f6f6f7'} tintColor={'#01bbfc'} translucent={true} style={styles.container}>
                <TabBarIOS.Item
                    icon={require('../images/hotLife.png')}
                    selectedIcon={require('../images/hotLife.png')}
                    selected={this.state.selectedTab === 'todayIcon'}
                    onPress={(item)=>{this._onPressTabItem('todayIcon')}}
                    title="今天">
                    <ScrollViewToday />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('../images/yesterdayIcon.png')}
                    selectedIcon={require('../images/yesterdayIcon.png')}
                    selected={this.state.selectedTab === 'yesterdayIcon'}
                    onPress={(item)=>{this._onPressTabItem('yesterdayIcon')}}
                    title="昨天">
                    <ScrollViewYesterday contentDay = {global.YrcnApp.utils.yesterdayDate()}
                                    backgroundColor = "#ffffff"/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('../images/llgIcon.png')}
                    selectedIcon={require('../images/llgIcon.png')}
                    selected={this.state.selectedTab === 'llgIcon'}
                    onPress={(item)=>{this._onPressTabItem('llgIcon')}}
                    title="以前">
                    <ScrollViewLlg />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('../images/myLife.png')}
                    selected={require('../images/myLife.png')}
                    selected={this.state.selectedTab === 'myLife'}
                    onPress={()=>{this.setState({selectedTab: 'myLife'})}}
                    title="设置">
                    <SettingsView />
                </TabBarIOS.Item>
            </TabBarIOS>
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
        borderTopWidth:0,
        borderTopColor:'#000000',
        borderStyle:'solid',
        backfaceVisibility:'hidden',
    },
});
//
module.exports = TabBarIndex;