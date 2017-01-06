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
var NineImagesBox = require('../component/NineImagesBox.js');
var ButtonsBox = require('../component/ButtonsBox.js');
//
/**
 */
var ScrollViewSearchTodayContent = React.createClass({
    _vars:{
        contentObjArray: [],
        ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    },
    getInitialState: function() {
        var _this = this;
        //
        return {
            searchKey: '',
            beginDateVal: RNUtils.lastMonth3Date(),
            endDateVal: RNUtils.nowDate(),
            isPressingSearch: false,
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
    },
    render: function(){
        var _this = this;
        this.props.parent.hideRightButton();
        return (
            <ScrollView
                style={styles.scrollViewContainer}>
                <View style={styles.searchInputView}>
                    <TextInput keyboardType={"web-search"} placeholder={"关键字"} style={styles.search_textInput}
                               onChangeText={text => this.state.searchKey=text}/>
                </View>
                <View style={styles.dateInputView}>
                    <View style={styles.dateInputOneView}>
                        <TextInput keyboardType={"web-search"} placeholder={"开始时间"} style={styles.date_textInput}
                                   defaultValue={this.state.beginDateVal} onChangeText={text => this.state.beginDateVal=text}/>
                    </View>
                    <View style={styles.dateInputCenterView}>
                        <Text style={[{textAlign:'center'}]}>至</Text>
                    </View>
                    <View style={styles.dateInputOneView}>
                        <TextInput keyboardType={"web-search"} placeholder={"结束时间"} style={styles.date_textInput}
                                   defaultValue={this.state.endDateVal} onChangeText={text => this.state.endDateVal=text}/>
                    </View>
                </View>
                <View style={[styles.searchBtnView]}>
                    <ButtonsBox marginBottom={0}>
                        <ButtonsBox.Button btnText={"开始搜索"} onPress={this._onPressSearch} isPressing={this.state.isPressingSearch}/>
                    </ButtonsBox>
                </View>
            </ScrollView>
        );
    },
    _onPressSearch: function(){
        var _this = this;
        _this._vars.contentObjArray = [];
        //
        if(!_this.state.beginDateVal.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)){
            RNUtils.alert("开始时间不能为空且格式必须为0000-00-00");
            return;
        }
        if(!_this.state.endDateVal.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)){
            RNUtils.alert("结束时间不能为空且格式必须为0000-00-00");
            return;
        }
        //
        RNUtils.getKeysTodayContent(function(keys){
            console.log(keys);
            var searchKeys = [];
            for(var key of keys){
                if(key == _this.state.beginDateVal || key == _this.state.endDateVal){
                    searchKeys.push(key);
                    continue;
                }
                if(RNUtils.isAfter(key,_this.state.endDateVal)){//不需要
                    continue;
                }else if(RNUtils.isBefore(key,_this.state.endDateVal)){//有可能需要
                    if(RNUtils.isAfter(key,_this.state.beginDateVal)){//需要
                        searchKeys.push(key);
                    }else{//不需要
                        break;
                    }
                }
            }
            console.log(searchKeys);
            var count = 0;
            if(_this.state.searchKey){
                for(var day of searchKeys){
                    RNUtils.getJsonTodayContent(day,function(contentObj){
                        if(contentObj){
                            var contentArray = [];
                            var aDay = day;
                            for(var e in contentObj){
                                if(contentObj[e].day){
                                    aDay = contentObj[e].day;
                                }
                                if(e != "contentArray" && e != "day" && (contentObj[e].content || (contentObj[e].oneImages))){
                                    contentArray.push({
                                        key: e,
                                        value: contentObj[e]
                                    });
                                }
                            }
                            //contentObj.day = aDay;
                            contentObj.contentArray = contentArray;
                            if(contentArray.length > 0 && RNUtils.toString(contentArray).indexOf(_this.state.searchKey)>-1){
                                _this._vars.contentObjArray.push(contentObj);
                            }
                        }
                        count++;
                        innerFunc();
                    })
                }
                //
                if(searchKeys.length == 0){
                    RNUtils.alert("没有搜索到任何信息")
                }
            }else{
                for(var day of searchKeys){
                    RNUtils.getJsonTodayContent(day,function(contentObj){
                        if(contentObj){
                            var contentArray = [];
                            var aDay = day;
                            for(var e in contentObj){
                                if(contentObj[e].day){
                                    aDay = contentObj[e].day;
                                }
                                if(e != "contentArray" && e != "day" && (contentObj[e].content || (contentObj[e].oneImages))){
                                    contentArray.push({
                                        key: e,
                                        value: contentObj[e]
                                    });
                                }
                            }
                            //contentObj.day = aDay;
                            console.log("aDay="+aDay);
                            contentObj.contentArray = contentArray;
                            if(contentArray.length > 0){
                                _this._vars.contentObjArray.push(contentObj);
                            }
                            //RNUtils.sycnJsonTodayContent(aDay,contentObj)
                        }
                        count++;
                        innerFunc();
                    })
                }
                //
                if(searchKeys.length == 0){
                    RNUtils.alert("没有搜索到任何信息")
                }
            }
            function innerFunc(){
                //console.log(count)
                if(searchKeys.length == count){
                    if(_this._vars.contentObjArray.length == 0){
                        RNUtils.alert("没有搜索到任何信息")
                        return;
                    }
                    //
                    _this.props.parent_navigator.push({name:"ScrollViewShowTodaysContent",title:"搜索",contentObjArray: _this._vars.contentObjArray});
                }
            }
        });

    }
});
//
var styles = StyleSheet.create({
    scrollViewContainer:{
        backgroundColor: '#ffffff',
        marginTop: 44
    },
    searchInputView:{
        width:Dimensions.get('window').width,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    dateInputView:{
        width:Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    dateInputOneView:{
        flex: 3,
    },
    dateInputCenterView:{
        flex: 1,
    },
    search_textInput:{
        width: Dimensions.get('window').width,
        height: 60,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 0,
        fontSize: 16,
        color: '#444444',
    },
    date_textInput:{
        height: 60,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 16,
        color: '#444444',
        borderBottomWidth: 3,
        borderBottomColor: '#444444',
    },
    searchBtnView:{
        width:Dimensions.get('window').width,
    },
});
//
module.exports = ScrollViewSearchTodayContent;