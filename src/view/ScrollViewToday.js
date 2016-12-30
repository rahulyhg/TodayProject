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
//
/**
 */
var ScrollViewToday = React.createClass({
    _vars:{
    },
    getInitialState: function() {
        var _this = this;
        //
        this._vars.contentDay = this.props.contentDay;
        this._vars.ViewEdit = this.props.ViewEdit;
        this._vars.NavigatorInner = this.props.NavigatorInner;
        this._vars.scrollView = this.props.scrollView;
        this._vars.backgroundColor = this.props.backgroundColor;
        //
        var now = moment(_this._vars.contentDay);
        _this._vars.title = now.format("YYYY年MM月DD日 dddd 第wo 第DDDo");
        var lunarCalendar = RNLunarCalendar.solarToLunar(now.year(),now.month()+1,now.date());
        _this._vars.introduce = "生肖【"+lunarCalendar.zodiac+"】";
        _this._vars.introduce += "农历【"+lunarCalendar.lunarMonthName+lunarCalendar.lunarDayName+"】";
        if(lunarCalendar.lunarFestival){
            _this._vars.introduce += lunarCalendar.lunarFestival;
        }
        if(lunarCalendar.term){
            _this._vars.introduce += lunarCalendar.term;
        }
        //
        return {
            isShowLoadingView: true,
            typeArray:[],
            typeRightColorArray:[],
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNAllService.getJson_getTodayContentTypes({},function(todayContentTypesObj){
            //console.log(todayContentTypesObj);
            _this.setState({
                typeArray: todayContentTypesObj.list,
            });
        });
        RNUtils.getJsonTodayContent(_this._vars.contentDay,function(contentObj){
            _this._vars.contentObj = contentObj;
            var typeArray = _this.state.typeArray;
            for(var key in contentObj){
                for(var typeObj of typeArray){
                    if(typeObj.typeCode == key && (contentObj[key].content || (contentObj[key].oneImages && contentObj[key].oneImages.length>0))){
                        typeObj.rightColor = '#01bbfc';
                        break;
                    }
                }
            }
            _this.setState({
                typeArray: typeArray,
            })
        })
        //
        YrcnApp.services.getJson_today_getContentInfo({day:_this._vars.contentDay},function(getJson_today_getContentInfoObj){

        })
        //
        RNUtils.getJsonNewFunc("xian_she",function(value){
            if(value && value == "1"){
            }else{
                global.YrcnApp.now.$NavigatorRoot.renderNewFunc();
            }
        })
    },
    render: function(){
        var _this = this;
        global.YrcnApp.now[_this._vars.scrollView] = this;
        return (
            <ScrollView
                style={[styles.scrollViewContainer,{backgroundColor: _this._vars.backgroundColor}]}>
                <TitleIntroduceBox title={_this._vars.title} introduce={_this._vars.introduce} noNumberOfLines={true}/>
                {
                    function(){
                        return _this.state.typeArray.map(function(d,i){
                            return (
                                <ListViewLi title={d.typeContent} onPress={function(){_this._onPressLi(i)}} key={i} color={'#000000'} rightColor={d.rightColor||'#aaaaaa'}/>
                            );
                        });
                    }()
                }
            </ScrollView>
        );
    },
    _onPressLi: function(liIndex){
        var _this = this;
        //console.log(liIndex);
        var indexTitle = this.state.typeArray[liIndex].typeContent;
        //console.log(this.state.typeArray[liIndex])
        var coreObj = _this._vars.contentObj[this.state.typeArray[liIndex].typeCode];
        if(coreObj && coreObj.oneImages && coreObj.oneImages.length>0){
            for(var oneImage of coreObj.oneImages){
                oneImage.uri = RNUtils.getSandboxFileLongPath(oneImage.uri);
            }
        }
        global.YrcnApp.now[_this._vars.scrollView] = this;
        global.YrcnApp.now.rootNavigator.push({name: _this._vars.NavigatorInner,indexName:_this._vars.ViewEdit,indexTitle:indexTitle,type: this.state.typeArray[liIndex],coreObj: coreObj});
    },
    refreshView: function(){
        var _this = this;
        RNAllService.getJson_getTodayContentTypes({},function(todayContentTypesObj){
            //console.log(todayContentTypesObj);
            _this.setState({
                typeArray: todayContentTypesObj.list,
            });
        });
        RNUtils.getJsonTodayContent(_this._vars.contentDay,function(contentObj){
            _this._vars.contentObj = contentObj;
            //和服务器同步contentObj
            for(var key in contentObj){
                //console.log(key);
                if(contentObj[key]&&contentObj[key].content){
                    RNAllService.getJson_today_synchronizeContentInfo(contentObj[key],function(getJson_today_synchronizeContentInfoObj){
                        //console.log(getJson_today_synchronizeContentInfoObj);
                    });
                }
            }
            //
            var typeArray = _this.state.typeArray;
            for(var key in contentObj){
                for(var typeObj of typeArray){
                    if(typeObj.typeCode == key && (contentObj[key].content || (contentObj[key].oneImages && contentObj[key].oneImages.length>0))){
                        typeObj.rightColor = '#01bbfc';
                        break;
                    }
                }
            }
            _this.setState({
                typeArray: typeArray,
            })
        })
    }
});
//
var styles = StyleSheet.create({
    scrollViewContainer:{
        marginTop: 44,
    },
});
//
module.exports = ScrollViewToday;