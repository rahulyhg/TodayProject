/**
 * 登录页面显示
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
var ButtonsBox = require('../component/ButtonsBox.js');
var ACViewBox = require('../component/ACViewBox.js')
//
/**
 * 定义属性：
 */
var LoginView = React.createClass({
    _vars:{
        pwdArray: [],
    },
    getDefaultProps: function(){
        return ({

        });
    },
    getInitialState: function(){
        return ({
            colorPwd1: '#cacaca',
            colorPwd2: '#cacaca',
            colorPwd3: '#cacaca',
            colorPwd4: '#cacaca',
            colorPwd5: '#cacaca',
            colorPwd6: '#cacaca',
        });
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
    },
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount: function(){
        var _this = this;
    },
    //
    render: function(){
        global.YrcnApp.now.loginView = this;
        var _this = this;
        global.YrcnApp.components.StatusBar.setHidden(false,'slide');
        global.YrcnApp.components.StatusBar.setBarStyle('light-content',false);
        //
        return (
            <View style={[styles.container]}>
                <View style={[styles.topView]}>
                    <View style={[styles.topTopView]}>
                        <Text style={[styles.topTopViewText]}>输入密码</Text>
                    </View>
                    <View style={[styles.topBottomView]}>
                        <View style={[styles.topBottomViewChild]}>
                        </View>
                        <View style={[styles.topBottomViewChild]}>
                            <Text style={[styles.topBottomViewChildText,{color: this.state.colorPwd1}]}>*</Text>
                        </View>
                        <View style={[styles.topBottomViewChild]}>
                            <Text style={[styles.topBottomViewChildText,{color: this.state.colorPwd2}]}>*</Text>
                        </View>
                        <View style={[styles.topBottomViewChild]}>
                            <Text style={[styles.topBottomViewChildText,{color: this.state.colorPwd3}]}>*</Text>
                        </View>
                        <View style={[styles.topBottomViewChild]}>
                            <Text style={[styles.topBottomViewChildText,{color: this.state.colorPwd4}]}>*</Text>
                        </View>
                        <View style={[styles.topBottomViewChild]}>
                            <Text style={[styles.topBottomViewChildText,{color: this.state.colorPwd5}]}>*</Text>
                        </View>
                        <View style={[styles.topBottomViewChild]}>
                            <Text style={[styles.topBottomViewChildText,{color: this.state.colorPwd6}]}>*</Text>
                        </View>
                        <View style={[styles.topBottomViewChild]}>
                        </View>
                    </View>
                </View>
                <View style={[styles.centerView]}>
                    <View style={[styles.centerViewColumn]}>
                        <TouchableOpacity style={[styles.centerViewColumnChild]} onPress={function(){_this._onPresssNum(1);}}>
                            <Text style={[styles.centerViewColumnChildText]}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.centerViewColumnChild]} onPress={function(){_this._onPresssNum(2);}}>
                            <Text style={[styles.centerViewColumnChildText]}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.centerViewColumnChild]} onPress={function(){_this._onPresssNum(3);}}>
                            <Text style={[styles.centerViewColumnChildText]}>3</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.centerViewColumn]}>
                        <TouchableOpacity style={[styles.centerViewColumnChild]} onPress={function(){_this._onPresssNum(4);}}>
                            <Text style={[styles.centerViewColumnChildText]}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.centerViewColumnChild]} onPress={function(){_this._onPresssNum(5);}}>
                            <Text style={[styles.centerViewColumnChildText]}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.centerViewColumnChild]} onPress={function(){_this._onPresssNum(6);}}>
                            <Text style={[styles.centerViewColumnChildText]}>6</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.centerViewColumn]}>
                        <TouchableOpacity style={[styles.centerViewColumnChild]} onPress={function(){_this._onPresssNum(7);}}>
                            <Text style={[styles.centerViewColumnChildText]}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.centerViewColumnChild]} onPress={function(){_this._onPresssNum(8);}}>
                            <Text style={[styles.centerViewColumnChildText]}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.centerViewColumnChild]} onPress={function(){_this._onPresssNum(9);}}>
                            <Text style={[styles.centerViewColumnChildText]}>9</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.centerViewColumn]}>
                        <TouchableOpacity style={[styles.centerViewColumnChild]} onPress={function(){_this._onPresssNum("clear");}}>
                            <Text style={[styles.centerViewColumnChildText]}>clear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.centerViewColumnChild]} onPress={function(){_this._onPresssNum(0);}}>
                            <Text style={[styles.centerViewColumnChildText]}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.centerViewColumnChild]} onPress={function(){_this._onPresssNum("del");}}>
                            <Text style={[styles.centerViewColumnChildText]}>del</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.bottomView]}>
                    <ButtonsBox>
                        <ButtonsBox.Button btnText={"进入"} onPress={this._onPressLogin} isPressing={this.state.isPressingRegister}/>
                    </ButtonsBox>
                </View>
            </View>
        );
    },
    _onPressLogin: function () {
        global.YrcnApp.now.pwdKey = this._vars.pwdArray.join("");
        global.YrcnApp.now.rootNavigator.push({name:'TabBarIndex'});
    },
    _onPresssNum: function (num) {
        console.log(num);
        if(num == "clear"){
            this._vars.pwdArray = [];
            this.setState({
                colorPwd1: '#cacaca',
                colorPwd2: '#cacaca',
                colorPwd3: '#cacaca',
                colorPwd4: '#cacaca',
                colorPwd5: '#cacaca',
                colorPwd6: '#cacaca',
            });
        }else if(num == "del"){
            if(this._vars.pwdArray.length == 0){

            }else{
                this._vars.pwdArray.pop();
            }
            if(this._vars.pwdArray.length == 0){
                this.setState({
                    colorPwd1: '#cacaca',
                });
            }else if(this._vars.pwdArray.length == 1){
                this.setState({
                    colorPwd2: '#cacaca',
                });
            }else if(this._vars.pwdArray.length == 2){
                this.setState({
                    colorPwd3: '#cacaca',
                });
            }else if(this._vars.pwdArray.length == 3){
                this.setState({
                    colorPwd4: '#cacaca',
                });
            }else if(this._vars.pwdArray.length == 4){
                this.setState({
                    colorPwd5: '#cacaca',
                });
            }else if(this._vars.pwdArray.length == 5){
                this.setState({
                    colorPwd6: '#cacaca',
                });
            }
        }else{
            if(this._vars.pwdArray.length==6){
                return;
            }
            this._vars.pwdArray.push(num);
            if(this._vars.pwdArray.length == 1){
                this.setState({
                    colorPwd1: '#444444',
                });
            }else if(this._vars.pwdArray.length == 2){
                this.setState({
                    colorPwd2: '#444444',
                });
            }else if(this._vars.pwdArray.length == 3){
                this.setState({
                    colorPwd3: '#444444',
                });
            }else if(this._vars.pwdArray.length == 4){
                this.setState({
                    colorPwd4: '#444444',
                });
            }else if(this._vars.pwdArray.length == 5){
                this.setState({
                    colorPwd5: '#444444',
                });
            }else if(this._vars.pwdArray.length == 6){
                this.setState({
                    colorPwd6: '#444444',
                });
            }
        }
    },
    clearAll: function(){
        this._vars.pwdArray = [];
        this.setState({
            colorPwd1: '#cacaca',
            colorPwd2: '#cacaca',
            colorPwd3: '#cacaca',
            colorPwd4: '#cacaca',
            colorPwd5: '#cacaca',
            colorPwd6: '#cacaca',
        });
    }
});
//
module.exports = LoginView;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#fafafa',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
    topView:{
        backgroundColor: '#36353a',
        width:Dimensions.get('window').width,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        paddingTop: 24,
    },
    topTopView:{
        width:Dimensions.get('window').width,
        flex: 2,
        backgroundColor: '#fafafa',
        borderWidth: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
    topTopViewText:{
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
    },
    topBottomView:{
        width:Dimensions.get('window').width,
        flex: 2,
        backgroundColor: '#fafafa',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        borderWidth: 0,
    },
    topBottomViewChild:{
        flex: 1,
    },
    topBottomViewChildText:{
        fontSize: 22,
        fontWeight: '800',
        textAlign: 'center',
    },
    centerView:{
        width:Dimensions.get('window').width,
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
    centerViewColumn:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    centerViewColumnChild:{
        flex: 1,
        borderWidth: 1,
        margin: 5,
        borderRadius: 20,
        borderColor: '#eeeeee',
        padding: 20,
    },
    centerViewColumnChildText:{
        fontSize: 22,
        fontWeight: '800',
        textAlign: 'center',
        color: '#666666',
    },
    bottomView:{
        width:Dimensions.get('window').width,
        flex: 1,

    },
});