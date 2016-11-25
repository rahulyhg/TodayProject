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
var ButtonsBox = require('../component/ButtonsBox.js');
var ACViewBox = require('../component/ACViewBox.js')
//
/**
 * 定义属性：
 */
var RegisterIndexView = React.createClass({
    _vars:{
    },
    getDefaultProps: function(){
        return ({

        });
    },
    getInitialState: function(){
        return ({
            isPressingLogin: false,
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
        var _this = this;
        global.YrcnApp.components.StatusBar.setHidden(false,'slide');
        global.YrcnApp.components.StatusBar.setBarStyle('light-content',false);
        this.props.parent.showLeftButton();
        //
        return (
            <View style={[styles.container]}>
                <View style={[styles.topView]}>
                    <View style={[styles.topViewColumn]}>
                        <Text style={[styles.topViewColumnText]}>创建Today账号</Text>
                    </View>
                    <View style={[styles.topViewColumn]}>
                        <Text style={[styles.topViewColumnText]}>注册Today账号来记录今天、昨天、以前发生的事情。</Text>
                    </View>
                </View>
                <View style={[styles.centerView]}>
                    <ButtonsBox marginBottom={0}>
                        <ButtonsBox.Button btnText={"用邮箱注册"} onPress={this._onPressRegister} isPressing={this.state.isPressingLogin}/>
                    </ButtonsBox>
                    <TouchableOpacity style={[styles.centerViewDesp]} onPress={_this._onPressLogin}>
                        <Text style={[styles.centerViewDespText]} numberOfLines={3}>{"已拥有Today账号？\r\n登录"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.bottomView]}>
                    <View style={[styles.bottomViewColumn]}>
                        <Text style={[styles.bottomViewColumnText]} numberOfLines={3}>使用WeChat注册的用户请放心，未经许可，我们永远不会擅自公开您的信息。我们都是善良、可靠的小伙伴。</Text>
                    </View>
                    <View style={[styles.bottomViewColumn]}>
                        <Text style={[styles.bottomViewColumnText]}></Text>
                    </View>
                </View>
            </View>
        );
    },
    _onPressRegister: function () {
        this.props.parent_navigator.push({name:'RegisterEmailView',title:'Today'});
    },
    _onPressLogin: function () {
        this.props.parent_navigator.push({name:'LoginIndexView',title:'Today'});
    },
});
//
module.exports = RegisterIndexView;
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor: '#01bbfc',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
    topView:{
        width:Dimensions.get('window').width,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        paddingTop: 80,
    },
    topViewColumn:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
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