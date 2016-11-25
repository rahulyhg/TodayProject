/**
 * label
 * table
 *
 * label-talbe box
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
var ReadingBook = require('../view/ReadingBook.js');
//
var BookSmallInfoBox = React.createClass({
    render: function(){
        var rowData = this.props.data;
        var service = this.props.service;
        return (
            <View>
                <View style={styles.row}>
                    <Image source={{uri:rowData.img01}} resizeMode="contain" style={styles.rowImage}/>
                    <View style={styles.rowText}>
                        <View>
                            <Text style={styles.bookName}>
                                {rowData.bookName}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.author}>
                                {rowData.author}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.introduce}>
                                {rowData.introduce.substring(0,85)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
});
//
module.exports = BookSmallInfoBox;
//
var CompLabel = React.createClass({
    render: function(){
        return (
            <View style={styles.viewLabel}>
                <Text style={styles.textLabel}>{this.props.labelText}</Text>
            </View>
        );
    }
});
//
var CompTable = React.createClass({
    getInitialState: function(){
        return {
            data: [
                {
                    bName:"现当代小说",
                    bNum:"100"
                }
            ]
        };
    },
    _pressOneData: function(key){
        //console.log(key);
        StatusBar.setHidden(true);
    },
    _renderOneView: function(index,oneData){
        var style = styles.column_0;
        if(index == 1){
            style = styles.column_1;
        }else if(index == 2){
            style = styles.column_2;
        }
        return <View style={style}>
            <TouchableOpacity onPress={()=>this._pressOneData(oneData.bID)}>
                <Text style={styles.text}>{oneData.bName}</Text>
                <Text style={styles.textNum}>{oneData.bNum}</Text>
            </TouchableOpacity>
        </View>
    },
    render: function(){
        var _this = this;
        return (
            <View style={styles.compTable}>
                {
                    this.props.tableArray.map(function(data,i){
                        //console.log(data);
                        //console.log(i);
                        if(data.length == 3){
                            return <View key={data[0].bID} style={styles.row}>
                                {_this._renderOneView(0,data[0])}
                                {_this._renderOneView(1,data[1])}
                                {_this._renderOneView(2,data[2])}
                            </View>
                        }else if(data.length == 2){
                            return <View key={data[0].bID} style={styles.row}>
                                {_this._renderOneView(0,data[0])}
                                {_this._renderOneView(1,data[1])}
                                {_this._renderOneView(2,{})}
                            </View>
                        }
                    })
                }
            </View>
        );
    }
});
//
var styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#f7f7f2',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    rowImage: {
        flex: 1,
        height: 120,
        borderRadius: 5
    },
    rowText: {
        flex: 3,
        paddingLeft:10
    },
    separator: {/** 分隔线 */
        height: 1,
        backgroundColor: '#b9b9b9',
        marginLeft: 10,
        marginRight: 0,
    },
    bookName: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
        color: '#323232',
    },
    author: {
        fontSize: 12,
        fontWeight: '300',
        lineHeight: 20,
        color: '#918e83'
    },
    introduce: {
        fontSize: 12,
        fontWeight: '300',
        lineHeight: 19,
        color: '#b5b5b4'
    },
});