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
        var _this = this;
        _this._vars.currentPage = 1;
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
        _this._vars.currentPage = 1;
        RNAllService.getJson_bookLibrarySearch({searchKey:this.props.searchKey,bCode:this.props.oneData.bCode},function(data){
            _this._vars.list = data.list;
            _this._vars.totalSize = data.totalSize;
            _this._vars.currentPage ++ ;
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(_this._vars.list),
                service: data.service,
                isShowLoadingView: false,
                status: _this._vars.list.length,
            });
        })
    },
    _pressRow: function(rowData: string, sectionID: number, rowID: number) {
        var _this = this;
        RNUtils.getBookInfo(rowData.id,function(bookInfoObj){
            //console.log(rowData.id);
            //console.log(bookInfoObj);
            //console.log(bookInfoObj.shelfName);
            if(bookInfoObj){
                rowData.shelfName = bookInfoObj.shelfName;
            }
            _this.props.NavigatorBookLibrary_navigator.push({name:"InfoBook",title:'书籍信息',bookInfo:rowData,service:_this.state.service});
        });
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
        return (
            <TouchableHighlight onPress={() => this._pressRow(rowData,sectionID,rowID)}>
                <View style={[globalStyles.row_container]}>
                    <TwoRowsTextBox title={rowData.bookName} introduce={rowData.introduce} author={rowData.author}/>
                </View>
            </TouchableHighlight>
        );
    },
    render: function(){
        var navigatorBookLibrary = this.props.navigatorBookLibrary;
        navigatorBookLibrary.showLeftButton();
        navigatorBookLibrary.hideRightButton();
        if(this.state.isShowLoadingView){
            return (
                <View>
                    <ACViewBox />
                </View>
            );
        }else if(this.state.status==0) {//尚未搜索到任何书籍
            return (
                <View style={styles.status_0_View}>
                    <Text>“尚未搜索到任何书籍”</Text>
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
        RNAllService.getJson_bookLibrarySearch({
            currentPage: _this._vars.currentPage,
            searchKey:_this.props.searchKey,
            bCode:_this.props.oneData.bCode
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
    status_0_View:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems:'center',
    },
    status_0_Text:{

    }
});
//
module.exports = ListViewBookLibrarySearchBooks;