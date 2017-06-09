/**
 * react native工具
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    AsyncStorage,
    NetInfo,
    Alert,
} from 'react-native';
const SERVER_ROOT_PATH = "http://www.weichuanghome.com:28080/today";
//const SERVER_ROOT_PATH = "http://localhost:8080/today";
//
var RNUtils = require('../common/RNUtils.js');
var requestThreadPool = {
    iamRunning: false,
    maxThreads: 15,
    runningThreads: [],
    fetchArray: [],
    runningInterval: null,
    push: function(fetchObj){
        requestThreadPool.fetchArray.push(fetchObj);
        //console.log("push="+requestThreadPool.fetchArray.length);
        if(!requestThreadPool.iamRunning){
            requestThreadPool.iamRunning = true;
            requestThreadPool.handle();
        }
    },
    handle: function(){
        requestThreadPool.runningInterval = setInterval(function () {
            //1 有没有需要处理的任务
            if(requestThreadPool.fetchArray.length > 0){
                // 2 有没有空闲的线程处理任务
                var thread = requestThreadPool.getIdealThread();
                if(thread){
                    thread.isRunning = true;
                    var fetchObj = requestThreadPool.fetchArray.shift();
                    thread.fetchObj = fetchObj;
                    //console.log(thread.index);
                    //console.log(thread);
                    thread.executeHandle();
                }else{
                    //console.log("没有的空闲的线程");
                }
            }else{
                //console.log("没有任务需要处理了");
                requestThreadPool.iamRunning = false;
                clearInterval(requestThreadPool.runningInterval);
            }
        },20);
    },
    getIdealThread: function(){
        var thread = null;
        for(var i=0;i<requestThreadPool.runningThreads.length;i++){
            if(!requestThreadPool.runningThreads[i].isRunning){
                thread = requestThreadPool.runningThreads[i];
                //console.log(i);
                break;
            }
        }
        return thread;
    },
    init: function () {
        if(requestThreadPool.maxThreads == requestThreadPool.runningThreads.length){
            return;
        }
        for(var i=0;i<requestThreadPool.maxThreads;i++){
            var threadTemp = {
                index: i,
                fetchObj: null,
                isRunning: false,
                executeHandle: function(){
                    var _this = this;
                    //console.log(this.index+"处理："+this.fetchObj);
                    var fetchParam2 = {method: this.fetchObj.params.method};
                    //
                    var body = "1=1";
                    AsyncStorage.getItem("AS_000")
                        .then((appInfo)=>{
                            var appInfoObj = JSON.parse(appInfo);
                            for(var e in appInfoObj){
                                body += "&"+e+"="+encodeURIComponent(encodeURIComponent(appInfoObj[e]));
                            }
                            //
                            AsyncStorage.getItem("AS_009")
                                .then((loginInfo)=>{
                                    var loginInfoObj = JSON.parse(loginInfo);
                                    if(loginInfoObj){
                                        var userLoginObj = loginInfoObj.userLogin;
                                        for(var e in userLoginObj){
                                            if(e=="id"){
                                                body += "&"+"userLoginId"+"="+encodeURIComponent(encodeURIComponent(userLoginObj[e]));
                                            }else{
                                                body += "&"+e+"="+encodeURIComponent(encodeURIComponent(userLoginObj[e]));
                                            }
                                        }
                                        //console.log("body="+body);
                                        //
                                        innerFuncRequest();
                                    }else{
                                        //
                                        innerFuncRequest();
                                    }
                                }).catch((e)=>console.log("获取失败"))
                                .done();
                        }).catch((e)=>console.log("获取失败"))
                        .done();
                    //
                    function innerFuncRequest(){
                        if(_this.fetchObj.params.method == "POST"){
                            for(var e in _this.fetchObj.params){

                                body += "&"+e+"="+_this.fetchObj.params[e];
                            }
                            fetchParam2.body = body;
                            fetchParam2.headers = {
                                "Content-Type": "application/x-www-form-urlencoded",
                                'credentials': 'include'
                            }
                        }
                        console.log(SERVER_ROOT_PATH+_this.fetchObj.params.path)
                        //console.log(fetchParam2)
                        fetch(SERVER_ROOT_PATH+_this.fetchObj.params.path, fetchParam2)
                            .then((response) => response.text())
                            .then((responseText) => {
                                _this.isRunning = false;
                                //console.log("responseText="+responseText);
                                var responseJsonObj = JSON.parse(responseText);
                                if(responseJsonObj.RES_RESULT=="SUCCESS"){
                                    _this.fetchObj.succCallbackFn(responseJsonObj.RES_DATA);
                                }else if(responseJsonObj.RES_RESULT=="FAILED"){
                                    _this.fetchObj.failCallbackFn(responseJsonObj.RES_MSG);
                                }else {
                                    console.warn("请求失败："+responseJsonObj.RES_MSG);
                                }
                            })
                            .catch((error) => {
                                _this.isRunning = false;
                                console.warn("请求失败："+error);
                            });
                    }
                }
            };
            requestThreadPool.runningThreads.push(threadTemp);
        }
        //console.log(requestThreadPool.runningThreads);
    }
};
//
class RNAllService{
    static getData(params,succCallbackFn,failCallbackFn){
        //
        //console.log(params);
        //
        succCallbackFn = succCallbackFn || function(){};
        failCallbackFn = failCallbackFn || function(msg){
            Alert.alert("温馨提示",msg,[
                {
                    text:"好的",
                    onPress:function(){
                    }
                }
            ]);
        };
        params.method = params.method || "GET";
        var gtObj = {
            params:params,
            succCallbackFn:succCallbackFn,
            failCallbackFn:failCallbackFn
        };
        //
        NetInfo.fetch().done((reach) => {
            if(reach == "none"){//没有联网
                Alert.alert("温馨提示","哎呀，貌似没有联网啊...",[
                    {
                        text:"好的",
                        onPress:function(){
                        }
                    }
                ]);
            }else if(reach == "wifi"){//wifi
                innerHandle();
            }else if(reach == "cell"){//2g,3g,4g
                innerHandle();
            }else{//unknown
                innerHandle();
            }
        });
        function innerHandle(){
            var fetchParam2 = {method: gtObj.params.method};
            //
            var body = "1=1";
            if(params.isBack){
                if(requestThreadPool.iamRunning){
                    requestThreadPool.push(gtObj);
                }else{
                    requestThreadPool.init();
                    requestThreadPool.push(gtObj);
                }
            }else{
                AsyncStorage.getItem("AS_000")
                    .then((appInfo)=>{
                        var appInfoObj = JSON.parse(appInfo);
                        for(var e in appInfoObj){
                            body += "&"+e+"="+encodeURIComponent(encodeURIComponent(appInfoObj[e]));
                        }
                        //
                        AsyncStorage.getItem("AS_009")
                            .then((loginInfo)=>{
                                var loginInfoObj = JSON.parse(loginInfo);
                                if(loginInfoObj && gtObj.params.userFlag != "1"){
                                    var userLoginObj = loginInfoObj.userLogin;
                                    for(var e in userLoginObj){
                                        if(e=="id"){
                                            body += "&"+"userLoginId"+"="+encodeURIComponent(encodeURIComponent(userLoginObj[e]));
                                        }else{
                                            body += "&"+e+"="+encodeURIComponent(encodeURIComponent(userLoginObj[e]));
                                        }
                                    }
                                    //console.log("body="+body);
                                    //
                                    innerFuncRequest();
                                }else{
                                    //
                                    innerFuncRequest();
                                }
                            }).catch((e)=>console.log("获取失败"))
                            .done();
                    }).catch((e)=>console.log("获取失败"))
                    .done();
            }
            //
            function innerFuncRequest(){
                if(gtObj.params.method == "POST"){
                    for(var e in gtObj.params){
                        body += "&"+e+"="+gtObj.params[e];
                    }
                    fetchParam2.body = body;
                    fetchParam2.headers = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
                console.log("2======"+SERVER_ROOT_PATH+gtObj.params.path)
                //console.log("2======"+XMLHttpRequest)
                //console.log("2======"+XMLHttpRequest)
                //console.log("2======"+XMLHttpRequest)
                //console.log("2======"+XMLHttpRequest)
                //console.log("2======"+XMLHttpRequest)
                //console.log("2======"+XMLHttpRequest)
                console.log("2======"+fetch)
                //console.log("2======"+XMLHttpRequest)
                //console.log(fetchParam2)
                fetch(SERVER_ROOT_PATH+gtObj.params.path, fetchParam2)
                    .then((response) => response.text())
                    .then((responseText) => {
                        console.log("responseText="+responseText);
                        var responseJsonObj = JSON.parse(responseText);
                        if(responseJsonObj.RES_RESULT=="SUCCESS"){
                            gtObj.succCallbackFn(responseJsonObj.RES_DATA);
                        }else if(responseJsonObj.RES_RESULT=="FAILED"){
                            gtObj.failCallbackFn(responseJsonObj.RES_MSG);
                        }else {
                            failCallbackFn(responseJsonObj.RES_MSG);
                        }
                    })
                    .catch((error) => {
                        console.warn("请求失败："+error);
                        Alert.alert("温馨提示","请求网络异常",[
                            {
                                text:"好的",
                                onPress:function(){

                                }
                            }
                        ]);
                    });
                //fetch("http://www.baidu.com").then((response) => response.text());
            }
        }
    }
    //判断是否当前app版本是否需要升级
    static checkVersions(callbackFn){
        var appInfo = global.YrcnApp.appInfo;
        var params = {
            path: "/app/json/checkVersions",
            appV: appInfo.appV,
            appBundleV: appInfo.appBundleV,
            method: "POST",
            isBack: true
        };
        RNAllService.getData(params,callbackFn)
    }
    //
    static getValidateCodeRegister(){
        return SERVER_ROOT_PATH+"/validateCode.html?func=02";
    }
    //注册
    static register(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/userlogin/register";
        param.method = "POST";
        param.requestFlag = "0";
        param.userFlag = "1";
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //登录
    static login(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/userlogin/appLogin";
        param.method = "POST";
        param.userFlag = "1";
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //游客登录
    static youkeLogin(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/userlogin/youkeLogin";
        param.method = "POST";
        param.userFlag = "1";
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //登录
    static logout(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/userlogin/readingLogout";
        param.method = "POST";
        param.userFlag = "1";
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //
    //获取Today事件类型
    static getJson_getTodayContentTypes(param,callbackFn){
        global.YrcnApp.utils.getJsonTodayContentTypes(function(getJsonTodayContentTypesObj){
            if(getJsonTodayContentTypesObj && getJsonTodayContentTypesObj.list){
                callbackFn(getJsonTodayContentTypesObj);
            }else{
                global.YrcnApp.utils.setJsonTodayContentTypes(var_getJson_getTodayContentTypes);
                callbackFn(var_getJson_getTodayContentTypes);
            }
        })
    }
    //获取Today sport类型
    static getJson_getTodaySportTypes(param,callbackFn){
        global.YrcnApp.utils.getJsonTodaySportTypes(function(getJsonTodaySportTypesObj){
            if(getJsonTodaySportTypesObj && getJsonTodaySportTypesObj.list){
                callbackFn(getJsonTodaySportTypesObj);
            }else{
                global.YrcnApp.utils.setJsonTodaySportTypes(var_getJson_getTodaySportTypes);
                callbackFn(var_getJson_getTodaySportTypes);
            }
        })
    }
    //获取Today内容
    static getJson_today_getContentInfo(param,callbackFn){
        var params = {
            path: "/today/getContentInfo",
            method: "POST",
            isBack: true,
        };
        params.day = param.day;
        RNAllService.getData(params,function(contentInfoObj){
            if(contentInfoObj && contentInfoObj.list){
                for(var e of contentInfoObj.list){
                    if(e && e.oneImages){
                        delete e.oneImages;
                    }
                }
            }
            callbackFn(contentInfoObj);
        })
    }
    //获取Today内容
    static getJson_today_synchronizeContentInfo(param,callbackFn){
        var params = {
            path: "/today/synchronizeContentInfo",
            method: "POST",
            isBack: true,
        };
        params.day = param.day;
        params.typeCode = param.typeCode;
        params.content = param.content;
        if(param.oneImages){
            params.oneImages = encodeURIComponent(encodeURIComponent(JSON.stringify(param.oneImages)));
        }
        if(param.$key == YrcnApp.configs.AS_KEY_WORKING_LOG || param.$key == YrcnApp.configs.AS_KEY_STUDY || param.$key == YrcnApp.configs.AS_KEY_SPORT){
            params.content = '...';
            var str = JSON.stringify(param);
            var p = JSON.parse(str);
            delete p.day;
            delete p.typeCode;
            delete p.$key;
            params.json = encodeURIComponent(encodeURIComponent(JSON.stringify(p)));
        }else if(!param.content){
            return;
        }
        RNAllService.getData(params,callbackFn)
    }
}
module.exports = RNAllService;

var var_getJson_getTodayContentTypes = {
    "list":[
        {
            "typeCode":"记忆深刻的地点/人物/事情",
            "typeContent":"记忆深刻的地点/人物/事情",
        },
        {
            "typeCode":"需要记录备案的地点/人物/事情",
            "typeContent":"需要记录备案的地点/人物/事情",
        },
        {
            "typeCode":"开心快乐的事情",
            "typeContent":"开心快乐的事情",
        },
        {
            "typeCode":"让人生气的事情",
            "typeContent":"让人生气的事情",
        },
        {
            "typeCode":"让人悲伤的事情",
            "typeContent":"让人悲伤的事情",
        },
        {
            "typeCode":"吃吃吃、喝喝喝，吃货的故事",
            "typeContent":"吃吃吃、喝喝喝，吃货的故事",
        },
        {
            "typeCode":"旅游、逛街、各种Happy",
            "typeContent":"旅游、逛街、各种Happy",
        },
        {
            "typeCode":"加班",
            "typeContent":"加班",
        }
    ]
};
//
var var_getJson_getTodaySportTypes = {
    "list":[
        {"typeCode":"跑步",typeContent:'跑步'},
        {"typeCode":"哑铃",typeContent:'哑铃'},
        {"typeCode":"健身房",typeContent:'健身房'},
        {"typeCode":"健美操",typeContent:'健美操'},
        {"typeCode":"瑜伽",typeContent:'瑜伽'},
    ]
};
