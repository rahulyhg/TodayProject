/**
 * 书桌显示一本书
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    PanResponder,
    Animated,
    ActionSheetIOS,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
/**
 * 定义属性：
 * bookInfoObj 书籍信息
 */
var BookDeskOneBookView = React.createClass({
    //
    getInitialState:function(){
        return {
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        var bookInfoObj = this.props.bookInfoObj;
        //console.log(bookInfoObj.bookID);
        RNUtils.getBookSections(bookInfoObj.bookID,function(bookSections){
            //console.log(bookSections.list);
            //console.log(bookInfoObj.now.sectionsIndex);
            bookInfoObj.now.sectionsIndex = bookInfoObj.now.sectionsIndex || 0;
            _this.setState({
                sectionTitle:bookSections.list[bookInfoObj.now.sectionsIndex].title,
                lastReadDt: bookInfoObj.lastReadDt,
            });
        })
    },
    //
    render: function(){
        //
        var bookInfoObj = this.props.bookInfoObj;
        //console.log(bookInfoObj);
        // {...this._panResponder.panHandlers}
        //
        return (
            <TouchableOpacity style={[styles.container,]} onPress={this._onPress}>
                <View style={[styles.book_container]}>
                    <global.YrcnApp.components.Image source={{uri:bookInfoObj.img01}}/>
                    <View style={{flex:1,paddingTop: 5,}}>
                        <Text style={styles.bookNameText}>
                            <Text style={styles.bookName}>《{bookInfoObj.bookName}》</Text>
                            <Text style={styles.author}>  {bookInfoObj.author} 著</Text>
                        </Text>
                        <Text style={styles.sectionInfoTitle} numberOfLines={1}>正读：{this.state.sectionTitle}</Text>
                        <Text style={styles.lastReadDt} numberOfLines={1}>最近阅读于{this.state.lastReadDt}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    },
    componentWillMount: function() {
        var _this = this;
    },
    _handleDel:function(){
        //console.log('_handleDel');
        var _this = this;
        RNUtils.delBookDeskBook(this.props.bookInfoObj,function(){
            //console.log('_handleDel');
            _this.props.listViewBookDesk.refreshDataSource(_this.props.bookInfoObj);
        });
    },
    _onPress: function(){
        var _this = this;
        _this.props.listViewBookDesk.pressRow(_this.props.bookInfoObj);
    }
});
//
module.exports = BookDeskOneBookView;
//
var styles = StyleSheet.create({
    container:{
        height: 90,
        backgroundColor: '#ffffff',
    },
    book_container:{
        flexDirection:'row',
        height: 90,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        marginLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },
    bookNameText:{

    },
    bookName:{
        fontSize:16,
        fontWeight:'600',
    },
    author:{
        fontSize:12,
        fontWeight:'200',
    },
    sectionInfoTitle:{
        fontSize:12,
        fontWeight:'200',
        lineHeight: 25,
    },
    lastReadDt:{
        fontSize:12,
        fontWeight:'200',
        lineHeight: 22,
    },
});