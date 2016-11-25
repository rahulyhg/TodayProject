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
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var ModalCatalogue = require('./ModalCatalogue.js');
var InfoBookComments = require('./InfoBookComments.js');
var RNAllService = require('../common/RNAllService.js');
var BookSmallInfoBox = require('../component/BookSmallInfoBox.js');
var ACViewBox = require('../component/ACViewBox.js');
var LineButtonsBox = require('../component/LineButtonsBox.js');
//
/**
 *
 */
var InfoBook = React.createClass({
    _vars:{},
    getInitialState: function() {
        var _this = this;
        //
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.key !== r2.key});
        //
        return {
            //数据源
            dataSource: ds.cloneWithRows([0,1]),
            isShowLoadingView: false,
            isShowCatalogueModal: false,
            isAtBookShelf: false,
            btnReadingText: '立即阅读',
        };
    },
    _pressRow: function(rowID: number) {
        //console.log("click row"+rowID+this.props.navigator);
        this.props.navigator.push({name:"InfoBook"});
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
        if(rowID == 0){
            return (
                <View style={styles.row}>
                    <global.YrcnApp.components.Image source={{uri:this.props.bookInfo.img01}} style={styles.rowImage}/>
                    <View style={styles.rowText}>
                        <View>
                            <Text style={styles.bookName}>
                                {this.props.bookInfo.bookName}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.author}>
                                作者：{this.props.bookInfo.author}
                            </Text>
                        </View>
                    </View>
                </View>
            );
        }else if(rowID == 1){
            return (
                <View style={styles.introduceView}>
                    <Text style={styles.introduceText}>{this.props.bookInfo.introduce}</Text>
                </View>
            );
        }
        //else if(rowID == 2){
        //    return (
        //        <View style={styles.bookReviewView}>
        //            <Text style={styles.bookReviewText}>书评区</Text>
        //        </View>
        //    );
        //} else if(rowID == 3){
        //    return (
        //        <View style={styles.bookReviewItemView}>
        //            <InfoBookComments bookInfoObj={this.props.bookInfo}/>
        //        </View>
        //    );
        //}
    },
    render: function(){
        //
        var _this = this;
        //
        var navigatorBookLibrary = this.props.navigatorBookLibrary;
        navigatorBookLibrary.showLeftButton();
        //
        //console.log(this);
        //
        if(this.state.isShowLoadingView){
            return (
                <View>
                    <ACViewBox loadingText={this.state.loadingText}/>
                </View>
            );
        }else{
            var addBookToShelfBtnText = "放入书架";
            if(this.state.isAtBookShelf || this.props.bookInfo.shelfName){
                addBookToShelfBtnText = "已放【"+this.props.bookInfo.shelfName+"】";
            }
            return (
                <View style={styles.container}>
                    {this.state.isShowCatalogueModal?function(){
                        return (
                            <ModalCatalogue bookInfo={_this.props.bookInfo} sectionsData={_this._vars.sectionsData}
                                            onlyShow={true}
                                            parent={_this} modal={_this.state.isShowCatalogueModal}></ModalCatalogue>
                        );
                    }():function(){}()}
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        style={styles.listViewContainer}
                        name="ListViewBookLibrarySearchBooks">
                    </ListView>
                    <View style={styles.row_buttons}>
                        <LineButtonsBox>
                            <LineButtonsBox.Button btnText={"目录"} onPress={this._onPressShowCatalogue}/>
                            <LineButtonsBox.Button btnText={addBookToShelfBtnText} onPress={this._opPressButtonAddBookToShelf}/>
                            <LineButtonsBox.Button btnText={this.state.btnReadingText} onPress={this._opPressButtonReading}/>
                        </LineButtonsBox>
                    </View>
                </View>
            );
        }
    },
    _opPressButtonReading: function(){//立即阅读
        var _this = this;
        //
        if(this.state.btnReadingText == "正在打开..."){
            return;
        }
        this.setState({
            btnReadingText: "正在打开..."
        });
        //
        var bookObj = this.props.bookInfo;
        bookObj.service = this.props.service;
        bookObj.now = {
            sectionId:0,
            index:0
        };
        //
        RNAllService.getJson_getSectionsByBookId(bookObj,function(data){
            if(data.list.length == 0){
                RNUtils.alert("此书籍暂无目录",function(){
                    _this.setState({
                        btnReadingText: "立即阅读"
                    });
                });
                return;
            }else{
                //
                bookObj.shelfName = "默认书架";
                RNUtils.pushBookInfo(bookObj);
                RNUtils.pushBookDeskBook(bookObj);
                RNUtils.pushBookShelfBook(bookObj,"默认书架");
                _this.props.NavigatorRoot_navigator.push({
                    name:"ReadingBook",
                    bookInfo:bookObj
                });
                _this.setState({
                    btnReadingText: "立即阅读"
                });
            }
        })
    },
    _opPressButtonAddBookToShelf: function(){//放入书架
        if(this.state.isAtBookShelf||this.props.bookInfo.shelfName){
            return;
        }
        var _this = this;
        var bookObj = this.props.bookInfo;
        bookObj.service = this.props.service;
        bookObj.now = {
            sectionId:0,
            index:0
        };
        var r = 0;
        //获取书架个数
        RNUtils.getBookShelfList(function(bookShelfListObj){
            if(bookShelfListObj.list.length == 1){
                _this.setState({isShowLoadingView:true});
                bookObj.shelfName = "默认书架";
                RNUtils.pushBookInfo(bookObj);
                RNUtils.pushBookShelfBook(bookObj,"默认书架");
                RNUtils.downBook(bookObj,function(sum){
                    //console.log(++r);
                    if(sum == 0){
                        delete bookObj.shelfName;
                        RNUtils.delBookDeskBook(bookObj);
                        RNUtils.delBookShelfBook(bookObj,"默认书架");
                        _this.setState({
                            isShowLoadingView:false,
                            isAtBookShelf: false
                        });
                        return;
                    }
                    _this.setState({
                        loadingText: parseInt((r/sum)*100) + '%'
                    });
                    r++;
                    if(sum == r){
                        _this.setState({
                            isShowLoadingView:false,
                            isAtBookShelf: true
                        });
                        //
                    }
                });
            }else{
                var buttons = [];
                bookShelfListObj.list.map(function(e){
                    buttons.push(e.shelfName);
                });
                buttons.push("取消");
                ActionSheetIOS.showActionSheetWithOptions({
                        options: buttons,
                        cancelButtonIndex: buttons.length-1,
                        title:"请选择放入哪个书架...",
                    },
                    (buttonIndex) => {
                        if(buttonIndex == buttons.length-1){
                            _this.setState({
                                isShowLoadingView:false,
                            });
                            return;
                        }
                        _this.setState({isShowLoadingView:true});
                        bookObj.shelfName = buttons[buttonIndex];
                        RNUtils.pushBookInfo(bookObj);
                        RNUtils.pushBookShelfBook(bookObj,buttons[buttonIndex]);
                        RNUtils.downBook(bookObj,function(sum){
                            //console.log(++r);
                            if(sum == 0){
                                delete bookObj.shelfName;
                                RNUtils.delBookDeskBook(bookObj);
                                RNUtils.delBookShelfBook(bookObj,buttons[buttonIndex]);
                                _this.setState({
                                    isShowLoadingView:false,
                                    isAtBookShelf: false
                                });
                                return;
                            }
                            _this.setState({
                                loadingText: parseInt((r/sum)*100) + '%'
                            });
                            r++;
                            if(sum == r){
                                _this.setState({
                                    isShowLoadingView:false,
                                    isAtBookShelf: true
                                });
                                //
                            }
                        });
                    });
            }
        })
    } ,
    _onPressShowCatalogue: function(){
        var _this = this;
        if(_this.state.isShowLoadingView){
            return;
        }
        RNUtils.getBookSections(_this.props.bookInfo.bookID,function(bookSectionsObj){
            _this._vars.sectionsData = bookSectionsObj;
            _this.setState({
                isShowCatalogueModal: true,
            });
        })
    },
    closeModalCatalogue: function(){
        this.setState({
            isShowCatalogueModal: false,
        });
    },
});
//
var styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    listViewContainer:{
        backgroundColor: '#f7f7f2',
        marginTop: 44,
        height:Dimensions.get('window').height-44,
        marginBottom: 44,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20,
        paddingRight: 10,
        paddingBottom: 20,
        paddingLeft: 10,
    },
    rowImage: {
        flex: 1,
        height: 120,
    },
    rowText: {
        flex: 3,
        paddingLeft:10
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd8d5',
        marginLeft: 10,
        marginRight: 10,
    },
    thumb: {
        width: 90,
        height: 120,
    },
    bookName: {
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 20,
        color: '#323232',
    },
    author: {
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 20,
        color: '#918e83'
    },
    introduce: {
        fontSize: 13,
        fontWeight: '300',
        lineHeight: 19,
        color: '#918e83'
    },
    row_buttons: {//最下方按钮
        position:'absolute',
        bottom:0,
        width:Dimensions.get('window').width,
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#aaaaaa',
    },
    introduceView:{
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    introduceText:{
        color: '#444444',
        lineHeight: 20,
        fontSize: 13,
        textAlign: 'justify',
    },
    directoryView:{
        backgroundColor: '#fafbfc',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        flexDirection: 'row',
    },
    directoryItemLeft:{
        flex:5
    },
    directoryItemRight:{
        flex:1
    },
    directoryText:{
        color: '#aaaaaa',
        fontSize: 20,
    },
    directoryTextRight:{
        color: '#aaaaaa',
        fontSize: 20,
        textAlign: 'right',
    },
    bookReviewView:{
        backgroundColor: '#fafbfc',
        paddingLeft: 15,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 5,
        marginTop: 10
    },
    bookReviewText:{
        color: '#aaaaaa',
        fontSize: 20,
    },
    bookReviewItemView:{
        backgroundColor: '#ffffff',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
});
//
module.exports = InfoBook;