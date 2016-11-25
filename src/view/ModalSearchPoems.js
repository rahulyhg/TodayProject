/**
 * 书桌
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
var RNAllService = require('../common/RNAllService.js');
var ACViewBox = require('../component/ACViewBox.js');
var HotSearchView = require('./HotSearchView.js');
var LastSearchView = require('./LastSearchView.js');
//
var ModalSearchPoems = React.createClass({
    _vars:{},
    getInitialState: function() {
        //
        return {
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
    },
    render: function(){
        YrcnApp.components.StatusBar.setBarStyle('light-content',true);
        StatusBar.setHidden(false,'slide');
        return (
            <Modal
                animated={this.props.modal.animated}
                transparent={this.props.modal.transparent}
                visible={this.props.modal.visible}
                style={styles.modalView}>
                <View style={styles.containerView}>
                    <View style={styles.topView}>
                        <View style={styles.topInputView}>
                            <TextInput keyboardType={"web-search"} placeholder={"诗词曲赋/作者/诗词内容"} maxLength={20}
                                       onSubmitEditing={this._onSubmitEditingSearch}
                                       onChangeText={(text) => this._vars.searchText = text}
                                       style={styles.topTextInput}
                                        />
                        </View>
                        <TouchableOpacity style={styles.topCancelView} onPress={this._onPressCancel}>
                            <Text style={styles.topCancelText}>取消</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.centerView}>
                        <View style={styles.centerRemenView}>
                            <Text style={styles.centerRemenText}>热门搜索</Text>
                        </View>
                        <HotSearchView parent={this} isBook={false}/>
                    </View>
                    <View style={styles.bottomView}>
                        <View style={styles.bottomTwoView}>
                            <View style={styles.bottomLeftView}>
                                <Text style={styles.bottomLeftText}>最近搜索</Text>
                            </View>
                            <View style={styles.bottomRightView}>
                                <Text style={styles.bottomRightText}>清除历史</Text>
                            </View>
                        </View>
                        <LastSearchView parent={this} isBook={false}/>
                    </View>
                </View>
            </Modal>
        );
    },
    _onChangeText: function(text){
        this._vars.text = text.trim();
    },
    _onPressCancel: function(){
        this.props.parent.closeModal();
    },
    _onSubmitEditingSearch: function(){
        //console.log(this._vars.searchText);
        this.props.parent.setSearchKey(this._vars.searchText);
        this.props.parent.closeModal();
    },
    handleHotSearch: function(searchKeyObj){
        //console.log(searchKeyObj)
        this.props.parent.setSearchKey(searchKeyObj.searchKey);
        this.props.parent.closeModal();
    },
});
//
var styles = StyleSheet.create({
    modalView:{
    },
    containerView:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        marginTop: 0,
        backgroundColor: 'rgba(70, 183, 81, 1)',
    },
    topView:{
        width:Dimensions.get('window').width,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#46b751',
        paddingTop:20,
    },
    topInputView:{
        flex:1,
    },
    topTextInput:{
        height: 22,
        borderColor: '#ffffff',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        marginLeft:10,
        fontSize: 14,
        lineHeight:22,
        padding: 5,
        borderRadius: 5,
    },
    topCancelView:{
        width: 50,
    },
    topCancelText:{
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '800',
    },
    centerView:{
        width:Dimensions.get('window').width,
        height:(Dimensions.get('window').height-60)/2,
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
        backgroundColor: '#f7f7f2',
    },
    centerRemenView:{
        marginTop: 15,
        marginLeft: 10,
        paddingLeft: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#46b751',
    },
    centerRemenText:{
        fontSize: 16,
    },
    bottomView:{
        width:Dimensions.get('window').width,
        height:(Dimensions.get('window').height-60)/2,
        backgroundColor: '#f7f7f2',
    },
    bottomTwoView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    bottomLeftView:{
        flex:1,
        paddingLeft: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#46b751',
        marginLeft: 10,
    },
    bottomLeftText:{
        fontSize: 16,
    },
    bottomRightView:{
        width: 80,
        padding: 5,
        backgroundColor: '#46b751',
        borderRadius: 5,
        marginRight: 15,
    },
    bottomRightText:{
        fontSize: 13,
        textAlign: 'center',
        color: '#ffffff',
    },
});
//
module.exports = ModalSearchPoems;