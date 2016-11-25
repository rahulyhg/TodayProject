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
var LineButtonsBox = require('../component/LineButtonsBox.js');
//
/**
 */
var ScrollViewHerLife = React.createClass({
    _vars:{
        currentPage: 1,
        lifeTopicAnswers: [],
        opColor: '#444444',
        opedColor: '#cccccc',
    },
    getInitialState: function() {
        var _this = this;
        _this._vars.lifeTopicInfo = global.YrcnApp.now.coreObj;
        //
        return {
            isShowLoadingView: true,
            goodColor: _this._vars.opColor,
            badColor: _this._vars.opColor,
            joinText: '我要参与',
            isPressGood: false,
            isPressBad: false,
            isPressJoin: false,
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
        //
        RNAllService.getJson_getLifeTopicInfo({topicInfoId: _this._vars.lifeTopicInfo.id},function(getJson_getLifeTopicInfoObj){
            var goodColor = _this.state.goodColor;
            var badColor = _this.state.badColor;
            var joinText = _this.state.joinText;
            if(getJson_getLifeTopicInfoObj.goodType == "0"){
                goodColor = _this._vars.opedColor;
            }
            if(getJson_getLifeTopicInfoObj.goodType == "-1"){
                badColor = _this._vars.opedColor;
            }
            if(getJson_getLifeTopicInfoObj.joined == "0"){
                joinText = "已参与";
            }
            _this.setState({
                goodColor: goodColor,
                badColor: badColor,
                joinText: joinText,
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
                <LineButtonsBox boxStyle={styles.lineButtonsBox}>
                    <LineButtonsBox.Button btnText={"( ^_^ )不错嘛"} color={_this.state.goodColor} onPress={_this._onPressGood} isPressing={_this.state.isPressGood}/>
                    <LineButtonsBox.Button btnText={"( ⊙ _ ⊙ )一般吧"} color={_this.state.badColor} onPress={_this._onPressBad} isPressing={_this.state.isPressBad}/>
                    <LineButtonsBox.Button btnText={_this.state.joinText} onPress={_this._onPressJoin} isPressing={_this.state.isPressJoin}/>
                </LineButtonsBox>
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
    },
    _onPressGood: function(){
        var _this = this;
        if(_this.state.goodColor == _this._vars.opedColor){
            return;
        }
        _this.setState({
            isPressGood: true
        });
        RNAllService.goodOrBadTopicInfo({topicInfoId: _this._vars.lifeTopicInfo.id,goodType:"0"},function(){
            _this.setState({
                goodColor: _this._vars.opedColor,
                badColor: _this._vars.opColor,
                isPressGood: false
            });
        })
    },
    _onPressBad: function(){
        var _this = this;
        if(_this.state.badColor == _this._vars.opedColor){
            return;
        }
        _this.setState({
            isPressBad: true
        });
        RNAllService.goodOrBadTopicInfo({topicInfoId: _this._vars.lifeTopicInfo.id,goodType:"-1"},function(){
            _this.setState({
                goodColor: _this._vars.opColor,
                badColor: _this._vars.opedColor,
                isPressBad: false
            });
        })
    },
    _onPressJoin: function(){
        var _this = this;
        if(_this.state.joinText == "已参与"){
            return;
        }
        _this.setState({
            isPressJoin: true
        });
        RNAllService.joinTopicInfo({topicInfoId: _this._vars.lifeTopicInfo.id},function(){
            _this.setState({
                joinText: "已参与",
                isPressJoin: false
            });
        })
    },
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
    },
    lineButtonsBox:{
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    }
});
//
module.exports = ScrollViewHerLife;