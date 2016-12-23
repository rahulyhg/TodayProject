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
//
/**
 */
var ScrollViewShowTodayContent = React.createClass({
    _vars:{
        contentObj: null,
    },
    getInitialState: function() {
        var _this = this;
        var now = moment(this.props.day);
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
            fontSize: 13,
            lineHeight: 10,
            paragraphBackgroundColor: '#ffffff',
            paragraphColor:'#444444',
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNUtils.getJsonTodayContent(this.props.day,function(contentObj){
            console.log(contentObj)
            _this._vars.contentObj = contentObj;
            _this.setState({
                isShowLoadingView: false,
            });
        })
    },
    render: function(){
        var _this = this;
        this.props.parent.hideRightButton();
        return (
            <ScrollView
                style={styles.scrollViewContainer}>
                <TitleIntroduceBox title={_this._vars.title} introduce={_this._vars.introduce} noNumberOfLines={true}/>
                {function(){
                    if(_this.state.isShowLoadingView){
                        return (
                            <ACViewBox />
                        );
                    }else{
                        return _this._renderContent();
                    }
                }()}
            </ScrollView>
        );
    },
    _renderContent: function(){
        var _this = this;
        var contentArray = [];
        for(var e in this._vars.contentObj){
            console.log(e);
            contentArray.push(this._vars.contentObj[e]);
        }
        return contentArray.map(function(d,i){
            d.type = "sectionContent";
            return _this._renderRow(d);
        });
    },
    _onPressLi: function(liIndex){
        var _this = this;
    },
    refreshView: function(){
        var _this = this;
    },
    /**
     * 渲染每一行的数据
     */
    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
        //console.log("==="+this.state.fontSize)
        var key = Math.uuidFast();
        if(rowData.type == "sectionTitle"){
            return (
                <View key={key} style={styles.paragraphView}>
                    <Text style={{
                    fontSize: this.state.fontSize+5,
                    lineHeight: this.state.fontSize+this.state.lineHeight,
                    textAlignVertical: 'bottom',//android专用
                    marginTop: this.state.fontSize+this.state.lineHeight-10,
                    letterSpacing: 0,
                    paddingTop: 15,
                    paddingBottom: 15,
                    marginBottom: 0,
                    fontWeight: '700',
                    textAlign:'center',
                    color: this.state.paragraphColor}}
                        >
                        {rowData.content}
                    </Text>
                </View>
            );
        }else if(rowData.type == "sectionContent"){
            return (
                <View key={key} style={styles.paragraphView}>
                    <Text style={{
                        fontSize: this.state.fontSize,
                        lineHeight: this.state.fontSize+this.state.lineHeight,
                        textAlignVertical: 'bottom',//android专用
                        marginTop: this.state.fontSize+this.state.lineHeight-5,
                        textAlign: 'justify',
                        letterSpacing: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 15,
                        paddingRight: 15,
                        marginBottom: 0,
                        color: this.state.paragraphColor}}
                        >
                        <Text>{rowData.content}</Text>
                    </Text>
                    {(function(){
                        if(rowData.oneImages && rowData.oneImages.length>0){
                            for(var oneImage of rowData.oneImages) {
                                oneImage.uri = RNUtils.getSandboxFileLongPath(oneImage.uri);
                            }
                            return (
                                <NineImagesBox oneImages={rowData.oneImages} isHideDelete={true}/>
                            );
                        }
                    })()}
                </View>
            );
        }else if(rowData.type == "sectionAuthor"){
            return (
                <View key={key} style={styles.paragraphView}>
                    <Text style={{
                    fontSize: this.state.fontSize,
                    lineHeight: this.state.fontSize+this.state.lineHeight,
                    textAlignVertical: 'bottom',//android专用
                    marginTop: this.state.fontSize+this.state.lineHeight,
                    textAlign: 'right',
                    letterSpacing: 0,
                    paddingTop: 0,
                    paddingBottom: 70,
                    marginBottom: 0,
                    color: this.state.paragraphColor}}
                        >
                        {rowData.content}
                    </Text>
                </View>
            );
        }
    },
});
//
var styles = StyleSheet.create({
    scrollViewContainer:{
        backgroundColor: '#ffffff',
        marginTop: 44
    },
    paragraphView:{
        paddingLeft: 0,
        paddingRight: 0,
    },
    paragraphText:{
        fontSize: 13,
    },
});
//
module.exports = ScrollViewShowTodayContent;