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
import TimerMixin from 'react-timer-mixin';
//
var ReactPropTypes = require('react/lib/ReactPropTypes');
var moment = require('moment/min/moment-with-locales.min.js');
moment.locale('zh-cn');
var RNUtils = require('../common/RNUtils.js');
var RNLunarCalendar = require('../common/RNLunarCalendar.js');
var RNAllService = require('../common/RNAllService.js');
var ACViewBox = require('../component/ACViewBox.js');
var NoRecordViewBox = require('../component/NoRecordViewBox.js');
var TitleIntroduceBox = require('../component/TitleIntroduceBox.js');
var LineButtonsBox = require('../component/LineButtonsBox.js');
var ListViewLi = require('../component/ListViewLi.js');
var NineImagesBox = require('../component/NineImagesBox.js');
//
/**
 */
var ScrollViewShowTodaysContent = React.createClass({
    _vars:{
        contentObjArray: [],
        ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    },
    mixins: [TimerMixin],
    getInitialState: function() {
        var _this = this;
        //
        console.log("ScrollViewShowTodaysContent");
        console.log(this.props.contentObjArray);
        return {
            isShowLoadingView: "1",
            fontSize: 13,
            lineHeight: 10,
            paragraphBackgroundColor: '#ffffff',
            paragraphColor:'#444444',
            dataSource: _this._vars.ds.cloneWithRows(this.props.contentObjArray),
        };
    },
    //在组件类创建的时候调用一次，然后返回值被缓存下来。如果父组件没有指定 props 中的某个键，则此处返回的对象中的相应属性将会合并到 this.props （使用 in 检测属性）。
    //该方法在任何实例创建之前调用，因此不能依赖于 this.props。另外，getDefaultProps() 返回的任何复杂对象将会在实例间共享，而不是每个实例拥有一份拷贝。
    getDefaultProps: function(){
        return {
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        this._vars.contentObjArray = [];
    },
    render: function(){
        var _this = this;
        this.props.parent.hideRightButton();
        return (
            _this.state.isShowLoadingView=="-1"?
                (<ACViewBox />):
                (_this.state.isShowLoadingView=="0"?
                    (<NoRecordViewBox />):
                    (<ListView
                        dataSource={_this.state.dataSource}
                        style={styles.scrollViewContainer}
                        renderRow={_this._renderRow}
                        enableEmptySections={true}
                        initialListSize={10}
                        pageSize={10}
                        onEndReachedThreshold={0}
                        onEndReached={_this._onEndReached}
                        />))
        );
    },
    _onPressLi: function(liIndex){
        var _this = this;
    },
    refreshView: function(){
        var _this = this;
    },
    _onEndReached: function(){
        console.log("_onEndReached");
    },
    /**
     * 渲染每一行的数据
     */
    _renderRow: function(contentObj: string, sectionID: number, rowID: number) {
        //console.log("==="+this.state.fontSize)
        console.log(contentObj);
        var _this = this;
        var key = Math.uuidFast();
        //var day = moment(contentObj.day);
        var day = null;
        if(contentObj){
            for(var key in contentObj){
                if(contentObj[key] && contentObj[key].day){
                    day = moment(contentObj[key].day);
                }
            }
        }
        if(!day){
            return;
        }
        return (
            <View key={key} style={styles.paragraphView}>
                <View style={styles.paragraphViewWeek}>
                    <Text style={styles.paragraphViewWeekText}>{day.format("dddd")}</Text>
                </View>
                <View style={styles.paragraphViewDay}>
                    <Text style={styles.paragraphViewDayText}>{day.format('YYYY-MM-DD')}</Text>
                </View>
                {(function(){
                    console.log("aaaaaa"+contentObj.contentArray)
                    if(contentObj.contentArray && contentObj.contentArray.length > 0){
                        return contentObj.contentArray.map(function(d,i){
                            console.log("xxxxxxxx"+d.value.content)
                            if(d.value.content || (d.value.oneImages && d.value.oneImages.length>0)){
                                d.value.oneImages = d.value.oneImages||[];
                                for(var oneImage of d.value.oneImages) {
                                    oneImage.uri = RNUtils.getSandboxFileLongPath(oneImage.uri);
                                }
                                return (
                                    <View key={i} style={styles.textAndImageView}>
                                        <Text style={{
                                            fontSize: _this.state.fontSize,
                                            lineHeight: _this.state.fontSize+_this.state.lineHeight+5,
                                            textAlignVertical: 'bottom',
                                            marginTop: (i==0?(_this.state.fontSize+_this.state.lineHeight+25):0),
                                            textAlign: 'justify',
                                            letterSpacing: 0,
                                            paddingTop: 0,
                                            paddingBottom: 0,
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            marginBottom: 0,
                                            color: _this.state.paragraphColor}}
                                            >
                                            {d.value.content}
                                        </Text>
                                        <NineImagesBox oneImages={d.value.oneImages } isHideDelete={true}/>
                                    </View>
                                )
                            }
                        })
                    }
                })()}
            </View>
        );
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
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1.5,
    },
    paragraphViewWeek:{
        position: 'absolute',
        top: 20,
        left: 15,
    },
    paragraphViewWeekText:{
        color: '#01bbfc'
    },
    paragraphViewDay:{
        position: 'absolute',
        top: 20,
        right: 10,
        transform:[{rotate:'16deg'}],
        borderWidth: 0.5,
        borderColor: '#01bbfc'
    },
    paragraphViewDayText:{
        color: '#01bbfc'
    },
    paragraphText:{
        fontSize: 13,
    },
    textAndImageView: {

    }
});
//
module.exports = ScrollViewShowTodaysContent;