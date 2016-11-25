
import {
    StyleSheet,
    Dimensions,
} from 'react-native';
//
var common = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    navBar: {
        height:50,
        backgroundColor: '#01bbfc',
        borderBottomColor:'#01bbfc',
        borderBottomWidth:1,
        position: 'absolute',
        paddingLeft:0,
        marginLeft:0,
    },
    status_0_View:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems:'center',
    },
});
//
var styles = {
    common: common,
};
//
module.exports = styles;
