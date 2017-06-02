/**
 * title
 * introduce...
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
    View,
    StatusBar,
    TextInput,
    Dimensions,
} from 'react-native';
//
/**
 * 定义属性：
 */
class TitleIntroduceBox extends Component{
    static defaultProps={
        titleColor: '#4c566c',
        borderBottomColor: '#e7e7e7',
    }
    render(){
        var titleProps = {
            numberOfLines: 1,
        };
        var introduceProps = {
            numberOfLines: 3,
        };
        if(this.props.noNumberOfLines){
            delete titleProps.numberOfLines;
            delete introduceProps.numberOfLines;
        }
        return (
            <View style={[styles.container,{borderBottomColor:this.props.borderBottomColor}]}>
                <View style={styles.title_container}>
                    <Text style={[styles.titleText,{color:this.props.titleColor}]} {...titleProps}>{this.props.title}</Text>
                </View>
                <View style={styles.introduce_container}>
                    <Text style={styles.introduceText} {...introduceProps}>{this.props.introduce}</Text>
                </View>
            </View>
        );
    }
}
//
module.exports = TitleIntroduceBox;
//
var styles = StyleSheet.create({
    container:{
        borderBottomWidth: 1,
        borderColor: '#e7e7e7',
        backfaceVisibility:'hidden',
        paddingTop: 10,
        paddingBottom: 10,
    },
    title_container:{
        paddingLeft:10,
    },
    titleText:{
        fontSize:16,
        fontWeight:'600',
        color: '#4c566c'
    },
    introduce_container:{
        paddingTop: 10,
        paddingLeft:10,
        paddingRight:10,
    },
    introduceText:{
        fontSize:14,
        fontWeight:'100',
        lineHeight: 20,
        textAlign:'justify',
        color: '#444444'
    }
});