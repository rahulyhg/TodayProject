/**
 * 书籍搜索结果页面
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
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var BookSmallInfoBox = require('../component/BookSmallInfoBox.js');
var ACViewBox = require('../component/ACViewBox.js');
var TwoRowsTextBox = require('../component/TwoRowsTextBox.js');
var globalStyles = RNUtils.getGlobalStyles();
//
/**
 * NavigatorRoot_route={this.props.NavigatorRoot_route}
 NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}
 NavigatorBookLibrary_route={route}
 NavigatorBookLibrary_navigator={navigator}
 navigatorBookLibrary={this}
 */
var ListViewBookLibrarySearchBooks = React.createClass({
    _vars:{
        currentPage: 1,
    },
    getInitialState: function() {
        //console.log("getInitialState");
        //
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.key !== r2.key});
        //
        return {
            ds:ds,
            //数据源
            dataSource: ds.cloneWithRows([]),
            service: {},
            isShowLoadingView: true,
            status: -1,
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        //console.log("searchKey="+this.props.searchKey)
        _this._vars.currentPage = 0;
        RNAllService.getJson_bookLibrarySearchPoems({searchKey:this.props.searchKey,bCode:this.props.oneData.bCode},function(data){
            _this._vars.list = data.list;
            _this._vars.totalSize = data.totalSize;
            if(_this._vars.list.length <= 0){
                _this.setState({
                    dataSource: _this.state.ds.cloneWithRows(_this._vars.list),
                    service: data.service,
                    isShowLoadingView: false,
                    status: 0,
                });
            }else{
                _this._vars.currentPage ++ ;
                _this.setState({
                    dataSource: _this.state.ds.cloneWithRows(_this._vars.list),
                    service: data.service,
                    isShowLoadingView: false,
                    status: 1,
                });
            }
        })
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        //console.log("componentWillUnmount")
        this._vars.currentPage = 1;
    },
    _pressRow: function(rowData: string, sectionID: number, rowID: number) {
        this.props.NavigatorBookLibrary_navigator.push({name:"InfoPoem",title:rowData.title,poemInfoObj:rowData});
    },
    /**
     * 渲染每一行的数据
     * @param rowData   单行数据
     * @param sectionID
     * @param rowID
     * @returns {XML}
     * @private
     */
    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
        //console.log(rowData);
        //console.log(this.state.service);
        var content = rowData.content.replace(/<yrcn:p>/g,"").replace(/<\/yrcn:p>/g,"");
        return (
            <TouchableHighlight onPress={() => this._pressRow(rowData,sectionID,rowID)}>
                <View style={[globalStyles.row_container]}>
                    <TwoRowsTextBox title={rowData.title} introduce={content} author={rowData.author}/>
                </View>
            </TouchableHighlight>
        );
    },
    render: function(){
        var navigatorBookLibrary = this.props.navigatorBookLibrary;
        navigatorBookLibrary.showLeftButton();
        if(this.props.oneData.bCode.indexOf("bang") > -1 || (!this.props.oneData.showRightButton)){
            navigatorBookLibrary.hideRightButton();
        }else{
            navigatorBookLibrary.showRightButton();
        }
        if(this.state.isShowLoadingView){
            return (
                <View>
                    <ACViewBox />
                </View>
            );
        }else if(this.state.status == 0){
            return (
                <View style={styles.noDataView}>
                    <Text style={styles.noDataText}>哎呀，没有搜索到，抱歉...</Text>
                </View>
            );
        }else{
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    style={styles.listViewContainer}
                    initialListSize={20}
                    pageSize={20}
                    onEndReachedThreshold={600}
                    onEndReached={this._onEndReached}
                    name="ListViewBookLibrarySearchBooks">
                </ListView>
            );
        }
    },
    _onEndReached: function(){
        //alert("_onEndReached");
        var _this = this;
        if(_this._vars.list.length >= _this._vars.totalSize){
            return;
        }
        RNAllService.getJson_bookLibrarySearchPoems({
            currentPage: _this._vars.currentPage,
            searchKey:this.props.searchKey,
            bCode:this.props.oneData.bCode
        },function(data){
            _this._vars.totalSize = data.totalSize;
            _this._vars.list = _this._vars.list.concat(data.list);
            //alert(_this._vars.list.length);
            _this._vars.currentPage ++;
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(_this._vars.list),
                service: data.service,
                isShowLoadingView: false
            });
        })
    }
});
//
var styles = StyleSheet.create({
    listViewContainer:{
        backgroundColor: '#efeff5',
        marginTop: 44
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
    noDataView:{
        marginTop: 50,
    },
    noDataText:{
        fontSize: 14,
        color: '#464646',
        lineHeight: 26,
        textAlign: 'center',
    },
});
//
module.exports = ListViewBookLibrarySearchBooks;