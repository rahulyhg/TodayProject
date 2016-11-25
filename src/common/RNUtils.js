/**
 * react native工具
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    AsyncStorage,
    Dimensions,
    StyleSheet,
    Alert,
} from 'react-native';
//
var moment = require('moment/moment.js');
moment.locale('zh-cn');
var RNAllService = require('../common/RNAllService.js');
//
import { NativeModules } from 'react-native';
var RNUtilsModule = NativeModules.RNUtilsModule;
////RNUtilsModule.demoGo(['param1','param2']);
////RNUtilsModule.demoSynCallback(['param1','param2'],function(arrayObj){
////    console.log(arrayObj);
////});
//RNUtilsModule.getAppInfo([],function(arrayObj){
//    console.log(arrayObj);
//});
//RNUtilsModule.writeTextFile(["BOOK_1_0001.txt","aaaaaaa中国"],function(arrayObj){
//    console.log(arrayObj);
//});
Number.prototype.toFixed=function(len) {
    var add = 0;
    var s,temp;
    var s1 = this + "";
    var start = s1.indexOf(".");
    if(s1.substr(start+len+1,1)>=5)add=1;
    var temp = Math.pow(10,len);
    s = Math.floor(this * temp) + add;
    return s/temp;
}
//
const AS_KEY_APP_INFO = "AS_000";//app info
const AS_KEY_BOOKDESK = "AS_001";//存储系统 书桌key
const AS_KEY_BOOKINFO_PREV = "AS_002_";//存储系统 书籍信息前缀
const AS_KEY_BOOKSECTIONS_PREV = "AS_003_";//存储系统 目录信息前缀
const AS_KEY_BOOKSECTION_PREV = "AS_004_";//存储系统 章节信息前缀
const AS_KEY_BOOK_SHELF_LIST = "AS_005";//存储系统 书架列表key
const AS_KEY_BOOK_SHELF_PREV = "AS_006_";//存储系统 书架key
const AS_KEY_SEARCH_KEY = "AS_007_";//存储系统 搜索关键词前缀
const AS_KEY_SEARCH_KEY_LAST = "AS_008_";//存储系统 最近搜索关键词前缀
const AS_KEY_LOGIN_INFO = "AS_009";//存储系统 登录信息
const AS_KEY_READING_SETTINGS_INFO = "AS_010";//存储系统 读书设置
const AS_KEY_SCREEN_LIGHT = "AS_011";//存储系统 屏幕亮度
const AS_KEY_ACCOUNT_PWD = "AS_012";//存储系统 账号类密码
const AS_KEY_CARD_PWD = "AS_013";//存储系统 卡类密码
const AS_KEY_TODAY_CONTENT_PREV = "AS_014_";//存储系统 Today内容前缀
const AS_KEY_TODAY_CONTENT_TYPES = "AS_015";//存储系统 Today内容类型

const BOOKDESK_BOOKS_NUM = 12;

class RNUtils{
    //获取系统变量
    //static getSystemVar(varName){
    //    switch (varName){
    //        case "TAB_BACKGROUND_COLOR":{
    //            return "#f1efe9";
    //            break;
    //        }
    //        case "TAB_COLOR":{
    //            return "#46b751";
    //            break;
    //        }
    //        case "NAV_BACKGROUND_COLOR":{
    //            return "#4ab854";
    //            break;
    //        }
    //        case "NAV_COLOR":{
    //            return "#46b751";
    //            break;
    //        }
    //        case "URI_DEFAULT_BOOK_SHELF_ICON":{
    //            return RNAllService.getDefaultBookShelfIcon();
    //            break;
    //        }
    //        case "URI_DEFAULT_HEAD_LOGO_SMALL":{
    //            return RNAllService.getDefaultHeadLogo_samll();
    //            break;
    //        }
    //        case "URI_Validate_Code_Register":{
    //            return RNAllService.getValidateCodeRegister();
    //            break;
    //        }
    //        case "READING_PAGE":{
    //            //先计算一下能显示多少行
    //            var rows = parseInt(Dimensions.get('window').height/12);
    //            var rowWords = parseInt((Dimensions.get('window').width)/12);
    //            return {
    //                rows:rows,
    //                rowWords:rowWords,
    //            };
    //            break;
    //        }
    //    }
    //}
    //
    static AsyncStorage_setItem(key,obj,succCallbackFn,failedCallbackFn,isNoUser){
        succCallbackFn = succCallbackFn || function(){};
        failedCallbackFn = failedCallbackFn || function(){};
        isNoUser = isNoUser || "0";
        if(isNoUser == "0"){
            key = global.YrcnApp.loginUser.userLogin.id + key;
        }
        AsyncStorage.setItem(key,JSON.stringify(obj))
            .then(function(){
                console.log("AsyncStorage_setItem");
                console.log(key)
                console.log(obj)
                succCallbackFn();
            })
            .catch(function(e){
                console.log("存储失败"+key);
                failedCallbackFn(e);
            })
            .done();
    }
    //
    static AsyncStorage_getItem(key,succCallbackFn,failedCallbackFn,isNoUser){
        succCallbackFn = succCallbackFn || function(){};
        failedCallbackFn = failedCallbackFn || function(){};
        isNoUser = isNoUser || "0";
        if(isNoUser == "0"){
            console.log(global.YrcnApp.loginUser)
            key = global.YrcnApp.loginUser.userLogin.id + key;
        }
        AsyncStorage.getItem(key)
            .then((obj)=>{
                console.log("AsyncStorage_getItem");
                console.log(key)
                console.log(obj)
                if(obj){
                    succCallbackFn(RNUtils.parseJSON(obj));
                }else{
                    succCallbackFn({});
                }
            })
            .catch(function(e){
                console.log("获取"+key);
                failedCallbackFn(e);
            })
            .done();
    }
    //
    static AsyncStorage_removeItem(key,succCallbackFn,failedCallbackFn,isNoUser){
        succCallbackFn = succCallbackFn || function(){};
        failedCallbackFn = failedCallbackFn || function(){};
        isNoUser = isNoUser || "0";
        if(isNoUser == "0"){
            console.log(global.YrcnApp.loginUser)
            key = global.YrcnApp.loginUser.userLogin.id + key;
        }
        AsyncStorage.removeItem(key)
            .then(()=>{
                succCallbackFn();
            })
            .catch(function(e){
                console.log("清除失败"+key);
                failedCallbackFn(e);
            })
            .done();
    }
    //
    static setAppInfo(appInfo){
        RNUtils.AsyncStorage_setItem(AS_KEY_APP_INFO,appInfo,function(){},function(){},"1");
    }
    //
    static getAppInfo(callbackFn){
        RNUtils.AsyncStorage_getItem(AS_KEY_APP_INFO,callbackFn,function(){},"1");
    }
    //获取屏幕尺寸长宽
    static getScreenWidthHeight(){
        return Dimensions.get('window');
    }
    //获取书架
    //static getBookDesk(callbackFn){
    //    AsyncStorage.getItem(AS_KEY_BOOKDESK)
    //        .then((bookDesk)=>{
    //            //console.log(bookDesk);
    //            if(bookDesk){
    //                bookDesk = RNUtils.parseJSON(bookDesk);
    //            }else{
    //                bookDesk = {
    //                    bookObjs:[]
    //                };
    //            }
    //            callbackFn(bookDesk);
    //        });
    //}
    ////获取书架所有书籍
    //static getBookDeskBooks(callbackFn){
    //    AsyncStorage.getItem(AS_KEY_BOOKDESK)
    //        .then((bookDesk)=>{
    //            //console.log(bookDesk);
    //            if(bookDesk){
    //                bookDesk = RNUtils.parseJSON(bookDesk);
    //            }else{
    //                bookDesk = {
    //                    bookObjs:[]
    //                };
    //            }
    //            callbackFn(bookDesk.bookObjs);
    //        });
    //}
    ////把书籍放入书桌
    //static pushBookDeskBook(bookObj){
    //    //
    //    bookObj.lastReadDt = RNUtils.nowDt();
    //    //console.log(bookObj.lastReadDt)
    //    //
    //    RNUtils.getBookDesk(function(bookDesk){
    //        var bookObjs = bookDesk.bookObjs;
    //        var newBookObjs = [bookObj];
    //        for(var i=0;i<bookObjs.length&&newBookObjs.length<20;i++){
    //            if(bookObjs[i].bookID != bookObj.bookID){
    //                newBookObjs.push(bookObjs[i]);
    //            }
    //        }
    //        bookDesk.bookObjs = newBookObjs;
    //        AsyncStorage.setItem(AS_KEY_BOOKDESK,JSON.stringify(bookDesk))
    //            .then(function(){
    //
    //            })
    //            .catch((e)=>console.log("存储失败"+AS_KEY_BOOKINFO_PREV+bookObj.bookID))
    //            .done();
    //    });
    //}
    ////把书籍移除书桌
    //static delBookDeskBook(bookObj,callbackFn){
    //    RNUtils.getBookDesk(function(bookDesk){
    //        var bookObjs = bookDesk.bookObjs;
    //        var newBookObjs = [];
    //        for(var i=0;i<bookObjs.length&&newBookObjs.length<=10;i++){
    //            if(bookObjs[i].bookID != bookObj.bookID){
    //                newBookObjs.push(bookObjs[i]);
    //            }
    //        }
    //        bookDesk.bookObjs = newBookObjs;
    //        AsyncStorage.setItem(AS_KEY_BOOKDESK,JSON.stringify(bookDesk))
    //            .then(function(){
    //                callbackFn();
    //            })
    //            .catch((e)=>console.log("存储失败"+AS_KEY_BOOKINFO_PREV+bookObj.bookID))
    //            .done();
    //    });
    //}
    ////删除书架
    //static delBookShelf(bookShelfObj,callbackFn){
    //    callbackFn = callbackFn || function(){};
    //    if(bookShelfObj.shelfName == "默认书架"){
    //        RNUtils.alert("默认书架不能删除");
    //        return;
    //    }
    //    //
    //    RNUtils.getBookShelf(bookShelfObj.shelfName,function(bookShelf){
    //        var bookObjs = bookShelf.bookObjs;
    //        if(bookObjs.length>0){
    //            RNUtils.confirm("此书架还有遗落的书籍，确定强制删除吗？",function(){
    //                innerFunc();
    //            });
    //        }else{
    //            innerFunc();
    //        }
    //        function innerFunc(){
    //            RNUtils.getBookShelfList(function(bookShelfListObj){
    //                var newBookShelfListObj = [];
    //                for(var i=0;i<bookShelfListObj.list.length;i++){
    //                    if(bookShelfListObj.list[i].shelfName != bookShelfObj.shelfName){
    //                        newBookShelfListObj.push(bookShelfListObj.list[i]);
    //                    }
    //                }
    //                bookShelfListObj.list = newBookShelfListObj;
    //                //
    //                AsyncStorage.setItem(AS_KEY_BOOK_SHELF_LIST,JSON.stringify(bookShelfListObj))
    //                    .then(function(){
    //                        callbackFn();
    //                    })
    //                    .catch((e)=>console.log("存储失败"+AS_KEY_BOOK_SHELF_LIST))
    //                    .done();
    //            })
    //        }
    //    })
    //}
    ////获取书架列表
    //static getBookShelfList(callbackFn){
    //    AsyncStorage.getItem(AS_KEY_BOOK_SHELF_LIST)
    //        .then(function(bookShelfListObj){
    //            if(!bookShelfListObj){
    //                var defaultBookShelf = {
    //                    shelfName:'默认书架',
    //                };
    //                bookShelfListObj = {
    //                    list:[defaultBookShelf]
    //                };
    //                //
    //                AsyncStorage.setItem(AS_KEY_BOOK_SHELF_LIST,JSON.stringify(bookShelfListObj))
    //                    .then(function(){
    //
    //                    })
    //                    .catch((e)=>console.log("存储失败"+AS_KEY_BOOK_SHELF_LIST))
    //                    .done();
    //            }
    //            //console.log(bookShelfListObj);
    //            callbackFn(RNUtils.parseJSON(bookShelfListObj));
    //        })
    //        .catch((e)=>console.log(e))
    //        .done();
    //}
    ////添加书架至书架列表
    //static addBookShelf(bookShelf,callbackFn){
    //    RNUtils.getBookShelfList(function (bookShelfListObj) {
    //        var bookShelfList = bookShelfListObj.list;
    //        var bookShelfListNew = [bookShelf];
    //        for(var i=0;i<bookShelfList.length;i++){
    //            if(bookShelfList[i].shelfName == bookShelf.shelfName){
    //                continue;
    //            }else{
    //                bookShelfListNew.push(bookShelfList[i]);
    //            }
    //        }
    //        bookShelfListObj.list = bookShelfListNew;
    //        //
    //        AsyncStorage.setItem(AS_KEY_BOOK_SHELF_LIST,JSON.stringify(bookShelfListObj))
    //            .then(function(){
    //                callbackFn();
    //            })
    //            .catch((e)=>console.log("存储失败"+AS_KEY_BOOK_SHELF_LIST))
    //            .done();
    //    })
    //}
    ////获取某个书架的书籍列表
    //static getBookShelf(shelfName,callbackFn){
    //    AsyncStorage.getItem(AS_KEY_BOOK_SHELF_PREV+shelfName)
    //        .then(function(bookShelf){
    //            if(!bookShelf) {
    //                bookShelf = {
    //                    shelfName: shelfName,
    //                    bookObjs: [],
    //                };
    //                //
    //                AsyncStorage.setItem(AS_KEY_BOOK_SHELF_PREV+shelfName,JSON.stringify(bookShelf))
    //                    .then(function(){
    //                        callbackFn(bookShelf);
    //                    })
    //                    .catch((e)=>console.log("存储失败"+AS_KEY_BOOK_SHELF_PREV+shelfName))
    //                    .done();
    //            }else{
    //                bookShelf = RNUtils.parseJSON(bookShelf);
    //                bookShelf.bookObjs = bookShelf.bookObjs||[];
    //                callbackFn(bookShelf);
    //            }
    //        })
    //        .catch((e)=>console.log(e))
    //        .done();
    //}
    ////把书籍放入书架
    //static pushBookShelfBook(bookObj,shelfName,callbackFn){
    //    callbackFn = callbackFn || function(){};
    //    //
    //    if(bookObj.shelfName){
    //        if(bookObj.shelfName != shelfName){
    //            return;
    //        }
    //    }
    //    bookObj.shelfName = shelfName;
    //    RNUtils.getBookShelf(shelfName,function(bookShelf){
    //        //
    //        var bookObjs = bookShelf.bookObjs;
    //        var newBookObjs = [bookObj];
    //        for(var i=0;i<bookObjs.length;i++){
    //            if(bookObjs[i].bookID != bookObj.bookID){
    //                newBookObjs.push(bookObjs[i]);
    //            }
    //        }
    //        bookShelf.bookObjs = newBookObjs;
    //        //console.log(bookShelf);
    //        //
    //        AsyncStorage.setItem(AS_KEY_BOOK_SHELF_PREV+bookShelf.shelfName,JSON.stringify(bookShelf))
    //            .then(function(){
    //                callbackFn();
    //            })
    //            .catch((e)=>console.log("存储失败"+AS_KEY_BOOK_SHELF_PREV+bookShelf.shelfName))
    //            .done();
    //    })
    //}
    ////把书籍移除书架
    //static delBookShelfBook(bookObj,shelfName,callbackFn){//把书籍移除书架
    //    callbackFn = callbackFn || function(){};
    //    RNUtils.getBookShelf(shelfName,function(bookShelf){
    //        //
    //        var bookObjs = bookShelf.bookObjs;
    //        var newBookObjs = [];
    //        for(var i=0;i<bookObjs.length;i++){
    //            if(bookObjs[i].bookID != bookObj.bookID){
    //                newBookObjs.push(bookObjs[i]);
    //            }
    //        }
    //        bookShelf.bookObjs = newBookObjs;
    //        //
    //        AsyncStorage.setItem(AS_KEY_BOOK_SHELF_PREV+bookShelf.shelfName,JSON.stringify(bookShelf))
    //            .then(function(){
    //                callbackFn();
    //            })
    //            .catch((e)=>console.log("存储失败"+AS_KEY_BOOK_SHELF_PREV+bookShelf.shelfName))
    //            .done();
    //    })
    //}
    //static pushBookInfo(bookObj){//把书籍信息放入存储系统
    //    //
    //    bookObj.lastReadDt = RNUtils.nowDt();
    //    //console.log(bookObj.lastReadDt)
    //    //
    //    AsyncStorage.setItem(AS_KEY_BOOKINFO_PREV+bookObj.bookID,JSON.stringify(bookObj))
    //        .then(function(){
    //
    //        })
    //        .catch((e)=>console.log("存储失败"+AS_KEY_BOOKINFO_PREV+bookObj.bookID))
    //        .done();
    //}
    //static getBookInfo(bookId,callbackFn){//从存储系统中获取
    //    callbackFn = callbackFn || function(){};
    //    AsyncStorage.getItem(AS_KEY_BOOKINFO_PREV+bookId)
    //        .then(function(bookInfo){
    //            if(bookInfo){
    //                callbackFn(RNUtils.parseJSON(bookInfo))
    //            }else{
    //                callbackFn(bookInfo)
    //            }
    //        })
    //        .catch((e)=>console.log(e))
    //        .done();
    //}
    //static pushBookSections(bookId,sectionsData){//把目录信息放入存储系统
    //    AsyncStorage.setItem(AS_KEY_BOOKSECTIONS_PREV+bookId,JSON.stringify(sectionsData))
    //        .then(function(){
    //            //console.log("存储成功"+AS_KEY_BOOKSECTIONS_PREV+bookId)
    //        })
    //        .catch((e)=>console.log("存储失败"+AS_KEY_BOOKSECTIONS_PREV+bookId))
    //        .done();
    //}
    //static pushBookSection(sectionData){//把章节信息放入存储系统
    //    AsyncStorage.setItem(AS_KEY_BOOKSECTION_PREV+sectionData.id,JSON.stringify(sectionData))
    //        .then(function(){
    //            //console.log("存储成功"+AS_KEY_BOOKSECTION_PREV+sectionData.id)
    //        })
    //        .catch((e)=>console.log("存储失败"+AS_KEY_BOOKSECTION_PREV+sectionData.id))
    //        .done();
    //}
    //static getBookSections(bookId,callbackFn){//get目录信息
    //    AsyncStorage.getItem(AS_KEY_BOOKSECTIONS_PREV+bookId)
    //        .then(function(sectionsData){
    //            if(sectionsData){
    //                callbackFn(RNUtils.parseJSON(sectionsData));
    //            }else{
    //                //console.log("请求网络");
    //                //先下载目录
    //                var params = {
    //                    path: "/reading/json/getSections?bookId="+bookId
    //                };
    //                RNAllService.getData(params,function(data){
    //                    RNUtils.pushBookSections(bookId,data);
    //                    //console.log(data.list);
    //                    callbackFn(RNUtils.parseJSON(data));
    //                })
    //            }
    //        })
    //        .catch((e)=>console.log(e))
    //        .done();
    //}
    //static getBookSectionContent(sectionId,callbackFn){//get章节信息
    //    AsyncStorage.getItem(AS_KEY_BOOKSECTION_PREV+sectionId)
    //        .then(function(sectionData){
    //            if(sectionData){
    //                callbackFn(RNUtils.parseJSON(sectionData));
    //            }else{
    //                //console.log("请求网络getBookSectionContent="+sectionId);
    //                //根据目录下载章节
    //                var params = {
    //                    path: "/reading/json/getSection?sectionId="+sectionId
    //                };
    //                RNAllService.getData(params,function(data2){
    //                    //console.log(data2);
    //                    RNUtils.pushBookSection(data2);
    //                    callbackFn(RNUtils.parseJSON(data2));
    //                })
    //            }
    //        })
    //        .catch((e)=>console.log(e))
    //        .done();
    //}
    //
    static getGlobalStyles(){
        return styles;
    }
    //
    static parseJSON(obj){
        //console.log(typeof(obj))
        var isJson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        if(!isJson){
            obj = JSON.parse(obj);
        }
        return obj;
    }
    //
    static humanDt(dtStr){
        var ret = moment(dtStr,'YYYY-MM-DD HH:mm:ss').format("YYYY-MM-DD HH:mm:ss");;
        //console.log(ret);
        return ret;
    }
    //
    static nowDt(){
        var ret = moment().format("YYYY-MM-DD HH:mm:ss");;
        //console.log(ret);
        return ret;
    }
    //
    static nowDate(){
        var ret = moment().format("YYYY-MM-DD");;
        //console.log(ret);
        return ret;
    }
    //
    static yesterdayDate(){
        var ret =  moment().subtract(1, 'days').format("YYYY-MM-DD");;
        //console.log(ret);
        return ret;
    }
    //
    static nowTime(){
        var ret = moment().format("HH:mm:ss");;
        //console.log(ret);
        return ret;
    }
    //
    static nowTimeHHmm(){
        var ret = moment().format("HH:mm");;
        //console.log(ret);
        return ret;
    }
    //
    static deepCopy(source) {
        var result={};
        for (var key in source) {
            result[key] = typeof source[key]==='object'?RNUtils.deepCopy(source[key]): source[key];
        }
        return result;
    }
    //
    static alert(msg,callbackFn,title){
        callbackFn = callbackFn || function(){};
        title = title || "温馨提示";
        Alert.alert(title,msg+"",[
            {
                text:"好的",
                onPress:function(){
                    callbackFn();
                }
            }
        ]);
    }
    //
    static confirm(msg,callbackFn,title){
        callbackFn = callbackFn || function(){};
        title = title || "温馨提示";
        Alert.alert(title,msg+"",[
            {
                text:"确定",
                onPress:function(){
                    callbackFn();
                }
            },
            {
                text:"取消",
                onPress:function(){

                }
            }
        ]);
    }
    //
    static openDeleteCancel(msg,callbackFn,title){
        callbackFn = callbackFn || function(){};
        title = title || "温馨提示";
        Alert.alert(title,msg+"",[
            {
                text:"打开",
                onPress:function(){
                    callbackFn(0);
                }
            },
            {
                text:"删除",
                onPress:function(){
                    callbackFn(1);
                }
            },
            {
                text:"取消",
                onPress:function(){

                }
            }
        ]);
    }
    //
    static openUpdDeleteCancel(msg,callbackFn,title){
        callbackFn = callbackFn || function(){};
        title = title || "温馨提示";
        Alert.alert(title,msg+"",[
            {
                text:"打开",
                onPress:function(){
                    callbackFn(0);
                }
            },
            {
                text:"编辑",
                onPress:function(){
                    callbackFn(1);
                }
            },
            {
                text:"删除",
                onPress:function(){
                    callbackFn(2);
                }
            },
            {
                text:"取消",
                onPress:function(){

                }
            }
        ]);
    }
    //
    static isBiaodianFuhao(xChar){
        var isBiaodian = false;
        //匹配这些中文标点符号 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
        var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
        if(reg.test(xChar)){
            //console.log('是中文标点符号'+xChar);
            isBiaodian = true;
        }
        return isBiaodian;
    }
    static isBiaodianLineEnd(xChar){
        var isBiaodian = false;
        //匹配这些中文标点符号 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
        var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
        if(reg.test(xChar)){
            //console.log('是中文标点符号'+xChar);
            isBiaodian = true;
        }
        return isBiaodian;
    }
    //
    static isBiaodianFuhao_samll(xChar){
        var isBiaodian = false;
        if(xChar=='‘'||xChar=='’'||xChar=='“'||xChar=='”'){
            //alert('是中文标点符号');
            isBiaodian = true;
        }
        return isBiaodian;
    }
    //
    //下载书籍
    //static downBook(param,callbackFn){
    //    RNAllService.addBookDown({bookInfoId:param.bookID});
    //    //先下载目录
    //    RNAllService.getJson_getSectionsByBookId(param,function(data){
    //        if(data.list.length == 0){
    //            RNUtils.alert("此书籍暂无目录",function(){
    //                callbackFn(data.list.length);
    //            });
    //            return;
    //        }
    //        RNUtils.pushBookSections(param.bookID,data);
    //        //console.log(data.list);
    //        for(var i=0;i<data.list.length;i++){
    //            var obj = data.list[i];
    //            //console.log(obj);
    //            //根据目录下载章节
    //            var params = {
    //                path: "/reading/json/getSection?sectionId="+obj.id,
    //                isBack: true,
    //            };
    //            RNAllService.getData(params,function(data2){
    //                RNUtils.pushBookSection(data2);
    //                callbackFn(data.list.length);
    //            })
    //        }
    //    })
    //}
    //
    //获取搜索关键词
    static getSearchKeys(keyType,callbackFn){
        AsyncStorage.getItem(AS_KEY_SEARCH_KEY+keyType)
            .then((keys)=>{
                if(false && keys){
                    callbackFn(RNUtils.parseJSON(keys));
                }else{
                    RNAllService.getJson_getHotSearchKey({keyType:keyType},function(obj){
                        AsyncStorage.setItem(AS_KEY_SEARCH_KEY+keyType,JSON.stringify(obj))
                            .then(function(){
                                callbackFn(obj);
                            })
                            .catch((e)=>console.log("存储失败"+AS_KEY_SEARCH_KEY+keyType))
                            .done();
                    });
                }
            });
    }
    //获取最近搜索关键词
    static getSearchKeysLast(keyType,callbackFn){
        AsyncStorage.getItem(AS_KEY_SEARCH_KEY_LAST+keyType)
            .then((keys)=>{
                keys = keys || {
                        list:[],
                    };
                callbackFn(RNUtils.parseJSON(keys));
            });
    }
    //获取最近搜索关键词
    static removeSearchKeysLast(keyType,callbackFn){
        callbackFn = callbackFn || function(){};
        AsyncStorage.removeItem(AS_KEY_SEARCH_KEY_LAST+keyType)
            .then(()=>{
                callbackFn();
            });
    }
    //获取最近搜索关键词
    static pushSearchKeysLast(keyType,searchKey,callbackFn){
        searchKey.type = keyType;
        callbackFn = callbackFn || function(){};
        RNUtils.getSearchKeysLast(keyType,function(obj){
            var list = obj.list;
            var newList = [searchKey];
            for(var i=0;i<list.length;i++){
                var item = list[i];
                if(item.searchKey != searchKey.searchKey){
                    newList.push(item);
                }
            }
            obj.list = newList;
            AsyncStorage.setItem(AS_KEY_SEARCH_KEY_LAST+keyType,JSON.stringify(obj))
                .then(function(){
                    callbackFn(obj);
                })
                .catch((e)=>console.log("存储失败"+AS_KEY_SEARCH_KEY_LAST+keyType))
                .done();
        })
    }
    static utf8ToUnicode(strUtf8) {
        var bstr = "";
        var nTotalChars = strUtf8.length;        // total chars to be processed.
        var nOffset = 0;                                        // processing point on strUtf8
        var nRemainingBytes = nTotalChars;        // how many bytes left to be converted
        var nOutputPosition = 0;
        var iCode, iCode1, iCode2;                        // the value of the unicode.

        while (nOffset < nTotalChars)
        {
            iCode = strUtf8.charCodeAt(nOffset);
            if ((iCode & 0x80) == 0)                        // 1 byte.
            {
                if ( nRemainingBytes < 1 )                // not enough data
                    break;

                bstr += String.fromCharCode(iCode & 0x7F);
                nOffset ++;
                nRemainingBytes -= 1;
            }
            else if ((iCode & 0xE0) == 0xC0)        // 2 bytes
            {
                iCode1 =  strUtf8.charCodeAt(nOffset + 1);
                if ( nRemainingBytes < 2 ||                        // not enough data
                    (iCode1 & 0xC0) != 0x80 )                // invalid pattern
                {
                    break;
                }

                bstr += String.fromCharCode(((iCode & 0x3F) << 6) | (         iCode1 & 0x3F));
                nOffset += 2;
                nRemainingBytes -= 2;
            }
            else if ((iCode & 0xF0) == 0xE0)        // 3 bytes
            {
                iCode1 =  strUtf8.charCodeAt(nOffset + 1);
                iCode2 =  strUtf8.charCodeAt(nOffset + 2);
                if ( nRemainingBytes < 3 ||                        // not enough data
                    (iCode1 & 0xC0) != 0x80 ||                // invalid pattern
                    (iCode2 & 0xC0) != 0x80 )
                {
                    break;
                }

                bstr += String.fromCharCode(((iCode & 0x0F) << 12) |
                    ((iCode1 & 0x3F) <<  6) |
                    (iCode2 & 0x3F));
                nOffset += 3;
                nRemainingBytes -= 3;
            }
            else                                                                // 4 or more bytes -- unsupported
                break;
        }

        if (nRemainingBytes != 0)
        {
            // bad UTF8 string.
            return "";
        }
        //console.log("utf2gb===="+bstr);
        return bstr;
    }
    //设置登录信息
    static pushLoginInfo(obj,succCallbackFn){
        global.YrcnApp.loginUser = obj;
        RNUtils.AsyncStorage_setItem(AS_KEY_LOGIN_INFO,obj,succCallbackFn,null,"1");
    }
    //获取登录信息
    static getLoginInfo(succCallbackFn){
        RNUtils.AsyncStorage_getItem(AS_KEY_LOGIN_INFO,succCallbackFn,null,"1");
    }
    //清除登录信息
    static removeLoginInfo(succCallbackFn){
        RNUtils.AsyncStorage_removeItem(AS_KEY_LOGIN_INFO,succCallbackFn,null,"1");
    }
    //
    //static getReadingSettingsInfo(succCallbackFn){
    //    succCallbackFn = succCallbackFn || function(){};
    //    AsyncStorage.getItem(AS_KEY_READING_SETTINGS_INFO)
    //        .then((readingSettingsInfo)=>{
    //            //console.log(readingSettingsInfo);
    //            readingSettingsInfo = readingSettingsInfo || {};
    //            succCallbackFn(RNUtils.parseJSON(readingSettingsInfo));
    //        });
    //}
    ////
    //static pushReadingSettingsInfo(obj,succCallbackFn){
    //    succCallbackFn = succCallbackFn || function(){};
    //    AsyncStorage.setItem(AS_KEY_READING_SETTINGS_INFO,JSON.stringify(obj))
    //        .then(function(){
    //            succCallbackFn();
    //        })
    //        .catch((e)=>console.log("存储失败"+AS_KEY_READING_SETTINGS_INFO))
    //        .done();
    //}
    ////设置屏幕亮度
    //static screenSetBrightness(value){
    //    //RNUtilsModule.screenSetBrightness([value]);
    //    AsyncStorage.setItem(AS_KEY_SCREEN_LIGHT,JSON.stringify({value:value}))
    //        .then(function(){
    //
    //        })
    //        .catch((e)=>console.log("存储失败"+AS_KEY_SCREEN_LIGHT))
    //        .done();
    //}
    ////获取屏幕亮度
    //static screenGetBrightness(succCallbackFn){
    //    succCallbackFn = succCallbackFn || function(){};
    //    AsyncStorage.getItem(AS_KEY_SCREEN_LIGHT)
    //        .then((obj)=>{
    //            if(obj){
    //                obj = RNUtils.parseJSON(obj);
    //                succCallbackFn(obj.value);
    //            }else{
    //                succCallbackFn(0.5);
    //            }
    //        });
    //}
    ////
    //static loginOp(succCallbackFn){
    //    succCallbackFn = succCallbackFn || function(){};
    //    RNUtils.getLoginInfo(function(loginInfoObj){
    //        if(loginInfoObj){
    //            succCallbackFn(loginInfoObj);
    //        }else{
    //            RNUtils.alert("尚未登录")
    //        }
    //    })
    //}
    ////获取账号类密码
    //static getJsonFromAccountPwds(key,succCallbackFn){
    //    AsyncStorage.getItem(AS_KEY_ACCOUNT_PWD+key)
    //        .then((obj)=>{
    //            if(obj){
    //                obj = RNUtils.parseJSON(obj);
    //                succCallbackFn(obj);
    //            }else{
    //                succCallbackFn({list:[]});
    //            }
    //        });
    //}
    ////添加账号类密码
    //static addJsonFromAccountPwds(key,accountPwdObj,succCallbackFn){
    //    RNUtils.getJsonFromAccountPwds(key,function(accountPwdsObj){
    //        accountPwdsObj.list = accountPwdsObj.list || [];
    //        accountPwdsObj.list.unshift(accountPwdObj);
    //        //
    //        AsyncStorage.setItem(AS_KEY_ACCOUNT_PWD+key,JSON.stringify(accountPwdsObj))
    //            .then(function(){
    //                succCallbackFn();
    //            })
    //            .catch((e)=>console.log("存储失败"+AS_KEY_ACCOUNT_PWD))
    //            .done();
    //    });
    //}
    ////修改账号类密码
    //static updJsonFromAccountPwds(key,accountPwdObj,succCallbackFn){
    //    RNUtils.getJsonFromAccountPwds(key,function(accountPwdsObj){
    //        var delI = -1;
    //        accountPwdsObj.list.forEach(function(d,i){
    //            if(d.uuid == accountPwdObj.uuid){
    //                delI = i;
    //                return false;
    //            }
    //        })
    //        accountPwdsObj.list.splice(delI,1);
    //        accountPwdsObj.list.unshift(accountPwdObj);
    //        //
    //        AsyncStorage.setItem(AS_KEY_ACCOUNT_PWD+key,JSON.stringify(accountPwdsObj))
    //            .then(function(){
    //                succCallbackFn();
    //            })
    //            .catch((e)=>console.log("存储失败"+AS_KEY_ACCOUNT_PWD))
    //            .done();
    //    });
    //}
    ////删除账号类密码
    //static delJsonFromAccountPwds(key,accountPwdObj,succCallbackFn){
    //    RNUtils.getJsonFromAccountPwds(key,function(accountPwdsObj){
    //        var delI = -1;
    //        accountPwdsObj.list.forEach(function(d,i){
    //            if(d.uuid == accountPwdObj.uuid){
    //                delI = i;
    //                return false;
    //            }
    //        });
    //        console.log(delI);
    //        accountPwdsObj.list.splice(delI,1);
    //        //
    //        AsyncStorage.setItem(AS_KEY_ACCOUNT_PWD+key,JSON.stringify(accountPwdsObj))
    //            .then(function(){
    //                succCallbackFn();
    //            })
    //            .catch((e)=>console.log("存储失败"+AS_KEY_ACCOUNT_PWD))
    //            .done();
    //    });
    //}
    ////获取卡类密码
    //static getJsonFromCardPwds(key,succCallbackFn){
    //    AsyncStorage.getItem(AS_KEY_CARD_PWD+key)
    //        .then((obj)=>{
    //            if(obj){
    //                obj = RNUtils.parseJSON(obj);
    //                succCallbackFn(obj);
    //            }else{
    //                succCallbackFn({list:[]});
    //            }
    //        });
    //}
    ////添加卡类密码
    //static addJsonFromCardPwds(key,cardPwdObj,succCallbackFn){
    //    RNUtils.getJsonFromCardPwds(key,function(cardPwdsObj){
    //        cardPwdsObj.list = cardPwdsObj.list || [];
    //        cardPwdsObj.list.unshift(cardPwdObj);
    //        //
    //        AsyncStorage.setItem(AS_KEY_CARD_PWD+key,JSON.stringify(cardPwdsObj))
    //            .then(function(){
    //                succCallbackFn();
    //            })
    //            .catch((e)=>console.log("存储失败"+AS_KEY_CARD_PWD))
    //            .done();
    //    });
    //}
    ////修改卡类密码
    //static updJsonFromCardPwds(key,cardPwdObj,succCallbackFn){
    //    RNUtils.getJsonFromCardPwds(key,function(cardPwdsObj){
    //        var delI = -1;
    //        cardPwdsObj.list.forEach(function(d,i){
    //            if(d.uuid == cardPwdObj.uuid){
    //                delI = i;
    //                return false;
    //            }
    //        })
    //        cardPwdsObj.list.splice(delI,1);
    //        cardPwdsObj.list.unshift(cardPwdObj);
    //        //
    //        AsyncStorage.setItem(AS_KEY_CARD_PWD+key,JSON.stringify(cardPwdsObj))
    //            .then(function(){
    //                succCallbackFn();
    //            })
    //            .catch((e)=>console.log("存储失败"+AS_KEY_CARD_PWD))
    //            .done();
    //    });
    //}
    ////删除卡类密码
    //static delJsonFromCardPwds(key,cardPwdObj,succCallbackFn){
    //    RNUtils.getJsonFromCardPwds(key,function(cardPwdsObj){
    //        var delI = -1;
    //        cardPwdsObj.list.forEach(function(d,i){
    //            if(d.uuid == cardPwdObj.uuid){
    //                delI = i;
    //                return false;
    //            }
    //        })
    //        console.log(delI);
    //        cardPwdsObj.list.splice(delI,1);
    //        //
    //        AsyncStorage.setItem(AS_KEY_CARD_PWD+key,JSON.stringify(cardPwdsObj))
    //            .then(function(){
    //                succCallbackFn();
    //            })
    //            .catch((e)=>console.log("存储失败"+AS_KEY_CARD_PWD))
    //            .done();
    //    });
    //}
    //同步Today数据
    static sycnJsonTodayContent(day,contentObj,succCallbackFn){
        if(contentObj){
            RNUtils.AsyncStorage_setItem(AS_KEY_TODAY_CONTENT_PREV+day,contentObj,succCallbackFn);
        }
    }
    //获取Today数据
    static getJsonTodayContent(day,succCallbackFn){
        RNUtils.AsyncStorage_getItem(AS_KEY_TODAY_CONTENT_PREV+day,succCallbackFn);
    }
    //获取Today数据类型
    static getJsonTodayContentTypes(succCallbackFn){
        RNUtils.AsyncStorage_getItem(AS_KEY_TODAY_CONTENT_TYPES,succCallbackFn);
    }
    //设置Today数据类型
    static setJsonTodayContentTypes(obj,succCallbackFn){
        RNUtils.AsyncStorage_setItem(AS_KEY_TODAY_CONTENT_TYPES,obj,succCallbackFn);
    }
    //获取Today数据
    static getKeysTodayContent(succCallbackFn){
        AsyncStorage.getAllKeys()
            .then(function(keys){
                var keysArr = [];
                var startIndex = (global.YrcnApp.loginUser.userLogin.id + AS_KEY_TODAY_CONTENT_PREV).length;
                for(var i=0;i<keys.length;i++){
                    var key = keys[i];
                    if(key.indexOf(global.YrcnApp.loginUser.userLogin.id + AS_KEY_TODAY_CONTENT_PREV) == 0){
                        keysArr.push(key.substring(startIndex));
                    }
                }
                //console.log(keysArr);
                keysArr = keysArr.sort(function(a,b){
                    var a = moment(a);
                    var b = moment(b);
                    //console.log(a.toDate().getTime())
                    return b.toDate().getTime()-a.toDate().getTime();
                });
                succCallbackFn(keysArr);
            })
    }
}
module.exports = RNUtils;
//
var defaultBoxBackgroundColor = '#ffffff';
var defaultBackgroundColor = '#efeff5';
//
var styles = StyleSheet.create({
    box_container:{
        backgroundColor: defaultBoxBackgroundColor,
        marginLeft: 10,
        marginRight:10,
        marginTop:8,
        marginBottom:8
    },
    row_container:{
        backgroundColor: defaultBackgroundColor,
    }
});
//
(function() {
    // Private array of chars to use
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    Math.uuid = function (len, radix) {
        var chars = CHARS, uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    };

    // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
    // by minimizing calls to random()
    Math.uuidFast = function() {
        var chars = CHARS, uuid = new Array(36), rnd=0, r;
        for (var i = 0; i < 36; i++) {
            if (i==8 || i==13 ||  i==18 || i==23) {
                uuid[i] = '-';
            } else if (i==14) {
                uuid[i] = '4';
            } else {
                if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join('');
    };

    // A more compact, but less performant, RFC4122v4 solution:
    Math.uuidCompact = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };
})();
