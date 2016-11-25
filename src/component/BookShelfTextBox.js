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
 * navigator 导航器
 * icon 图标
 * title 标题
 */
var ListViewLi = React.createClass({
    render: function(){
        var navigator = this.props.navigator;
        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.iconView}>
                        <Image source={this.props.icon} style={styles.icon} resizeMode="stretch"/>
                    </View>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.title_1}>共{this.props.bookSum}本书籍</Text>
                        <Text style={styles.title_2}>最近阅读：《诗经》《论语》《论语》《论语》《论语》《论语》《论语》《论语》</Text>
                    </View>
                    <View style={styles.gtView}>
                        <Text style={styles.gt}>&gt;</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
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
        height: 120,
        backgroundColor: '#ffffff',
    },
    iconView:{
        flex: 3,
        alignItems: 'center',
        padding:10,
    },
    icon:{
        width: 100,
        height: 100,
    },
    titleView:{
        flex: 5,
        paddingTop: 17,
    },
    title:{
        fontSize: 16
    },
    title_1:{
        fontSize: 12,
        lineHeight: 16
    },
    title_2:{
        fontSize: 12,
        lineHeight: 16
    },
    gtView:{
        flex: 1.3,
        alignItems: 'center',
        paddingTop: 50,
    },
    gt:{
        color:'#aaaaaa',
        fontSize:20
    }
});