/**
 * 书房
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
var CompLabelTableBox = require('../component/CompLabelTableBox.js');
var BookShelfOneShelfView = require('../component/BookShelfOneShelfView_02');
var ACViewBox = require('../component/ACViewBox.js');
/**
 *
 NavigatorRoot_route={this.props.NavigatorRoot_route}
 NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}
 NavigatorBookLibrary_route={route}
 NavigatorBookLibrary_navigator={navigator}
 navigatorBookLibrary={this}
 */
var ListViewBookShelf = React.createClass({
    getInitialState: function() {
        var _this = this;
        //
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.shelfName !== r2.shelfName});
        //
        return {
            ds: ds,
            dataSource: ds.cloneWithRows([]),
            isShowLoadingView: true
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
        RNUtils.getBookShelfList(function(bookShelfListObj){
            //console.log(bookShelfListObj);
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(bookShelfListObj.list),
                isShowLoadingView: false
            });
        })
    },
    /**
     */
    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
        var key = Math.uuidFast();
        //console.log(key);
        return (
            <View key={key}>
                <BookShelfOneShelfView bookShelfInfoObj={rowData} listViewBookShelf={this} parent={this}/>
            </View>
        );
    },
    render: function(){
        //
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
                    style={styles.container}
                    name="ListViewBookShelf">
                </ListView>
            );
        }
    },
    pressRow: function(bookShelfInfoObj){
        this.props.NavigatorRoot_navigator.push({name:"NavigatorBookShelf_01",indexName:"ListViewBookShelfBooks",title:bookShelfInfoObj.shelfName});
    },
    refreshDataSource:function(bookObj){
        var _this = this;
        _this.setState({
            isShowLoadingView: true,
        });
        RNUtils.getBookShelfList(function(bookShelfListObj){
            //console.log(bookShelfListObj);
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(bookShelfListObj.list),
                isShowLoadingView: false
            });
        })
    }
});
//
var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 0,
        backgroundColor: '#f7f7f2',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height-100,
    },
});
//
module.exports = ListViewBookShelf;