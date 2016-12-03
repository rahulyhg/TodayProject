/**
 * 引导页首页
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
    TouchableHighlight,
    View,
    StatusBar,
    TextInput,
    Dimensions,
    Timers,
    ActionSheetIOS,
    ListView,
    ScrollView,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNValidateUtils = require('../common/RNValidateUtils.js');
var RNAllService = require('../common/RNAllService.js');
var ButtonsBox = require('../component/ButtonsBox.js');
var ACViewBox = require('../component/ACViewBox.js')
var FormBox = require('../component/FormBox.js')
//
/**
 * 定义属性：
 */
var RegisterEmailView = React.createClass({
    _vars:{
        param:{
            method: "POST",
            userName: "",
            pwd: "",
            vc: "",
            niCheng: "",
        },
    },
    getDefaultProps: function(){
        return ({

        });
    },
    getInitialState: function(){
        return ({
            imageUri:global.YrcnApp.services.getValidateCodeRegister()+"&uuid="+Math.uuidFast(),
            isPressingRegister: false,
        });
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        _this._vars = {
            param:{
                method: "POST",
                userName: "",
                pwd: "",
                vc: "",
                niCheng: "",
            },
        };
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
        _this._vars = {
            param:{
                method: "POST",
                userName: "",
                pwd: "",
                vc: "",
                niCheng: "",
            },
        };
    },
    //
    render: function(){
        var _this = this;
        global.YrcnApp.components.StatusBar.setHidden(false,'slide');
        global.YrcnApp.components.StatusBar.setBarStyle('light-content',false);
        this.props.parent.showLeftButton();
        //
        return (
            <View style={[styles.container]}>
                <View style={[styles.topView]}>
                    <View style={[styles.topViewColumn]}>
                        <Text style={[styles.topViewColumnText]}>注册</Text>
                    </View>
                    <View style={[styles.topViewColumn]}>
                        <Text style={[styles.topViewColumnText]}>免费注册Today账号来记录今天、昨天、以前发生的事情。</Text>
                    </View>
                </View>
                <View style={[styles.centerView]}>
                    <FormBox>
                        <FormBox.Input placeholder={"邮箱"} keyboardType={"email-address"} maxLength={50}
                                       parent={this} paramName={"userName"}/>
                        <FormBox.Password placeholder={"密码"} keyboardType={"default"}  maxLength={20}
                                          parent={this} paramName={"pwd"}/>
                        <FormBox.Input placeholder={"昵称"} keyboardType={"default"}  maxLength={10}
                                       parent={this} paramName={"niCheng"}/>
                        <FormBox.InputImage placeholder={"验证码"} keyboardType={"numeric"} borderBottomWidth={0.5}
                                            maxLength={4}
                                            imageUri={_this.state.imageUri}
                                            parent={this} paramName={"vc"}/>
                    </FormBox>
                    <ButtonsBox marginBottom={0}>
                        <ButtonsBox.Button btnText={"注册"} onPress={this._onPressRegister} isPressing={this.state.isPressingRegister}/>
                    </ButtonsBox>
                    <TouchableOpacity style={[styles.centerViewDesp]} onPress={_this._onPressLogin}>
                        <Text style={[styles.centerViewDespText]} numberOfLines={3}>{"已拥有Today账号？\r\n登录"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.bottomView]}>
                </View>
            </View>
        );
    },
    changeParam: function(paramName,paramValue){
        this._vars.param[paramName] = paramValue;
    },
    _onPressLogin: function () {
        this.props.parent_navigator.push({name:'LoginIndexView',title:'Today'});
    },
    _onPressRegister: function () {
        var _this = this;
        //console.log(this._vars.param);
        var param = this._vars.param;
        if(!RNValidateUtils.email(param.userName)){
            RNUtils.alert("请输入正确格式的邮箱");
            return;
        }
        if(!RNValidateUtils.password(param.pwd)){
            RNUtils.alert("请输入正确格式的密码");
            return;
        }
        if(!RNValidateUtils.niCheng(param.niCheng)){
            RNUtils.alert("请输入正确格式的昵称");
            return;
        }
        if(!RNValidateUtils.vc(param.vc)){
            RNUtils.alert("请输入正确格式的验证码");
            return;
        }
        param.address = "";
        param.email = param.userName;
        param.requestFlag = "0";
        param.profession = encodeURI(encodeURI(global.YrcnApp.now.profession||''));
        param.sex = global.YrcnApp.now.sex||'1';
        param.age = global.YrcnApp.now.age||'0';
        _this.setState({
            isPressingRegister: true,
        });
        RNAllService.register(param,function(registerObj){
            _this.setState({
                isPressingRegister: false,
            });
            RNUtils.pushLoginInfo(registerObj,function(){
                RNUtils.alert("恭喜您注册成功。",function(){
                    global.YrcnApp.now.rootNavigator.replace({name:'TabBarIndex'});
                })
            })
        },function(msg){
            _this.setState({
                isPressingRegister: false,
                imageUri:global.YrcnApp.services.getValidateCodeRegister()+"&uuid="+Math.uuidFast(),
            });
            RNUtils.alert(msg);
        });
    },
});
//
module.exports = RegisterEmailView;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#01bbfc',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems:'center',
    },
    topView:{
        width:Dimensions.get('window').width,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems:'center',
        paddingTop: 50,
    },
    topViewColumn:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems:'flex-end',
    },
    topViewColumnText:{
        fontSize: 13,
        fontWeight: '400',
        textAlign: 'center',
        color: '#ffffff',
    },
    centerView:{
        width:Dimensions.get('window').width,
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
    centerViewDesp:{
        paddingTop: 20,
    },
    centerViewDespText:{
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'center',
        color: '#ffffff',
        width:Dimensions.get('window').width,
        paddingLeft: 20,
        paddingRight: 20,
    },
    bottomView:{
        width:Dimensions.get('window').width,
        flex: 1,
    },
    bottomViewColumn:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    bottomViewColumnText:{
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'center',
        color: '#ffffff',
        width:Dimensions.get('window').width,
        paddingLeft: 20,
        paddingRight: 20,
    },
});