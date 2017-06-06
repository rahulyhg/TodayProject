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
var ViewHeader = require('../component/ViewHeader.js');
var ViewContent = require('../component/ViewContent.js');
//
/**
 */
var ScrollViewShowTodayLlgBetweenContent = React.createClass({
    _vars:{
        contentObjArray: [],
        ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    },
    mixins: [TimerMixin],
    getInitialState: function() {
        var _this = this;
        //
        return {
            isShowLoadingView: "-1",
            fontSize: 13,
            lineHeight: 10,
            paragraphBackgroundColor: '#ffffff',
            paragraphColor:'#444444',
            dataSource: [],
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        this.setTimeout(function(){
            //
            var daysArray = [RNUtils.nowDate()];
            if(this.props.between == "7"){
                for(var i=1;i<7;i++){
                    daysArray.push(moment().subtract(i, 'days').format("YYYY-MM-DD"));
                }
            }else if(this.props.between == "14"){
                for(var i=1;i<14;i++){
                    daysArray.push(moment().subtract(i, 'days').format("YYYY-MM-DD"));
                }
            }else if(this.props.between == "1"){
                for(var i=1;i<30;i++){
                    daysArray.push(moment().subtract(i, 'days').format("YYYY-MM-DD"));
                }
            }else if(this.props.between == "3"){
                for(var i=1;i<90;i++){
                    daysArray.push(moment().subtract(i, 'days').format("YYYY-MM-DD"));
                }
            }
            console.log(daysArray)
            var count = 0;
            for(let d of daysArray){
                RNUtils.getJsonTodayContent(d,function(contentObj){
                    if(contentObj){
                        //var day = d;
                        //var content = "";
                        var contentArray = [];
                        for(var e in contentObj){
                            //if(contentObj[e].content||contentObj[e].content!=''){
                            //    content += contentObj[e].content+"\r\n";
                            //}
                            if(RNUtils.isTrueContentObj(e,contentObj)){
                                contentArray.push({
                                    key: e,
                                    value: contentObj[e]
                                });
                            }
                        }
                        //if(content && content!=''){
                        //    _this._vars.contentObjArray.push({
                        //        day: day,
                        //        content: content
                        //    });
                        //}
                        contentObj.day = d;
                        contentObj.contentArray = contentArray;
                        if(contentArray.length > 0){
                            _this._vars.contentObjArray.push(contentObj);
                        }
                    }
                    count++;
                    innerFunc();
                })
            }
            function innerFunc(){
                //console.log(count)
                if(daysArray.length == count){
                    if(_this._vars.contentObjArray.length == 0){
                        _this.setState({
                            isShowLoadingView: "0",
                            dataSource : _this._vars.ds.cloneWithRows(_this._vars.contentObjArray)
                        });
                    }else{
                        _this.setState({
                            isShowLoadingView: "1",
                            dataSource : _this._vars.ds.cloneWithRows(_this._vars.contentObjArray)
                        });
                    }
                }
            }
        },10);
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        this._vars.contentObjArray = [];
    },
    render: function(){
        var _this = this;
        var innerView = (
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
        return (
            <View style={[styles.container]}>
                <ViewHeader title={this.props.title} onPressLeft={this._onPressLeft}/>
                {innerView}
            </View>
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
        return (<ViewContent contentObj={contentObj}/>);
    },
    _onPressLeft: function(){
        YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex',selectedTab:'llgIcon'});
    }
});
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#ffffff',
    },
    scrollViewContainer:{
        backgroundColor: '#ffffff',
    },
    paragraphView:{
        paddingLeft: 0,
        paddingRight: 0,
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1.5,
        paddingTop: 50,
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
        paddingTop: 0
    },
    text:{
        fontSize: 13,
        lineHeight: 30,
        textAlignVertical: 'bottom',
        marginTop: 0,
        textAlign: 'justify',
        letterSpacing: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 0,
        color: '#333333',
        borderWidth: 0,
    }
});
//
module.exports = ScrollViewShowTodayLlgBetweenContent;