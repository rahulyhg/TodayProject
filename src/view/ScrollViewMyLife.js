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
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var ACViewBox = require('../component/ACViewBox.js');
var TitleIntroduceBox = require('../component/TitleIntroduceBox.js');
//
/**
 */
var ScrollViewHerLife = React.createClass({
    _vars:{
        currentPage: 1,
        lifeTopicAnswers: []
    },
    getInitialState: function() {
        var _this = this;
        _this._vars.lifeTopicInfo = global.YrcnApp.now.coreObj;
        //
        return {
            isShowLoadingView: true,
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNAllService.getJson_getTopicAnswers({topicInfoId: _this._vars.lifeTopicInfo.id},function(getJson_getTopicAnswersObj){
            _this._vars.lifeTopicAnswers = getJson_getTopicAnswersObj.list;
            _this.setState({
                isShowLoadingView: false,
            });
        })
    },
    _pressRow: function(d) {
        var _this = this;
        //console.log(d);
        global.YrcnApp.now.answer = d;
        _this.props.parent_navigator.push({name:"ScrollViewHerLifeAnswer",title:d.content});
    },
    render: function(){
        var _this = this;
        return (
            <ScrollView
                style={styles.scrollViewContainer}>
                <TitleIntroduceBox title={_this._vars.lifeTopicInfo.title} introduce={_this._vars.lifeTopicInfo.desp} noNumberOfLines={true}/>
                {
                    (function(){
                        if(_this.state.isShowLoadingView){
                            return (
                                <ACViewBox height={30}/>
                            );
                        }else{
                            return _this._vars.lifeTopicAnswers.map(function(d,i,array){
                                var key = Math.uuidFast();
                                return (
                                    <TouchableOpacity key={key} style={styles.answerView} onPress={function(){_this._pressRow(d);}}>
                                        <Text style={styles.answerText}>{i+1},{d.content}</Text>
                                    </TouchableOpacity>
                                );
                            });
                        }
                    })()
                }
            </ScrollView>
        );
    }
});
//
var styles = StyleSheet.create({
    scrollViewContainer:{
        backgroundColor: '#ffffff',
        marginTop: 44
    },
    answerView: {
        borderBottomWidth: 1,
        borderColor: '#e7e7e7',
        paddingTop:8,
        paddingBottom: 8,
        paddingLeft: 10,
    },
    answerText: {
        fontSize:13,
        fontWeight:'600',
        color: '#4c566c'
    }
});
//
module.exports = ScrollViewHerLife;