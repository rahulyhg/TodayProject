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
var RNUtils = require('../common/RNUtils.js');
var ACViewBox = require('../component/ACViewBox.js')
var LineButtonsBox = require('../component/LineButtonsBox.js')
var RowInputAndButton = require('../component/RowInputAndButton.js')
//
/**
 * 定义属性：
 */
var GuideProfessionView = React.createClass({
    _vars:{
    },
    getDefaultProps: function(){
        return ({

        });
    },
    getInitialState: function(){
        return ({
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
                        <Text style={[styles.topViewColumnText]}>请选择您的职业</Text>
                    </View>
                </View>
                <View style={[styles.centerView]}>
                    <ScrollView
                        style={styles.scrollViewContainer}>
                        <LineButtonsBox boxStyle={styles.lineButtonsBox}>
                            <LineButtonsBox.Button key={1} btnText={"上班族"} color={'#fefefe'} onPress={(function(){_this._onPressProfession(1)})}/>
                            <LineButtonsBox.Button key={2} btnText={"学生党"} color={'#fefefe'} onPress={(function(){_this._onPressProfession(2)})}/>
                            <LineButtonsBox.Button key={3} btnText={"自由人"} color={'#fefefe'} onPress={(function(){_this._onPressProfession(3)})}/>
                        </LineButtonsBox>
                        <RowInputAndButton placeholder={"上面没有，输入其他职业"} placeholderTextColor={'#ffffff'} onPressBtn={_this._onPressBtn}/>
                    </ScrollView>
                </View>
            </View>
        );
    },
    _onPressProfession: function (profession) {
        global.YrcnApp.now.profession = profession;
        this.props.parent_navigator.push({name:'GuidePersonalInfoView',title:"Today"});
    },
    _onPressBtn: function(pText){
        if(!pText){
            RNUtils.alert("上面没有，输入其他职业");
            return;
        }
        global.YrcnApp.now.profession = pText;
        this.props.parent_navigator.push({name:'GuidePersonalInfoView',title:"Today"});
    }
});
//
module.exports = GuideProfessionView;
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
});