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
var ButtonsBox = require('../../component/ButtonsBox.js');
var ACViewBox = require('../../component/ACViewBox.js')
//

class GuideIndexView  extends React.Component {
    constructor(props) {
        super(props);
        this._onPressWelcome = this._onPressWelcome.bind(this);
    }
    static navigationOptions = {
        drawerLabel: 'Home',
    };
    _vars={
    }
    static defaultProps={
    }
    state={
        isPressingWelcome: false,
        isPressingStart: false,
        isPressingLogin: false,
        isLogined: "0",
    }
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount(){
        var _this = this;
        global.YrcnApp.utils.getLoginInfo(function(loginInfo){
            if(loginInfo && loginInfo.userLogin){
                _this.setState({
                    isLogined: "1",
                });
            }else{
                _this.setState({
                    isLogined: "2",
                });
            }
        })
    }
    //在组件从 DOM 中移除的时候立刻被调用。
    //在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
    componentWillUnmount(){
        var _this = this;
    }
    //
    render(){
        var _this = this;
        global.YrcnApp.components.StatusBar.setHidden(false,'slide');
        global.YrcnApp.components.StatusBar.setBarStyle('light-content',false);
        //global.YrcnApp.root_navigate = _this.props.navigation.navigate;
        //this.props.parent.hideLeftButton();
        //
        return (
            <View style={[styles.container]}>
                <View style={[styles.centerView]}>
                    <Image source={require('../../images/guide_index_01.png')} style={styles.guideIndexImage} resizeMode="contain"/>
                </View>
                <View style={[styles.bottomView]}>
                    {
                        (function(){
                            if(_this.state.isLogined == "1"){
                                return (
                                    <ButtonsBox marginBottom={0}>
                                        <ButtonsBox.Button btnText={"欢迎回来，"+global.YrcnApp.loginUser.userInfo.niCheng}
                                                           onPress={_this._onPressWelcome}
                                                           isPressing={_this.state.isPressingWelcome}/>
                                    </ButtonsBox>
                                );
                            }else if(_this.state.isLogined == "2"){
                                return (
                                    <View>
                                        <ButtonsBox marginBottom={0}>
                                            <ButtonsBox.Button btnText={"注册"} onPress={_this._onPressStart} isPressing={_this.state.isPressingStart}/>
                                        </ButtonsBox>
                                        <ButtonsBox marginTop={0}>
                                            <ButtonsBox.Button btnText={"已注册？登录"} onPress={_this._onPressLogin} isPressing={_this.state.isPressingLogin}/>
                                        </ButtonsBox>
                                    </View>
                                );
                            }
                        })()
                    }
                </View>
            </View>
        );
    }
    _onPressWelcome(){
        YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex'});
    }
    _onPressStart(){
        YrcnApp.now.$ViewRoot.setState({viewName:'RegisterIndexView'});
    }
    _onPressLogin(){
        YrcnApp.now.$ViewRoot.setState({viewName:'LoginIndexView'});
    }
}
//
module.exports = GuideIndexView;
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
    centerView:{
        width:Dimensions.get('window').width,
        flex: 4,
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
        flex: 1.5,
    },
    guideIndexImage:{
        width:Dimensions.get('window').width-40,
    }
});