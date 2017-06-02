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
//class HomeScreen extends React.Component {
//    static navigationOptions = {
//        title: 'Welcome',
//    };
//    componentDidMount() {
//        SplashScreen.hide();//关闭启动屏幕
//    }
//    render() {
//        return <Text>Hello, Navigation!</Text>;
//    }
//}
//const YrcnAppProject = StackNavigator({
//    Home: { screen: HomeScreen },
//});
//class MyHomeScreen extends React.Component {
//    static navigationOptions = {
//        drawerLabel: 'Home',
//        drawerIcon: ({ tintColor }) => (
//            <Image
//                source={require('./src/images/aboutIcon.png')}
//                style={[styles.icon, {tintColor: tintColor}]}
//                />
//        ),
//    };
//
//    render() {
//        return (
//            <Button
//                onPress={() => this.props.navigation.navigate('Notifications')}
//                title="Go to notifications"
//                />
//        );
//    }
//}
//
//class MyNotificationsScreen extends React.Component {
//    static navigationOptions = {
//        drawerLabel: 'Notifications',
//        drawerIcon: ({ tintColor }) => (
//            <Image
//                source={require('./src/images/aboutIcon.png')}
//                style={[styles.icon, {tintColor: tintColor}]}
//                />
//        ),
//    };
//
//    render() {
//        return (
//            <Button
//                onPress={() => this.props.navigation.goBack()}
//                title="Go back home"
//                />
//        );
//    }
//}
//
//const styles = StyleSheet.create({
//    icon: {
//        width: 24,
//        height: 24,
//    },
//});
//
//const YrcnAppProject = DrawerNavigator({
//    Home: {
//        screen: MyHomeScreen,
//    },
//    Notifications: {
//        screen: MyNotificationsScreen,
//    },
//});
//启动项目
AppRegistry.registerComponent('YrcnAppProject', () => YrcnAppProject);