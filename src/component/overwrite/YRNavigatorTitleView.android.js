/**
 * 封装RN的Navigator Tile 防止RN升级改动太大
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
} from 'react-native';
/**
 * 定义属性：
 */
var YRNavigatorTitleView = React.createClass({
    render: function(){
        //
        return (
            <View style={{top:32,paddingRight:50,width:Dimensions.get('window').width-40-40}}>
                <Text style={{fontSize:16,color: '#ffffff',fontWeight:'800',textAlign:'center'}} numberOfLines={1}>{this.props.title}</Text>
            </View>
        );
    }
});
//
module.exports = YRNavigatorTitleView;