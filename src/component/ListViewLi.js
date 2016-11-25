/**
 * li >
 * li >
 * li >
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
 * navigator 导航器
 * icon 图标
 * title 标题
 * smallText
 */
var ListViewLi = React.createClass({
    //在组件类创建的时候调用一次，然后返回值被缓存下来。如果父组件没有指定 props 中的某个键，则此处返回的对象中的相应属性将会合并到 this.props （使用 in 检测属性）。
    //该方法在任何实例创建之前调用，因此不能依赖于 this.props。另外，getDefaultProps() 返回的任何复杂对象将会在实例间共享，而不是每个实例拥有一份拷贝。
    getDefaultProps: function(){
        return ({
            smallText: '',
            color: '#444444',
            rightColor:'#aaaaaa',
        });
    },
    render: function(){
        var navigator = this.props.navigator;
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.container}>
                    {this._renderIconView()}
                    <View style={styles.titleView}>
                        <Text style={[styles.title,{color:this.props.color}]}>{this.props.title}</Text>
                    </View>
                    <View style={styles.gtView}>
                        <Text style={[styles.gt,{color:this.props.rightColor}]}><Text style={[styles.smallText]}>{this.props.smallText}</Text>&gt;</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    },
    _renderIconView: function () {
        if(this.props.icon){
            return (
                <View style={styles.iconView}>
                    <Image source={this.props.icon} style={styles.icon}/>
                </View>
            );
        }
    },
});
//
module.exports = ListViewLi;
//
var styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        height: 50,
    },
    iconView:{
        flex: 1,
        alignItems: 'center',
        paddingTop: 15,
    },
    icon:{
        width: 20,
        height: 20,
    },
    titleView:{
        flex: 3,
        paddingTop: 17,
        paddingLeft: 15,
    },
    title:{
        fontSize: 16
    },
    gtView:{
        width: 40,
        paddingTop: 17,
        paddingRight: 15,
    },
    gt:{
        fontSize:16,
        textAlign: 'right',
    },
    smallText:{
        fontSize:14,
        color:'#aaaaaa',
    }
});