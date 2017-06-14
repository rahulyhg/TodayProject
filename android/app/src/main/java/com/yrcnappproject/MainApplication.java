package com.yrcnappproject;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.rnfs.RNFSPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.yrcnappproject.rn.modules.RNUtilsReactPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.microsoft.codepush.react.CodePush;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

//    @Override
//    protected String getJSBundleFile() {
//      return CodePush.getJSBundleFile();
//    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
//      return  false;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFSPackage(),
              new RNUtilsReactPackage(),
              new ImagePickerPackage(),
              new SplashScreenReactPackage()
//              new CodePush("U2kIDCmIe3M9XzDhIEOdmDGPctmv12d41da1-a78b-47b4-b475-4f3305ad1642", MainApplication.this, BuildConfig.DEBUG)//Staging
              ,new CodePush("tEzo6BfBEVe04z_hKQ9K4QtOIP3w12d41da1-a78b-47b4-b475-4f3305ad1642", MainApplication.this, BuildConfig.DEBUG)//Production
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
    SoLoader.init(this, /* native exopackage */ false);
  }
}
