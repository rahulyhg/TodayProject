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
var BookShelfOneBookView = require('../component/BookShelfOneBookView_02');
var globalStyles = RNUtils.getGlobalStyles();
//
/**
 * NavigatorRoot_route={this.props.NavigatorRoot_route}
 NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}
 NavigatorBookShelf_route={route}
 NavigatorBookShelf_navigator={navigator}
 navigatorBookShelf={this}
 */
var ListViewBookShelfBooks = React.createClass({
    _vars:{
        currentPage: 1,
    },
    getInitialState: function() {
        //
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.key !== r2.key});
        //
        return {
            ds:ds,
            //数据源
            dataSource: ds.cloneWithRows([]),
            isShowLoadingView: true
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNUtils.getBookShelf(this.props.NavigatorRoot_route.title,function(bookShelfObj){
            _this._vars.list = bookShelfObj.bookObjs;
            var status = -1;
            if(_this._vars.list.length == 0){
                status = 0;
            }
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(_this._vars.list),
                isShowLoadingView: false,
                status: status,
            });
        })
    },
    pressRow: function(rowData: string, sectionID: number, rowID: number) {
        //console.log("click row"+rowID+this.props.navigator);
        this.props.NavigatorRoot_navigator.push({name:"ReadingBook",bookInfo:rowData});
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
        var key = Math.uuidFast();
        return (
            <View key={key}>
                <BookShelfOneBookView bookInfoObj={rowData} parent={this} shelfName={this.props.shelfName}/>
            </View>
        );
    },
    render: function(){
        YrcnApp.components.StatusBar.setBarStyle('light-content',true);
        StatusBar.setHidden(false,'slide');
        var navigatorBookShelf = this.props.navigatorBookShelf;
        navigatorBookShelf.showLeftButton();
        //if(this.props.bookDesk){
        //    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
        //    this.state.dataSource = ds.cloneWithRows(this.props.bookDesk.bookObjs);
        //    this.state.isShowLoadingView = false;
        //    this.state.status = this.props.bookDesk.bookObjs.length==0?0:-1;
        //}
        if(this.state.isShowLoadingView){
            return (
                <View>
                    <ACViewBox />
                </View>
            );
        }else if(this.state.status==0){//空空的书桌
            //console.log("空空的书桌");
            return (
                <View style={styles.status_0_View}>
                    <Text>“空空如也”</Text>
                </View>
            );
        }else{
            //alert("render"+this.state.dataSource._cachedRowCount);
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    style={styles.listViewContainer}
                    name="ListViewBookShelfBooks">
                </ListView>
            );
        }
    },
    _onEndReached: function(){
        //alert("_onEndReached");
        var _this = this;
    },
    refreshDataSource:function(bookObj){
        var _this = this;
        _this.setState({
            isShowLoadingView: true,
        });
        RNUtils.getBookShelf(this.props.NavigatorRoot_route.title,function(bookShelfObj){
            _this._vars.list = bookShelfObj.bookObjs;
            var status = -1;
            if(_this._vars.list.length == 0){
                status = 0;
            }
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(_this._vars.list),
                isShowLoadingView: false,
                status: status,
            });
        })
    }
});
//
var styles = StyleSheet.create({
    listViewContainer:{
        backgroundColor: '#efeff5',
        marginTop: 50,
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
module.exports = ListViewBookShelfBooks;