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
var BookShelfOneBookView = React.createClass({
    //
    getInitialState:function(){
        return {
        };
    },
    //
    render: function(){
        //
        var bookInfoObj = this.props.bookInfoObj;
        //console.log(bookInfoObj);
        //
        return (
            <View style={[styles.container,]}>
                <View style={[styles.book_container]} {...this._panResponder.panHandlers}>
                    <global.YrcnApp.components.Image source={{uri:bookInfoObj.img01}}/>
                    <View style={{flex:1,}}>
                        <Text>
                            <Text style={styles.bookName}>《{bookInfoObj.bookName}》</Text>
                            <Text style={styles.author}>  {bookInfoObj.author} 著</Text>
                        </Text>
                    </View>
                </View>
            </View>
        );
    },
    componentWillMount: function() {
        var _this = this;
        this._panResponder = PanResponder.create({
            grantNativeEvent: null,
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // The guesture has started. Show visual feedback so the user knows
                // what is happening!

                // gestureState.{x,y}0 will be set to zero now
                //console.log(evt);
                this.grantNativeEvent = evt.nativeEvent;
                //console.log(this.grantNativeEvent);
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}

                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                //console.log(evt);
                //console.log(gestureState.dx);
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                //console.log(evt);
                if(evt.nativeEvent && Math.abs(evt.nativeEvent.locationX - this.grantNativeEvent.locationX)<=44
                    && Math.abs(evt.nativeEvent.locationY - this.grantNativeEvent.locationY)<=44
                    && (evt.nativeEvent.timestamp-this.grantNativeEvent.timestamp>1000 || evt.nativeEvent.timeStamp-this.grantNativeEvent.timeStamp>1945004000)){
                    if(YrcnApp.Platform.OS === "ios"){
                        //console.log("ActionSheetIOS")
                        var buttons = [];
                        buttons.push("打开");
                        buttons.push("删除");
                        buttons.push("取消");
                        ActionSheetIOS.showActionSheetWithOptions({
                                options: buttons,
                                cancelButtonIndex: buttons.length-1,
                                destructiveButtonIndex: buttons.length-2,
                                title:"请选择操作类型",
                                tintColor: '#4ab854',
                            },
                            (buttonIndex) => {
                                if(buttonIndex == buttons.length-1){
                                    return;
                                }
                                if(buttonIndex == 0){
                                    _this.props.parent.pressRow(_this.props.bookInfoObj);
                                    return;
                                }
                                if(buttonIndex == 1){
                                    _this._handleDel();
                                    return;
                                }
                            });
                    }else{
                        console.log("android");
                        global.YrcnApp.utils.openDeleteCancel("请选择某个操作...",function(selectedIndex){
                            if(selectedIndex == 0){
                                _this.props.parent.pressRow(_this.props.bookInfoObj);
                                return;
                            }else if(selectedIndex == 1){
                                _this._handleDel();
                                return;
                            }
                        })
                    }
                }else if(gestureState.dx == 0){
                    _this.props.parent.pressRow(_this.props.bookInfoObj);
                }
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
                //console.log(evt);
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                //console.log(evt);
                return true;
            },
        });
    },
    _handleDel:function(){
        //console.log('_handleDel');
        var _this = this;
        RNUtils.delBookShelfBook(this.props.bookInfoObj,this.props.shelfName,function(){
            _this.props.parent.refreshDataSource();
        });
    }
});
//
module.exports = BookShelfOneBookView;
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