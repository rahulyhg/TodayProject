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
var NavigatorBookDesk = require('./NavigatorBookDesk.js');
var NavigatorBookShelf = require('./NavigatorBookShelf.js');
var NavigatorBookRoom = require('./NavigatorBookRoom.js');
var NavigatorBookSettings = require('./NavigatorSettings.js');
var NavigatorBookLibrary = require('./NavigatorBookLibrary.js');
//
var TabBarIndex = React.createClass({
    getInitialState: function(){
        var _this = this;
        return {
            selectedTab: 'bookDesk',
        };
    },
    render: function(){
        //console.log("TabBarIndex.js render");
        return (
            <TabNavigator tabBarStyle={{ height: 50, overflow: 'hidden',paddingBottom:0}}
                          sceneStyle={{ }}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'bookDesk'}
                    title="书桌"
                    titleStyle={{color:'#444444'}}
                    selectedTitleStyle={{color:'#4ab854'}}
                    tabStyle={{}}
                    renderIcon={() => <Image source={require('../images/bookDesk.png')} />}
                    renderSelectedIcon={() => <Image source={require('../images/bookDeskSelected.png')} />}
                    onPress={(item)=>{this._onPressTabItem('bookDesk')}}>
                    <NavigatorBookDesk
                        bookDesk={this.state.bookDesk}
                        NavigatorRoot_route={this.props.NavigatorRoot_route}
                        NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'bookShelf'}
                    title="书架"
                    titleStyle={{color:'#444444'}}
                    selectedTitleStyle={{color:'#4ab854'}}
                    renderIcon={() => <Image source={require('../images/bookShelf.png')} />}
                    renderSelectedIcon={() => <Image source={require('../images/bookShelfSelected.png')} />}
                    onPress={(item)=>{this._onPressTabItem('bookShelf')}}>
                    <NavigatorBookShelf
                        NavigatorRoot_route={this.props.NavigatorRoot_route}
                        NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'bookSettings'}
                    title="设置"
                    titleStyle={{color:'#444444'}}
                    selectedTitleStyle={{color:'#4ab854'}}
                    renderIcon={() => <Image source={require('../images/bookRoom.png')} />}
                    renderSelectedIcon={() => <Image source={require('../images/bookRoomSelected.png')} />}
                    onPress={(item)=>{this._onPressTabItem('bookSettings')}}>
                    <NavigatorBookSettings
                        NavigatorRoot_route={this.props.NavigatorRoot_route}
                        NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'bookLibrary'}
                    title="书库"
                    titleStyle={{color:'#444444'}}
                    selectedTitleStyle={{color:'#4ab854'}}
                    renderIcon={() => <Image source={require('../images/bookLibrary.png')} />}
                    renderSelectedIcon={() => <Image source={require('../images/bookLibrarySelected.png')} />}
                    onPress={(item)=>{this._onPressTabItem('bookLibrary')}}>
                    <NavigatorBookLibrary
                        NavigatorRoot_route={this.props.NavigatorRoot_route}
                        NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}/>
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