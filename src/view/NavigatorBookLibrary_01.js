/**
 * 首页
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
    Navigator,
} from 'react-native';
//
var ListViewBookLibrary = require('./ListViewBookLibrary.js');
var InfoBook = require('./InfoBook.js');
var InfoPoem = require('./InfoPoem.js');
var ListViewBookLibrarySearchBooks = require('./ListViewBookLibrarySearchBooks.js');
var ListViewBookLibrarySearchPoems = require('./ListViewBookLibrarySearchPoems.js');
var ModalSearchPoems = require('./ModalSearchPoems.js');

//
var navigationBarRouteMapper = {
    titleStr: "书库",
    Title: function(){
        return (
            <global.YrcnApp.components.NavigatorTitleView title={this.titleStr}/>
        );
    },
    LeftButton: function(){
        return (
            <global.YrcnApp.components.NavigatorLeftBtnView text={""}/>
        );
    },
    RightButton: function(){
        return (
            <global.YrcnApp.components.NavigatorRightBtnView />
        );
    },
    _onPressLeftButton: function(){
        //console.log("_onPressLeftButton");
        navigationBarRouteMapper.navigator.pop();
    },
    _onPressRightButton: function(){
        //console.log("_onPressRightButton");
        navigationBarRouteMapper.navigatorBookLibrary_01.setState({
            modalSearchPoems:{
                animated:true,
                transparent:false,
                visible:true,
            },
        });
    },
}
/**
 * NavigatorRoot_route={route} NavigatorRoot_navigator={navigator} navigatorRoot={this}
 */
var NavigatorBookLibrary = React.createClass({
    showLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return (
                <global.YrcnApp.components.NavigatorLeftBtnView onPress={this._onPressLeftButton} text={"返回"}/>
            );
        }
    },
    hideLeftButton: function(){
        navigationBarRouteMapper.LeftButton = function(){
            return (
                <global.YrcnApp.components.NavigatorLeftBtnView text={""}/>
            );
        }
    },
    showRightButton: function(){
        navigationBarRouteMapper.RightButton = function(){
            return (
                <global.YrcnApp.components.NavigatorRightBtnView onPress={this._onPressRightButton} text={"搜索"}/>
            );
        }
    },
    hideRightButton: function(){
        return (
            <global.YrcnApp.components.NavigatorRightBtnView />
        );
    },
    //在组件挂载之前调用一次。返回值将会作为 this.state 的初始值。
    getInitialState: function(){
        return ({
            modalSearchPoems:{
                animated:true,
                transparent:true,
                visible:false,
            },
            searchKey:"",
        });
    },
    //在组件类创建的时候调用一次，然后返回值被缓存下来。如果父组件没有指定 props 中的某个键，则此处返回的对象中的相应属性将会合并到 this.props （使用 in 检测属性）。
    //该方法在任何实例创建之前调用，因此不能依赖于 this.props。另外，getDefaultProps() 返回的任何复杂对象将会在实例间共享，而不是每个实例拥有一份拷贝。
    getDefaultProps: function(){
        return ({
            searchKey:"",
        });
    },
    render: function(){
        if(this.state.modalSearchPoems.visible){
            return (
                <ModalSearchPoems parent={this} modal={this.state.modalSearchPoems}></ModalSearchPoems>
            );
        }else{
            return (
                <Navigator
                    navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={navigationBarRouteMapper}
                        style={styles.navBar}/>
                    }
                    initialRoute={{name: this.props.NavigatorRoot_route.indexName, index: 0}}
                    renderScene={this._renderScene}/>
            );
        }
    },
    _renderScene: function(route, navigator){
        //
        navigationBarRouteMapper.navigator = navigator;
        navigationBarRouteMapper.titleStr = route.title;
        navigationBarRouteMapper.navigatorBookLibrary_01 = this;
        //
        var Component = null;
        switch (route.name){
            case "InfoBook": //书籍信息
                Component = InfoBook;
                break;
            case "InfoPoem": //诗词曲阜
                Component = InfoPoem;
                break;
            case "ListViewBookLibrarySearchPoems": //搜索诗歌
                navigationBarRouteMapper.navigator = this.props.NavigatorRoot_navigator;
                navigationBarRouteMapper.titleStr = this.props.NavigatorRoot_route.title;
                Component = ListViewBookLibrarySearchPoems;
                break;
            default: {//书籍搜索
                navigationBarRouteMapper.navigator = this.props.NavigatorRoot_navigator;
                navigationBarRouteMapper.titleStr = this.props.NavigatorRoot_route.title;
                Component = ListViewBookLibrarySearchBooks;
            }
        }
        this.state.searchKey = this.props.searchKey;
        //console.log(this.state.searchKey)
        return <Component
                NavigatorRoot_route={this.props.NavigatorRoot_route}
                NavigatorRoot_navigator={this.props.NavigatorRoot_navigator}
                NavigatorBookLibrary_route={route}
                NavigatorBookLibrary_navigator={navigator}
                navigatorBookLibrary={this}
                searchKey={this.state.searchKey}
                poemInfoObj={route.poemInfoObj}
                bookInfo={route.bookInfo}
                oneData={this.props.NavigatorRoot_route.oneData}
                service={route.service}/>
    },
    closeModal: function(){
        this.setState({
            modalSearchPoems:{
                animated:true,
                transparent:true,
                visible:false,
            },
        });
    },
    setSearchKey: function(searchKey){
        //console.log(searchKey)
        this.props.searchKey = searchKey;
        this.setState({
            searchKey:searchKey
        });
    }
});
var styles = StyleSheet.create({
    navBar: {
        height: 50,
        backgroundColor:'#4ab854',
        borderBottomColor:'#4ab854',
        borderBottomWidth:1,
        position: 'absolute',
    },
    leftView:{
        width: 40,
        paddingTop: 9,
    },
    leftText:{
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 14,
    },
    rightView:{
        width: 40,
        paddingTop: 9
    },
    rightText:{
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 14,
    }
});
//
module.exports = NavigatorBookLibrary;