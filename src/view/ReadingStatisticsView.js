/**
 * 阅读统计
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Timers,
    Image,
    ListView,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var globalStyles = RNUtils.getGlobalStyles();
var ACViewBox = require('../component/ACViewBox.js')
var InfosBox = require('../component/InfosBox.js');
var ButtonsBox = require('../component/ButtonsBox.js');
//
/**
 * 定义属性：
 */
var PersonalInfoView = React.createClass({
    _vars:{
    },
    getDefaultProps: function(){
        return ({

        });
    },
    getInitialState: function(){
        var _this = this;
        //
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return ({
            ds: ds,
            dataSource: ds.cloneWithRows([]),
            bookShelfListLength: 0,
            bookObjsLength: 0,
        });
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        var bookObjsLength = 0;
        var innerFuncCount = 0;
        RNUtils.getBookShelfList(function(bookShelfListObj){
            for(var i=0;i<bookShelfListObj.list.length;i++){
                var bookShelf = bookShelfListObj.list[i];
                RNUtils.getBookShelf(bookShelf.shelfName,function(bookShelfObj){
                    innerFuncCount++;
                    bookObjsLength+=bookShelfObj.bookObjs.length;
                    bookShelf.bookObjs = bookShelfObj.bookObjs;
                    innerFunc();
                })
            }
            function innerFunc(){
                if(bookShelfListObj.list.length == innerFuncCount){
                    _this.setState({
                        dataSource: _this.state.ds.cloneWithRows(bookShelfListObj.list),
                        bookShelfListLength: bookShelfListObj.list.length,
                        bookObjsLength: bookObjsLength,
                    });
                }
            }
        })
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
    },
    //
    render: function(){
        var _this = this;
        var navigatorBookLibrary = this.props.navigatorBookRoom;
        navigatorBookLibrary.showLeftButton();
        //
        return (
            <View style={[styles.container]}>
                <InfosBox>
                    <InfosBox.Item label={"共有书架"} value={this.state.bookShelfListLength+"个"}/>
                    <InfosBox.Item label={"共有书籍"} value={this.state.bookObjsLength+"本"} borderBottomWidth={0}/>
                </InfosBox>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    style={styles.listViewContainer}
                    name="">
                </ListView>
            </View>
        );
    },
    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
        //console.log(rowData);
        rowData.bookObjs = rowData.bookObjs||[];
        var key = Math.uuidFast();
        return (
            <InfosBox key={key}>
                <InfosBox.Item label={"书架名称"} value={rowData.shelfName}/>
                <InfosBox.Item label={"共有书籍"} value={rowData.bookObjs.length+"本"} borderBottomWidth={0}/>
            </InfosBox>
        );
    },
});
//
module.exports = PersonalInfoView;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#fafafa',
        paddingTop: 60,
    },
    listViewContainer:{
        width:Dimensions.get('window').width,
        backgroundColor: '#fafafa',
    }
});