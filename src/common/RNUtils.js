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
const AS_KEY_NEW_FUNC_PREV = "AS_016_";//存储系统 新功能展示
const AS_KEY_TODAY_SPORT_TYPES = "AS_017";//存储系统 Today sport类型
const AS_KEY_TODAY_SYNC_WEEK = "AS_018";//存储系统 Today 每周同步一次
const AS_KEY_YOUKE_LOGIN_INFO = "AS_019";//存储系统 游客登录信息

const BOOKDESK_BOOKS_NUM = 12;

class RNUtils{
    //
    static log(fileName,msg,level){
        level = level || "debug";
        console.log(fileName+" === "+level + " === " +msg);
    }
    //
    static logObj(fileName,obj,level){
        level = level || "debug";
        console.log(fileName+" === "+level + " === ");
        console.log(obj);
    }
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
                RNUtils.log("RNUtils.js AsyncStorage_setItem","成功 key="+key+" value="+JSON.stringify(obj))
                succCallbackFn();
            })
            .catch(function(e){
                RNUtils.log("RNUtils.js AsyncStorage_setItem","异常 key="+key)
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
            key = global.YrcnApp.loginUser.userLogin.id + key;
        }
        AsyncStorage.getItem(key)
            .then((obj)=>{
                if(obj){
                    RNUtils.log("RNUtils.js AsyncStorage_getItem","成功 key="+key+" value="+JSON.stringify(obj))
                    succCallbackFn(RNUtils.parseJSON(obj));
                }else{
                    succCallbackFn({});
                }
            })
            .catch(function(e){
                RNUtils.log("RNUtils.js AsyncStorage_getItem","异常 key="+key)
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
            key = global.YrcnApp.loginUser.userLogin.id + key;
        }
        AsyncStorage.removeItem(key)
            .then(()=>{
                succCallbackFn();
            })
            .catch(function(e){
                RNUtils.log("RNUtils.js AsyncStorage_removeItem","异常 key="+key)
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
    static toJsonObject(json) {
        if (typeof json == "string") {
            return $.parseJSON(json);
        } else {
            return json;
        }
    }
    //
    static toString(obj) {
        if (typeof obj == "object") {
            return JSON.stringify(obj);
        } else {
            return obj;
        }
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
    static lastMonth3Date(){
        var ret =  moment().subtract(3, 'months').format("YYYY-MM-DD");;
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
    static isBefore(beforeDate,afterDate){
        return moment(beforeDate).isBefore(afterDate);
    }
    //
    static isAfter(beforeDate,afterDate){
        return moment(beforeDate).isAfter(afterDate);
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
    static confirm(msg,callbackFn,title,cancelCallbackFn){
        callbackFn = callbackFn || function(){};
        cancelCallbackFn = cancelCallbackFn || function(){};
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
                    cancelCallbackFn();
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
    //设置游客登录信息
    static pushYoukeLoginInfo(obj,succCallbackFn){
        global.YrcnApp.loginUser = obj;
        RNUtils.AsyncStorage_setItem(AS_KEY_YOUKE_LOGIN_INFO,obj,succCallbackFn,null,"1");
    }
    //获取登录信息
    static getLoginInfo(succCallbackFn){
        RNUtils.AsyncStorage_getItem(AS_KEY_LOGIN_INFO,succCallbackFn,null,"1");
    }
    //获取游客登录信息
    static getYoukeLoginInfo(succCallbackFn){
        RNUtils.AsyncStorage_getItem(AS_KEY_YOUKE_LOGIN_INFO,succCallbackFn,null,"1");
    }
    //清除登录信息
    static removeLoginInfo(succCallbackFn){
        RNUtils.confirm("您确定要注销么？",function(){
            RNUtils.AsyncStorage_removeItem(AS_KEY_LOGIN_INFO,succCallbackFn,null,"1");
        })
    }
    //同步Today数据
    static sycnJsonTodayContent(day,contentObj,succCallbackFn){
        if(contentObj){
            if(contentObj && contentObj.day){
                delete contentObj.day;
            }
            if(contentObj && contentObj.contentArray){
                delete contentObj.contentArray;
            }
            RNUtils.AsyncStorage_setItem(AS_KEY_TODAY_CONTENT_PREV+day,contentObj,succCallbackFn);
        }
    }
    //获取Today数据
    static getJsonTodayContent(day,succCallbackFn){
        RNUtils.AsyncStorage_getItem(AS_KEY_TODAY_CONTENT_PREV+day,function(getJsonTodayContentObj){
            //if(getJsonTodayContentObj){
            //    for(var key in getJsonTodayContentObj){
            //        if(getJsonTodayContentObj[key] && getJsonTodayContentObj[key].oneImages && getJsonTodayContentObj[key].oneImages.length>0){
            //            for(var oneImage of getJsonTodayContentObj[key].oneImages){
            //                if(oneImage.uri.indexOf('file://')>-1){
            //                    oneImage.uri = oneImage.uri.split('Documents')[0];
            //                }
            //            }
            //        }
            //    }
            //}
            //for(var key in getJsonTodayContentObj){
            //    var coreObj = getJsonTodayContentObj[key];
            //    if(coreObj && coreObj.oneImages){
            //        for(var oneImage of coreObj.oneImages){
            //            oneImage.uri = RNUtils.getSandboxFileShortPath(oneImage.uri);
            //        }
            //    }
            //}
            succCallbackFn(getJsonTodayContentObj);
            //RNUtils.sycnJsonTodayContent(day,getJsonTodayContentObj);
        });
    }
    //获取Today数据类型
    static getJsonTodayContentTypes(succCallbackFn){
        RNUtils.AsyncStorage_getItem(AS_KEY_TODAY_CONTENT_TYPES,succCallbackFn);
    }
    //获取Today sport类型
    static getJsonTodaySportTypes(succCallbackFn){
        RNUtils.AsyncStorage_getItem(AS_KEY_TODAY_SPORT_TYPES,succCallbackFn);
    }
    //设置Today数据类型
    static setJsonTodayContentTypes(obj,succCallbackFn){
        RNUtils.AsyncStorage_setItem(AS_KEY_TODAY_CONTENT_TYPES,obj,succCallbackFn);
    }
    //设置Today sport类型
    static setJsonTodaySportTypes(obj,succCallbackFn){
        RNUtils.AsyncStorage_setItem(AS_KEY_TODAY_SPORT_TYPES,obj,succCallbackFn);
    }
    //获取Today数据
    static getKeysTodayContent(succCallbackFn){
        AsyncStorage.getAllKeys()
            .then(function(keys){
                console.log(keys);
                var exeCount = 0;
                var dayLength = 0;
                var keysArr = [];
                var startIndex = (global.YrcnApp.loginUser.userLogin.id + AS_KEY_TODAY_CONTENT_PREV).length;
                for(var i=0;i<keys.length;i++){
                    var key = keys[i];
                    if(key.indexOf(global.YrcnApp.loginUser.userLogin.id + AS_KEY_TODAY_CONTENT_PREV) == 0){
                        dayLength++;
                    }
                }
                if(dayLength == 0){
                    innerFunc();
                }else{
                    for(var i=0;i<keys.length;i++){
                        var key = keys[i];
                        if(key.indexOf(global.YrcnApp.loginUser.userLogin.id + AS_KEY_TODAY_CONTENT_PREV) == 0){
                            RNUtils.getJsonTodayContent(key.substring(startIndex),function(getJsonTodayContentObj){
                                if(getJsonTodayContentObj){
                                    YrcnApp.utils.logObj("RNUtils getKeysTodayContent",getJsonTodayContentObj)
                                    var ok = false;
                                    var aDay = "";
                                    for(var bkey in getJsonTodayContentObj){
                                        if(RNUtils.isTrueContentObj(bkey,getJsonTodayContentObj)){
                                            aDay = getJsonTodayContentObj[bkey].day;
                                            ok = true;
                                        }
                                    }
                                    if(ok){
                                        keysArr.push(aDay);
                                    }
                                }
                                exeCount++;
                                innerFunc();
                            })
                        }
                    }
                }
                //
                function innerFunc(){
                    console.log(exeCount + "====" + dayLength)
                    if(exeCount != dayLength){
                        return;
                    }
                    //console.log(keysArr);
                    keysArr = keysArr.sort(function(a,b){
                        var a = moment(a);
                        var b = moment(b);
                        //console.log(a.toDate().getTime())
                        return b.toDate().getTime()-a.toDate().getTime();
                    });
                    succCallbackFn(keysArr);
                }
            })
    }
    //获取新功能
    static getJsonNewFunc(funcName,succCallbackFn){
        RNUtils.AsyncStorage_getItem(AS_KEY_NEW_FUNC_PREV+funcName,succCallbackFn);
    }
    //设置新功能
    static setJsonNewFunc(funcName,succCallbackFn){
        RNUtils.AsyncStorage_setItem(AS_KEY_NEW_FUNC_PREV+funcName,"1",succCallbackFn);
    }
    //
    static getImageExt(origURL,fileName){
        var index = origURL.indexOf("ext=");
        if(index > -1){
            return origURL.substring(index + 4).toLowerCase();
        }else{
            index = fileName.lastIndexOf(".");
            if(index > -1){
                return fileName.substring(index + 1).toLowerCase();
            }else{
                return "jpg";
            }
        }
    }
    //
    static getSandboxFileUri(uri){
        var uriArray = uri.split("Documents");
        console.log(uriArray);
        if(uriArray.length >= 2){
            return "file://"+YrcnApp.appInfo.DocumentsPath + uriArray[uriArray.length-1];
        }else{
            return uri;
        }
    }
    //
    static getSandboxFileShortPath(uri){
        var uriArray = uri.split("Documents");
        console.log(uriArray);
        if(uriArray.length >= 2){
            return uriArray[uriArray.length-1];
        }else{
            return uri;
        }
    }
    //
    static getSandboxFileLongPath(uri){
        if(YrcnApp.Platform.isIOS){
            return "file://"+YrcnApp.appInfo.DocumentsPath + RNUtils.getSandboxFileShortPath(uri);
        }else{
            return uri;
        }
    }
    //
    static handleSandboxImageSource(source){
        console.log("handleSandboxImageSource");
        console.log(source);
        var uriArray = source.uri.split("Documents");
        console.log(uriArray);
        if(uriArray.length >= 2){
            source.uri = "file://"+YrcnApp.appInfo.DocumentsPath + uriArray[uriArray.length-1];
        }
        return source;
    }
    //
    static isTrueContentObj(e,contentObj){
        if(e!='day' && e!='contentArray'
            && (contentObj[e]
                && (contentObj[e].content
                    || (Array.isArray(contentObj[e].oneImages) && contentObj[e].oneImages.length>0)
                    || contentObj[e].overtime || contentObj[e].qingjia
                )
            )
        ){
            return true;
        }else{
            return false;
        }
    }
    //
    static isTyodaySyncWeek(succCallbackFn){//本周是否需要同步数据
        RNUtils.AsyncStorage_getItem(AS_KEY_TODAY_SYNC_WEEK,function(AsyncStorage_getItemObj){
            if(AsyncStorage_getItemObj&&AsyncStorage_getItemObj.week){
                var nowWeek = moment().weeks();
                if(AsyncStorage_getItemObj.week == nowWeek){
                    succCallbackFn();
                }
            }else{
                RNUtils.AsyncStorage_setItem(AS_KEY_TODAY_SYNC_WEEK,{week:0},function(){
                    succCallbackFn();
                });
            }
        })
    }
    //
    //
    static setTyodaySyncWeek(){//本周是否需要同步数据
        var nowWeek = moment().weeks();
        RNUtils.AsyncStorage_setItem(AS_KEY_TODAY_SYNC_WEEK,{week:nowWeek},function(){
            succCallbackFn();
        });
    }

}
module.exports = RNUtils;
//
var defaultBoxBackgroundColor = '#ffffff';
var defaultBackgroundColor = '#efeff5';
//
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
