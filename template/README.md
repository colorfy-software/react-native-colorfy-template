# [🧰 Colorfy App Template](https://github.com/colorfy-software/react-native-colorfy-template)

_Comprehensive template for the React Native apps built at [colorfy GmbH](https://colorfy.me)._

| Service                | Status                         |
| ---------------------- | ------------------------------ |
| Bitbucket Pipelines CI | _insert SVG status badge here_ |
| Android Staging CD     | _insert SVG status badge here_ |
| Android Prod CD        | _insert SVG status badge here_ |
| iOS Staging CD         | _insert SVG status badge here_ |
| iOS Prod CD            | _insert SVG status badge here_ |

## 🏗️ Setup

If you're working at colorfy, going through the
[Setup](https://colorfy.atlassian.net/wiki/spaces/COLORFY/pages/1217265684/Coding+Styleguide#Setup) section of the Coding Styleguide will help you prepare your environment.

🚨 **IMPORTANT** 🚨

Once that's done, you'll have a few files and folder to update after initializing your project before you start:

1. Update your app Staging/Prod displayed names:
   * Android: `android/app/build.gradle` at `#L175` & `#L180`
   * iOS: Open the `.xcworkspace` inside the `/ios` folder with Xcode > Select your project (will be on top of the
     `Pods` one) > Select a target (any `STAGING` or `PROD`) in Xcode's top bar > `General` > `Identity` > Update
     `Display name` & `Bundle Identifier`. Repeat the process until `STAGING Debug`, `STAGING Release`, `PROD Debug` &
     `PROD Release` have been updated.
2. Add the Apple team key to the `ios/exportOptions.plist` at `#L14` for generating unsigned IPAs manually.
3. To allow Detox to access your iOS builds: open your `.xcworkspace` file with Xcode > File (in the top bar) > Workspace Settings > Derived Data (set it to `Workspace-relative Location`) > `DerivedData` (edit the field to be `build` instead).
4. Create or update your Android Emulator name to `'Pixel2'` to run Detox locally.
5. To update the splash screen color, modify: `android/res/values/colors.xml` & in Xcode: `LaunchScreen.storyboard > View Controller Scene > View Controller > View : Background` in the Attributes inspector (5th icon in the right panel)
6. For [Bitrise](https://www.bitrise.io)/[AppCenter](https://appcenter.ms) (CD) to work correctly, you need to create all the Android & iOS store apps and manually publish build `1` (only!). 
   
    If you're working at colorfy, following the [CI/CD setup guide](https://colorfy.atlassian.net/wiki/spaces/COLORFY/pages/2572484609/Build+Automation) would get you up and running in no time!

7. Add the build status SVG badges to the table above after setting up the apps there and the Bitbucket Pipelines one after pushing the 1st commit (the `status.svg` file will be available in the `Downloads` section of the Bitbucket repository)

## 🛣 Branches

Remember that `/master` & `/staging` are used for the build automation: any code that ends up there will automatically trigger a new build of the apps!

Make sure you always use branches to develop features in their own sandbox before opening pull requests.

If you're working at colorfy this whole process is explained in the
[Branches](https://colorfy.atlassian.net/wiki/spaces/COLORFY/pages/1217265684/Coding+Styleguide#Branches) and [Pull
Requests](https://colorfy.atlassian.net/wiki/spaces/COLORFY/pages/1217265684/Coding+Styleguide#Pull-Requests) sections
of the Coding Styleguide.

---

## 📚 Commands

_An exhaustive list of all the commands available in `package.json` and their use case._

### `yarn start`

Starts Metro, the JavaScript bundler for React Native. Mandatory steps to do anything productive today!

---

### 📱 Running on device

If you're missing anything here, you can check out the [react-native-cli commands
list](https://github.com/react-native-community/cli/blob/master/docs/commands.md#run-ios).

### `yarn ra` | `yarn android` | `yarn run-android-staging`

All these 3 commands will run the **Android Staging flavour in Debug mode** on your phone (if connected to your computer) or in the [Android Emulator](https://developer.android.com/studio/run/emulator) (if you have one setup on your computer).

### `yarn run-android-prod`

Same behaviour as the previous command but for the **Android Prod flavour in Debug mode** this time.

### `yarn build-android-staging`

Same behaviour as the previous command, but will uninstall the app before installing **Android Staging flavour in Release mode** this time.

### `yarn build-android-prod`

Same behaviour as the previous command, but will uninstall the app before installing **Android Prod flavour in Release mode** this time.

### `yarn ri` | `yarn ios` | `yarn run-ios-staging`

Run the **iOS Staging target** app on an iPhone 11 simulator.

**Note**: If you're working on Mac, prefer using Xcode. If you aren't, you might need to look into the [react-native-cli run-ios command](https://github.com/react-native-community/cli/blob/master/docs/commands.md#run-ios) in detail.

### `yarn run-ios-prod`

Same behaviour as the previous command but for the **iOS Prod target in Debug mode** this time.

---

### 🛠️ Building apps

### `yarn apk-staging`

Builds and generates a signed APK for the **Android Staging flavour in Release mode** and opens your file manager to the APK location once it's done.

### `yarn apk-prod`

Same behaviour as the previous command but for the **Android Prod flavour in Release mode** this time.

### `yarn apk-unsigned`

Same behaviour as the previous command but for the **Android Prod Unsigned flavour in Release mode** this time.

### `yarn apks`

Generates the 3 aforementioned APKs in one go.

**Note**: Prefer this command when building a new version as it makes your life easier.

### `yarn ipa-staging-unsigned {DESIRED_BUILD_NUMBER}`

Builds and generates an unsigned IPA of the **iOS Staging target in Release mode** and opens your file manager to the
IPA location once it's done.

**Note**: You need to have already archived and Distribute/Validate a build from Xcode for this to properly work.

### `yarn ipa-prod-unsigned {DESIRED_BUILD_NUMBER}`

Builds and generates an unsigned IPA of the **iOS Prod target in Release mode** and opens your file manager to the IPA location once it's done.

**Note**: You need to have already archived and Distribute/Validate a build from Xcode for this to properly work.

---

### 🧪 Testing code

### `yarn lint`

Runs ESLint on the whole codebase based on the rules set up in `.eslintrc.js` and tries to fix lint errors whenever possible.

### `yarn ts`

Runs the TypeScript compiler on all `*.ts`/`*.tsx` files based on the config set up in `tsconfig.json`.

### `yarn unit`

Runs the test suite specified in `__tests__` via Jest.

### `yarn test` | `yarn test-commit`

Runs the 3 aforementioned commands.

**Note**: `yarn test` is run by the CI/CD tool before any build. `yarn test-commit` is run before any commit is made from your local machine. Unless for specific and approved reasons: make sure to always pass this command before pushing your code.

### `yarn detox-android-staging-debug` | `yarn detox-android-staging-release`

Runs the E2E test suite with Detox on the **Android Staging flavour in Debug/Release mode**.


### `yarn detox-android-prod-debug` | `yarn detox-android-prod-release`

Runs the E2E test suite with Detox on the **Android Prod flavour in Debug/Release mode**.


### `yarn detox-ios-staging-debug` | `yarn detox-ios-staging-release`

Runs the E2E test suite with Detox on the **iOS Staging target in Debug/Release mode**.

### `yarn detox-ios-prod-debug` | `yarn detox-ios-prod-release`

Runs the E2E test suite with Detox on the **iOS Prod target in Debug/Release mode**.

### `yarn detox-ci`

Runs the E2E test suite with Detox in the CI/CD tool with the appropriated flavour/target in Release mode.

**Note**: This is not meant for local use on your machine, prefer the aforementioned commands instead or refer to [Detox documentation](https://github.com/wix/Detox/tree/master/docs).

---

### 🗃 Miscellaneous

### `yarn postinstall`

Runs after each use of `yarn add`/`yarn install` in the project to jetify the Android code, update the Pods on iOS (if you're using macOS) and remove unnecessary warnings from the bundler.

### `yarn build-android`

Builds the JavaScript bundle for offline use for Android.

**Note**: This command is usually only needed when building a specific flavour of the Android APK or using Detox locally. Make sure to call `yarn clean-android` once you're done working with the generated bundle.

### `yarn clean-android`

Deletes all the temporary code generated by `yarn build-android`.

### `yarn clean-ios`

Deletes the iOS build folder (equates to deleting the usual `~/Library/Developer/Xcode/DerivedData/`).

### `yarn set-app-icon {SOURCE_FILE_PATH}`

Updates the app icon for both iOS and Android apps using [react-native-make](https://github.com/bamlab/react-native-make/blob/master/docs/set-icon.md). Only needs a 1024 x 1024 source file.

Eg: `yarn set-app-icon /Users/charles/Desktop/new_icon_1024.png`.
