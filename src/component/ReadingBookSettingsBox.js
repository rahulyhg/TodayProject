/**
 * 读书页面设置
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Slider,
    ScrollView,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
var LineButtonsBox = require('../component/LineButtonsBox.js');

/**
 * 定义属性：
 * backgroundColor 背景颜色
 */
var ReadingBookSettingsBox = React.createClass({
    mixins: [],
    _vars:{},
    getDefaultProps: function(){
        return ({
            sectionTitle: "",
        });
    },
    getInitialState: function(){
        // 获取电池对象!
        return ({
        });
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){

    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
    },
    //
    render: function(){
        var _this = this;
        return (
            <View style={[styles.container,{backgroundColor:this.props.backgroundColor,borderTopColor: this.props.color}]}>
                <View style={styles.fontUpdateView}>
                    <LineButtonsBox>
                        <LineButtonsBox.Button btnText={"字体大小-"} color={this.props.color} onPress={this._handleFontSize_01}/>
                        <LineButtonsBox.Button btnText={"字体大小+"} color={this.props.color} onPress={this._handleFontSize_02}/>
                    </LineButtonsBox>
                </View>
                <View style={styles.backgroundSetting}>
                    <View style={styles.backgroundSettingLeft}>
                        <Text style={[{color:this.props.color}]}>背景设置：</Text>
                    </View>
                    <ScrollView style={styles.backgroundSettingRight} horizontal={true} contentContainerStyle={styles.contentContainerStyle}>
                        <TouchableOpacity style={[styles.backgroundSettingRightItem,{backgroundColor:'#faf6ed',}]} onPress={function(){_this._onPressUpdateBackground('#faf6ed','#444444');}}>
                            <Text style={[styles.backgroundSettingRightItemText,{color:'#444444',}]}>读A</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backgroundSettingRightItem,{backgroundColor:'#f4e2c0',}]} onPress={function(){_this._onPressUpdateBackground('#f4e2c0','#444444');}}>
                            <Text style={[styles.backgroundSettingRightItemText,{color:'#444444',}]}>读B</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backgroundSettingRightItem,{backgroundColor:'#e8e8f2',}]} onPress={function(){_this._onPressUpdateBackground('#e8e8f2','#444444');}}>
                            <Text style={[styles.backgroundSettingRightItemText,{color:'#444444',}]}>读C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backgroundSettingRightItem,{backgroundColor:'#c3edb5',}]} onPress={function(){_this._onPressUpdateBackground('#c3edb5','#444444');}}>
                            <Text style={[styles.backgroundSettingRightItemText,{color:'#444444',}]}>读D</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backgroundSettingRightItem,{backgroundColor:'#504036',}]} onPress={function(){_this._onPressUpdateBackground('#504036','#8e9681');}}>
                            <Text style={[styles.backgroundSettingRightItemText,{color:'#8e9681',}]}>读E</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backgroundSettingRightItem,{backgroundColor:'#f5f4eb',}]} onPress={function(){_this._onPressUpdateBackground('#f5f4eb','#333333');}}>
                            <Text style={[styles.backgroundSettingRightItemText,{color:'#333333',}]}>读F</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backgroundSettingRightItem,{backgroundColor:'#cce9ce',}]} onPress={function(){_this._onPressUpdateBackground('#cce9ce','#333333');}}>
                            <Text style={[styles.backgroundSettingRightItemText,{color:'#333333',}]}>读G</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backgroundSettingRightItem,{backgroundColor:'#dddddd',}]} onPress={function(){_this._onPressUpdateBackground('#dddddd','#333333');}}>
                            <Text style={[styles.backgroundSettingRightItemText,{color:'#333333',}]}>读H</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backgroundSettingRightItem,{backgroundColor:'#e7d5b9',}]} onPress={function(){_this._onPressUpdateBackground('#e7d5b9','#333333');}}>
                            <Text style={[styles.backgroundSettingRightItemText,{color:'#333333',}]}>读I</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backgroundSettingRightItem,{backgroundColor:'#000000',}]} onPress={function(){_this._onPressUpdateBackground('#000000','#666666');}}>
                            <Text style={[styles.backgroundSettingRightItemText,{color:'#666666',}]}>读J</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backgroundSettingRightItem,{backgroundColor:'#dfeed4',}]} onPress={function(){_this._onPressUpdateBackground('#dfeed4','#343f2a');}}>
                            <Text style={[styles.backgroundSettingRightItemText,{color:'#343f2a',}]}>读L</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backgroundSettingRightItem,{backgroundColor:'#fbe1e1',}]} onPress={function(){_this._onPressUpdateBackground('#fbe1e1','#94535d');}}>
                            <Text style={[styles.backgroundSettingRightItemText,{color:'#94535d',}]}>读M</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backgroundSettingRightItem,{backgroundColor:'#eedbbc',}]} onPress={function(){_this._onPressUpdateBackground('#eedbbc','#4e3b2d');}}>
                            <Text style={[styles.backgroundSettingRightItemText,{color:'#4e3b2d',}]}>读N</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View>
                    <LineButtonsBox>
                        <LineButtonsBox.Button btnText={"恢复默认"} color={this.props.color} onPress={this._onPressRestoreDefault}/>
                        <LineButtonsBox.Button btnText={"关闭设置"} color={this.props.color} onPress={this._onPressCloseSettings}/>
                    </LineButtonsBox>
                </View>
            </View>
        );
    },
    _handleFontSize_01: function(){
        this.props.readingBook.updateFontSize(-1);
    },
    _handleFontSize_02: function(){
        this.props.readingBook.updateFontSize(1);
    },
    _onPressRestoreDefault: function(){
        this.props.readingBook.restoreDefault();
    },
    _onPressCloseSettings: function(){
        this.props.readingBook.closeSettings();
    },
    _onSlidingComplete: function(value){
        //console.log(value);
        RNUtils.screenSetBrightness(value);
        this.props.readingBook.updateScreenLight(value);
    },
    _onPressUpdateBackground: function(backgroundColor,color){
        //console.log("_onPressUpdateBackground"+backgroundColor+color)
        this.props.readingBook.updateBackground(backgroundColor,color);
    }
});
//
module.exports = ReadingBookSettingsBox;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 3,
    },
    fontUpdateView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    fontUpdateButton:{
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        marginLeft:10,
        marginRight: 10,
    },
    fontUpdateText:{
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    backgroundSetting:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        height: 40,
    },
    backgroundSettingLeft:{
        width: 80,
        height: 40,
        justifyContent: 'center',
    },
    backgroundSettingRight:{
        width: Dimensions.get('window').width-80,
        height: 50,
    },
    contentContainerStyle:{
        justifyContent: 'center',
        alignItems:'center',
    },
    backgroundSettingRightItem:{
        width: 60,
        height: 40,
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems:'center',
    },
    backgroundSettingRightItemText:{
        fontSize: 14,
        textAlign: 'center',
    },
    screenLight:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    screenLightLeft:{
        width: 80,
    },
    screenLightRight:{
        flex: 1,
    },
});
//<View style={styles.screenLight}>
//    <View style={styles.screenLightLeft}>
//        <Text>屏幕亮度：</Text>
//    </View>
//    <View style={styles.screenLightRight}>
//        <Slider  step={0} onSlidingComplete={this._onSlidingComplete} value={this.props.screenLight}/>
//    </View>
//</View>