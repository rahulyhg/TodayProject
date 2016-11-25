/**
 * 搜索诗词
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Timers,
    Image,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
var ListViewLi = require('../component/ListViewLi.js');
//
/**
 * 定义属性：
 */
var SearchPoemsView = React.createClass({
    mixins: [],
    _vars:{},
    getDefaultProps: function(){
        return ({
        });
    },
    getInitialState: function(){
        return ({
            appBundleV: "",
        });
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;

    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
    },
    //
    render: function(){
        //console.log("render");
        var navigatorBookLibrary = this.props.navigatorBookRoom;
        navigatorBookLibrary.showLeftButton();
        //
        return (
            <View style={[styles.container]}>
                <View style={styles.topView}>
                    <View style={styles.topInputView}>
                        <TextInput keyboardType={"web-search"} placeholder={"诗词曲赋"}/>
                    </View>
                    <View style={styles.topCancelView}>
                        <Text>取消</Text>
                    </View>
                </View>
                <View style={styles.centerView}>

                </View>
                <View style={styles.bottomView}>

                </View>
            </View>
        );
    }
});
//
module.exports = SearchPoemsView;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#f7f7f2',
    },
    topView:{
        width:Dimensions.get('window').width,
        marginTop: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    topInputView:{
        flex:1,
    },
    topCancelView:{
        width: 40,
    },
    centerView:{
        width:Dimensions.get('window').width,
        position: 'absolute',
        bottom: (Dimensions.get('window').height/2)-80,
        left: 0,
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
    },
    bottomView:{
        width:Dimensions.get('window').width,
        position: 'absolute',
        bottom: 30,
        left: 0,
    },
    bottomText:{
        textAlign:'center',
        fontSize: 12,
    },
    logo:{
        width: 100,
        height: 100,
    },
    erweima:{
        width: 200,
        height: 200,
    },
});