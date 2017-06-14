/**
 * 她的生活搜索结果页面
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
    DatePickerIOS,
    DatePickerAndroid,
} from 'react-native';
//这是一个三方组件 github地址:https://github.com/eyaleizenberg/react-native-custom-action-sheet
var CustomActionSheet = require('react-native-custom-action-sheet');
//
var moment = require('moment/min/moment-with-locales.min.js');
moment.locale('zh-cn');
var RNUtils = require('../common/RNUtils.js');
var RNLunarCalendar = require('../common/RNLunarCalendar.js');
var RNAllService = require('../common/RNAllService.js');
var ACViewBox = require('../component/ACViewBox.js');
var TitleIntroduceBox = require('../component/TitleIntroduceBox.js');
var LineButtonsBox = require('../component/LineButtonsBox.js');
var ListViewLi = require('../component/ListViewLi.js');
var NineImagesBox = require('../component/NineImagesBox.js');
var ButtonsBox = require('../component/ButtonsBox.js');
var ViewHeader = require('../component/ViewHeader.js');
//
/**
 */
class ScrollViewSearchTodayContent extends Component{
    constructor(props){
        super(props);
        this._onPressSearch = this._onPressSearch.bind(this);
        this._showDatePicker = this._showDatePicker.bind(this);
        this._onDateChange = this._onDateChange.bind(this);
        this._onSubmitEditingSearch = this._onSubmitEditingSearch.bind(this);
    }
    _vars = {
        contentObjArray: [],
        ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
    state = {
        searchKey: '',
            beginDateVal: RNUtils.lastMonth3Date(),
            endDateVal: RNUtils.nowDate(),
            isPressingSearch: false,
            datePickerModalVisible: false,  //选择器显隐标记
            showDate: 'begin',
    }
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount(){
        var _this = this;
    }
    render(){
        var _this = this;
        //
        let datePickerModal = (   //日期选择器组件 (根据标记赋值为 选择器 或 空)
            this.state.datePickerModalVisible && YrcnApp.Platform.isIOS?
                <CustomActionSheet
                    modalVisible={this.state.datePickerModalVisible}
                    onCancel={()=>this._showDatePicker()}>
                    <View style={styles.datePickerContainer}>
                        <DatePickerIOS
                            mode={"date"}
                            date={new Date(this.state.showDate=='begin'?this.state.beginDateVal:this.state.endDateVal)}
                            onDateChange={this._onDateChange}
                            style={{borderWidth: 0,width: Dimensions.get('window').width-20,}}
                            />
                    </View>
                </CustomActionSheet> : null
        );
        //
        return (
            <ScrollView
                style={styles.scrollViewContainer}>
                <ViewHeader title={this.props.title} onPressLeft={this._onPressLeft}/>
                <View style={styles.searchInputView}>
                    <TextInput keyboardType={"default"} returnKeyType="search" placeholder={"请输入关键字..."} style={styles.search_textInput}
                               onChangeText={text => this.state.searchKey=text} onSubmitEditing={this._onSubmitEditingSearch}/>
                </View>
                <View style={styles.dateInputView}>
                    <View style={[styles.dateInputOneView]}>
                        <TouchableOpacity
                            onPress={()=>_this._showDatePicker('begin')}
                            ><Text style={[styles.date_textInput,{textAlign: 'right'}]}>{_this.state.beginDateVal}</Text></TouchableOpacity>
                    </View>
                    <View style={styles.dateInputCenterView}>
                        <Text style={[{textAlign:'center',paddingBottom: 3,}]}>至</Text>
                    </View>
                    <View style={styles.dateInputOneView}>
                        <TouchableOpacity
                            onPress={()=>_this._showDatePicker('end')}
                            ><Text style={styles.date_textInput}>{_this.state.endDateVal}</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.searchBtnView]}>
                    <ButtonsBox marginBottom={0}>
                        <ButtonsBox.Button btnText={"开始搜索"} onPress={this._onPressSearch} isPressing={this.state.isPressingSearch} backgroundColor="#01bbfc" btnColor="#ffffff"/>
                    </ButtonsBox>
                </View>
                {datePickerModal}
            </ScrollView>
        );
    }
    _onPressSearch(){
        var _this = this;
        _this._vars.contentObjArray = [];
        //
        if(!_this.state.beginDateVal.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)){
            RNUtils.alert("开始时间不能为空且格式必须为0000-00-00");
            return;
        }
        if(!_this.state.endDateVal.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)){
            RNUtils.alert("结束时间不能为空且格式必须为0000-00-00");
            return;
        }
        //
        RNUtils.getKeysTodayContent(function(keys){
            console.log(keys);
            var searchKeys = [];
            for(var key of keys){
                if(key == _this.state.beginDateVal || key == _this.state.endDateVal){
                    searchKeys.push(key);
                    continue;
                }
                if(RNUtils.isAfter(key,_this.state.endDateVal)){//不需要
                    continue;
                }else if(RNUtils.isBefore(key,_this.state.endDateVal)){//有可能需要
                    if(RNUtils.isAfter(key,_this.state.beginDateVal)){//需要
                        searchKeys.push(key);
                    }else{//不需要
                        break;
                    }
                }
            }
            console.log(searchKeys);
            var count = 0;
            if(_this.state.searchKey){
                for(var day of searchKeys){
                    RNUtils.getJsonTodayContent(day,function(contentObj){
                        if(contentObj){
                            var contentArray = [];
                            var aDay = day;
                            for(var e in contentObj){
                                if(contentObj[e].day){
                                    aDay = contentObj[e].day;
                                }
                                if(RNUtils.isTrueContentObj(e,contentObj)){
                                    contentArray.push({
                                        key: e,
                                        value: contentObj[e]
                                    });
                                }
                            }
                            //contentObj.day = aDay;
                            contentObj.contentArray = contentArray;
                            if(contentArray.length > 0 && RNUtils.toString(contentArray).indexOf(_this.state.searchKey)>-1){
                                _this._vars.contentObjArray.push(contentObj);
                            }
                        }
                        count++;
                        innerFunc();
                    })
                }
                //
                if(searchKeys.length == 0){
                    RNUtils.alert("没有搜索到任何信息")
                }
            }else{
                for(var day of searchKeys){
                    RNUtils.getJsonTodayContent(day,function(contentObj){
                        if(contentObj){
                            var contentArray = [];
                            var aDay = day;
                            for(var e in contentObj){
                                if(contentObj[e].day){
                                    aDay = contentObj[e].day;
                                }
                                if(RNUtils.isTrueContentObj(e,contentObj)){
                                    contentArray.push({
                                        key: e,
                                        value: contentObj[e]
                                    });
                                }
                            }
                            //contentObj.day = aDay;
                            console.log("aDay="+aDay);
                            contentObj.contentArray = contentArray;
                            if(contentArray.length > 0){
                                _this._vars.contentObjArray.push(contentObj);
                            }
                            //RNUtils.sycnJsonTodayContent(aDay,contentObj)
                        }
                        count++;
                        innerFunc();
                    })
                }
                //
                if(searchKeys.length == 0){
                    RNUtils.alert("没有搜索到任何信息")
                }
            }
            function innerFunc(){
                //console.log(count)
                if(searchKeys.length == count){
                    if(_this._vars.contentObjArray.length == 0){
                        RNUtils.alert("没有搜索到任何信息")
                        return;
                    }
                    //
                    YrcnApp.now.$ViewRoot.setState({viewName:'ScrollViewShowTodaysContent',contentObjArray: _this._vars.contentObjArray,viewTitle:"搜索"});
                }
            }
        });

    }
    async _showDatePicker(showDate) { //切换显隐标记
        if(YrcnApp.Platform.isIOS){
            this.setState({
                datePickerModalVisible: !this.state.datePickerModalVisible,
                showDate: showDate
            });
        }else{
            try {
                var date = null;
                if(showDate == "begin"){
                    date = moment(this.state.beginDateVal).toDate();
                }else{
                    date = moment(this.state.endDateVal).toDate();
                }
                const {action, year, month, day} = await DatePickerAndroid.open({
                    date: date
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    console.log(year);
                    console.log(month);
                    console.log(day);
                    var d = moment(new Date(year,month,day));
                    if(showDate == "begin"){
                        this.setState({beginDateVal:d.format("YYYY-MM-DD")});
                    }else{
                        this.setState({endDateVal:d.format("YYYY-MM-DD")});
                    }
                }
            } catch (msg) {
                console.warn('Cannot open date picker', msg);
            }
        }
    }
    _onDateChange(date) {  //改变日期state
        if(this.state.showDate == "begin"){
            this.setState({beginDateVal:moment(date).format("YYYY-MM-DD")});
        }else{
            this.setState({endDateVal:moment(date).format("YYYY-MM-DD")});
        }
    }
    _onPressLeft(){
        YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex',selectedTab:'llgIcon'});
    }
    _onSubmitEditingSearch(){
        //RNUtils.log("ScrollViewSearchTodayContent.js _onSubmitEditingSearch","");
        this._onPressSearch();
    }
}
//
var styles = StyleSheet.create({
    scrollViewContainer:{
        backgroundColor: '#ffffff',
    },
    searchInputView:{
        width:Dimensions.get('window').width,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    dateInputView:{
        width:Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        marginTop: 20,
        paddingBottom: 10,
    },
    dateInputOneView:{
        flex: 3,
        borderWidth:0
    },
    dateInputCenterView:{
        flex: 1,
    },
    search_textInput:{
        width: Dimensions.get('window').width,
        height: 60,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 0,
        fontSize: 16,
        color: '#01bbfc',
    },
    date_textInput:{
        paddingLeft: 10,
        paddingRight: 15,
        fontSize: 16,
        color: '#01bbfc',
        borderBottomWidth: 3,
        borderBottomColor: '#444444',
    },
    searchBtnView:{
        width:Dimensions.get('window').width,
    },
    datePickerContainer: {
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 10,
    },
});
//
module.exports = ScrollViewSearchTodayContent;