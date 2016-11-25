/**
 * 封装RN的Navigator Tile 防止RN升级改动太大
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
} from 'react-native';
/**
 * 定义属性：
 */
var YRNavigatorRightBtnView = React.createClass({
    //在组件类创建的时候调用一次，然后返回值被缓存下来。如果父组件没有指定 props 中的某个键，则此处返回的对象中的相应属性将会合并到 this.props （使用 in 检测属性）。
    //该方法在任何实例创建之前调用，因此不能依赖于 this.props。另外，getDefaultProps() 返回的任何复杂对象将会在实例间共享，而不是每个实例拥有一份拷贝。
    getDefaultProps: function(){
        return ({
            onPress: function(){},
            text: ""
        });
    },
    render: function(){
        //
        return (
            <TouchableOpacity style={{top:7,width:40}} onPress={this.props.onPress}>
                <Text style={{fontSize:13,color: '#ffffff',fontWeight:'700',textAlign:'center'}}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
});
//
module.exports = YRNavigatorRightBtnView;