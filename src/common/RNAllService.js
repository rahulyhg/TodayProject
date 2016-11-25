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
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        }
                        console.log(SERVER_ROOT_PATH+_this.fetchObj.params.path)
                        console.log(fetchParam2)
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
        console.log(params);
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
                                    console.log("body="+body);
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
                //console.log(SERVER_ROOT_PATH+gtObj.params.path)
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
                            console.warn("请求失败："+responseJsonObj.RES_MSG);
                            //RNUtils.alert("请求网络异常");
                            Alert.alert("温馨提示","请求网络异常",[
                                {
                                    text:"好的",
                                    onPress:function(){

                                    }
                                }
                            ]);
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
    //获取书库类型
    static getJson_bookLibraryTypes(callbackFn){
        //var params = {
        //    path: "/resources/json/bookLibraryTypes.json?v=2"
        //};
        var params = {
            path: "/reading/json/getBookTypes"
        };
        RNAllService.getData(params,callbackFn)
    }
    //书库搜索书籍
    static getJson_bookLibrarySearch(param,callbackFn){
        param.currentPage = param.currentPage || 1;
        param.searchKey = param.searchKey || "";
        var params = {
            path: "/reading/json/getBooks?currentPage="+param.currentPage
                +"&key="+encodeURI(encodeURI(param.searchKey))
                +"&bCode="+encodeURI(encodeURI(param.bCode))
        };
        RNAllService.getData(params,callbackFn)
    }
    //书库搜索诗词曲
    static getJson_bookLibrarySearchPoems(param,callbackFn){
        param.currentPage= param.currentPage || 1;
        param.searchKey = param.searchKey || "";
        var params = {
            path: "/reading/json/getPoems?currentPage="+param.currentPage
                +"&key="+encodeURI(encodeURI(param.searchKey))
                +"&bCode="+param.bCode
        };
        RNAllService.getData(params,callbackFn)
    }
    //根据诗词ID获取诗词评论
    static getJson_getPoemComments(param,callbackFn){
        param.currentPage = param.currentPage || 1;
        var params = {
            path: "/reading/json/getPoemComments?currentPage="+param.currentPage+"&poemInfoId="+param.poemInfoId
        };
        RNAllService.getData(params,callbackFn)
    }
    //根据诗词ID获取诗词评论
    static getJson_getBookComments(param,callbackFn){
        param.currentPage = param.currentPage || 1;
        var params = {
            path: "/reading/json/getBookComments?currentPage="+param.currentPage+"&bookInfoId="+param.bookInfoId
        };
        RNAllService.getData(params,callbackFn)
    }
    //根据书籍id获取章节列表
    static getJson_getSectionsByBookId(param,callbackFn){
        var params = {
            path: "/reading/json/getSections?bookId="+param.bookID
        };
        RNAllService.getData(params,callbackFn)
    }
    //获取热门搜索关键词
    static getJson_getHotSearchKey(param,callbackFn){
        var params = {
            path: "/life/search/json/getHotSearchKey?keyType="+param.keyType
        };
        RNAllService.getData(params,callbackFn)
    }
    //
    static getDefaultBookShelfIcon(){
        return SERVER_ROOT_PATH+"/resources/images/bookShelf_000.jpg";
    }
    //
    static getDefaultHeadLogo_samll(){
        return SERVER_ROOT_PATH+"/resources/images/headLogo_small_000.png";
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
    //登录
    static logout(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/userlogin/readingLogout";
        param.method = "POST";
        param.userFlag = "1";
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //
    //已阅诗词
    static addPoemReaded(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/reading/json/addPoemReaded";
        param.method = "POST";
        param.isBack = true;
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //已阅书籍
    static addBookReaded(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/reading/session/json/addBookReaded";
        param.method = "POST";
        param.isBack = true;
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //关注诗词
    static addPoemFocus(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/reading/session/json/addPoemFocus";
        param.method = "POST";
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //关注书籍
    static addBookFocus(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/reading/session/json/addBookFocus";
        param.method = "POST";
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //收藏诗词
    static addPoemCollection(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/reading/session/json/addPoemCollection";
        param.method = "POST";
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //下载书籍
    static addBookDown(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/reading/session/json/addBookDown";
        param.method = "POST";
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //书库诗词曲 阅读 排行榜
    static getJson_getPoemsReadedBang(param,callbackFn){
        param.currentPage= param.currentPage || 1;
        var params = {
            path: "/reading/json/getPoems?currentPage="+param.currentPage
        };
        RNAllService.getData(params,callbackFn)
    }
    //添加诗词评论
    static addPoemComment(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/reading/session/json/addPoemComment";
        param.method = "POST";
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //添加书籍评论
    static addBookComment(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/reading/session/json/addBookComment";
        param.method = "POST";
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //获取诗词
    static getJson_getPoemInfo(param,callbackFn){
        param = param || {};
        param.path = "/reading/json/getPoemInfo";
        param.method = "POST";
        RNAllService.getData(param,callbackFn)
    }
    //添加搜索
    static addSearchKey(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/life/search/json/addSearchKey";
        param.method = "POST";
        param.isBack = true;
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //搜索她的生活
    static getJson_searchHerLife(param,callbackFn){
        param.currentPage = param.currentPage || 1;
        param.searchKey = param.searchKey || "";
        param.type = param.type || "1";
        var params = {
            path: "/life/search/json/searchHerLife?currentPage="+param.currentPage
            +"&key="+encodeURI(encodeURI(param.searchKey))
            +"&type="+param.type
        };
        RNAllService.getData(params,callbackFn)
    }
    //根据topicInfoId获取所有答案
    static getJson_getTopicAnswers(param,callbackFn){
        var params = {
            path: "/life/json/getTopicAnswers?topicInfoId="+param.topicInfoId
        };
        RNAllService.getData(params,callbackFn)
    }
    //赞主题
    static goodOrBadTopicInfo(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/life/json/goodOrBadTopicInfo";
        param.method = "POST";
        param.isBack = true;
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //参与主题
    static joinTopicInfo(param,callbackFn,failCallbackFn){
        param = param || {};
        param.path = "/life/json/joinTopicInfo";
        param.method = "POST";
        param.isBack = true;
        RNAllService.getData(param,callbackFn,failCallbackFn);
    }
    //根据topicInfoId获取当前用户主题信息
    static getJson_getLifeTopicInfo(param,callbackFn){
        if(global.YrcnApp.loginUser&&global.YrcnApp.loginUser.userLogin){
            var params = {
                path: "/life/json/postLifeTopicInfo?topicInfoId="+param.topicInfoId
            };
            params.method = "POST";
            RNAllService.getData(params,callbackFn);
        }else{
            callbackFn({
                goodType:"-2",
                joined:"-2"
            });
        }
    }
    //获取生活类型
    static getJson_getLifeTypes(param,callbackFn){
        var params = {
            path: "/life/json/getLifeTypes"
        };
        RNAllService.getData(params,callbackFn)
    }
    //获取Today事件类型
    static getJson_getTodayContentTypes(param,callbackFn){
        //var params = {
        //    path: "/life/json/getLifeTypes"
        //};
        //RNAllService.getData(params,callbackFn)
        global.YrcnApp.utils.getJsonTodayContentTypes(function(getJsonTodayContentTypesObj){
            if(getJsonTodayContentTypesObj && getJsonTodayContentTypesObj.list){
                callbackFn(getJsonTodayContentTypesObj);
            }else{
                global.YrcnApp.utils.setJsonTodayContentTypes(getJson_getTodayContentTypes);
                callbackFn(getJson_getTodayContentTypes);
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
        RNAllService.getData(params,callbackFn)
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
        RNAllService.getData(params,callbackFn)
    }
}
module.exports = RNAllService;

var getJson_getTodayContentTypes = {
    "list":[
        {
            "id":1,
            "typeCode":"记忆深刻的地点/人物/事情",
            "typeContent":"记忆深刻的地点/人物/事情",
            "typeDesp":"",
            "creatDt":"",
            "updateDt":"",
            "status":"0"
        },
        {
            "id":2,
            "typeCode":"需要记录备案的地点/人物/事情",
            "typeContent":"需要记录备案的地点/人物/事情",
            "typeDesp":"",
            "creatDt":"",
            "updateDt":"",
            "status":"0"
        },
        {
            "id":3,
            "typeCode":"开心快乐的事情",
            "typeContent":"开心快乐的事情",
            "typeDesp":"",
            "creatDt":"",
            "updateDt":"",
            "status":"0"
        },
        {
            "id":4,
            "typeCode":"让人生气的事情",
            "typeContent":"让人生气的事情",
            "typeDesp":"",
            "creatDt":"",
            "updateDt":"",
            "status":"0"
        },
        {
            "id":5,
            "typeCode":"让人悲伤的事情",
            "typeContent":"让人悲伤的事情",
            "typeDesp":"",
            "creatDt":"",
            "updateDt":"",
            "status":"0"
        },
        {
            "id":6,
            "typeCode":"吃吃吃、喝喝喝，吃货的故事",
            "typeContent":"吃吃吃、喝喝喝，吃货的故事",
            "typeDesp":"",
            "creatDt":"",
            "updateDt":"",
            "status":"0"
        },
        {
            "id":7,
            "typeCode":"旅游、逛街、各种Happy",
            "typeContent":"旅游、逛街、各种Happy",
            "typeDesp":"",
            "creatDt":"",
            "updateDt":"",
            "status":"0"
        },
        {
            "id":8,
            "typeCode":"加班",
            "typeContent":"加班",
            "typeDesp":"",
            "creatDt":"",
            "updateDt":"",
            "status":"0"
        }
    ]
};
