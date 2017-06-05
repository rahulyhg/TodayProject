/**
 * 她的生活搜索结果页面
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var FormBox = require('../component/FormBox');
var ViewHeader = require('../component/ViewHeader.js');
/**
 */
var ViewEditStudy = React.createClass({
    _vars:{
        param:{
        },
        contentDay: YrcnApp.utils.nowDate()
    },
    getDefaultProps: function(){
        return ({
        });
    },
    getInitialState: function() {
        var _this = this;
        this._vars.param = {
            content: this.props.coreObj.content||"",
        };
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
        var _this = this;
        return (
            <View style={styles.container}>
                <ViewHeader title={this.props.title} onPressLeft={this._onPressLeft} leftText="完成"/>
                <FormBox>
                    <FormBox.InputArea placeholder={"请输入学习内容..."} keyboardType={"default"}  maxLength={2000}
                                   parent={this} paramName={"content"} height={140} multiline={true} inputColor="#01bbfc" placeholderTextColor="#4e4e4e" defaultValue={this.props.coreObj.content}/>
                </FormBox>
            </View>
        );
    },
    changeParam: function(paramName,paramValue){
        this._vars.param[paramName] = paramValue;
    },
    _onPressLeft: function(){
        var _this = this;
        YrcnApp.utils.confirm("您确认要提交么？",function(){
            var contentOneObj = {
                day: _this._vars.contentDay,
                content: _this._vars.param['content'],
            };
            RNUtils.getJsonTodayContent(_this._vars.contentDay,function(contentObj){
                contentObj[YrcnApp.configs.AS_KEY_STUDY] = contentOneObj;
                RNUtils.sycnJsonTodayContent(_this._vars.contentDay,contentObj,function(){
                    YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex',selectedTab:'todayIcon'});
                });
            })
        },"温馨提示",function(){
            YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex',selectedTab:'todayIcon'});
        })
    }
});
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#ffffff',
    },
});
//
module.exports = ViewEditStudy;