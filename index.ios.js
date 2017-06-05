/**
 * 启动文件
 */
'use strict';
//
import React,{Component} from 'react';
//import {AppRegistry,Text} from 'react-native';
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Image,
    PanResponder,
    Button,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';//处理启动闪屏问题
import { StackNavigator,DrawerNavigator } from 'react-navigation';//navigator
import codePush from 'react-native-code-push'
//
import YrcnApp from './src/common/YrcnApp.js';
import ViewRoot from './src/view/ViewRoot.js';
import {NavigatorRoot} from './src/navigator';
//
class YrcnAppProject extends Component {
    componentDidMount() {
        codePush.sync()
        SplashScreen.hide();//关闭启动屏幕
        //AppState.addEventListener("change", (newState) => {
        //    newState === "active" && codePush.sync();
        //});
    }
    render(){
        return (
            <ViewRoot />
        );
    }
}
//启动项目
AppRegistry.registerComponent('YrcnAppProject', () => YrcnAppProject);