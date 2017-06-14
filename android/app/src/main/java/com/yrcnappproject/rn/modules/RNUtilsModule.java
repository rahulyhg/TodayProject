package com.yrcnappproject.rn.modules;


import android.util.Log;
import android.widget.Toast;
import android.app.*;
import android.content.*;
import com.yrcnappproject.*;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.yrcnappproject.rn.utils.DeviceUtils;

import java.util.HashMap;
import java.util.Map;

public class RNUtilsModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";
    private ReactApplicationContext reactContext;

    public RNUtilsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }
    @Override
    public String getName() {
        return "RNUtilsModule";
    }
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }
    @ReactMethod
    public void getAppInfo(ReadableArray params, Callback successCallback) {
        final WritableNativeMap retMap = new WritableNativeMap();
        retMap.putString("appV","2.1.0");
        retMap.putString("appBundleV","2.1.0");
        retMap.putString("isOpenNotification","1");
        retMap.putString("phoneModel", DeviceUtils.getPhoneModel());
        retMap.putString("localPhoneModel", DeviceUtils.getPhoneBrand());
        retMap.putString("deviceName", "android");
        retMap.putString("phoneVersion", DeviceUtils.getBuildVersion());
//        retMap.putString("uuid_01", DeviceUtils.getDeviceId(reactContext);
//        retMap.putString("appUpgrade","0");
//        retMap.putString("appUpgradeVersion","");
//        retMap.putString("appUpgradeMust","0");
//        retMap.putString("appUpgradeDesp","");
        WritableNativeArray ret = new WritableNativeArray();
        ret.pushMap(retMap);
        successCallback.invoke(ret);
    }
    @ReactMethod
    public void appBundleUpgrade(ReadableArray params, Callback successCallback) {
        final WritableNativeMap retMap = new WritableNativeMap();
        //
        WritableNativeArray ret = new WritableNativeArray();
        ret.pushMap(retMap);
        successCallback.invoke(ret);
    }

    /**
     * 发送通知
     * @param params
     * @param successCallback
     */
    @ReactMethod
    public void appNotification(ReadableArray params, Callback successCallback) {
        Log.i("RNUtilsModule ",params.toString());
        //
        NotificationManager nm=(NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);

        String title = "通知标题" ;

        String content = "通知内容" ;

        //1.实例化一个通知，指定图标、概要、时间

        Notification n=new Notification(R.mipmap.ic_launcher,"这是通知,早上好",1000);

        //2.指定通知的标题、内容和intent

        Intent intent = new Intent(reactContext, MainActivity.class);

//设置跳转到的页面 ，时间等内容

        PendingIntent pi= PendingIntent.getActivity(reactContext, 0, intent, Intent.FILL_IN_ACTION);

//        n.setLatestEventInfo(this, title, content, pi);
        //3.指定声音
        n.defaults = Notification.DEFAULT_SOUND;
        //4.发送通知
        nm.notify(1, n);
        //
        final WritableNativeMap retMap = new WritableNativeMap();
        //
        WritableNativeArray ret = new WritableNativeArray();
        ret.pushMap(retMap);
        successCallback.invoke(ret);
    }
}