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
    TextInput,
    Dimensions,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
/**
 * 定义属性：
 * navigator 导航器
 * icon 图标
 * title 标题
 */
var TwoRowsTextBox = React.createClass({
    render: function(){
        return (
            <View style={[globalStyles.box_container,styles.container]}>
                <View style={styles.title_container}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>
                            《{this.props.title}》
                            <Text style={styles.author}>  {this.props.author} 著</Text>
                        </Text>
                    </View>
                    <View style={styles.gtView}>
                        <Text style={styles.gt}>&gt;</Text>
                    </View>
                </View>
                <View style={styles.introduce_container}>
                    <Text style={styles.introduce} numberOfLines={4}>{this.props.introduce}</Text>
                </View>
            </View>
        );
    }
});
//
module.exports = TwoRowsTextBox;
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
        overflow: 'hidden',
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