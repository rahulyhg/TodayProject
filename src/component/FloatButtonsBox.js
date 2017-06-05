/**
 * 表单
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
    Dimensions,
    Animated,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var FloatButtonsBoxButton = require('./FloatButtonsBoxButton.js');
//
/**
 * 定义属性：
 */
var FloatButtonsBox = React.createClass({
    _vars:{},
    getDefaultProps: function(){
        return ({
            backgroundColor: '#ffffff',
            marginTop: 10,
        });
    },
    getInitialState: function(){
        return ({
            top: new Animated.Value(0),
            hideOrShowText: "∧",
        });
    },
    //statics 对象允许你定义静态的方法，这些静态的方法可以在组件类上调用。
    statics: {
        Button: FloatButtonsBoxButton,
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
        //console.log("render ButtonsBox");
        //
        return (
            <Animated.View style={[styles.container,{top: this.state.top,marginTop:this.props.marginTop}]}>
                {this.props.children}
                <FloatButtonsBoxButton btnText={this.state.hideOrShowText} onPress={this._onPress} backgroundColor={this.props.backgroundColor}/>
            </Animated.View>
        );
    },
    _onPress: function(){
        //this.state.top.setValue(-100);     // Start large
        //console.log(this.props.children.length)
        var oneRowHeight = 36;
        var childrenNum = 0;
        if(this.props.children.length){
            childrenNum = this.props.children.length;
        }else{
            childrenNum = 1;
        }
        if(this.state.top._value >= -10 && this.state.top._value <= 10){
            Animated.spring(                          // Base: spring, decay, timing
                this.state.top,                 // Animate `bounceValue`
                {
                    toValue: -1 * oneRowHeight * (childrenNum+1) + 10,                         // Animate to smaller size
                    friction: 1,                          // Bouncier spring
                }
            ).start();
            this.setState({
                hideOrShowText: "∨",
            });
        }else{
            Animated.spring(                          // Base: spring, decay, timing
                this.state.top,                 // Animate `bounceValue`
                {
                    toValue: 0,                         // Animate to smaller size
                    friction: 1,                          // Bouncier spring
                }
            ).start();
            this.setState({
                hideOrShowText: "∧",
            });
        }
    }
});
//
module.exports = FloatButtonsBox;
//
var styles = StyleSheet.create({
    container:{
        position: 'absolute',
        left: Dimensions.get('window').width-56,
        width: 54,
        marginTop: 10,
        marginLeft: 0,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        borderWidth: 1,
        borderColor: '#eeeeee',
        borderBottomLeftRadius: 54,
        borderBottomRightRadius: 54,
    },

});