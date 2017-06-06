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
    ScrollView,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var FormBox = require('../component/FormBox');
var ViewHeader = require('../component/ViewHeader.js');
/**
 */
var ViewEditSport = React.createClass({
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
        this._vars.param = this.props.coreObj||{};
        this._vars.param.content = this.props.coreObj.content||"";
        delete this._vars.param.day;
        //
        return {
            typeArray: []
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNAllService.getJson_getTodaySportTypes({},function(getJson_getTodaySportTypesObj){
            var typeArray = getJson_getTodaySportTypesObj.list;
            for(var e in _this._vars.param){
                if(e != "content"){
                    for(var item of typeArray){
                        if(item.typeCode == e){
                            item.isSelected = _this._vars.param[e];
                            break;
                        }
                    }
                }
            }
            _this.setState({typeArray: typeArray});
        })
    },
    render: function(){
        var _this = this;
        return (
            <View style={styles.container}>
                <ViewHeader title={this.props.title} onPressLeft={this._onPressLeft} leftText="完成" rightText="配置" onPressRight={this._onPressSetting}/>
                <FormBox>
                    {_this.state.typeArray.map(function(d){
                        //console.log(d);
                        return (
                            <View style={styles.viewRow} key={d.typeCode}>
                                <FormBox.Switch parent={_this} paramName={d.typeCode} textColor="#01bbfc" text={"？"+d.typeContent} is={d.isSelected}/>
                                {function(){
                                    if(d.isSelected){
                                        return (
                                            <FormBox.InputArea placeholder={"请输入"+d.typeContent+"内容..."} keyboardType={"default"}  maxLength={2000}
                                                               parent={_this} paramName={d.typeCode+'Desp'} height={80} multiline={true} inputColor="#01bbfc" placeholderTextColor="#4e4e4e"
                                                               defaultValue={_this.props.coreObj[d.typeCode+'Desp']}/>
                                        );
                                    }
                                }()}
                            </View>
                        );
                    })}
                </FormBox>
            </View>
        );
    },
    changeParam: function(paramName,paramValue){
        this._vars.param[paramName] = paramValue;
        var typeArray = [];
        for(var i=0;i<this.state.typeArray.length;i++){
            console.log(i);
            var item = this.state.typeArray[i];
            if(item.typeCode == paramName){
                item.isSelected = paramValue;
            }
            typeArray.push(item);
        }
        this.setState({typeArray: typeArray});
    },
    _onPressLeft: function(){
        var _this = this;
        YrcnApp.utils.confirm("您确认要提交么？",function(){
            var contentOneObj = {
                day: _this._vars.contentDay,
            };
            for(var e in _this._vars.param){
                contentOneObj[e] = _this._vars.param[e];
            }
            contentOneObj.content = '...';
            RNUtils.getJsonTodayContent(_this._vars.contentDay,function(contentObj){
                contentObj[YrcnApp.configs.AS_KEY_SPORT] = contentOneObj;
                RNUtils.sycnJsonTodayContent(_this._vars.contentDay,contentObj,function(){
                    YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex',selectedTab:'todayIcon'});
                });
            })
        },"温馨提示",function(){
            YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex',selectedTab:'todayIcon'});
        })
    },
    _onPressSetting: function(){
        YrcnApp.now.$ViewRoot.setState({viewName:'ScrollViewSettingSportType'});
    }
});
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#ffffff',
    },
    viewRow:{
        width:Dimensions.get('window').width,
    }
});
//
module.exports = ViewEditSport;