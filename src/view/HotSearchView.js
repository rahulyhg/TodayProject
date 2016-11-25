/**
 * 读书页面显示
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
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
var RNAllService = require('../common/RNAllService.js');
var ACViewBox = require('../component/ACViewBox.js');
//
/**
 * 定义属性：
 */
var HotSearchView = React.createClass({
    _vars:{
        isUpdatingP: false,
    },
    _oldProps:{
        isBook: true
    },
    getInitialState: function() {
        //
        return {
            isShowHotSearch: true,
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNUtils.getSearchKeys("life",function(obj){
            _this._vars.list = obj.list;
            _this.setState({
                isShowHotSearch: false,
            });
        })
    },
    //在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
    //用此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。老的 props 可以通过 this.props 获取到。在该函数中调用 this.setState() 将不会引起第二次渲染。
    componentWillReceiveProps: function(props){
        //console.log(props)
        //console.log("componentWillReceiveProps="+props.isBook);
        var _this = this;
        _this.setState({
            isShowHotSearch: true,
        });
        RNUtils.getSearchKeys("life",function(obj){
            _this._vars.list = obj.list;
            _this.setState({
                isShowHotSearch: false,
            });
        })
    },
    //在接收到新的 props 或者 state，将要渲染之前调用。该方法在初始化渲染的时候不会调用，在使用 forceUpdate 方法的时候也不会。
    //如果确定新的 props 和 state 不会导致组件更新，则此处应该 返回 false。
    shouldComponentUpdate: function(){
        var _this = this;
        return true;
    },
    //在接收到新的 props 或者 state 之前立刻调用。在初始化渲染的时候该方法不会被调用。
    //使用该方法做一些更新之前的准备工作。
    componentWillUpdate: function(){
        //console.log("componentWillUpdate");
    },
    render: function(){
        //console.log("render");
        if(this.state.isShowHotSearch){
            return (
                <View>
                    <ACViewBox height={(Dimensions.get('window').height-60)/2} textViewTop={60}/>
                </View>
            );
        }else{
            //console.log("render list");
            var _this = this;
            var arr = [];
            for(var i=0;i<_this._vars.list.length;i=i+4){
                var row = [];
                row.push(_this._vars.list[i]);
                if((i+1 < _this._vars.list.length)){
                    row.push(_this._vars.list[i+1]);
                }
                if((i+2 < _this._vars.list.length)){
                    row.push(_this._vars.list[i+2]);
                }
                if((i+3 < _this._vars.list.length)){
                    row.push(_this._vars.list[i+3]);
                }
                arr.push(row);
            }
            //console.log(arr);
            return (
                <View style={styles.centerRemenContentView}>
                    {arr.map(function (row,i) {
                        if(row.length == 1){
                            return (
                                <View style={styles.centerRemenContentItemsView} key={i}>
                                    <HotSearchText searchKey={row[0]} parent={_this}/>
                                </View>
                            );
                        }else if(row.length == 2){
                            return (
                                <View style={styles.centerRemenContentItemsView} key={i}>
                                    <HotSearchText searchKey={row[0]} parent={_this}/>
                                    <HotSearchText searchKey={row[1]} parent={_this}/>
                                </View>
                            );
                        }else if(row.length == 3){
                            return (
                                <View style={styles.centerRemenContentItemsView} key={i}>
                                    <HotSearchText searchKey={row[0]} parent={_this}/>
                                    <HotSearchText searchKey={row[1]} parent={_this}/>
                                    <HotSearchText searchKey={row[2]} parent={_this}/>
                                </View>
                            );
                        }else if(row.length == 4){
                            return (
                                <View style={styles.centerRemenContentItemsView} key={i}>
                                    <HotSearchText searchKey={row[0]} parent={_this}/>
                                    <HotSearchText searchKey={row[1]} parent={_this}/>
                                    <HotSearchText searchKey={row[2]} parent={_this}/>
                                    <HotSearchText searchKey={row[3]} parent={_this}/>
                                </View>
                            );
                        }
                    })}
                </View>
            );
        }
    },
    handleHotSearch: function(searchKeyObj){
        this.props.parent.handleHotSearch(searchKeyObj);
    }
});
//
var HotSearchText = React.createClass({
    render: function(){
        return (
            <TouchableOpacity style={styles.centerRemenContentItemView} onPress={this._onPress}>
                <Text style={styles.centerRemenContentText}>{this.props.searchKey.searchKey}</Text>
            </TouchableOpacity>
        );
    },
    _onPress: function(){
        this.props.parent.handleHotSearch(this.props.searchKey);
    }
});
//
module.exports = HotSearchView;
//
var styles = StyleSheet.create({
    centerRemenContentView:{
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    centerRemenContentItemsView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    centerRemenContentItemView:{
        flex: 1,
        padding: 5,
        margin: 5,
        backgroundColor: '#e3e2e2',
        borderRadius: 5,
    },
    centerRemenContentText:{
        fontSize: 13,
        textAlign: 'center',
    },
});