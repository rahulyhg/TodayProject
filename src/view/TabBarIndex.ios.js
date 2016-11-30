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
var NavigatorToday = require('./NavigatorToday.js');
var NavigatorYesterday = require('./NavigatorYesterday.js');
var NavigatorLlg = require('./NavigatorLlg.js');
var NavigatorSettings = require('./NavigatorSettings.js');
//
var TabBarIndex = React.createClass({
    getInitialState: function(){
        var _this = this;
        return {
            selectedTab: 'todayIcon',
        };
    },
    render: function(){
        //console.log("TabBarIndex.js render");
        return (
            <TabBarIOS barTintColor={'#f6f6f7'} tintColor={'#01bbfc'} translucent={true} style={styles.container}>
                <TabBarIOS.Item
                    icon={require('image!hotLife')}
                    selectedIcon={require('image!hotLife')}
                    selected={this.state.selectedTab === 'todayIcon'}
                    onPress={(item)=>{this._onPressTabItem('todayIcon')}}
                    title="今天">
                    <NavigatorToday />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('image!yesterdayIcon')}
                    selectedIcon={require('image!yesterdayIcon')}
                    selected={this.state.selectedTab === 'yesterdayIcon'}
                    onPress={(item)=>{this._onPressTabItem('yesterdayIcon')}}
                    title="昨天">
                    <NavigatorYesterday
                        NavigatorRoot_route={this.props.NavigatorRoot_route}
                        NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('image!llgIcon')}
                    selectedIcon={require('image!llgIcon')}
                    selected={this.state.selectedTab === 'llgIcon'}
                    onPress={(item)=>{this._onPressTabItem('llgIcon')}}
                    title="以前">
                    <NavigatorLlg
                        NavigatorRoot_route={this.props.NavigatorRoot_route}
                        NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('image!myLife')}
                    selected={this.state.selectedTab === 'myLife'}
                    onPress={()=>{this.setState({selectedTab: 'myLife'})}}
                    title="设置">
                    <NavigatorSettings
                        NavigatorRoot_route={this.props.NavigatorRoot_route}
                        NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}/>
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