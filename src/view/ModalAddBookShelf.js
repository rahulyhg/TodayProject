/**
 * 书桌
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
    Timers,
    ActionSheetIOS,
    ListView,
    ScrollView,
    TouchableHighlight,
    Modal,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
//
var ModalAddBookShelf = React.createClass({
    _vars:{},
    render: function(){
        var animationType = this.props.modal.animated?"none":"none";
        return (
            <Modal
                onRequestClose={this._onRequestClose}
                animationType={animationType}
                transparent={this.props.modal.transparent}
                visible={this.props.modal.visible}
                style={styles.modalView}>
                <View style={styles.containerView}>
                    <View style={styles.topView}>
                        <View style={styles.titleView}>
                            <Text style={styles.titleText}>我的书架</Text>
                        </View>
                        <TouchableOpacity style={styles.closeView} onPress={this._onPressClose}>
                            <Text style={styles.titleText}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.centerView}>
                        <View style={styles.msgView}>
                            <Text style={styles.msgText}>请输入书架名称</Text>
                        </View>
                        <TextInput
                            style={styles.topTextInput}
                            onChangeText={this._onChangeText}
                            autoFocus={true}
                            />
                    </View>
                    <View style={styles.bottomView}>
                        <TouchableOpacity style={styles.cancelView} onPress={this._onPressClose}>
                            <Text style={styles.cancelText}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.okView} onPress={this._onPressOk}>
                            <Text style={styles.okText}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    },
    _onPressClose: function(){
        this.props.parent.closeModal();
    },
    _onPressOk: function(){
        //console.log("_onPressOk")
        //console.log(this._vars.text)
        var _this = this;
        //alert(_this._vars.text);
        if(_this._vars.text && _this._vars.text!=""){
            RNUtils.addBookShelf({
                shelfName:_this._vars.text,
            },function(){
                _this._onPressClose();
            });
        }
    },
    _onChangeText: function(text){
        this._vars.text = text.trim();
    },
    _onRequestClose: function(){

    }
});
//
var styles = StyleSheet.create({
    modalView:{
        backgroundColor: '#efefef',
        opacity: 0.5,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    containerView:{
        backgroundColor: '#f4f2ee',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: Dimensions.get('window').height/2 - 100,
        borderWidth: 1,
        borderColor: '#aaaaaa',
        borderRadius: 10,
    },
    topView:{
        backgroundColor: '#f4f2ee',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    titleView:{
        backgroundColor: '#f4f2ee',
        flex: 1,
    },
    titleText:{
        textAlign: 'center',
    },
    closeView:{
        backgroundColor: '#f4f2ee',
        width: 30,
    },
    closeText:{
        textAlign: 'center',
    },
    centerView:{
        paddingTop: 15,
        paddingBottom: 10,
    },
    msgView:{
        paddingBottom: 15,
    },
    msgText:{
    },
    topTextInput:{
        height: 28,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        marginLeft:10,
        fontSize: 14,
        lineHeight:28,
        padding: 5,
        borderRadius: 5,
        textAlignVertical: 'bottom',//android专用
    },
    bottomView:{
        backgroundColor: '#f4f2ee',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    cancelView:{
        backgroundColor: '#f4f2ee',
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1,
    },
    cancelText:{
        textAlign: 'center',
    },
    okView:{
        backgroundColor: '#f4f2ee',
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1,
    },
    okText:{
        textAlign: 'center',
    },
});
//
module.exports = ModalAddBookShelf;