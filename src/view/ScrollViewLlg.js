/**
 * 她的生活搜索结果页面
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
var moment = require('moment/min/moment-with-locales.min.js');
moment.locale('zh-cn');
var RNUtils = require('../common/RNUtils.js');
var RNLunarCalendar = require('../common/RNLunarCalendar.js');
var RNAllService = require('../common/RNAllService.js');
var ACViewBox = require('../component/ACViewBox.js');
var TitleIntroduceBox = require('../component/TitleIntroduceBox.js');
var LineButtonsBox = require('../component/LineButtonsBox.js');
var ListViewLi = require('../component/ListViewLi.js');
var NoRecordViewBox = require('../component/NoRecordViewBox.js');
//
/**
 */
var ScrollViewLlg = React.createClass({
    _vars:{
    },
    getInitialState: function() {
        var _this = this;
        //
        return {
            isShowLoadingView: true,
            title: "已记录...天",
            introduce: "忍耐和坚持虽是痛苦的事情，但却能渐渐地为你带来好处。",
            keys:[],
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNUtils.getKeysTodayContent(function(keys){
            _this.setState({
                title: "已记录"+keys.length+"天",
                keys: keys
            });
        })
    },
    render: function(){
        var _this = this;
        global.YrcnApp.now.scrollViewLlg = _this;
        return (
            <ScrollView
                style={styles.scrollViewContainer}>
                <TitleIntroduceBox title={_this.state.title} introduce={_this.state.introduce} noNumberOfLines={true}/>
                <LineButtonsBox>
                    <LineButtonsBox.Button btnText={"七天"} onPress={_this._onPressDays7}/>
                    <LineButtonsBox.Button btnText={"半月"} onPress={_this._onPressDays14}/>
                    <LineButtonsBox.Button btnText={"一月"} onPress={_this._onPressMonths1}/>
                    <LineButtonsBox.Button btnText={"三月"} onPress={_this._onPressMonths3}/>
                </LineButtonsBox>
                {
                    function(){
                        if(_this.state.keys.length == 0){
                            return (
                                <NoRecordViewBox backgroundColor={'#f7f7f2'} height={100}/>
                            );
                        }
                        return _this.state.keys.map(function(d,i){
                            return (
                                <ListViewLi title={d} onPress={function(){_this._onPressLi(i)}} key={i} color={'#000000'}/>
                            );
                        });
                    }()
                }
            </ScrollView>
        );
    },
    _onPressLi: function(liIndex){
        var _this = this;
        var day = this.state.keys[liIndex];
        global.YrcnApp.now.rootNavigator.push({name:"NavigatorTodayInner",indexName:"ScrollViewShowTodayContent",indexTitle:day,day:day});
    },
    refreshView: function(){
        var _this = this;
        RNUtils.getKeysTodayContent(function(keys){
            _this.setState({
                title: "已记录"+keys.length+"天",
                keys: keys
            });
        })
    },
    _onPressDays7: function(){
        var _this = this;
        global.YrcnApp.now.rootNavigator.push({name:"NavigatorTodayInner",indexName:"ScrollViewShowTodayLlgBetweenContent",indexTitle:"最近七日",between:"7"});
    },
    _onPressDays14: function(){
        var _this = this;
        global.YrcnApp.now.rootNavigator.push({name:"NavigatorTodayInner",indexName:"ScrollViewShowTodayLlgBetweenContent",indexTitle:"最近半月",between:"14"});
    },
    _onPressMonths1: function(){
        var _this = this;
        global.YrcnApp.now.rootNavigator.push({name:"NavigatorTodayInner",indexName:"ScrollViewShowTodayLlgBetweenContent",indexTitle:"最近一月",between:"1"});
    },
    _onPressMonths3: function(){
        var _this = this;
        global.YrcnApp.now.rootNavigator.push({name:"NavigatorTodayInner",indexName:"ScrollViewShowTodayLlgBetweenContent",indexTitle:"最近三月",between:"3"});
    }
});
//
var styles = StyleSheet.create({
    scrollViewContainer:{
        backgroundColor: '#f7f7f2',
        marginTop: 44
    },
});
//
module.exports = ScrollViewLlg;