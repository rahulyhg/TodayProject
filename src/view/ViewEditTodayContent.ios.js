/**
 * 她的生活搜索结果页面
 */
'use strict';
//导入
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TextInput,
    Image,
    TouchableOpacity,
    Button,
} from 'react-native';
//
var RNUtils = require('../common/RNUtils.js');
var RNAllService = require('../common/RNAllService.js');
var FloatButtonsBox = require('../component/FloatButtonsBox.js');
var NineImagesBox = require('../component/NineImagesBox.js');
var ViewHeader = require('../component/ViewHeader.js');
var ImagePicker = require('react-native-image-picker');
//
/**
 */
class WebViewEditTodayContent extends Component {
    constructor(props){
        super(props);
        this._onChangeText = this._onChangeText.bind(this);
        this._onPressImage = this._onPressImage.bind(this);
    }
    //static navigationOptions = ({ navigation , screenProps}) => ({
    //    title: screenProps.title,
    //    headerTintColor: 'black',
    //    headerStyle:{backgroundColor: '#fefefe'},
    //    headerLeft: <Button title="完成" onPress={()=>YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex'})} color="black"/>
    //});
    _vars={
        contentDay: RNUtils.nowDate(),
    }
    static defaultProps = {
        placeholder:"请输入...",
        multiline: true,
        maxLength: 50000,
        placeholderTextColor: '#4e4e4e',
        keyboardType: 'default',
        defaultValue: '',
    }
    state = {
        textInputHeight: 120,
        oneImages: [],
    }
    //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
    //如果想和其它 JavaScript 框架集成，使用 setTimeout 或者 setInterval 来设置定时器，或者发送 AJAX 请求，可以在该方法中执行这些操作。
    componentDidMount() {
        var _this = this;
        var oneImages = [];
        if(this.props.coreObj && this.props.coreObj.oneImages && Array.isArray(this.props.coreObj.oneImages)){
            oneImages = this.props.coreObj.oneImages;
        }
        this.setState({
            oneImages: oneImages,
        });
    }
    render() {
        var _this = this;
        //this.props.parent.showRightButton();
        //console.log(this.props.type);
        console.log(this.props.coreObj);
        var coreObj = this.props.coreObj||{};
        var val = coreObj.content||"";
        this._vars.text = val.trim();
        return (
            <View style={[global.YrcnApp.styles.common.container,{backgroundColor:'#f0f0f0'}]}>
                <ViewHeader title={_this.props.title} onPressLeft={this._onPressComplete} leftText="完成"/>
                <TextInput
                    style={[styles.textInput,{height:_this.state.textInputHeight}]}
                    onChangeText={this._onChangeText}
                    onFocus={this._onFocusText}
                    onBlur={this._onBlurText}
                    autoCorrect={false}
                    autoFocus={false}
                    maxLength={this.props.maxLength}
                    keyboardType={this.props.keyboardType}
                    placeholder={this.props.placeholder}
                    defaultValue={val}
                    multiline={this.props.multiline}
                    placeholderTextColor={this.props.placeholderTextColor}
                    />
                <NineImagesBox oneImages={this.state.oneImages} parent={_this}/>
                <FloatButtonsBox marginTop={30}>
                    <FloatButtonsBox.Button btnText={"图片"} onPress={this._onPressImage}/>
                </FloatButtonsBox>
            </View>
        );
    }
    _onChangeText(text){
        var _this = this;
        this._vars.text = text.trim();
        var contentOneObj = {
            typeCode: this.props.type.typeCode,
            day: _this._vars.contentDay,
            content: this._vars.text,
            oneImages: this.state.oneImages
        };
        RNUtils.getJsonTodayContent(_this._vars.contentDay,function(contentObj){
            contentObj[_this.props.type.typeCode] = contentOneObj;
            RNUtils.sycnJsonTodayContent(_this._vars.contentDay,contentObj,function(){
                //if(global.YrcnApp.now.scrollViewLlg){
                //    global.YrcnApp.now.scrollViewLlg.refreshView();
                //}
            });
        })
    }
    _onFocusText(text){
        var _this = this;
        //this.setState({
        //    textInputHeight: Dimensions.get('window').height/2
        //});
    }
    _onBlurText(text){
        var _this = this;
        //this.setState({
        //    textInputHeight: Dimensions.get('window').height-50
        //});
    }
    _onPressImage() {
        var _this = this;
        //global.YrcnApp.now.rootNavigator.push({name:"NavigatorTodayInner",indexName:"CameraRollView",indexTitle:"CameraRollView"});
        if(_this.state.oneImages && _this.state.oneImages.length >= 9){
            RNUtils.alert("对不起，最多只支持9个图片...");
            return;
        }
        var options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options, function (response) {
            // Same code as in above section!
            //console.log(response)
            RNUtils.logObj("ViewEditTodayContent.ios.js _onPressImage",response)
            if(response.error && response.error.indexOf("permissions")>-1){
                RNUtils.alert("访问您设备照片的权限被禁用了，请到“设置-隐私-照片-今天做了啥”中打开再做此操作，谢谢。");
                return;
            }
            if(response.uri){
                var ext = RNUtils.getImageExt(response.origURL,response.fileName)
                //_this.state.oneImages.push({uri: 'data:image/'+ext+';base64,'+response.data,index:_this.state.oneImages.length});
                if(RNUtils.getSandboxFileUri(response.uri)){
                    _this.state.oneImages.push({uri: RNUtils.getSandboxFileUri(response.uri),index:_this.state.oneImages.length});
                }else{
                    _this.state.oneImages.push({uri: 'data:image/'+ext+';base64,'+response.data,index:_this.state.oneImages.length});
                }
                _this.setState({
                    oneImages: _this.state.oneImages
                })
            }
            //
            RNUtils.getJsonTodayContent(_this._vars.contentDay,function(contentObj){
                RNUtils.getJsonTodayContent(_this._vars.contentDay,function(getJsonTodayContentObj){
                    var shortPathOneImages = [];
                    for(var oneImage of _this.state.oneImages) {
                        var newOneImage = RNUtils.deepCopy(oneImage);
                        newOneImage.uri = RNUtils.getSandboxFileShortPath(oneImage.uri);
                        shortPathOneImages.push(newOneImage);
                    }
                    if(getJsonTodayContentObj[_this.props.type.typeCode]){
                        getJsonTodayContentObj[_this.props.type.typeCode].oneImages = shortPathOneImages;
                    }else{
                        getJsonTodayContentObj[_this.props.type.typeCode] = {oneImages: shortPathOneImages};
                    }
                    contentObj[_this.props.type.typeCode] = getJsonTodayContentObj[_this.props.type.typeCode];
                    contentObj[_this.props.type.typeCode].day = _this._vars.contentDay;
                    //
                    RNUtils.sycnJsonTodayContent(_this._vars.contentDay,contentObj,function(){
                        //if(global.YrcnApp.now.scrollViewLlg){
                        //    global.YrcnApp.now.scrollViewLlg.refreshView();
                        //}
                    });
                })
            })
        });
    }
    _lookImage(index){
        //console.log(index);
        global.YrcnApp.now.$NavigatorRoot.lookImage(this.state.oneImages[index],this,index);
    }
    deleteImage(index){
        var _this = this;
        _this.state.oneImages.splice(index,1);
        RNUtils.getJsonTodayContent(_this._vars.contentDay,function(contentObj){
            contentObj[_this.props.type.typeCode].oneImages = _this.state.oneImages;
            RNUtils.sycnJsonTodayContent(_this._vars.contentDay,contentObj,function(){
            });
        })
        _this.setState({
            oneImages: _this.state.oneImages
        })
    }
    _onPressComplete(){
        YrcnApp.now.$ViewRoot.setState({viewName:'TabBarIndex',selectedTab:'todayIcon'});
    }
}
//
var styles = StyleSheet.create({
    textInput:{
        width: Dimensions.get('window').width,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 16,
        color: '#444444',
        borderBottomWidth: 3,
        borderBottomColor: '#eeeeee',
        backgroundColor:'#ffffff',
        marginTop: 3,
        textAlignVertical: 'top',
    },
});
//
module.exports = WebViewEditTodayContent;