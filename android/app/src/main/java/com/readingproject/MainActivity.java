package com.readingproject;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.widget.Toast;

import com.facebook.common.logging.FLog;
import com.facebook.react.ReactActivity;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.devsupport.DoubleTapReloadRecognizer;

public class MainActivity extends ReactActivity {

    private static Activity activity;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReadingProject";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        UpdateManager manager = new UpdateManager(MainActivity.this);
//        // 检查软件更新
//        manager.checkUpdate();
        activity = this;
    }
    public static Activity getActivity(){
        return  activity;
    }
}
