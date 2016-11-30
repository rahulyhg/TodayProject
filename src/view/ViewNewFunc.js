/**
 * 新功能引导
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
} from 'react-native';
//
/**
 * 定义属性：
 */
var ViewNewFunc = React.createClass({
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
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
    },
    //
    render: function(){
        //console.log("render");
        //
        return (
            <View style={[styles.container]}>
                <View style={[styles.rightBtn]}>
                </View>
                <View style={[styles.lineToBtn]}>
                </View>
                <View style={[styles.lineRow]}>
                </View>
                <TouchableOpacity style={[styles.iKnowBtn]} onPress={this.props.onPress}>
                    <Text style={[styles.iKnowBtnText]}>这些显示内容都可以编辑哦，我知道了(点我)</Text>
                </TouchableOpacity>
            </View>
        );
    },
});
//
module.exports = ViewNewFunc;
//
var styles = StyleSheet.create({
    container:{
        position: 'absolute',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#000000',
        top: 0,
        left: 0,
        opacity: 0.6,
    },
    rightBtn:{
        position: 'absolute',
        backgroundColor: '#ffffff',
        top: 20,
        left: Dimensions.get('window').width-50,
        width: 50,
        height: 30,
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 10,
    },
    lineToBtn:{
        position: 'absolute',
        backgroundColor: '#ffffff',
        top: 90,
        left: 0,
        width: Dimensions.get('window').width,
        height: 3,
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 10,
        transform: [{rotateZ:'-16deg'}]
    },
    lineRow:{
        position: 'absolute',
        backgroundColor: '#ffffff',
        top: 125,
        left: 0,
        width: Dimensions.get('window').width,
        height: 50,
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 0,
    },
    iKnowBtn:{
        position: 'absolute',
        bottom: 60,
        left: Dimensions.get('window').width-320,
        width: 300,
        height: 30,
        borderWidth: 2,
        borderColor: '#fefefe',
        borderRadius: 5,
    },
    iKnowBtnText:{
        color: '#ffffff',
        lineHeight: 23,
        textAlign: 'center',
    }
});