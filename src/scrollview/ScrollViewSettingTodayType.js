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
var ViewHeader = require('../component/ViewHeader.js');
//
/**
 */
var ScrollViewToday = React.createClass({
    _vars:{
    },
    getInitialState: function() {
        var _this = this;
        //
        return {
            isShowLoadingView: true,
            typeArray:[],
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
    },
    render: function(){
        var _this = this;
        //this.props.parent.showLeftButton();
        return (
            <View style={styles.container}>
                <ViewHeader title="显示设置" onPressLeft={this._onPressLeft}/>
                <ScrollView style={styles.scrollViewContainer}>
                    {
                        function(){
                            return _this.state.typeArray.map(function(d,i){
                                var key = Math.uuidFast();
                                return (
                                    <ListViewLiSelected title={d.typeContent} onPress={function(r){_this._onPressLi(i,r)}} key={key} color={'#000000'}/>
                                );
                            });
                        }()
                    }
                </ScrollView>
                <View style={[styles.bottomView]}>
                    <LineButtonsBox>
                        <LineButtonsBox.Button btnText={"新增"} onPress={this._onPressAdd}/>
                        <LineButtonsBox.Button btnText={"编辑"} onPress={this._onPressUpd}/>
                        <LineButtonsBox.Button btnText={"删除"} onPress={this._onPressDel}/>
                    </LineButtonsBox>
                </View>
            </View>
        );
    },
    _onPressLi: function(liIndex,result){
        var _this = this;
        this.state.typeArray[liIndex].isSelected = result;
    },
    refreshView: function(){
        var _this = this;
        RNAllService.getJson_getTodayContentTypes({},function(todayContentTypesObj){
            //console.log(todayContentTypesObj);
            _this.setState({
                typeArray: todayContentTypesObj.list,
            });
            if(global.YrcnApp.now.scrollViewToday){
                global.YrcnApp.now.scrollViewToday.refreshView();
            }
            if(global.YrcnApp.now.scrollViewYesterday){
                global.YrcnApp.now.scrollViewYesterday.refreshView();
            }
        });
    },
    _onPressAdd: function(){
        YrcnApp.now.$ViewRoot.setState({viewName:'ScrollViewAddTodayType',viewTitle:'新增',prevView: this});
    },
    _onPressUpd: function(){
        var _this = this;
        var typeArray = this.state.typeArray;
        var selectedArray = [];
        var newTypeArray = [];
        for(var item of typeArray){
            if(item.isSelected == "1"){
                selectedArray.push(item);
            }
        }
        if(selectedArray.length == 0){
            RNUtils.alert("请至少选择一项")
            return;
        }
        if(selectedArray.length > 1){
            RNUtils.alert("只能选择一项")
            return;
        }
        YrcnApp.now.$ViewRoot.setState({viewName:'ScrollViewUpdTodayType',viewTitle:'编辑',prevView: this,typeObj:selectedArray[0]});
    },
    _onPressDel: function(){
        var _this = this;
        var typeArray = this.state.typeArray;
        var selectedArray = [];
        var newTypeArray = [];
        for(var item of typeArray){
            if(item.isSelected == "1"){
                selectedArray.push(item);
            }
        }
        if(typeArray.length == selectedArray.length){
            RNUtils.alert("请至少保留一项吧")
            return;
        }
        if(selectedArray.length == 0){
            RNUtils.alert("请至少选择一项")
            return;
        }
        RNUtils.confirm("确定要删除么？",function(){
            for(var item of typeArray){
                if(item.isSelected != "1"){
                    newTypeArray.push(item);
                }
            }
            RNUtils.setJsonTodayContentTypes({list:newTypeArray},function(){
                _this.refreshView();
            });
        })
    },
    _onPressLeft: function(){
        YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex',selectedTab:'myLife'});
    }
});
//
var styles = StyleSheet.create({
    container:{
    },
    scrollViewContainer:{
        backgroundColor: '#ffffff',
        height:Dimensions.get('window').height-120,
    },
    bottomView: {
        position:'absolute',
        top:Dimensions.get('window').height-44,
        left:0,
        height: 44,
        borderTopWidth: 2,
        borderTopColor: '#aaaaaa',
        backgroundColor: '#ffffff',
    }
});
//
module.exports = ScrollViewToday;