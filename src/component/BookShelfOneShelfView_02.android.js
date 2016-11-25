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
    ActionSheetIOS,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
/**
 * 定义属性：
 * bookInfoObj 书籍信息
 */
var BookShelfOneShelfView = React.createClass({
    //
    getInitialState:function(){
        return {
        };
    },
    //
    render: function(){
        //
        var bookShelfInfoObj = this.props.bookShelfInfoObj;
        //
        return (
            <TouchableOpacity style={[styles.container,]} onPress={this._onPress}>
                <View style={[styles.book_container]} >
                    <Image source={require('../images/bookShelf_002.png')} resizeMode="contain" style={{width:60,borderWidth:1,borderColor:'#eeeeee',borderRadius: 5,}}/>
                    <View style={{flex:1,}}>
                        <Text>
                            <Text style={styles.bookName}>【{bookShelfInfoObj.shelfName}】</Text>
                        </Text>
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
        RNUtils.delBookShelf(this.props.bookShelfInfoObj,function(){
            _this.props.listViewBookShelf.refreshDataSource();
        });
    },
    _onPress: function(){
        var _this = this;
        global.YrcnApp.utils.openDeleteCancel("请选择某个操作...",function(selectedIndex){
            if(selectedIndex == 0){
                _this.props.parent.pressRow(_this.props.bookShelfInfoObj);
                return;
            }else if(selectedIndex == 1){
                _this._handleDel();
                return;
            }
        })
    }
});
//
module.exports = BookShelfOneShelfView;
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
    bookName:{
        fontSize:14,
        fontWeight:'600',
    },
    author:{
        fontSize:12,
        fontWeight:'200',
    },
    sectionInfoTitle:{
        fontSize:12,
        fontWeight:'200',
        lineHeight: 20,
    },
    lastReadDt:{
        fontSize:12,
        fontWeight:'200',
        lineHeight: 20,
    },
});