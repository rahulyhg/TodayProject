/**
 * 引导页选择职业
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
var LineButtonsBox = require('../component/LineButtonsBox.js')
var RowInputAndButton = require('../component/RowInputAndButton.js')
var FormBox = require('../component/FormBox.js')
//
/**
 * 定义属性：
 */
var GuidePersonalInfoView = React.createClass({
    _vars:{
        selectedColor: '#db1ff0',
        no_selectedColor: '#ffffff',
    },
    getDefaultProps: function(){
        return ({

        });
    },
    getInitialState: function(){
        return ({
            isPressingOk: false,
            sex: '1',
            age: 22,
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
                        <Text style={[styles.topViewColumnText]}>您的个人信息</Text>
                    </View>
                </View>
                <View style={[styles.centerView]}>
                    <ScrollView
                        style={styles.scrollViewContainer}>
                        <View style={[styles.rowView]}>
                            <View style={[styles.rowLeftView]}>
                                <Text style={[styles.rowLeftViewText]}>性别=</Text>
                            </View>
                            <View style={[styles.rowRightView]}>
                                <TouchableOpacity style={[styles.rowRightViewChild]} onPress={function(){_this._onPressSex(1);}}>
                                    <Text style={[styles.rowRightViewChildText,{color:_this.state.sex=='1'?_this._vars.selectedColor:_this._vars.no_selectedColor}]}>男</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.rowRightViewChild]} onPress={function(){_this._onPressSex(2);}}>
                                    <Text style={[styles.rowRightViewChildText,{color:_this.state.sex=='2'?_this._vars.selectedColor:_this._vars.no_selectedColor}]}>女</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.rowView]}>
                            <View style={[styles.rowLeftView]}>
                                <Text style={[styles.rowLeftViewText]}>年龄=</Text>
                            </View>
                            <View style={[styles.rowRightView]}>
                                <TouchableOpacity style={[styles.rowRightViewChild]} onPress={function(){_this._onPressAge(2);}}>
                                    <Text style={[styles.rowRightViewChildText,{fontWeight:'900',fontSize:20}]}>--</Text>
                                </TouchableOpacity>
                                <View style={[styles.rowRightViewChild]}>
                                    <Text style={[styles.rowRightViewChildText,{color:'#db1ff0'}]}>{this.state.age}</Text>
                                </View>
                                <TouchableOpacity style={[styles.rowRightViewChild]} onPress={function(){_this._onPressAge(1);}}>
                                    <Text style={[styles.rowRightViewChildText,{fontWeight:'900',fontSize:20}]}>++</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={[styles.bottomView]}>
                    <ButtonsBox marginBottom={0}>
                        <ButtonsBox.Button btnText={"完成"} onPress={this._onPressOk} isPressing={this.state.isPressingOk}/>
                    </ButtonsBox>
                </View>
            </View>
        );
    },
    _onPressSex: function (sex) {
        this.setState({
            sex: sex,
        });
    },
    _onPressAge: function (type) {
        var age = this.state.age;
        if(age == 0 && type == 2){
            this.setState({
                age: 100,
            });
            return;
        }else if(age == 100 && type == 1){
            this.setState({
                age: 0,
            });
            return;
        }
        if(type == 1){
            this.setState({
                age: age+1,
            });
        }else{
            this.setState({
                age: age-1,
            });
        }
    },
    _onPressOk: function () {
        global.YrcnApp.now.sex = this.state.sex;
        global.YrcnApp.now.age = this.state.age;
        this.props.parent_navigator.push({name:'RegisterIndexView',title:'Today'});
    },
});
//
module.exports = GuidePersonalInfoView;
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
        fontSize: 15,
        fontWeight: '400',
        textAlign: 'center',
        color: '#ffffff',
    },
    centerView:{
        width:Dimensions.get('window').width,
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
    scrollViewContainer:{
        marginTop: 44,
    },
    bottomView:{
        width:Dimensions.get('window').width,
        flex: 3,
    },
    rowView:{
        width:Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    rowLeftView:{
        width: 100,
    },
    rowRightView:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    rowLeftViewText:{
        fontSize: 14,
        textAlign: 'center',
        color: '#ffffff',
    },
    rowRightViewChild:{
        paddingLeft: 20,
        paddingRight: 20,
        flex:1,
    },
    rowRightViewChildText:{
        fontSize: 14,
        color: '#ffffff',
    }
});