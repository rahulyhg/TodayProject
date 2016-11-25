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
        this._handleNowSectionTiltle();
        return {
            translateX: new Animated.Value(0),
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
                <View style={styles.func_container}>
                    <TouchableOpacity style={styles.func}>
                        <Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.func}>
                        <Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.func}>
                        <Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.func_del} onPress={this._handleDel}>
                        <Text style={styles.del}>删除</Text>
                    </TouchableOpacity>
                </View>
                <Animated.View style={[styles.book_container,{transform:[{translateX:this.state.translateX}]}]} {...this._panResponder.panHandlers}>
                    <Image source={{uri:bookInfoObj.img01}} resizeMode="contain" style={{width:60,}}/>
                    <View style={{flex:1,}}>
                        <Text>
                            <Text style={styles.bookName}>《{bookInfoObj.bookName}》</Text>
                            <Text style={styles.author}>  {bookInfoObj.author} 著</Text>
                        </Text>
                        <Text style={styles.sectionInfoTitle} numberOfLines={1}>当前阅读章节：{this.state.sectionTitle}</Text>
                        <Text style={styles.lastReadDt} numberOfLines={1}>最近阅读于{this.state.lastReadDt}</Text>
                    </View>
                </Animated.View>
            </View>
        );
    },
    componentWillMount: function() {
        var _this = this;
        this._panResponder = PanResponder.create({
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
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}

                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                //console.log(evt);
                //console.log(gestureState.dx);
                if(this.state.translateX._value==0){
                    if(gestureState.dx<0 && Math.abs(gestureState.dy)<=5){
                        Animated.timing(                          // Base: spring, decay, timing
                            this.state.translateX,                 // Animate `bounceValue`
                            {
                                toValue: -100,                         // Animate to smaller size
                            }
                        ).start();
                    }
                }else if(this.state.translateX._value==-100){
                    if(gestureState.dx>0){
                        Animated.timing(                          // Base: spring, decay, timing
                            this.state.translateX,                 // Animate `bounceValue`
                            {
                                toValue: 0,                         // Animate to smaller size
                            }
                        ).start();
                    }
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                //console.log(evt);
                //console.log(gestureState.dx);
                if(gestureState.dx == 0){
                    _this.props.listViewBookDesk.pressRow(_this.props.bookInfoObj);
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
    _handleNowSectionTiltle:function(){
        var _this = this;
        var bookInfoObj = this.props.bookInfoObj;
        //console.log(bookInfoObj.bookID);
        RNUtils.getBookSections(bookInfoObj.bookID,function(bookSections){
            //console.log(bookSections.list);
            _this.setState({
                sectionTitle:bookSections.list[bookInfoObj.now.sectionsIndex].title,
                lastReadDt: bookInfoObj.lastReadDt,
            });
        })
    },
    _handleDel:function(){
        //console.log('_handleDel');
        var _this = this;
        RNUtils.delBookDeskBook(this.props.bookInfoObj,function(){
            //console.log('_handleDel');
            _this.props.listViewBookDesk.refreshDataSource(_this.props.bookInfoObj);
        });
    }
});
//
module.exports = BookDeskOneBookView;
//
var styles = StyleSheet.create({
    container:{
        height: 80,
        backgroundColor: '#ffffff',
    },
    func_container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height: 80,
    },
    func:{
        flex: 1,
    },
    func_del:{
        width:100,
        borderLeftWidth: 1,
        borderLeftColor: '#eeeeee',
        backgroundColor: '#cc3642',
        height: 80,
        alignItems:'center',
        justifyContent:'center',
    },
    del:{
        fontSize:16,
        color:'#ffffff',
    },
    book_container:{
        flexDirection:'row',
        height: 80,
        position: 'relative',
        top: -80,
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