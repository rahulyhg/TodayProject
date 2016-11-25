/**
 * 书库
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
    Timers,
    ActionSheetIOS,
    ListView,
    ScrollView,
    TouchableHighlight,
    Platform,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var CompLabelTableBox = require('../component/CompLabelTableBox.js');
var ACViewBox = require('../component/ACViewBox.js');
/**
 *
 */
var ListViewBookLibrary = React.createClass({
    getInitialState: function() {
        //
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.key !== r2.key});
        //
        return {
            //数据源
            ds:ds,
            dataSource: ds.cloneWithRows([]),
            isShowLoadingView: true
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNAllService.getJson_bookLibraryTypes(function(data){
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(data.list),
                isShowLoadingView: false
            });
        })
    },
    /**
     */
    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
        return (
            <View>
                <CompLabelTableBox
                    labelText={rowData.aName}
                    tableArray={rowData.aData}
                    NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}
                    NavigatorBookLibrary_navigator={this.props.NavigatorBookLibrary_navigator}>
                </CompLabelTableBox>
            </View>
        );
    },
    render: function(){
        //console.log();
        var navigatorBookLibrary = this.props.navigatorBookLibrary;
        navigatorBookLibrary.hideLeftButton();
        navigatorBookLibrary.showRightButton();
        if(this.state.isShowLoadingView){
            return (
                <View>
                    <ACViewBox />
                </View>
            );
        }else{
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    style={styles.listViewContainer}
                    name="ListViewBookDesk">
                </ListView>
            );
        }
    }
});
//
var styles = StyleSheet.create({
    listViewContainer:{
        backgroundColor: '#f7f7f2',
        marginTop: 50,
        marginBottom: Platform.OS === 'ios'?50:0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20,
        paddingRight: 10,
        paddingBottom: 20,
        paddingLeft: 10,
        backgroundColor: '#fafafa',
    },
    rowImage: {
        flex: 1,
        height: 120,
    },
    rowText: {
        flex: 3,
        paddingLeft:10
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd8d5',
        marginLeft: 10,
        marginRight: 10,
    },
    thumb: {
        width: 90,
        height: 120,
    },
    bookName: {
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 20,
        color: '#323232',
    },
    author: {
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 20,
        color: '#918e83'
    },
    introduce: {
        fontSize: 13,
        fontWeight: '300',
        lineHeight: 19,
        color: '#918e83'
    },
});
//
module.exports = ListViewBookLibrary;