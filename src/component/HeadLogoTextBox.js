/**
 * headLogo text >
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
var HeadLogoTextBox = React.createClass({
    render: function(){
        //
        var navigator = this.props.navigator;
        //
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View style={styles.iconView}>
                    <Image source={this.props.icon} style={styles.icon} resizeMode="cover"/>
                </View>
                <View style={styles.titleView}>
                    <Text>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </Text>
                </View>
                <View style={styles.gtView}>
                    <Text style={styles.gt}>&gt;</Text>
                </View>
            </TouchableOpacity>
        );
    }
});
//
module.exports = HeadLogoTextBox;
//
var styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        //alignItems: 'center',
        //justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        height: 120,
        backgroundColor: '#f7f7f2',
    },
    iconView:{
        flex: 2,
        alignItems: 'center',
        //justifyContent: 'center',
        paddingTop:15
    },
    icon:{
        width: 90,
        height: 90,
        borderRadius: 10
    },
    titleView:{
        flex: 2,
        paddingTop: 17,
        justifyContent: 'center',
    },
    title:{
        fontSize: 16
    },
    gtView:{
        width: 50,
        alignItems: 'center',
        paddingTop: 50,
    },
    gt:{
        color:'#aaaaaa',
        fontSize:20
    }
});