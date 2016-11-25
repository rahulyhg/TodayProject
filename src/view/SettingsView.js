/**
 * 设置页面显示
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
    ListView,
    NativeModules,
    Platform,
} from 'react-native';
var RNUtilsModule = NativeModules.RNUtilsModule;
//
var RNUtils = require('../common/RNUtils.js');
var globalStyles = RNUtils.getGlobalStyles();
var ListViewLi = require('../component/ListViewLi.js');
//
/**
 * 定义属性：
 */
var SettingsView = React.createClass({
    mixins: [],
    _vars:{},
    getDefaultProps: function(){
        return ({
        });
    },
    getInitialState: function(){
        var _this = this;
        //
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //console.log(this.props.bookDesk);
        //
        return {
            //数据源
            ds: ds,
            dataSource: ds.cloneWithRows([
                {
                    title:"特别声明",
                    onPressFn: function(){
                        _this._onPressSpecialStatement();
                    }
                },
                {
                    title:"使用帮助",
                    onPressFn: function(){
                        _this._onPressUseHelp();
                    }
                },
                {
                    title:"显示设置",
                    onPressFn: function(){
                        _this._onPressTypeShow();
                    }
                },
                {
                    title:"给我评分",
                    onPressFn: function(){
                        _this._onPressMarkScore();
                    }
                },
            ]),
            appBundleV: "",
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNUtils.getAppInfo(function (appInfo) {
            _this.setState({
                appBundleV: appInfo.appBundleV,
            });
        })
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
    },
    //
    render: function(){
        //console.log("render");
        //
        return (
            <View style={[styles.container]}>
                <View style={styles.topView}>
                    <Image source={require('../images/MyLogo.png')} style={styles.logo} resizeMode="cover"/>
                    <Text style={styles.topText}>{global.YrcnApp.configs.AppName} For {Platform.OS} V{this.state.appBundleV}</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    style={styles.centerView}
                    name="">
                </ListView>
                <View style={styles.bottomView}>
                    <Text style={styles.bottomText}>©怡然城南工作室</Text>
                </View>
            </View>
        );
    },
    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
        var key = Math.uuidFast();
        return (
            <View key={key}>
                <ListViewLi title={rowData.title} onPress={rowData.onPressFn}/>
            </View>
        );
    },
    _onPressSpecialStatement: function(){
        global.YrcnApp.now.rootNavigator.push({name:"NavigatorBookSettings_01",indexName:"SpecialStatementView",indexTitle:'特别声明'});
    },
    _onPressUseHelp: function(){
        global.YrcnApp.now.rootNavigator.push({name:"NavigatorBookSettings_01",indexName:"UseHelpView",indexTitle:'使用帮助'});
    },
    _onPressClearCache: function(){

    },
    _onPressTypeShow: function(){
        global.YrcnApp.now.rootNavigator.push({name:"NavigatorBookSettings_01",indexName:"ScrollViewSettingTodayType",indexTitle:'显示设置'});
    },
    _onPressMarkScore: function(){
        RNUtilsModule.appUpgrade([global.YrcnApp.configs.IOS_APP_URL]);
    }
});
//
module.exports = SettingsView;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#f7f7f2',
    },
    topView:{
        width:Dimensions.get('window').width,
        marginTop: 80,
        alignItems: 'center',
    },
    topText:{
        textAlign:'center',
        fontSize: 13,
    },
    centerView:{
        width:Dimensions.get('window').width,
        position: 'absolute',
        height: Dimensions.get('window').height - 160 -100,
        top: 240,
        left: 0,
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
    },
    bottomView:{
        width:Dimensions.get('window').width,
        position: 'absolute',
        bottom: 60,
        left: 0,
    },
    bottomText:{
        textAlign:'center',
        fontSize: 12,
    },
    logo:{
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 20,
    },
    erweima:{
        width: 200,
        height: 200,
    },
});