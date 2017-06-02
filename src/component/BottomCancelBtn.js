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
} from 'react-native';
//
/**
 * 定义属性：
 */
var BottomCancelBtn = React.createClass({
    getDefaultProps: function(){
        return ({
            onPress: function(){

                YrcnApp.now.$ViewRoot.setState({viewName:YrcnApp.now.$ViewRoot._vars.prevViewName});
            }
        });
    },
    getInitialState: function(){
        return ({
        });
    },
    //
    render: function(){
        //
        return (
            <TouchableOpacity style={[styles.bottomCancelView]} onPress={this.props.onPress}>
                <Text style={[styles.bottomCancelText]}>取消</Text>
            </TouchableOpacity>
        );
    }
});
//
module.exports = BottomCancelBtn;
//
var styles = StyleSheet.create({
    bottomCancelView:{
        width:60,
        height: 40,
        borderWidth: 0,
        position: 'absolute',
        left: 0,
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
    bottomCancelText:{
        fontSize: 16,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700'
    }

});