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
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var ACViewBox = require('../component/ACViewBox.js');
var TitleIntroduceBox = require('../component/TitleIntroduceBox.js');
var LineButtonsBox = require('../component/LineButtonsBox.js');
//
/**
 */
var ScrollViewHerLife = React.createClass({
    _vars:{
        lifeTypes: []
    },
    getInitialState: function() {
        var _this = this;
        _this._vars.lifeTopicInfo = global.YrcnApp.now.coreObj;
        //
        return {
            isShowLoadingView: true,
            currentMainTypeIndex: 0,
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNAllService.getJson_getLifeTypes({},function(getJson_getLifeTypesObj){
            _this._vars.lifeTypes = getJson_getLifeTypesObj.list;
            _this.setState({
                isShowLoadingView: false,
            });
        })
    },
    _pressRow: function(d) {
        var _this = this;
        //console.log(d);
        global.YrcnApp.now.answer = d;
        _this.props.parent_navigator.push({name:"ScrollViewHerLifeAnswer",title:d.content});
    },
    render: function(){
        var _this = this;
        if(this.state.isShowLoadingView){
            return (
                <View>
                    <ACViewBox />
                </View>
            );
        }else{
            return (
                <ScrollView
                    style={styles.scrollViewContainer}>
                    <LineButtonsBox boxStyle={styles.lineButtonsBox}>
                        {
                            (function(){
                                return _this._vars.lifeTypes.map(function(d,i){
                                    var color = '#777777';
                                    if(i == _this.state.currentMainTypeIndex){
                                        color = '#343434';
                                    }
                                    var key = Math.uuidFast();
                                    return (
                                        <LineButtonsBox.Button key={key} btnText={d.mainType} onPress={(function(){_this._onPressMainType(i)})} color={color}/>
                                    );
                                });
                            })()
                        }
                    </LineButtonsBox>
                    {
                        (function(){
                            return _this._vars.lifeTypes[_this.state.currentMainTypeIndex].list.map(function(d){
                                var key = Math.uuidFast();
                                var key0 = Math.uuidFast();
                                var key1 = Math.uuidFast();
                                var key2 = Math.uuidFast();
                                return (
                                    <View key={key}>
                                        <LineButtonsBox key={key} boxStyle={styles.lineButtonsBox0}>
                                            <LineButtonsBox.Button key={key} btnText={d.subType} color={'#666666'}/>
                                            <LineButtonsBox.Button key={key0} btnText={"···"} color={'#666666'}/>
                                            <LineButtonsBox.Button key={key1} btnText={""}/>
                                            <LineButtonsBox.Button key={key2} btnText={""}/>
                                        </LineButtonsBox>
                                        {
                                            _this._renderRowButtons(d.list)
                                        }
                                    </View>
                                );
                            });
                        })()
                    }
                </ScrollView>
            );
        }
    },
    _renderRowButtons: function(array){
        var renderArray = [];
        var color = '#888888';
        //
        for(var i=0;i<array.length;i=i+3){
            var key = Math.uuidFast();
            var key0 = Math.uuidFast();
            var key1 = Math.uuidFast();
            var key2 = Math.uuidFast();
            var key3 = Math.uuidFast();
            if(i%4==0 && (i+3)<array.length){
                renderArray.push((
                    <LineButtonsBox key={key} boxStyle={styles.lineButtonsBox1}>
                        <LineButtonsBox.Button key={key0} btnText={array[i].subsubType} color={color}/>
                        <LineButtonsBox.Button key={key1} btnText={array[i+1].subsubType} color={color}/>
                        <LineButtonsBox.Button key={key2} btnText={array[i+2].subsubType} color={color}/>
                        <LineButtonsBox.Button key={key3} btnText={array[i+3].subsubType} color={color}/>
                    </LineButtonsBox>
                ));
            }
        }
        //
        return renderArray;
    },
    _onPressMainType: function(i){
        if(i == this.state.currentMainTypeIndex){
            return;
        }
        this.setState({
            currentMainTypeIndex: i,
        });
    }
});
//
var styles = StyleSheet.create({
    scrollViewContainer:{
        backgroundColor: '#ffffff',
        marginTop: 44
    },
    lineButtonsBox:{
        borderBottomWidth: 2,
        borderBottomColor: '#bbbbbb',
    },
    lineButtonsBox0:{
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderBottomColor: '#eeeeee',
    },
    lineButtonsBox1:{
        borderBottomWidth: 0,
        borderBottomColor: '#eeeeee',
    }
});
//
module.exports = ScrollViewHerLife;