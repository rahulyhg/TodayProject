/**
 * 特别声明页面显示
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
    TouchableOpacity,
} from 'react-native';
//
var TextBox = require('../component/TextBox.js');
var ViewHeader = require('../component/ViewHeader.js');
//
/**
 * 定义属性：
 */
var SpecialStatementView = React.createClass({
    mixins: [],
    _vars:{},
    getDefaultProps: function(){
        return ({
        });
    },
    getInitialState: function(){
        return ({
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
        //this.props.parent.showLeftButton();
        //
        return (
            <View style={[styles.container]}>
                <ViewHeader title="特别声明" onPressLeft={this._onPressLeft}/>
                <TextBox>
                    <TextBox.Title text={"联系我们"}/>
                    <TextBox.Text text={"联系邮箱：weichuang950@163.com"}/>
                </TextBox>
                <TextBox>
                    <TextBox.Title text={"相关技术"}/>
                    <TextBox.Text text={"此APP是使用React Native开发，热烈欢迎其他爱好者与我们共同学习和探讨；"}/>
                </TextBox>
            </View>
        );
    },
    _onPressLeft: function(){
        YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex',selectedTab:'myLife'});
    }
});
//
module.exports = SpecialStatementView;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#ffffff',
    },
});