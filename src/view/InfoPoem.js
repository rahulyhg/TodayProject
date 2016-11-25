/**
 * 书籍信息
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
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var ACViewBox = require('../component/ACViewBox.js');
var InfoPoemComments = require('./InfoPoemComments.js');
var ModalCommentEdit = require('./ModalCommentEdit.js');
//
/**
 * NavigatorRoot_route={this.props.NavigatorRoot_route}
 NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}
 NavigatorBookLibrary_route={route}
 NavigatorBookLibrary_navigator={navigator}
 navigatorBookLibrary={this}
 bookInfo={route.bookInfo}
 service={route.service}
 */
var InfoPoem = React.createClass({
    _vars:{},
    getInitialState: function() {
        //
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.key !== r2.key});
        //
        return {
            ds: ds,
            dataSource: ds.cloneWithRows([0,1]),
            isShowLoadingView: true,
            isShowModal: false,
            isPressingFocusing: 0,
            isPressingCollecting: 0,
            focusNum: 0,
            commentNum: 0,
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        var _this = this;
        RNAllService.addPoemReaded({poemInfoId:this.props.poemInfoObj.id});
        RNAllService.getJson_getPoemInfo({poemInfoId:this.props.poemInfoObj.id},function(obj){
            _this.setState({
                isShowLoadingView: false,
                focusNum: obj.focusNum,
                commentNum: obj.commentNum,
                isPressingFocusing: obj.isFocused>0?2:0,
                isPressingCollecting: obj.isCollected>0?2:0,
            });
        })
    },
    render: function(){
        var _this = this;
        var navigatorBookLibrary = this.props.navigatorBookLibrary;
        navigatorBookLibrary.showLeftButton();
        navigatorBookLibrary.hideRightButton();
        //
        //console.log(this);
        //
        if(this.state.isShowLoadingView){
            return (
                <View>
                    <ACViewBox loadingText={this.state.loadingText}/>
                </View>
            );
        }else if(this.state.isShowModal){
            return (
                <View>
                    <ModalCommentEdit parent={this} isShowModal={this.state.isShowModal} poemInfoObj={this.props.poemInfoObj}></ModalCommentEdit>
                </View>
            );
        }else {
            var content = this.props.poemInfoObj.content.replace(/<yrcn:p>/g,"").replace(/<\/yrcn:p>/g,"\r\n");
            return (
                <ScrollView style={styles.container}>
                    <View style={styles.poemInfoView}>
                        <View style={styles.poemInfoTitleView}>
                            <Text style={{textAlign: 'center',}}>
                                <Text style={styles.poemInfoTitleText}>{this.props.poemInfoObj.title}</Text>
                                <Text style={styles.poemInfoAuthorText}>{"    " + this.props.poemInfoObj.author}</Text>
                            </Text>
                        </View>
                        <View style={styles.poemInfoContentView}>
                            <Text style={styles.poemInfoContentText}>{content}</Text>
                        </View>

                    </View>

                </ScrollView>
            );
        }
    },
    _onPressAddComment: function(){
        this.setState({
            isShowModal: true,
        });
    },
    _onPressAddFocus: function(){
        var _this = this;
        if(this.state.isPressingFocusing==1 || this.state.isPressingFocusing==2){
            return;
        }
        this.setState({
            isPressingFocusing: 1,
        })
        RNAllService.addPoemFocus({poemInfoId:this.props.poemInfoObj.id},function(){
            _this.setState({
                isPressingFocusing: 2,
            })
        })
    },
    _onPressAddCollection: function(){
        var _this = this;
        if(this.state.isPressingCollecting==1 || this.state.isPressingCollecting==2){
            return;
        }
        this.setState({
            isPressingCollecting: 1,
        })
        RNAllService.addPoemCollection({poemInfoId:this.props.poemInfoObj.id},function(){
            _this.setState({
                isPressingCollecting: 2,
            })
        })
    },
    closeModal: function(){
        this.setState({
            isShowModal: false,
        });
    }
});
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        paddingTop: 60,
    },
    poemInfoView:{
        width:Dimensions.get('window').width,
    },
    poemInfoTitleView:{
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingTop: 10,
    },
    poemInfoTitleText:{
        fontSize: 18,
    },
    poemInfoAuthorText:{
        fontSize: 13,
    },
    poemInfoContentView:{
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    poemInfoContentText:{
        fontSize: 16,
        lineHeight: 26,
        color: '#646464',
        textAlign: 'center',
    },
    poemInfoBottomView:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    poemInfoBottomText:{
        fontSize: 14,
        color: '#6a7480',
    },
    poemInfoBottomViewLeft:{
        flex: 4,
    },
    poemInfoBottomViewRight:{
        flex: 1,
        backgroundColor: '#45cb7f',
        paddingTop:5,
        paddingLeft:5,
        paddingBottom:5,
        paddingRight:5,
        borderRadius: 5,
    },
    poemInfoBottomTextButton:{
        fontSize: 15,
        color: '#ffffff',
        fontWeight: '600',
        textAlign: 'center',
    },
    poemInfoButtonsView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    poemInfoButton1View:{
        flex: 1,
        paddingTop: 13,
        paddingBottom: 13,
    },
    poemInfoButton1Text:{
        textAlign: 'center',
        fontSize: 15,
        color: '#6a7480',
    },
    poemInfoButton2View:{
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: '#eeeeee',
        paddingTop: 13,
        paddingBottom: 13,
    },
    poemInfoButton2Text:{
        textAlign: 'center',
        fontSize: 15,
        color: '#6a7480',
    },
});
//
module.exports = InfoPoem;
//<View style={styles.poemInfoBottomView}>
//    <View style={styles.poemInfoBottomViewLeft}>
//        <Text style={styles.poemInfoBottomText}>{this.state.focusNum}人关注   {this.state.commentNum}条评论</Text>
//    </View>
//    <TouchableOpacity style={styles.poemInfoBottomViewRight} onPress={this._onPressAddFocus}>
//        <Text style={styles.poemInfoBottomTextButton}>
//            {_this.state.isPressingFocusing==0?function(){
//                return "关注";
//            }():function(){
//                if(_this.state.isPressingFocusing==1){
//                    return "关注...";
//                }else{
//                    return "已关注";
//                }
//            }()}
//        </Text>
//    </TouchableOpacity>
//</View>
//<View style={styles.poemInfoButtonsView}>
//<TouchableOpacity style={styles.poemInfoButton1View} onPress={this._onPressAddCollection}>
//    <Text style={styles.poemInfoButton1Text}>
//        {_this.state.isPressingCollecting==0?function(){
//            return "加入收藏";
//        }():function(){
//            if(_this.state.isPressingCollecting==1){
//                return "加入收藏...";
//            }else{
//                return "已收藏";
//            }
//        }()}
//    </Text>
//</TouchableOpacity>
//<TouchableOpacity style={styles.poemInfoButton2View} onPress={this._onPressAddComment}>
//<Text style={styles.poemInfoButton2Text}>书写评论</Text>
//</TouchableOpacity>
//</View>

//<InfoPoemComments poemInfoObj={this.props.poemInfoObj}/>