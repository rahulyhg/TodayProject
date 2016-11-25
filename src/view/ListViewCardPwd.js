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
var TitleIntroduceBox = require('../component/TitleIntroduceBox.js');//
/**
 */
var ListViewAccountPwd = React.createClass({
    _vars:{
    },
    getInitialState: function() {
        var _this = this;
        //
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.key !== r2.key});
        //
        return {
            ds:ds,
            //数据源
            dataSource: ds.cloneWithRows([]),
            isShowLoadingView: true,
            status: -1,
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        console.log("global.YrcnApp.now.pwdKey="+global.YrcnApp.now.pwdKey);
        var _this = this;
        RNUtils.getJsonFromCardPwds(global.YrcnApp.now.pwdKey,function(data){
            console.log(data);
            _this._vars.list = data.list;
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(_this._vars.list),
                isShowLoadingView: false,
                status: _this._vars.list.length,
            });
        });
    },
    _pressRow: function(rowData: string, sectionID: number, rowID: number) {
        var _this = this;
        global.YrcnApp.now.coreObj = rowData;
        //
        RNUtils.openUpdDeleteCancel("请选择您的操作",function(btnIndex){
            if(btnIndex == 0){
                global.YrcnApp.now.rootNavigator.push({
                    name:"NavigatorCardPwdInner",
                    title:"编辑",
                    indexName:"CardPwdDetailView",
                });
            }else if(btnIndex == 1){
                global.YrcnApp.now.rootNavigator.push({
                    name:"NavigatorCardPwdInner",
                    title:"编辑",
                    indexName:"CardPwdUpdView",
                });
            }else if(btnIndex == 2){
                RNUtils.delJsonFromCardPwds(global.YrcnApp.now.pwdKey,rowData, function () {
                    _this.refreshDs();
                })
            }
            //global.YrcnApp.now.rootNavigator.push({
            //    name: 'NavigatorHerLifeInner',
            //});
        })
    },
    /**
     * 渲染每一行的数据
     * @param rowData   单行数据
     * @param sectionID
     * @param rowID
     * @returns {XML}
     * @private
     */
    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
        var introduce = rowData.accountName+"\r\n"+rowData.pwd;
        return (
            <TouchableOpacity onPress={() => this._pressRow(rowData,sectionID,rowID)}>
                <TitleIntroduceBox title={rowData.siteName} introduce={introduce}/>
            </TouchableOpacity>
        );
    },
    render: function(){
        global.YrcnApp.now.prevListView = this;
        if(this.state.isShowLoadingView){
            return (
                <View>
                    <ACViewBox />
                </View>
            );
        }else if(this.state.status==0) {//尚未搜索到任何书籍
            return (
                <View style={styles.status_0_View}>
                    <Text>“尚未添加”</Text>
                </View>
            );
        }else{
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    style={styles.listViewContainer}
                    initialListSize={20}
                    pageSize={20}
                    onEndReachedThreshold={600}
                    onEndReached={this._onEndReached}
                    enableEmptySections={false}
                    automaticallyAdjustContentInsets={false}
                    name="ListViewBookLibrarySearchBooks">
                </ListView>
            );
        }
    },
    _onEndReached: function(){
        var _this = this;
    },
    refreshDs: function(){
        var _this = this;
        RNUtils.getJsonFromCardPwds(global.YrcnApp.now.pwdKey,function(data){
            console.log(data);
            _this._vars.list = data.list;
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(_this._vars.list),
                isShowLoadingView: false,
                status: _this._vars.list.length,
            });
        });
    }
});
//
var styles = StyleSheet.create({
    listViewContainer:{
        position: 'absolute',
        paddingTop: 50,
        backgroundColor: '#f7f7f2',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height-50,
    },
    titleView: {
        borderBottomWidth: 1,
        borderColor: '#e7e7e7',
        paddingTop:8,
        paddingBottom: 8,
        paddingLeft: 10,
    },
    titleText: {
        fontSize:13,
        fontWeight:'600',
        color: '#4c566c',
    },
    status_0_View:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems:'center',
    },
    status_0_Text:{

    }
});
//
module.exports = ListViewAccountPwd;