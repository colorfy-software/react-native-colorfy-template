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
   * Android: `android/app/build.gradle` at `#L172-187`
   * iOS: Open the `.xcworkspace` inside the `/ios` folder with Xcode > Select your project (will be on top of the
     `Pods` one) > Select a target (any `STAGING` or `PROD`) in Xcode's top bar > `General` > `Identity` > Update
     `Display name` & `Bundle Identifier`. Repeat the process until `DEV Debug`, `DEV Release`, `STAGING Debug`, `STAGING Release`, `PROD Debug` &
     `PROD Release` have been updated.
2. Add the Apple team key & provisioning profiles info to the `ios/exportOptions.plist` for generating unsigned IPAs manually.
3. To allow Detox to access your iOS builds: open your `.xcworkspace` file with Xcode > File (in macOS top bar) >
   Workspace Settings > Derived Data (set it to `Workspace-relative Location`) > `DerivedData` > edit the field to be
   `build` instead.
4. Add the project's POEditor info in `./build.sh` `#L7-8`    .
5. Create or update your Android Emulator name to `'Pixel2'` to run Detox locally.
6. To update the splash screen color, modify: 
   * Android: `android/res/values/colors.xml`
   * iOS: inside Xcode, `LaunchScreen.storyboard > View Controller Scene > View Controller > View : Background` in the Attributes inspector (5th icon in the right panel)
7. If you're using Bitbucket Pipelines, you'll need to [set up some environnement variables](https://support.atlassian.com/bitbucket-cloud/docs/deploy-build-artifacts-to-bitbucket-downloads/).
8. For [Bitrise](https://www.bitrise.io)/[AppCenter](https://appcenter.ms) (CD) to work correctly, you need to create all the Android & iOS store apps and manually publish build `1` (only!). 
   
   _If you're working at colorfy, following the [CI/CD setup guide](https://colorfy.atlassian.net/wiki/spaces/COLORFY/pages/2572484609/Build+Automation) would get you up and running in no time!_

9. Add the build status SVG badges to the table above after setting up the apps there and the Bitbucket Pipelines one after pushing the 1st commit (the `status.svg` file will be available in the `Downloads` section of the Bitbucket repository)

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

### 📱 Running on device

If you're missing anything here, you can check out the [react-native-cli commands list](https://github.com/react-native-community/cli/blob/master/docs/commands.md#run-ios).

**`yarn android`** | **`yarn ios`**

Will run `./build.sh run` to build the **Dev flavour/target in Debug mode** on your phone (if connected to your computer) or in the [Android
Emulator](https://developer.android.com/studio/run/emulator) (if you have one setup & launched on your computer)/Xcode iOS Simulator.

Here is how you can use the `./build.sh run` command:
- `./build.sh run ios dev` or `./build.sh run ios dev debug`
- `./build.sh run android dev -c` or `./build.sh run android dev --clean` (to clean the build folder and uninstall the app before building)

And from here you change the arguments `ios`/`android`, `dev` (for `staging`/`prod`) and `debug` (for `release`) depending on your needs.

---

### 🛠️ Building apps

**`./build.sh build`**

Builds and generates a signed (or unsigned) application and opens your file manager to its location once done.

Here are examples of how you can use the `./build.sh build` command:
- `./build.sh build appbundle prod` (Signed Android App Bundle Prod flavour in Release mode)
- `./build.sh build apk staging` (Signed Android APK Staging flavour in Release mode)
- `./build.sh build apk prod --unsigned` (Unsigned Android APK Prod flavour in Release mode) 
- `./build.sh build ipa staging 42` (Signed iOS IPA Staging target in Release mode with build number 42)
- `./build.sh build ipa prod 42 --unsigned` (Unsigned iOS IPA Staging target in Release mode build number 42)

---

### 🧪 Testing code

**`yarn lint`**

Runs ESLint on the whole codebase based on the rules set up in `.eslintrc.js` and tries to fix lint errors whenever possible.

**`yarn type`**

Runs the TypeScript compiler on all `*.ts`/`*.tsx` files based on the config set up in `tsconfig.json`.

**`yarn unit`**

Runs the test suite specified in `__tests__` via Jest.

**`yarn test`** | **`yarn test-commit`**

Runs the 3 aforementioned commands.

**Note**: `yarn test` is run by the CI/CD tool before any build. `yarn test-commit` is run before any commit is made from your local machine. Unless for specific and approved reasons: make sure to always pass this command before pushing your code.

**`./build.sh detox`**

Runs the E2E test suite with Detox.

Here are examples of how you can use the `./build.sh detox` command:
- `./build.sh detox android staging`
- `./build.sh detox ios prod release`
- `./build.sh detox --ci` (as is, no other argument expected when this flag is used)

And from here you change the arguments `ios`/`android`, `dev` (for `staging`/`prod`) and `debug` (for `release`) depending on your needs.

**Note**: `./build.sh detox --ci` runs the E2E test suite with Detox in the CI/CD tool with the appropriated flavour/target in Release mode. This is not meant for local use on your machine, prefer the aforementioned commands instead or refer to [Detox documentation](https://github.com/wix/Detox/tree/master/docs).

---

### 🗃 Miscellaneous

**`./build.sh assets`**

Automatically imports the latest POEditor translations, cleans SVG, minifies JPEG & PNG files and 
generates the `src/assets/index.tsx` file from where assets can be imported.

**Note**: For the images assets generation to work, you need to respect the file nomenclature rules:
  - **icons have to named with the format** `icn_name.svg` **and can only (!) be SVG files**
  - **images have to named with the format** `img_name.png` **and can be anything (PNG, JPEG, GIF).**

**`./build.sh clean android`** | **`./build.sh clean ios`**

Cleans the build directory and uninstalls the app from the device (Android only).

**`./build.sh keystore`**

Generates a keystore file to sign Android App Bundles/APKs.

**Note**: Without a keystore, the `release` variant won't be available.

**`yarn start`**

Starts Metro, the JavaScript bundler for React Native. Mandatory steps to do anything productive today!

**`yarn postinstall`**

Runs after each use of `yarn add`/`yarn install` in the project to jetify the Android code, update the Pods on iOS (if you're using macOS).

