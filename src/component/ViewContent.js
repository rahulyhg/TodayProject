/**
 * 表单
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
 * 定义属性：
 */
var ViewContent = React.createClass({
    _vars:{},
    getDefaultProps: function(){
        return ({
        });
    },
    getInitialState: function(){
        return ({
        });
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
    },
    //
    render: function(){
        var _this = this;
        var key = Math.uuidFast();
        var contentObj = this.props.contentObj;
        var day = moment(contentObj.day);
        return (
            <View key={key} style={styles.paragraphView}>
                <View style={styles.paragraphViewWeek}>
                    <Text style={styles.paragraphViewWeekText}>{day.format("dddd")}</Text>
                </View>
                <View style={styles.paragraphViewDay}>
                    <Text style={styles.paragraphViewDayText}>{contentObj.day}</Text>
                </View>
                {(function(){
                    if(contentObj.contentArray && contentObj.contentArray.length > 0){
                        return contentObj.contentArray.map(function(d,i){
                            //RNUtils.logObj("ViewContent.js.js render",d.value);
                            if(d.value.content || d.value.oneImages || d.value.overtime || d.value.qingjia){
                                if(d.value.oneImages && Array.isArray(d.value.oneImages) && d.value.oneImages.length>0){
                                    d.value.oneImages = d.value.oneImages||[];
                                    for(var oneImage of d.value.oneImages) {
                                        oneImage.uri = RNUtils.getSandboxFileLongPath(oneImage.uri);
                                    }
                                }else if(d.value.oneImages){
                                    var newOneImages = [];
                                    for(var oneImagekey in d.value.oneImages) {
                                        var oneImage = d.value.oneImages[oneImagekey];
                                        oneImage.uri = RNUtils.getSandboxFileLongPath(oneImage.uri);
                                        newOneImages.push(oneImage);
                                    }
                                    d.value.oneImages = newOneImages;
                                }
                                var innerHtml=[];
                                if(d.value.content){
                                    if(d.value.$key == YrcnApp.configs.AS_KEY_STUDY){
                                        innerHtml.push((
                                            <Text key={'content_'+key} style={[styles.text,{backgroundColor:'#ffffff',color:'#01bbfc'}]}>{d.value.content}</Text>
                                        ));
                                    }else if(d.value.$key == YrcnApp.configs.AS_KEY_SPORT){
                                        for(var e in d.value){
                                            if(e != 'content' && e != 'day' && e != '$key' && e.indexOf('Desp')==-1){
                                                innerHtml.push((
                                                    <Text key={'content_'+key+e} style={[styles.text,{backgroundColor:'#ffffff',color:'#00aa00'}]}>{e+' : '+d.value[e+'Desp']}</Text>
                                                ));
                                            }
                                        }
                                    }else{
                                        innerHtml.push((
                                            <Text key={'content_'+key} style={[styles.text,{backgroundColor:'#ffffff',color:'#333333'}]}>{d.value.content}</Text>
                                        ));
                                    }
                                }
                                if(d.value.overtime){
                                    innerHtml.push((
                                        <Text key={key} style={[styles.text,{backgroundColor:'#ffffff',color:'#000000'}]}>{'加班：'+d.value.overtimeDesp}</Text>
                                    ));
                                }
                                if(d.value.qingjia){
                                    innerHtml.push((
                                        <Text key={key} style={[styles.text,{backgroundColor:'#ffffff',color:'#aaaaaa'}]}>{'请假：'+d.value.qingjiaDesp}</Text>
                                    ));
                                }
                                return (
                                    <View key={i} style={styles.textAndImageView}>
                                        {innerHtml}
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
module.exports = ViewContent;
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