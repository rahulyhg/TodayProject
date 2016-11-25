/**
 * 读书段落显示
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
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
/**
 * 定义属性：
 * fontSize 文字大小 12-30
 * lineHeight 行间距 -1紧凑 0正常 1松散
 * marginTop 与上一个段落的间距
 * color 文字颜色
 * text 文字内容
 */
var ReadingBookParagraphText = React.createClass({
    //在组件类创建的时候调用一次，然后返回值被缓存下来。如果父组件没有指定 props 中的某个键，则此处返回的对象中的相应属性将会合并到 this.props （使用 in 检测属性）。
    //该方法在任何实例创建之前调用，因此不能依赖于 this.props。另外，getDefaultProps() 返回的任何复杂对象将会在实例间共享，而不是每个实例拥有一份拷贝。
    getDefaultProps: function(){
        return ({
            fontSize: 12,
            lineHeight: 8,
            marginTop: 20,
            color: '#000000',
        });
    },
    getInitialState:function(){
        return ({
            translateX: 0,
            numberOfLines: 999
        });
    },
    ////////////////
    //服务器端和客户端都只调用一次，在初始化渲染执行之前立刻调用。如果在这个方法内调用 setState，render() 将会感知到更新后的 state，将会执行仅一次，尽管 state 改变了。
    componentWillMount: function(){
        //this._root.setNativeProps({
        //    //firstLineHeadIndent: 24
        //});
    },
    //
    render: function(){
        //alert("render"+this.props.fontSize);
        //
        //console.log("render="+this.props.text);
        var text = this.props.text;
        var marginTop = this.props.marginTop || 20;
        if(this.props.isParagraphStart){
            //text = '”“”“”“”“'+text;
            text = '开始'+text;
        }else{
            marginTop = 0;
        }
        return (
            <Text style={{
                    fontSize: this.props.fontSize,
                    lineHeight: this.props.fontSize+this.props.lineHeight,
                    marginTop: marginTop,
                    textAlign: 'justify',
                    letterSpacing: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginBottom: 0,
                    fontFamily: 'HYNanGongJ',
                    color: this.props.color}}
                  numberOfLines={0}>
                {text}
            </Text>
        );
    },
});
//
module.exports = ReadingBookParagraphText;
//
var styles = StyleSheet.create({
});