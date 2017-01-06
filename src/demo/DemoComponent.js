/**
 * title     >
 * introduce...
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
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
/**
 * 定义属性：
 */
var DemoComponent = React.createClass({
    //在组件挂载之前调用一次。返回值将会作为 this.state 的初始值。
    getInitialState: function(){

    },
    //在组件类创建的时候调用一次，然后返回值被缓存下来。如果父组件没有指定 props 中的某个键，则此处返回的对象中的相应属性将会合并到 this.props （使用 in 检测属性）。
    //该方法在任何实例创建之前调用，因此不能依赖于 this.props。另外，getDefaultProps() 返回的任何复杂对象将会在实例间共享，而不是每个实例拥有一份拷贝。
    getDefaultProps: function(){

    },
    //propTypes 对象允许验证传入到组件的 props。
    propTypes: {

    },
    //mixin 数组允许使用混合来在多个组件之间共享行为
    mixins: [],
    //statics 对象允许你定义静态的方法，这些静态的方法可以在组件类上调用。
    statics: {

    },
    //displayName 字符串用于输出调试信息。
    displayName: "",
    ////////////////
    //服务器端和客户端都只调用一次，在初始化渲染执行之前立刻调用。如果在这个方法内调用 setState，render() 将会感知到更新后的 state，将会执行仅一次，尽管 state 改变了。
    componentWillMount: function(){

    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){

    },
    //在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
    //用此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。老的 props 可以通过 this.props 获取到。在该函数中调用 this.setState() 将不会引起第二次渲染。
    componentWillReceiveProps: function(){

    },
    //在接收到新的 props 或者 state，将要渲染之前调用。该方法在初始化渲染的时候不会调用，在使用 forceUpdate 方法的时候也不会。
    //如果确定新的 props 和 state 不会导致组件更新，则此处应该 返回 false。
    shouldComponentUpdate: function(){

    },
    //在接收到新的 props 或者 state 之前立刻调用。在初始化渲染的时候该方法不会被调用。
    //使用该方法做一些更新之前的准备工作。
    componentWillUpdate: function(){

    },
    //在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
    //使用该方法可以在组件更新之后操作 DOM 元素。
    componentDidUpdate: function(){

    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){

    },
    render: function(){
        return (
            <View style={[styles.container]}>

            </View>
        );
    }
});
//
module.exports = DemoComponent;
//
var styles = StyleSheet.create({
    container:{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eeeeee',
        backfaceVisibility:'hidden',
        paddingTop: 10,
        paddingBottom: 10,
    },
    title_container:{
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        paddingLeft:10,
        paddingBottom: 6,
    },
    titleView:{
        flex: 9,
        alignItems: 'flex-start',
    },
    title:{
        fontSize:15,
        fontWeight:'600',
    },
    author:{
        fontSize:12,
        fontWeight:'200',
    },
    gtView:{
        flex: 1,
        alignItems: 'center',
    },
    gt:{
        color:'#aaaaaa',
        fontSize:16
    },
    introduce_container:{
        paddingTop: 8,
        paddingLeft:10,
        paddingRight:10,
    },
    introduce:{
        fontSize:13,
        fontWeight:'100',
        lineHeight: 20,
        textAlign:'left',
    }
});