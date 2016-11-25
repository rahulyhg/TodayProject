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
    TouchableOpacity,
    Dimensions,
    View,
    Modal,
    TextInput,
    Switch,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var ACViewBox = require('../component/ACViewBox.js');
var FormBoxRadio = require('../component/FormBoxRadio.js');
var HotSearchView = require('./HotSearchView.js');
var LastSearchView = require('./LastSearchView.js');
//
var ReadingSearchView = React.createClass({
    _vars:{},
    getInitialState: function() {
        //
        return {
            placeholder: "关键词",
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
            <View
                style={styles.modalView}>
                <View style={styles.containerView}>
                    <View style={styles.topView}>
                        <View style={styles.topSearchView}>
                            <View style={styles.topInputView}>
                                <TextInput keyboardType={"web-search"} placeholder={this.state.placeholder} maxLength={20}
                                           onSubmitEditing={this._onSubmitEditingSearch}
                                           onChangeText={(text) => this._vars.searchText = text}
                                           style={styles.topTextInput}
                                           returnKeyType={"search"}
                                    />
                            </View>
                            <TouchableOpacity style={styles.topCancelView} onPress={this._onPressCancel}>
                                <Text style={styles.topCancelText}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.centerView}>
                        <View style={styles.centerRemenView}>
                            <Text style={styles.centerRemenText}>热门搜索</Text>
                        </View>
                        <HotSearchView parent={this} isBook={this.state.isBook}/>
                    </View>
                    <View style={styles.bottomView}>
                        <View style={styles.bottomTwoView}>
                            <View style={styles.bottomLeftView}>
                                <Text style={styles.bottomLeftText}>最近搜索</Text>
                            </View>
                            <TouchableOpacity style={styles.bottomRightView} onPress={this._onPressClearSearchHis}>
                                <Text style={styles.bottomRightText}>清除历史</Text>
                            </TouchableOpacity>
                        </View>
                        <LastSearchView isBook={this.state.isBook} parent={this}/>
                    </View>
                </View>
            </View>
        );
    },
    _onPressCancel: function(){
        global.YrcnApp.now.rootNavigator.pop();
    },
    _onSubmitEditingSearch: function(){
        var _this = this;
        RNUtils.pushSearchKeysLast("life",{
            searchKey: _this._vars.searchText
        });
        RNAllService.addSearchKey({searchKey: _this._vars.searchText,type:"life"})
        global.YrcnApp.now.rootNavigator.push({
            name:"NavigatorHerLifeInner",
            title:"搜索她的生活",
            searchKey: _this._vars.searchText,
            indexName:"ListViewSearchHerLifes",
        });
    },
    handleHotSearch: function(searchKeyObj){
        var _this = this;
        RNUtils.pushSearchKeysLast("life",{
            searchKey:searchKeyObj.searchKey,
        });
        RNAllService.addSearchKey({searchKey: searchKeyObj.searchKey,type:"life"})
        global.YrcnApp.now.rootNavigator.push({
            name:"NavigatorHerLifeInner",
            title:"搜索她的生活",
            searchKey: searchKeyObj.searchKey,
            indexName:"ListViewSearchHerLifes",
        });
    },
    _onPressClearSearchHis: function(){
        var _this = this;
        RNUtils.removeSearchKeysLast("life",function(){
            _this.setState({
                isBook: _this.state.isBook,
            });
        });
    }
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
        height: 90,
        backgroundColor: '#36353a',
        paddingTop:20,
    },
    topSearchView:{
        width:Dimensions.get('window').width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#36353a',
    },
    topRadioView:{
        width:Dimensions.get('window').width,
        height: 30,
        backgroundColor: '#36353a',
    },
    topInputView:{
        flex:1,
    },
    topTextInput:{
        height: 28,
        borderColor: '#ffffff',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        marginLeft:10,
        fontSize: 14,
        lineHeight:28,
        padding: 5,
        borderRadius: 5,
        textAlignVertical: 'bottom',//android专用
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
        borderLeftColor: '#36353a',
    },
    centerRemenText:{
        fontSize: 16,
    },
    bottomView:{
        width:Dimensions.get('window').width,
        height:(Dimensions.get('window').height-60)/2 - 30,
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
        borderLeftColor: '#36353a',
        marginLeft: 10,
    },
    bottomLeftText:{
        fontSize: 16,
    },
    bottomRightView:{
        width: 80,
        padding: 5,
        backgroundColor: '#36353a',
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
module.exports = ReadingSearchView;