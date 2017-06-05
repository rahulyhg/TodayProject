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
var ListViewLiSelected = require('../component/ListViewLiSelected.js');
var ButtonsBox = require('../component/ButtonsBox.js');
var FormBox = require('../component/FormBox.js');
var ViewHeader = require('../component/ViewHeader.js');
//
/**
 */
var ScrollViewAddSportType = React.createClass({
    _vars:{
        param:{
            content: "",
        },
    },
    getInitialState: function() {
        var _this = this;
        //
        return {
            isPressingAdd: false,
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
    },
    render: function(){
        var _this = this;
        return (
            <View style={styles.container}>
                <ViewHeader title="新增运动配置" onPressLeft={this._onPressLeft}/>
                <FormBox>
                    <FormBox.Input placeholder={"请输入..."} keyboardType={"default"} maxLength={50}
                                   parent={this} paramName={"content"} inputColor="#01bbfc" placeholderTextColor="#4e4e4e"/>
                </FormBox>
                <ButtonsBox marginBottom={0}>
                    <ButtonsBox.Button btnText={"新增"} onPress={this._onPressAdd} isPressing={this.state.isPressingAdd} backgroundColor_pressing="#01bbfc" backgroundColor="#01bbfc" btnColor="#ffffff"/>
                </ButtonsBox>
            </View>
        );
    },
    _onPressAdd: function(){
        var _this = this;
        if(this._vars.param.content == ""){
            RNUtils.alert("运动配置内容不能为空");
            return;
        }
        RNAllService.getJson_getTodaySportTypes({},function(todayContentTypesObj){
            var typeObj = {
                typeCode:_this._vars.param.content,
                typeContent:_this._vars.param.content,
            };
            for(var item of todayContentTypesObj.list){
                if(typeObj.typeCode == item.typeCode){
                    RNUtils.alert("请勿重复新增"+typeObj.typeCode,function(){
                    })
                    return;
                }
            }
            todayContentTypesObj.list.push(typeObj);
            RNUtils.setJsonTodaySportTypes(todayContentTypesObj,function(){
                RNUtils.alert("新增成功",function(){
                    //_this.props.prevView.refreshView();
                    //_this.props.parent_navigator.pop();
                    YrcnApp.now.$ViewRoot.setState({viewName:'ScrollViewSettingSportType'});
                })
            });
        });
    },
    changeParam: function(paramName,paramValue){
        this._vars.param[paramName] = paramValue.trim();
    },
    _onPressLeft: function(){
        YrcnApp.now.$ViewRoot.setState({viewName:'ScrollViewSettingSportType'});
    }
});
//
var styles = StyleSheet.create({
    container:{
        backgroundColor: '#ffffff',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems:'center',
    },
});
//
module.exports = ScrollViewAddSportType;