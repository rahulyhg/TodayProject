/**
 * View Root
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Image,
    PanResponder,
} from 'react-native';
import { StackNavigator,DrawerNavigator } from 'react-navigation';//navigator
import {NavigatorTodayInner,NavigatorYesterdayInner,NavigatorLlgInner,NavigatorSettingsInner} from '../navigator/';
var NavigatorGuidePages = require('../navigator/NavigatorGuidePages');
var ViewNewFunc = require('../view/ViewNewFunc');
var RNUtilsModule = global.YrcnApp.native.RNUtilsModule;
var RNUtils = global.YrcnApp.utils;
var RNAllService = global.YrcnApp.services;


import {GuideIndexView } from '../view/guide';//引导页首页
import {TabBarIndex} from '../tab';//主页面 tab页
var ViewEditTodayContent = require('./../view/ViewEditTodayContent');
var ViewEditYesterdayContent = require('./../view/ViewEditYesterdayContent');
var RegisterIndexView = require('./../view/register/RegisterIndexView');
var RegisterEmailView = require('./../view/register/RegisterEmailView.js');
var LoginIndexView = require('./../view/login/LoginIndexView');
var LoginEmailView = require('./../view/login/LoginEmailView.js');
var ViewSpecialStatement = require('./../view/ViewSpecialStatement.js');
var ViewUseHelp = require('./../view/ViewUseHelp.js');
var ViewTime = require('./../view/ViewTime');
var ViewEditWorkingLog = require('./../view/ViewEditWorkingLog');//工作
var ViewEditStudy = require('./../view/ViewEditStudy');//学习
var ViewEditSport = require('./../view/ViewEditSport');//运动
var ScrollViewSettingTodayType = require('./../scrollview/ScrollViewSettingTodayType.js');
var ScrollViewSettingSportType = require('./../scrollview/ScrollViewSettingSportType.js');
var ScrollViewShowTodayContent = require('./../scrollview/ScrollViewShowTodayContent.js');
var ScrollViewShowTodayLlgBetweenContent = require('./../scrollview/ScrollViewShowTodayLlgBetweenContent.js');
var ScrollViewSearchTodayContent = require('./../scrollview/ScrollViewSearchTodayContent.js');
var ScrollViewShowTodaysContent = require('./../scrollview/ScrollViewShowTodaysContent.js');
var ScrollViewAddTodayType = require('./../scrollview/ScrollViewAddTodayType.js');
var ScrollViewAddSportType = require('./../scrollview/ScrollViewAddSportType.js');
var ScrollViewUpdTodayType = require('./../scrollview/ScrollViewUpdTodayType.js');
var ScrollViewUpdSportType = require('./../scrollview/ScrollViewUpdSportType.js');
var StackNavigatorRoot = require('../navigator/StackNavigatorRoot.js');

class ViewRoot extends Component{
    constructor(props) {
        super(props);
        this.lookImage = this.lookImage.bind(this);
        this._onPressLookImageBack = this._onPressLookImageBack.bind(this);
        this._onPressLookImageDelete = this._onPressLookImageDelete.bind(this);
    }
    _vars={viewNames:['GuideIndexView']}
    //在组件挂载之前调用一次。返回值将会作为 this.state 的初始值。
    state={
        viewName: 'GuideIndexView',
        viewTitle: '',
        appUpgrade: false,
        appUpgradeVersion: "",
        appBundleUpgradeVersion: "",
        appUpgradeDesp: "",
        contentBottomText: "下载升级",
        isShowNewFunc: false,
        lookImage: null,
        isHideDelete: false,
    }
    //在接收到新的 props 或者 state，将要渲染之前调用。该方法在初始化渲染的时候不会调用，在使用 forceUpdate 方法的时候也不会。
    //如果确定新的 props 和 state 不会导致组件更新，则此处应该 返回 false。
    shouldComponentUpdate(props,state){
        //YrcnApp.utils.logObj("ViewRoot shouldComponentUpdate new ",props)
        //YrcnApp.utils.logObj("ViewRoot shouldComponentUpdate new ",state)
        //YrcnApp.utils.logObj("ViewRoot shouldComponentUpdate old ",this.props)
        //YrcnApp.utils.logObj("ViewRoot shouldComponentUpdate old ",this.state);
        if(true){
            //console.log(this._vars.viewNames.indexOf(state.viewName) == this._vars.viewNames.length-2)
            if(this._vars.viewNames.indexOf(state.viewName) == this._vars.viewNames.length-2 && this._vars.viewNames.length>1){
                this._vars.viewNames.pop();
                if(this._vars.viewNames.length-2<=-1){
                    this._vars.prevViewName = "";
                }else{
                    this._vars.prevViewName = this._vars.viewNames[this._vars.viewNames.length-2];
                }
            }else{
                this._vars.prevViewName = this.state.viewName;
                this._vars.viewNames.push(state.viewName);
            }
        }
        //YrcnApp.utils.logObj("ViewRoot shouldComponentUpdate prevViewName",this._vars.prevViewName)
        //YrcnApp.utils.logObj("ViewRoot shouldComponentUpdate viewNames",this._vars.viewNames)
        return true;
    }
    componentWillMount() {
        var _this = this;
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // The guesture has started. Show visual feedback so the user knows
                // what is happening!

                // gestureState.d{x,y} will be set to zero now
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}

                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                //console.log(evt)
                //console.log(gestureState);
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                //console.log(gestureState);
                if(gestureState.x0 - gestureState.moveX > 100 && gestureState.moveX!=0){
                    console.log("下一张图片");
                    var index = _this._vars.index + 1;
                    if(index == _this._vars.imageObjs.length && _this._vars.imageObjs.length > 1){
                        index = 0;
                    }
                    _this._vars.index = index;
                    _this.setState({
                        lookImage: _this._vars.imageObjs[index]
                    });
                }else if(gestureState.x0 - gestureState.moveX < -100 && gestureState.moveX!=0){
                    console.log("上一张图片");
                    var index = _this._vars.index - 1;
                    if(index == -1 && _this._vars.imageObjs.length > 1){
                        index = _this._vars.imageObjs.length-1;
                    }
                    _this._vars.index = index;
                    _this.setState({
                        lookImage: _this._vars.imageObjs[index]
                    });
                }
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        });
    }
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount(){
        var _this = this;
        RNUtils.getAppInfo(function(appInfo){
            RNAllService.checkVersions(function(checkVersionsObj){
                //console.log(checkVersionsObj);
                //checkVersionsObj.appUpgrade = "1";
                if(checkVersionsObj.appUpgrade == "1"){//app客户端需要升级

                    if(global.YrcnApp.Platform.OS === "ios"){
                        _this.setState({
                            appUpgrade: true,
                            appUpgradeVersion: checkVersionsObj.appUpgradeVersion,
                            appUpgradeMust: checkVersionsObj.appUpgradeMust,
                            appUpgradeDesp: checkVersionsObj.appUpgradeDesp,
                        });
                    }else{
                        RNUtilsModule.appUpgrade([],function(){});
                    }
                }else if(checkVersionsObj.appBundleUpgrade == "1"){
                    if(global.YrcnApp.Platform.OS === "ios"){
                        _this.setState({
                            appBundleUpgrade: true,
                            appBundleUpgradeVersion: checkVersionsObj.appBundleUpgradeVersion,
                            appBundleUpgradeMust: checkVersionsObj.appBundleUpgradeMust,
                            appBundleUpgradeDesp: checkVersionsObj.appBundleUpgradeDesp,
                        });
                    }else{
                        RNUtilsModule.appUpgrade([],function(){});
                    }
                }
            })
        })
    }
    render(){
        //
        var _this = this;
        global.YrcnApp.now.$ViewRoot = this;
        return (
            <View style={[global.YrcnApp.styles.common.container,{backgroundColor:'#ffffff'}]}>
                {(this.state.viewName=='GuideIndexView')?function(){
                    return (<GuideIndexView />);
                }():function(){}()}
                {(this.state.viewName=='TabBarIndex')?function(){
                    return (<TabBarIndex selectedTab={_this.state.selectedTab}/>);
                }():function(){}()}
                {(this.state.viewName=='StackNavigatorRoot')?function(){
                    return (<StackNavigatorRoot title={_this.state.viewTitle}/>);
                }():function(){}()}
                {(this.state.viewName=='ViewEditTodayContent')?function(){
                    return (<ViewEditTodayContent title={_this.state.viewTitle} type={_this.state.type} coreObj={_this.state.coreObj}/>);
                }():function(){}()}
                {(this.state.viewName=='ViewEditYesterdayContent')?function(){
                    return (<ViewEditYesterdayContent title={_this.state.viewTitle} type={_this.state.type} coreObj={_this.state.coreObj}/>);
                }():function(){}()}
                {(this.state.viewName=='RegisterIndexView')?function(){
                    return (<RegisterIndexView />);
                }():function(){}()}
                {(this.state.viewName=='RegisterEmailView')?function(){
                    return (<RegisterEmailView />);
                }():function(){}()}
                {(this.state.viewName=='LoginIndexView')?function(){
                    return (<LoginIndexView />);
                }():function(){}()}
                {(this.state.viewName=='LoginEmailView')?function(){
                    return (<LoginEmailView />);
                }():function(){}()}
                {(this.state.viewName=='ViewSpecialStatement')?function(){
                    return (<ViewSpecialStatement />);
                }():function(){}()}
                {(this.state.viewName=='ViewUseHelp')?function(){
                    return (<ViewUseHelp />);
                }():function(){}()}
                {(this.state.viewName=='ViewTime')?function(){
                    return (<ViewTime />);
                }():function(){}()}
                {(this.state.viewName=='ScrollViewSettingTodayType')?function(){
                    return (<ScrollViewSettingTodayType />);
                }():function(){}()}
                {(this.state.viewName=='ScrollViewSettingSportType')?function(){
                    return (<ScrollViewSettingSportType />);
                }():function(){}()}
                {(this.state.viewName=='ScrollViewShowTodayContent')?function(){
                    return (<ScrollViewShowTodayContent title={_this.state.viewTitle} day={_this.state.day}/>);
                }():function(){}()}
                {(this.state.viewName=='ScrollViewShowTodayLlgBetweenContent')?function(){
                    return (<ScrollViewShowTodayLlgBetweenContent title={_this.state.viewTitle} between={_this.state.between}/>);
                }():function(){}()}
                {(this.state.viewName=='ScrollViewSearchTodayContent')?function(){
                    return (<ScrollViewSearchTodayContent title={_this.state.viewTitle}/>);
                }():function(){}()}
                {(this.state.viewName=='ScrollViewShowTodaysContent')?function(){
                    return (<ScrollViewShowTodaysContent title={_this.state.viewTitle} contentObjArray={_this.state.contentObjArray}/>);
                }():function(){}()}
                {(this.state.viewName=='ScrollViewAddTodayType')?function(){
                    return (<ScrollViewAddTodayType title={_this.state.viewTitle} prevView={_this.state.prevView}/>);
                }():function(){}()}
                {(this.state.viewName=='ScrollViewAddSportType')?function(){
                    return (<ScrollViewAddSportType title={_this.state.viewTitle} prevView={_this.state.prevView}/>);
                }():function(){}()}
                {(this.state.viewName=='ScrollViewUpdTodayType')?function(){
                    return (<ScrollViewUpdTodayType title={_this.state.viewTitle} prevView={_this.state.prevView} typeObj={_this.state.typeObj}/>);
                }():function(){}()}
                {(this.state.viewName=='ScrollViewUpdSportType')?function(){
                    return (<ScrollViewUpdSportType title={_this.state.viewTitle} prevView={_this.state.prevView} typeObj={_this.state.typeObj}/>);
                }():function(){}()}
                {(this.state.viewName=='ViewEditWorkingLog')?function(){
                    return (<ViewEditWorkingLog title={_this.state.viewTitle} coreObj={_this.state.coreObj}/>);
                }():function(){}()}
                {(this.state.viewName=='ViewEditStudy')?function(){
                    return (<ViewEditStudy title={_this.state.viewTitle} coreObj={_this.state.coreObj}/>);
                }():function(){}()}
                {(this.state.viewName=='ViewEditSport')?function(){
                    return (<ViewEditSport title={_this.state.viewTitle} coreObj={_this.state.coreObj}/>);
                }():function(){}()}
                {(this.state.appUpgrade||this.state.appBundleUpgrade)?function(){
                    //YrcnApp.components.StatusBar.setHidden(true,'slide');
                    return (
                        <View style={styles.appUpgradeView}>
                            <TouchableOpacity style={styles.appUpgradeViewInner} onPress={_this._onPressBackView}></TouchableOpacity>
                        </View>
                    );
                }():function(){}()}
                {(this.state.appUpgrade||this.state.appBundleUpgrade)?function(){
                    return (
                        <View style={styles.appUpgradeContentView}>
                            <View style={styles.contentTopView}>
                                <Text style={styles.contentTopText}>{_this.state.appUpgradeVersion||_this.state.appBundleUpgradeVersion}</Text>
                                <Text style={styles.contentTopText2}>升级提醒</Text>
                            </View>
                            <View style={styles.contentCenterView}>
                                <Text style={styles.contentCenterText1}>{global.YrcnApp.configs.AppName}已更新到{_this.state.appUpgradeVersion||_this.state.appBundleUpgradeVersion}版本了</Text>
                                <Text style={styles.contentCenterText2}>{_this.state.appUpgradeDesp||_this.state.appBundleUpgradeDesp}</Text>
                            </View>
                            <View style={styles.contentBottomView}>
                                <TouchableOpacity style={styles.contentBottomButton} onPress={_this._onPressUpgradeBtn}>
                                    <Text style={styles.contentBottomText}>{_this.state.contentBottomText}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }():function(){}()}
                {(this.state.isShowNewFunc)?function(){
                    return (
                        <ViewNewFunc onPress={_this._onPressNewFunc}/>
                    );
                }():function(){}()}
                {
                    (function(){
                        if(_this.state.lookImage){
                            return (
                                <View style={styles.lookView}>
                                    <Image source={_this.state.lookImage} style={styles.lookImage} resizeMode="contain" {..._this._panResponder.panHandlers}/>
                                    <View style={styles.lookImageBottomContainer}>
                                        <TouchableOpacity style={styles.lookImageBottomBack} onPress={_this._onPressLookImageBack}>
                                            <Text style={styles.btnText}>返回</Text>
                                        </TouchableOpacity>
                                        <View style={styles.lookImageBottomCenter}>
                                            <Text style={[{textAlign: 'center'}]}>{_this._vars.index+1}/{_this._vars.imageObjs.length}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.lookImageBottomDelete} onPress={_this._onPressLookImageDelete}>
                                            <Text style={styles.btnText}>{!_this.state.isHideDelete?'删除':''}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }
                    })()
                }
            </View>
        );
    }
    _renderScene(route, navigator){
        //
        global.YrcnApp.now.rootNavigator = navigator;
        global.YrcnApp.now.rootRoute = route;
        //
        var Component = null;
        var props = route || {};
        switch (route.name){
            case "NavigatorSettingsInner": //
                Component = NavigatorSettingsInner;
                break;
            case "TabBarIndex": //
                Component = TabBarIndex;
                break;
            case "NavigatorGuidePages": //
                Component = NavigatorGuidePages;
                break;
            case "NavigatorTodayInner": //
                Component = NavigatorTodayInner;
                break;
            case "NavigatorLlgInner": //
                Component = NavigatorLlgInner;
                break;
            case "NavigatorYesterdayInner": //
                Component = NavigatorYesterdayInner;
                break;
        }
        //console.log(props);
        return <Component parent={this} {...props}/>
    }
    _onPressBackView(){
        var _this = this;
        if(this.state.appUpgrade && this.state.appUpgradeMust != "1" && this.state.contentBottomText == "下载升级"){
            _this.setState({
                appUpgrade: false,
            });
        }
        if(this.state.appBundleUpgrade && this.state.appBundleUpgradeMust != "1" && this.state.contentBottomText == "下载升级"){
            _this.setState({
                appBundleUpgrade: false,
            });
        }
    }
    _onPressUpgradeBtn(){
        this.setState({
            contentBottomText: "正在努力升级..."
        });
        if(this.state.contentBottomText == "下载升级"){
            if(this.state.appUpgrade){
                RNUtilsModule.appUpgrade([global.YrcnApp.configs.IOS_APP_URL]);
            }else{
                RNUtilsModule.appBundleUpgrade([""]);
            }
        }
    }
    renderNewFunc(){
        this.setState({
            isShowNewFunc: true
        });
    }
    _onPressNewFunc(){
        RNUtils.setJsonNewFunc("xian_she");
        this.setState({
            isShowNewFunc: false
        });
    }
    lookImage(imageObj,callObj,index,isHideDelete){//预览图片
        var imageingObj = imageObj;
        //console.log(imageingObj);
        //console.log(index);
        if(Array.isArray(imageObj)){
            imageingObj = imageObj[index];
            this._vars.imageObjs = imageObj;
        }else{
            this._vars.imageObjs = [imageObj];
        }
        this.setState({
            lookImage: imageingObj
        });
        this._vars.callObj = callObj;
        this._vars.index = index;
        //console.log("isHideDelete="+isHideDelete);
        this.setState({
            isHideDelete: isHideDelete
        });
    }
    _onPressLookImageBack(){
        this.setState({
            lookImage: null
        });
    }
    _onPressLookImageDelete(){
        var _this = this;
        if(_this.state.isHideDelete){
            return;
        }
        this.setState({
            lookImage: null
        });
        //console.log(this._vars.imageObjs);
        //console.log(this._vars.index);
        var iamgePath = this._vars.imageObjs[this._vars.index].uri;
        //console.log("调用插件删除文件="+iamgePath);
        YrcnApp.native.RNUtilsModule.deleteSandboxFile([RNUtils.getSandboxFileShortPath(iamgePath)]);
        this._vars.callObj.deleteImage(this._vars.index);
    }
}
//
var styles = StyleSheet.create({
    appUpgradeView:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        top: 0,
        opacity: 0.7,
        backgroundColor: '#333333',
    },
    appUpgradeViewInner:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    appUpgradeContentView:{
        width: Dimensions.get('window').width/5*3.6,
        height: Dimensions.get('window').height/7*2.7,
        position: 'absolute',
        top: Dimensions.get('window').height/7*2,
        left: Dimensions.get('window').width/5*0.7,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        opacity: 1,
        borderRadius: 10,
    },
    contentTopView:{
        flex: 2,
        backgroundColor: '#01bbfc',
        paddingTop: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
    },
    contentTopText: {
        color: '#ffffff',
        fontSize: 33,
        textAlign: 'center',
    },
    contentTopText2: {
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'center',
        //marginTop: 10,
    },
    contentCenterView:{
        flex: 2,
        backgroundColor: '#ffffff',
    },
    contentCenterText1:{
        color: '#6d6d6d',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 25,
    },
    contentCenterText2:{
        color: '#6d6d6d',
        textAlign: 'left',
        fontSize: 13,
        paddingTop: 10,
        paddingLeft: 10,
    },
    contentBottomView:{
        flex: 1,
        justifyContent: 'center',
    },
    contentBottomButton:{
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#01bbfc',
        padding: 5,
        borderRadius: 5,
    },
    contentBottomText:{
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 15,
    },
    lookView:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#000000'
    },
    lookImage:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    lookImageBottomContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute',
        top: Dimensions.get('window').height-50,
        left: 0,
        width: Dimensions.get('window').width,
        height: 50,
        backgroundColor: '#fefefe',
        opacity: 0.6
    },
    lookImageBottomBack:{
        flex: 1,
    },
    lookImageBottomCenter:{
        flex: 4,
    },
    lookImageBottomDelete:{
        flex: 1
    },
    btnText: {
        textAlign: 'center',
        fontWeight: '700'
    }
});
//
//module.exports = NavigatorRoot;
export default ViewRoot;
