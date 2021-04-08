package com.appstarter.NavigationBar;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.Map;
import java.util.HashMap;

import android.os.Build;
import android.app.Activity;
import android.view.Display;
import android.graphics.Rect;
import android.view.KeyEvent;
import android.view.WindowManager;
import android.util.DisplayMetrics;
import android.view.KeyCharacterMap;
import android.content.res.Resources;
import android.view.ViewConfiguration;


public class NavigationBarModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;

    @Override
    public String getName() {
        return "NavigationBar";
    }

    public NavigationBarModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();

        constants.put("defaultHeight", getDefaultHeight());

        return constants;
    }

    // Retrieved from https://stackoverflow.com/a/62301619
    private int getDefaultHeight() {
        Activity activity = getCurrentActivity();

        if (activity == null) {
            return 0;
        }

        Rect screenWindow = new Rect();
        DisplayMetrics displayMetrics = new DisplayMetrics();
        activity.getWindow().getDecorView().getWindowVisibleDisplayFrame(screenWindow);
        activity.getWindowManager().getDefaultDisplay().getRealMetrics(displayMetrics);
        return displayMetrics.heightPixels - (screenWindow.top + screenWindow.height());

    }
}
