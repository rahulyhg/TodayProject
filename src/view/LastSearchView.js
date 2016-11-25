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
    ActionSheetIOS,
    ListView,
    ScrollView,
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
var LastSearchView = React.createClass({
    _vars:{},
    getInitialState: function() {
        //
        return {
            isShowLastSearch: true,
            isBook: true,
        };
    },
    //在组件类创建的时候调用一次，然后返回值被缓存下来。如果父组件没有指定 props 中的某个键，则此处返回的对象中的相应属性将会合并到 this.props （使用 in 检测属性）。
    //该方法在任何实例创建之前调用，因此不能依赖于 this.props。另外，getDefaultProps() 返回的任何复杂对象将会在实例间共享，而不是每个实例拥有一份拷贝。
    getDefaultProps: function(){
        //
        return {
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNUtils.getSearchKeysLast("life",function(obj){
            _this._vars.list = obj.list;
            _this.setState({
                isShowLastSearch: false,
            });
        })
    },
    //在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
    //用此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。老的 props 可以通过 this.props 获取到。在该函数中调用 this.setState() 将不会引起第二次渲染。
    componentWillReceiveProps: function(props){
        var _this = this;
        _this.setState({
            isShowLastSearch: true,
        });
        //console.log(props.isBook)
        RNUtils.getSearchKeysLast("life",function(obj){
            _this._vars.list = obj.list;
            _this.setState({
                isShowLastSearch: false,
            });
        })
    },
    render: function(){
        //console.log("render");
        if(this.state.isShowLastSearch){
            return (
                <View>
                    <ACViewBox height={(Dimensions.get('window').height-60)/2} textViewTop={60}/>
                </View>
            );
        }else{
            //console.log("render list");
            var _this = this;
            if(_this._vars.list.length == 0){
                //console.log("render list 0");
                return (
                    <View style={styles.centerLastContentView}>
                        <Text style={{textAlign:'center',padding:10,}}>暂无最近搜索</Text>
                    </View>
                );
            }else{
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
                    <ScrollView style={styles.centerRemenContentView}>
                        {arr.map(function (row,i) {
                            if(row.length == 1){
                                return (
                                    <View style={styles.centerRemenContentItemsView} key={i}>
                                        <LastSearchText searchKey={row[0]} parent={_this}/>
                                    </View>
                                );
                            }else if(row.length == 2){
                                return (
                                    <View style={styles.centerRemenContentItemsView} key={i}>
                                        <LastSearchText searchKey={row[0]} parent={_this}/>
                                        <LastSearchText searchKey={row[1]} parent={_this}/>
                                    </View>
                                );
                            }else if(row.length == 3){
                                return (
                                    <View style={styles.centerRemenContentItemsView} key={i}>
                                        <LastSearchText searchKey={row[0]} parent={_this}/>
                                        <LastSearchText searchKey={row[1]} parent={_this}/>
                                        <LastSearchText searchKey={row[2]} parent={_this}/>
                                    </View>
                                );
                            }else if(row.length == 4){
                                return (
                                    <View style={styles.centerRemenContentItemsView} key={i}>
                                        <LastSearchText searchKey={row[0]} parent={_this}/>
                                        <LastSearchText searchKey={row[1]} parent={_this}/>
                                        <LastSearchText searchKey={row[2]} parent={_this}/>
                                        <LastSearchText searchKey={row[3]} parent={_this}/>
                                    </View>
                                );
                            }
                        })}
                    </ScrollView>
                );
            }
        }
    },
    _onPressDelete: function(searchKey){
        //console.log(searchKey);
    },
    handleHotSearch: function(searchKeyObj){
        this.props.parent.handleHotSearch(searchKeyObj);
    }
});
//
var LastSearchText = React.createClass({
    render: function(){
        //console.log(this.props.searchKey.searchKey)
        return (
            <TouchableOpacity style={styles.centerRemenContentItemView} onPress={this._onPress}>
                <Text style={styles.centerRemenContentText}>{this.props.searchKey.searchKey}</Text>
            </TouchableOpacity>
        );
    },
    _onPress: function(){
        //console.log(this.props.searchKey);
        this.props.parent.handleHotSearch(this.props.searchKey);
    }
});
//
module.exports = LastSearchView;
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