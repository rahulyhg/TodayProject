/**
 * 书籍评论
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
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var ACViewBox = require('../component/ACViewBox.js');
var BookDeskOneBookView = require('../component/BookDeskOneBookView.js');
var TitleBox = require('../component/TitleBox.js');
var ModalCatalogue = require('./ModalCatalogue.js');
var InfoBookComments = require('./InfoBookComments.js');
var ModalCommentEdit = require('./ModalCommentEdit.js');
//
var ListViewBookComments = React.createClass({
    _vars:{
        currentPage: 1,
    },
    getInitialState: function() {
        //
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //console.log(this.props.bookDesk);
        //
        return {
            //数据源
            ds: ds,
            dataSource: ds.cloneWithRows([]),
            isShowLoadingView: true,
            status: -1,
            title: this.props.bookInfo.bookName,
            isShowModal: false,
        };
    },
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount: function(){
        //console.log("componentDidMount");
        //console.log(this.props.bookInfo)
        var _this = this;
        RNAllService.getJson_getBookComments({currentPage: this._vars.currentPage,bookInfoId:this.props.bookInfo.bookID},function(obj){
            _this._vars.list = obj.list;
            _this.setState({
                dataSource: _this.state.ds.cloneWithRows(_this._vars.list),
                isShowLoadingView: false,
                status: _this._vars.list.length==0?0:-1
            });
        })
    },
    //在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
    //用此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。老的 props 可以通过 this.props 获取到。在该函数中调用 this.setState() 将不会引起第二次渲染。
    componentWillReceiveProps: function(){
        //console.log("componentWillReceiveProps");
        var _this = this;
    },
    pressRow: function(rowData: string, sectionID: number, rowID: number) {
        //console.log("click row"+rowID+this.props.navigator);
        this.props.NavigatorRoot_navigator.push({name:"ReadingBook",bookInfo:rowData});
    },
    /**
     * 渲染每一行的数据
     * @param rowData   单行数据
     * @param sectionID
     * @param rowID
     * @returns {XML}
     * @private
     */
    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
        var key = Math.uuidFast();
        return (
            <View key={key}>
                <Text>1</Text>
            </View>
        );
    },
    render: function(){
        //console.log("ListViewBookComments render");
        var _this = this;
        YrcnApp.components.StatusBar.setBarStyle('light-content',true);
        StatusBar.setHidden(false,'slide');
        return (
            <View style={styles.container}>
                {function(){
                    if(_this.state.isShowModal){
                        return (
                            <View>
                                <ModalCommentEdit parent={_this} isShowModal={_this.state.isShowModal} bookInfo={_this.props.bookInfo}></ModalCommentEdit>
                            </View>
                        );
                    }
                }()}
                <View style={styles.topView}>
                    <TitleBox title={this.state.title} onPressLeft={this._onPressLeft} rigthBtnText={"评论"} onPressRight={_this._onPressRight}/>
                </View>
                <View style={styles.contentView}>
                    {!_this.state.isShowLoadingView?function(){
                        if(_this.state.status==0){//空空的
                            return (
                                <View style={styles.noDataView}>
                                    <Text style={styles.noDataText}>“暂无评论”</Text>
                                </View>
                            );
                        }else{
                            return (<View style={styles.bookReviewItemView}>
                                <InfoBookComments bookInfoObj={_this.props.bookInfo}/>
                            </View>);
                        }
                    }():function(){
                        return (<View><ACViewBox /></View>);
                    }()}
                </View>
            </View>
        );
    },
    _onPressLeft: function(){
        this.props.NavigatorRoot_navigator.pop();
    },
    _onPressRight: function() {
        this.setState({
            isShowModal: true,
        });
    },
    closeModal: function(type){
        //console.log("type="+type)
        var _this = this;
        if(type != "1"){
            this.setState({
                isShowModal: false,
            });
        }else{
            this.setState({
                isShowModal: false,
                isShowLoadingView: true
            });
            RNAllService.getJson_getBookComments({currentPage: this._vars.currentPage,bookInfoId:this.props.bookInfo.bookID},function(obj){
                _this._vars.list = obj.list;
                _this.setState({
                    dataSource: _this.state.ds.cloneWithRows(_this._vars.list),
                    isShowLoadingView: false,
                    status: _this._vars.list.length==0?0:-1
                });
            })
        }
    }
});
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
    },
    topView:{

    },
    contentView:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 50,
        position: 'absolute',
        top: 50,
        opacity: 1,
        backgroundColor: '#ffffff',
    },
    bookReviewItemView:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 50,
        backgroundColor: '#ffffff',
    },
    noDataView:{

    },
    noDataText:{
        fontSize: 14,
        color: '#464646',
        lineHeight: 26,
        textAlign: 'center',
    },
});
//
module.exports = ListViewBookComments;