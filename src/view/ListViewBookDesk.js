/**
 * 书桌
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StatusBar,
    StyleSheet,
    ListView,
    Image,
    Text,
    TouchableHighlight,
    View,
    Dimensions,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var ACViewBox = require('../component/ACViewBox.js');
var BookDeskOneBookView = require('../component/BookDeskOneBookView_02');
//var BookDeskOneBookView = require('../component/BookDeskOneBookView_02.js');
//
var ListViewBookDesk = React.createClass({
    _vars:{
    },
    getInitialState: function() {
        //
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //console.log(this.props.bookDesk);
        //
        return {
            //数据源
            ds: ds,
            dataSource: ds.cloneWithRows([]),
            isShowLoadingView: true,
            status: -1,
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        //console.log("componentDidMount");
        var _this = this;
        _this.setState({
            isShowLoadingView: true,
        });
        RNUtils.getBookDesk(function(bookDesk){
            _this._vars.list = bookDesk.bookObjs;
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(_this._vars.list),
                isShowLoadingView: false,
                status: _this._vars.list.length==0?0:-1
            });
        })
    },
    //在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
    //用此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。老的 props 可以通过 this.props 获取到。在该函数中调用 this.setState() 将不会引起第二次渲染。
    componentWillReceiveProps: function(newProps){
        //console.log("componentWillReceiveProps");
        //console.log(newProps);
        var _this = this;
        _this.setState({
            isShowLoadingView: true,
        });
        RNUtils.getBookDesk(function(bookDesk){
            _this._vars.list = bookDesk.bookObjs;
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(_this._vars.list),
                isShowLoadingView: false,
                status: _this._vars.list.length==0?0:-1
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
                <BookDeskOneBookView bookInfoObj={rowData} listViewBookDesk={this}/>
            </View>
        );
    },
    render: function(){
        console.log("ListViewBookDesk render");
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
                    <Text>“您尚未阅读任何书籍”</Text>
                </View>
            );
        }else{
            //alert("render"+this.state.dataSource._cachedRowCount);
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    initialListSize={20}
                    pageSize={20}
                    style={styles.container}
                    enableEmptySections={false}
                    automaticallyAdjustContentInsets={false}
                    name="ListViewBookDesk">
                </ListView>
            );
        }
    },
    refreshDataSource:function(bookObj){
        //console.log("refreshDataSource");
        var _this = this;
        _this.setState({
            isShowLoadingView: true,
        });
        RNUtils.getBookDesk(function(bookDesk){
            _this._vars.list = bookDesk.bookObjs;
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(_this._vars.list),
                isShowLoadingView: false,
                status: _this._vars.list.length==0?0:-1
            });
        })
    }
});
//
var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        paddingTop: 50,
        backgroundColor: '#f7f7f2',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height-50,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fafafa',
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
    },
    rowImage: {
        flex: 1,
        height: 120,
    },
    rowText: {
        flex: 3,
        paddingLeft:10
    },
    bookName: {
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 20,
        color: '#323232',
    },
    author: {
        fontSize: 13,
        fontWeight: '300',
        lineHeight: 20,
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
module.exports = ListViewBookDesk;