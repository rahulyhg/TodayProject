package com.readingproject;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;
import android.content.Context;

import com.readingproject.rn.modules.RNUtilsReactPackage;

public class MainApplication extends Application implements ReactApplication {
  private static Context context;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(),
            new ImagePickerPackage(),
              new RNUtilsReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    //获取Context
    context = getApplicationContext();
  }
  //返回
  public static Context getContextObject(){
    return context;
  }
}
