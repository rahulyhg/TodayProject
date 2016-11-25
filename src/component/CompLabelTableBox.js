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
/**
 *
 labelText={rowData.aName}
 tableArray={rowData.aData}
 NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}
 */
var CompLabelTableBox = React.createClass({
    render: function(){
        var navigator = this.props.NavigatorRoot_navigator;
        //console.log(navigator);
        return (
            <View>
                <CompLabel labelText={this.props.labelText}></CompLabel>
                <CompTable tableArray={this.props.tableArray} navigator={navigator}></CompTable>
            </View>
        );
    }
});
//
module.exports = CompLabelTableBox;
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
        };
    },
    _pressOneData: function(oneData){
        //console.log(oneData);
        //StatusBar.setHidden(true);
        var navigator = this.props.navigator;
        if(oneData.bCode.indexOf("poem")>-1){
            navigator.push({
                name:"NavigatorBookLibrary_01",
                title:oneData.bName,
                indexName:"ListViewBookLibrarySearchPoems",
                oneData:oneData,
            });
        }else{
            navigator.push({
                name:"NavigatorBookLibrary_01",
                title:oneData.bName,
                indexName:"ListViewBookLibrarySearchBooks",
                oneData:oneData,
            });
        }
    },
    _renderOneView: function(index,oneData){
        var style = styles.column_0;
        if(index == 1){
            style = styles.column_1;
        }else if(index == 2){
            style = styles.column_2;
        }
        return <View style={style}>
            <TouchableOpacity onPress={()=>this._pressOneData(oneData)}>
                <Text style={styles.text}>{oneData.bName}</Text>
                <Text style={styles.textNum}>{oneData.bNum}</Text>
            </TouchableOpacity>
        </View>
    },
    _renderOneRow: function(data0,data1,data2){
        var _this = this;
        data0 = data0 || {};
        data1 = data1 || {};
        data2 = data2 || {};
        return (<View key={data0.bName} style={styles.row}>
            {_this._renderOneView(0,data0)}
            {_this._renderOneView(1,data1)}
            {_this._renderOneView(2,data2)}
        </View>);
    },
    render: function(){
        var _this = this;
        var jsxArray = [];
        for(var i=0;i<this.props.tableArray.length;i=i+3){
            var data0 = this.props.tableArray[i];
            var data1 = this.props.tableArray[i+1];
            var data2 = this.props.tableArray[i+2];
            var row = _this._renderOneRow(data0,data1,data2);
            jsxArray.push(row);
        }
        return (
            <View style={styles.compTable}>
                {
                    jsxArray
                }
            </View>
        );
    }
});
//
var styles = StyleSheet.create({
    viewLabel: {
        borderLeftColor: '#49b954',
        borderLeftWidth: 5,
        marginLeft: 10,
        paddingLeft: 10,
        marginTop: 20
    },
    textLabel: {
        fontSize: 16,
    },
    compTable: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e9e7e3',
        flex:1
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#e9e7e3',
    },
    column_0: {
        borderRightWidth: 1,
        borderColor: '#e9e7e3',
        paddingBottom: 10,
        flex: 1
    },
    column_1: {
        borderRightWidth: 1,
        borderColor: '#e9e7e3',
        paddingBottom: 10,
        flex: 1
    },
    column_2: {
        paddingBottom: 10,
        flex: 1
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'bottom',//android专用
        color: '#6c6c6c',
        lineHeight: 30,
        height: 30,//android新增 lineHeight不可用
        fontSize: 12,
    },
    textNum: {
        textAlign: 'center',
        textAlignVertical: 'bottom',//android专用
        fontSize: 13,
        color: '#a4a4a4',
        lineHeight: 30,
        height: 30,//android新增 lineHeight不可用
    }
});