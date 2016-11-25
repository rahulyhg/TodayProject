/**
 * 读书多个段落显示
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Timers,
} from 'react-native';
var moment = require('moment/moment.js');
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
var ReadingBookParagraphText = require('../component/ReadingBookParagraphText.js');
/**
 * 定义属性：
 * fontSize 文字大小 12-30
 * lineHeight 行间距 -1紧凑 0正常 1松散
 * marginTop 与上一个段落的间距
 * color 文字颜色
 * text 这个页面大概要展示多少文字
 * height 展示高度
 */
var ReadingBookParagraphsView = React.createClass({
    _vars:{},
    getInitialState:function(){
        //先计算一下能显示多少行
        var rows = parseInt(Dimensions.get('window').height/12);//每行的最小高度是12
        var rowWords = parseInt((Dimensions.get('window').width)/12);
        this._vars.maxPageWords = rows * rowWords;//一页最大显示文字数量
        return ({});
    },
    //
    render: function(){
        //console.log(this.props.textArray);
        this.state.textArrayT = [];
        for(var i=0;i<this.props.textArray.length;i++){
            var itemObj = RNUtils.deepCopy(this.props.textArray[i]);
            if(i==0){
                this.state.textArrayT.push(itemObj);
            }else{
                if(itemObj.isParagraphStart){
                    this.state.textArrayT.push(itemObj);
                }else{
                    this.state.textArrayT[this.state.textArrayT.length-1].text += itemObj.text;
                }
            }
        }
        //console.log(this.state.textArrayT);
        //
        return (
            <View style={styles.container}>
                {this.state.textArrayT.map(this._createReadingBookParagraphText)}
            </View>
        );
    },
    _createReadingBookParagraphText: function(itemObj){
        //console.log(itemObj);
        var key = Math.uuidFast();
        //console.log(itemObj.text)
        //alert(itemObj.text);
        return (
            <ReadingBookParagraphText {...itemObj} key={key} fontSize={this.props.fontSize}/>
        );
    }
});
//
module.exports = ReadingBookParagraphsView;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height-70,
        paddingLeft: 15,
        paddingRight: 15,
        overflow:'hidden',
    },
});