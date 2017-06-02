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
var ViewEditTodayContent = require('./../view/ViewEditTodayContent');
var ViewEditWorkingLog = require('./../view/ViewEditWorkingLog');
var ScrollViewShowTodayContent = require('./../scrollview/ScrollViewShowTodayContent.js');
var ScrollViewShowTodayLlgBetweenContent = require('./../scrollview/ScrollViewShowTodayLlgBetweenContent.js');
var ScrollViewSearchTodayContent = require('./../scrollview/ScrollViewSearchTodayContent.js');
var ScrollViewShowTodaysContent = require('./../scrollview/ScrollViewShowTodaysContent.js');
var CameraRollView = require('../component/CameraRollView.js');
//
var navigationBarRouteMapper = {
    titleStr: "",
    Title: function(){
        return (
            <global.YrcnApp.components.NavigatorTitleView title={this.titleStr}/>
        );
    },
    LeftButton: function(){
        return (
            <global.YrcnApp.components.NavigatorLeftBtnView text={"<返回"} onPress={this._onPressLeftButton}/>
        );
    },
    RightButton: function(){
        return (
            <global.YrcnApp.components.NavigatorRightBtnView text={"完成"} onPress={this._onPressRightButton}/>
        );
    },
    _onPressLeftButton: function(){
        //global.YrcnApp.now.rootNavigator.pop();
        if(navigationBarRouteMapper.route.name == "ViewEditTodayContent"){
            global.YrcnApp.now.rootNavigator.pop();
            global.YrcnApp.now.scrollViewToday.refreshView();
        }else if(navigationBarRouteMapper.route.name == "ViewEditWorkingLog"){
            //
            global.YrcnApp.utils.confirm("是否提交",function(){

            },"温馨提示",function(){
                global.YrcnApp.now.rootNavigator.pop();
            })
        }
    },
    _onPressRightButton: function(){
        if(navigationBarRouteMapper.route.name == "ViewEditTodayContent"){
            global.YrcnApp.now.rootNavigator.pop();
            global.YrcnApp.now.scrollViewToday.refreshView();
        }else if(navigationBarRouteMapper.route.name == "ViewEditWorkingLog"){
            //
            global.YrcnApp.utils.confirm("是否提交",function(){

            },"温馨提示",function(){
                global.YrcnApp.now.rootNavigator.pop();
            })
        }
    },
}
//

//
var NavigatorTodayInner = React.createClass({
    getInitialState: function(){
        return {
        };
    },
    showLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return (
                <global.YrcnApp.components.NavigatorLeftBtnView text={"<返回"} onPress={this._onPressLeftButton}/>
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
                <global.YrcnApp.components.NavigatorRightBtnView text={"完成"} onPress={this._onPressRightButton}/>
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
        var initRoute = {name: this.props.indexName, index: 0,title: this.props.indexTitle};
        return (
            <Navigator
                initialRoute={initRoute}
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
        //console.log(route.name);
        //
        navigationBarRouteMapper.navigator = navigator;
        navigationBarRouteMapper.titleStr = route.title;
        navigationBarRouteMapper.route = route;
        var Component = null;
        var props = {};
        switch(route.name){
            case "ViewEditTodayContent": //
                props.indexName = this.props.indexName;
                props.indexTitle = this.props.indexTitle;
                props.type = this.props.type;
                props.coreObj = this.props.coreObj;
                Component = ViewEditTodayContent;
                navigationBarRouteMapper.navigator = global.YrcnApp.now.rootNavigator;
                break;
            case "ViewEditWorkingLog": //
                props.indexName = this.props.indexName;
                props.indexTitle = this.props.indexTitle;
                Component = ViewEditWorkingLog;
                navigationBarRouteMapper.navigator = global.YrcnApp.now.rootNavigator;
                break;
            case "ScrollViewShowTodayContent": //
                props.indexName = this.props.indexName;
                props.indexTitle = this.props.indexTitle;
                props.day = this.props.day;
                Component = ScrollViewShowTodayContent;
                navigationBarRouteMapper.navigator = global.YrcnApp.now.rootNavigator;
                break;
            case "ScrollViewShowTodayLlgBetweenContent": //
                props.indexName = this.props.indexName;
                props.indexTitle = this.props.indexTitle;
                props.between = this.props.between;
                Component = ScrollViewShowTodayLlgBetweenContent;
                navigationBarRouteMapper.navigator = global.YrcnApp.now.rootNavigator;
                break;
            case "CameraRollView": //
                props.indexName = this.props.indexName;
                props.indexTitle = this.props.indexTitle;
                Component = CameraRollView;
                break;
            case "ScrollViewSearchTodayContent": //
                props.indexName = this.props.indexName;
                props.indexTitle = this.props.indexTitle;
                Component = ScrollViewSearchTodayContent;
                navigationBarRouteMapper.navigator = global.YrcnApp.now.rootNavigator;
                break;
            case "ScrollViewShowTodaysContent": //
                props.contentObjArray = route.contentObjArray;
                Component = ScrollViewShowTodaysContent;
                break;
        }
        //console.log(props);
        return <Component
                    parent_route={route}
                    parent_navigator={navigator}
                    parent={this} {...props}/>
    }
});
//
module.exports = NavigatorTodayInner;