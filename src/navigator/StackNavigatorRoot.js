/**
 * StackNavigatorRoot
 */
'use strict';
//
import React,{Component} from 'react';
import { StackNavigator,DrawerNavigator } from 'react-navigation';//navigator
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TextInput,
    Image,
    TouchableOpacity,
    Button,
} from 'react-native';





var ViewEditTodayContent = require('./../view/ViewEditTodayContent');
const _StackNavigatorRoot = StackNavigator({
    Home: { screen: ViewEditTodayContent },
});


class StackNavigatorRoot extends Component {
    componentDidMount() {

    }
    render(){
        const { title } = this.props;
        YrcnApp.utils.log("",this.props.title);
        //ViewEditTodayContent.navigationOptions = {
        //    title: title,
        //    headerTintColor: 'black',
        //    headerStyle:{backgroundColor: '#fefefe'},
        //    headerLeft: <Button title="返回" onPress={()=>YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex'})}/>
        //};
        //ViewEditTodayContent.navigationOptions = ({ navigation }) => ({
        //    title: title,
        //    headerTintColor: 'black',
        //    headerStyle:{backgroundColor: '#fefefe'},
        //    headerLeft: <Button title="返回" onPress={()=>YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex'})}/>
        //});
        return (
            <_StackNavigatorRoot screenProps={{title:title}}/>
        );
    }
}

//
module.exports = StackNavigatorRoot;