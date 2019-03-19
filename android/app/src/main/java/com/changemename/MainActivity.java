package com.changemename;

import com.reactnativenavigation.NavigationActivity;
import com.reactnativenavigation.utils.CommandListenerAdapter;

public class MainActivity extends NavigationActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
   /* @Override
    protected String getMainComponentName() {
        return "LifeMate";
    }*/

    @Override
    public void invokeDefaultOnBackPressed() {
        // do not call super.invokeDefaultOnBackPressed() as it will close the app.  Instead lets just put it in the background.
        if (!navigator.handleBack(new CommandListenerAdapter())) {
            moveTaskToBack(true);
        }
    }

    @Override
    public boolean moveTaskToBack(boolean nonRoot) {
        return super.moveTaskToBack(nonRoot);
    }
}
