/**
 * 需要activity indicator的view box; 需要loading状态的view box;
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
/**
 * 定义属性：
 * animating 展现或隐藏
 */
var NoRecordViewBox = React.createClass({
    //在组件类创建的时候调用一次，然后返回值被缓存下来。如果父组件没有指定 props 中的某个键，则此处返回的对象中的相应属性将会合并到 this.props （使用 in 检测属性）。
    //该方法在任何实例创建之前调用，因此不能依赖于 this.props。另外，getDefaultProps() 返回的任何复杂对象将会在实例间共享，而不是每个实例拥有一份拷贝。
    getDefaultProps: function(){
        return ({
            noRecordText: "暂无记录",
            height: Dimensions.get('window').height,
            backgroundColor: '#ffffff',
        });
    },
    getInitialState:function(){
        return ({
        });
    },
    render: function(){
        if(this.props.loadingText && this.props.loadingText!=''){
            this.state.loadingText = this.props.loadingText;
        }
        //
        return (
            <View style={[styles.container,{height: this.props.height,backgroundColor: this.props.backgroundColor}]}>
                <Text style={[styles.text]}>{this.props.noRecordText}</Text>
            </View>
        );
    }
});
//
module.exports = NoRecordViewBox;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        textAlign:'center',
        color:'#aaaaaa',
        fontSize: 14,
    }
});