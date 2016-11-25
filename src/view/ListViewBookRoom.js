/**
 * 书房
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
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var CompLabelTableBox = require('../component/CompLabelTableBox.js');
var HeadLogoTextBox = require('../component/HeadLogoTextBox.js');
var ListViewLi = require('../component/ListViewLi.js');
var ACViewBox = require('../component/ACViewBox.js');
/**
 *
 NavigatorRoot_route={this.props.NavigatorRoot_route}
 NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}
 NavigatorBookLibrary_route={route}
 NavigatorBookLibrary_navigator={navigator}
 navigatorBookLibrary={this}
 */
var ListViewBookRoom = React.createClass({
    getInitialState: function() {
        //
        return {
            //数据源
            isShowLoadingView: true,
            appBundleV: "",
            userInfo:null,
            uuid:"",
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        //console.log("componentDidMount")
        var _this = this;
        RNUtils.getAppInfo(function (appInfo) {
            RNUtils.getLoginInfo(function(obj){
                //console.log(obj)
                _this.setState({
                    appBundleV: "V"+appInfo.appBundleV+"      ",
                    userInfo: obj?obj.userInfo:null,
                    uuid: Math.uuidFast(),
                    isShowLoadingView: false,
                });
            })
        });
    },
    //在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
    //用此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。老的 props 可以通过 this.props 获取到。在该函数中调用 this.setState() 将不会引起第二次渲染。
    componentWillReceiveProps: function(){
        var _this = this;
        //console.log("componentWillReceiveProps")
        this.setState({
            isShowLoadingView: true,
        });
        RNUtils.getLoginInfo(function(obj){
            //console.log(obj)
            _this.setState({
                userInfo: obj?obj.userInfo:null,
                uuid: Math.uuidFast(),
                isShowLoadingView: false,
            });
        })
    },
    //在接收到新的 props 或者 state 之前立刻调用。在初始化渲染的时候该方法不会被调用。
    //使用该方法做一些更新之前的准备工作。
    componentWillUpdate: function(){
        var _this = this;
        //console.log("componentWillUpdate")
        //RNUtils.getLoginInfo(function(obj){
        //    console.log(obj)
        //    _this.setState({
        //        userInfo: obj?obj.userInfo:null,
        //        uuid: Math.uuidFast(),
        //    });
        //})
    },
    //在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
    //使用该方法可以在组件更新之后操作 DOM 元素。
    componentDidUpdate: function(){
        //console.log("componentDidUpdate")
        var _this = this;
    },
    render: function(){
        //console.log("ListViewBookRoom render");
        var _this = this;
        YrcnApp.components.StatusBar.setBarStyle('light-content',true);
        StatusBar.setHidden(false,'slide');
        var navigator = this.props.navigator;
        var navigatorBookLibrary = this.props.navigatorBookLibrary;
        //navigatorBookLibrary.hideLeftButton();
        //navigatorBookLibrary.showRightButton();
        //return (
        //    <View style={styles.container}>
        //        {_this.state.isShowLoadingView?function(){
        //            console.log("1");
        //            return (
        //                <View>
        //                    <ACViewBox />
        //                </View>
        //            );
        //        }():function(){
        //            console.log("2");
        //            return (
        //                <ListView
        //                    dataSource={_this.state.dataSource}
        //                    renderRow={_this._renderRow}
        //                    style={styles.listViewContainer}
        //                    onChangeVisibleRows={_this._onChangeVisibleRows}
        //                    uuid={_this.state.uuid}
        //                    name={_this.state.uuid}>
        //                </ListView>
        //            );
        //        }()}
        //    </View>
        //);
        return (
            <ScrollView style={styles.container}>
                {_this.state.userInfo?function(){
                    //console.log("1");
                    var icon = require("image!headIcon");
                    return (
                        <TouchableOpacity style={styles.headLogoView}>
                            <HeadLogoTextBox title={_this.state.userInfo.niCheng} icon={icon} onPress={_this._onPressHeadLogo}/>
                        </TouchableOpacity>
                    );
                }():function(){
                    //console.log("2");
                    var icon = require("image!headIcon");
                    return (
                        <TouchableOpacity>
                            <HeadLogoTextBox title={"尚未登录"} userInfo={_this.state.userInfo} icon={icon} onPress={_this._onPressHeadLogo}/>
                        </TouchableOpacity>
                    );
                }()}
                {function(){
                    var icon = require("image!likeIcon");
                    return (
                        <View>
                            <ListViewLi title="我的收藏" icon={icon}/>
                        </View>
                    );
                }()}
                {function(){
                    var icon = require("image!attentionIcon");
                    return (
                        <View>
                            <ListViewLi title="我的关注" icon={icon}/>
                        </View>
                    );
                }()}
                {function(){
                    var icon = require("image!commentIcon");
                    return (
                        <View>
                            <ListViewLi title="我的评论" icon={icon}/>
                        </View>
                    );
                }()}
                {function(){
                    var icon = require("image!aboutIcon");
                    return (
                        <View>
                            <ListViewLi title="关于我们" icon={icon} smallText={_this.state.appBundleV} onPress={_this._onPressAbout}/>
                        </View>
                    );
                }()}
            </ScrollView>
        );
    },
    _onPressHeadLogo: function(){
        //console.log("_onPressHeadLogo")
        if(this.state.userInfo==null){
            this.props.NavigatorRoot_navigator.push({name:"NavigatorBookRoom_01",indexName:"Login",indexTitle:'登录'});
        }else{
            this.props.NavigatorRoot_navigator.push({name:"NavigatorBookRoom_01",indexName:"PersonalInfo",indexTitle:'个人信息'});
        }
    },
    _onPressAbout: function(){
        //console.log("_onPressAbout")
        this.props.NavigatorRoot_navigator.push({name:"NavigatorBookRoom_01",indexName:"About",indexTitle:'关于'});
    },
    _onChangeVisibleRows:function(){
        //console.log("_onChangeVisibleRows")
    }
});
//
var styles = StyleSheet.create({
    container:{
        backgroundColor: '#f7f7f2',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        top: 0,
        left: 0,
        paddingTop: 30,
    },
    listViewContainer:{
        backgroundColor: '#f7f7f2',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        top:50,
    },
});
//
module.exports = ListViewBookRoom;