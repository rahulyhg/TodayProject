/**
 * 评论编辑页面
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
    Modal,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
var TitleBox = require('../component/TitleBox.js');
var RNAllService = require('../common/RNAllService.js');
//
/**
 * 定义属性：
 */
var ModalCommentEdit = React.createClass({
    mixins: [],
    _vars:{
        text:"",
    },
    getDefaultProps: function(){
        return ({
        });
    },
    getInitialState: function(){
        return ({
        });
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
    },
    //
    render: function(){
        //
        return (
        <Modal
            onRequestClose={this._onRequestClose}
            animated={true}
            transparent={true}
            visible={this.props.isShowModal}
            style={styles.modalView}>
            <View style={[styles.container]}>
                <View style={styles.topView}>
                    <TitleBox title={"写评论"} rigthBtnText={"发布"} onPressLeft={this._onPressLeft}
                              onPressRight={this._onPressRight}/>
                </View>
                <View style={styles.centerView}>
                    <TextInput autoFocus={true} multiline={true} style={styles.textInput}
                           enablesReturnKeyAutomatically={true}
                           returnKeyType={"default"}
                           onChangeText={this._onChangeText}
                          placeholderTextColor={"#999999"}
                          placeholder={"请输入评论"}/>
                </View>
            </View>
        </Modal>
        );
    },
    _onChangeText: function(text){
        this._vars.text = text;
    },
    _onPressLeft: function(){
        this.props.parent.closeModal();
    } ,
    _onPressRight: function(){
        //console.log("_onPressRight");
        var _this = this;
        if(this._vars.text.trim().length <= 0){
            RNUtils.alert("请至少输入一个字吧");
            return;
        }
        if(_this.props.bookInfo){
            RNAllService.addBookComment({
                content:_this._vars.text.trim(),
                bookInfoId: this.props.bookInfo.bookID,
            },function(){
                RNUtils.alert("评论成功",function(){
                    _this.props.parent.closeModal("1");
                });
            })
        }else{
            RNAllService.addPoemComment({
                content:_this._vars.text.trim(),
                poemInfoId: this.props.poemInfoObj.id,
            },function(){
                RNUtils.alert("评论成功",function(){
                    _this.props.parent.closeModal();
                });
            })
        }
    },
    _onRequestClose: function(){

    }
});
//
module.exports = ModalCommentEdit;
//
var styles = StyleSheet.create({
    modalView:{
        backgroundColor: '#eeeeee',
        opacity: 0.5,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#ffffff',
    },
    topView:{
    },
    centerView:{
        width:Dimensions.get('window').width,
        backgroundColor: '#eeeeee',
    },
    textInput:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height/2,
        fontSize: 15,
        padding: 10,
    }
});