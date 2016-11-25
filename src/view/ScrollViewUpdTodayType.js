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
//
/**
 */
var ScrollViewUpdTodayType = React.createClass({
    _vars:{
        param:{
            content: "",
        },
    },
    getInitialState: function() {
        var _this = this;
        this._vars.param.content = this.props.typeObj.typeCode;
        //
        return {
            isPressingUpd: false,
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
    },
    render: function(){
        var _this = this;
        this.props.parent.showLeftButton();
        return (
            <View style={styles.container}>
                <FormBox>
                    <FormBox.Input placeholder={"事件展示内容"} keyboardType={"default"} maxLength={50}
                                   parent={this} paramName={"content"} defaultValue={this.props.typeObj.typeCode}/>
                </FormBox>
                <ButtonsBox marginBottom={0}>
                    <ButtonsBox.Button btnText={"编辑"} onPress={this._onPressUpd} isPressing={this.state.isPressingUpd}/>
                </ButtonsBox>
            </View>
        );
    },
    _onPressUpd: function(){
        var _this = this;
        if(this._vars.param.content == ""){
            RNUtils.alert("事件展示内容不能为空");
            return;
        }
        RNAllService.getJson_getTodayContentTypes({},function(todayContentTypesObj){
            var typeObj = {
                typeCode:_this._vars.param.content,
                typeContent:_this._vars.param.content,
            };
            for(var item of todayContentTypesObj.list){
                if(_this.props.typeObj.typeCode == item.typeCode){
                    item.typeCode = _this._vars.param.content;
                    item.typeContent = _this._vars.param.content;
                    RNUtils.setJsonTodayContentTypes(todayContentTypesObj,function(){
                        RNUtils.alert("编辑成功",function(){
                            _this.props.prevView.refreshView();
                            _this.props.parent_navigator.pop();
                        })
                    });
                    return;
                }
            }
        });
    },
    changeParam: function(paramName,paramValue){
        this._vars.param[paramName] = paramValue.trim();
    },
});
//
var styles = StyleSheet.create({
    container:{
        marginTop: 44,
        backgroundColor: '#01bbfc',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
});
//
module.exports = ScrollViewUpdTodayType;