/**
 * 表单
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
    Dimensions,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
//
/**
 * 定义属性：
 */
var NineImagesBox = React.createClass({
    _vars:{},
    getDefaultProps: function(){
        return ({
        });
    },
    getInitialState: function(){
        return ({
        });
    },
    //statics 对象允许你定义静态的方法，这些静态的方法可以在组件类上调用。
    statics: {
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
        //
        return (
            <View style={[styles.container]}>
                {function(){
                    if(_this.props.oneImages && _this.props.oneImages.length > 0){
                        if(_this.props.oneImages.length <= 3){
                            var maxIndex = _this.props.oneImages.length-1;
                            return (
                                <View style={styles.imagesContainer}>
                                    <View style={styles.rowImages}>
                                        <TouchableOpacity style={styles.oneImageView} onPress={function(){_this._lookImage(0);}}>
                                            <Image source={_this.props.oneImages[0]} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.oneImageView} onPress={function(){_this._lookImage(1);}}>
                                            <Image source={1<=maxIndex?_this.props.oneImages[1]:null} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.oneImageView,{marginRight: 0,}]} onPress={function(){_this._lookImage(2);}}>
                                            <Image source={1<=maxIndex?_this.props.oneImages[2]:null} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }else if(_this.props.oneImages.length <= 6){
                            var maxIndex = _this.props.oneImages.length-1;
                            return (
                                <View style={styles.imagesContainer}>
                                    <View style={styles.rowImages}>
                                        <TouchableOpacity style={styles.oneImageView} onPress={function(){_this._lookImage(0);}}>
                                            <Image source={_this.props.oneImages[0]} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.oneImageView} onPress={function(){_this._lookImage(1);}}>
                                            <Image source={1<=maxIndex?_this.props.oneImages[1]:null} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.oneImageView,{marginRight: 0,}]} onPress={function(){_this._lookImage(2);}}>
                                            <Image source={1<=maxIndex?_this.props.oneImages[2]:null} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.rowImages}>
                                        <TouchableOpacity style={styles.oneImageView} onPress={function(){_this._lookImage(3);}}>
                                            <Image source={_this.props.oneImages[3]} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.oneImageView} onPress={function(){_this._lookImage(4);}}>
                                            <Image source={1<=maxIndex?_this.props.oneImages[4]:null} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.oneImageView,{marginRight: 0,}]} onPress={function(){_this._lookImage(5);}}>
                                            <Image source={1<=maxIndex?_this.props.oneImages[5]:null} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }else if(_this.props.oneImages.length <= 9){
                            var maxIndex = _this.props.oneImages.length-1;
                            return (
                                <View style={styles.imagesContainer}>
                                    <View style={styles.rowImages}>
                                        <TouchableOpacity style={styles.oneImageView} onPress={function(){_this._lookImage(0);}}>
                                            <Image source={_this.props.oneImages[0]} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.oneImageView} onPress={function(){_this._lookImage(1);}}>
                                            <Image source={1<=maxIndex?_this.props.oneImages[1]:null} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.oneImageView,{marginRight: 0,}]} onPress={function(){_this._lookImage(2);}}>
                                            <Image source={1<=maxIndex?_this.props.oneImages[2]:null} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.rowImages}>
                                        <TouchableOpacity style={styles.oneImageView} onPress={function(){_this._lookImage(3);}}>
                                            <Image source={_this.props.oneImages[3]} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.oneImageView} onPress={function(){_this._lookImage(4);}}>
                                            <Image source={1<=maxIndex?_this.props.oneImages[4]:null} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.oneImageView,{marginRight: 0,}]} onPress={function(){_this._lookImage(5);}}>
                                            <Image source={1<=maxIndex?_this.props.oneImages[5]:null} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.rowImages}>
                                        <TouchableOpacity style={styles.oneImageView} onPress={function(){_this._lookImage(6);}}>
                                            <Image source={_this.props.oneImages[6]} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.oneImageView} onPress={function(){_this._lookImage(7);}}>
                                            <Image source={1<=maxIndex?_this.props.oneImages[7]:null} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.oneImageView,{marginRight: 0,}]} onPress={function(){_this._lookImage(8);}}>
                                            <Image source={1<=maxIndex?_this.props.oneImages[8]:null} style={styles.oneImage} resizeMode="cover"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }
                    }
                }()}
            </View>
        );
    },
    _lookImage: function(index){
        //console.log(index);
        global.YrcnApp.now.$NavigatorRoot.lookImage(this.props.oneImages,this,index,this.props.isHideDelete);
    },
    deleteImage: function(index){
        this.props.parent.deleteImage(index);
    }
});
//
module.exports = NineImagesBox;
//
var styles = StyleSheet.create({
    container:{
    },
    imagesContainer:{
        width: Dimensions.get('window').width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
    rowImages:{
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    oneImageView:{
        flex: 1,
        marginRight: 15,
        width: (Dimensions.get('window').width-15-15-15-15)/3,
        height: (Dimensions.get('window').width-15-15-15-15)/3,
    },
    oneImage:{
        width: (Dimensions.get('window').width-15-15-15-15)/3,
        height: (Dimensions.get('window').width-15-15-15-15)/3,
    },
});