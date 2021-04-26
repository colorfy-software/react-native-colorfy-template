<h1 align="center">
  <a href="https://github.com/colorfy-software/react-native-colorfy-template" target="_blank" rel="noopener noreferrer">
    🧰 Colorfy App Template
  </a>
</h1>

<h4 align="center">
  <strong>Comprehensive template for the React Native apps built at <a href="https://colorfy.me" target="_blank" rel="noopener noreferrer">colorfy GmbH</a>.</strong>
</h4>

<p align="center">
  <a href="https://www.npmjs.org/package/react-native-colorfy-template" target="_blank" rel="noopener noreferrer">
    <img src="https://badge.fury.io/js/react-native-colorfy-template.svg" alt="npm version" />
  </a>
</p>

## 🚦 Quick start

```sh
npx react-native init MyApp --template react-native-colorfy-template
```

Happy coding!

## 💫 Features

This template has virtually everything you might need to kick-start a React Native (0.64.0) app already built-in and set up:

* [TypeScript](https://www.typescriptlang.org), for type safety
* [ESLint](https://eslint.org), for code linting 
* [Prettier](https://prettier.io), for code formatting
* [Jest](https://jestjs.io) + [Testing Library](https://testing-library.com), for unit testing
* [Detox](https://github.com/wix/Detox), for end-to-end testing
* [Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines), for continuous integration
* [Bitrise](https://www.bitrise.io) or [AppCenter](https://appcenter.ms), for continuous deployment
* [React Navigation](https://reactnavigation.org) v5, for screen navigation
* [React Native SVG](https://github.com/react-native-svg/react-native-svg), for rendering `.svg` files directly
* [Modalfy](https://colorfy-software.gitbook.io/react-native-modalfy), for handling custom modals
* [Splash Screen](https://github.com/crazycodeboy/react-native-splash-screen) & [Make](https://github.com/bamlab/react-native-make), for a nice cross-platform way of dealing with splash screens & app icons
* [Reanimated](https://docs.swmansion.com/react-native-reanimated) + [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/), for performant native driven (- gesture) animations
* [Redash](https://wcandillon.gitbook.io/redash/), toolset for Reanimated & Gesture Handler
* [Localize](https://github.com/zoontek/react-native-localize), for strings localization in JavaScript
* [date-fns](https://date-fns.org), for date manipulation
* [Device Info](https://github.com/react-native-device-info/react-native-device-info), for native device info
* [zustand](https://github.com/pmndrs/zustand), [z-fy](https://colorfy-software.gitbook.io/z-fy) & [AsyncStorage](https://github.com/react-native-async-storage/async-storage), for state management & data persistence
* [Encrypted Storage](https://github.com/emeraldsanto/react-native-encrypted-storage), for sensitive data persistence in Android's EncryptedSharedPreferences and iOS' Keychain
* [Pre-commit](https://github.com/observing/pre-commit), for running the test suite before each commit
* Support for Staging & Prod Android flavours/iOS targets out of the box
* A bunch of useful commands listed down below
  
## 🗂 Project structure

<details>
  <summary>Click to expand </summary>
  
  ```
  .
  ├── __mocks__ // All the mocks needed to setup unit tests
  ├── __tests__ // Holds all the unit tests (ran by Jest)
  ├── e2e // Holds all the E2E tests (ran by Detox)
  ├── scripts // Various useful scripts accessible via the commands in package.json
  │   ├── build-unsigned-ipa.sh // Builds an unsigned IPA of any iOS target
  │   ├── create-pipeline-badge.sh // Creates status SVG badge for the Bitbucket Pipelines to use
  │   ├── generate-signed-android-keystore.sh // Generates a keystore file to sign Android APKs
  │   ├── postinstall.sh // Runs after each modification to the project dependencies list to run Jetifier and update Pods
  │   ├── run-detox-ci.sh // Runs Detox in AppCenter (if @appcenter tag was used to setup project)
  │   └── silence-recycled-files-warning.js // Silence some annoying warning that pollute the console
  ├── src // App root folder
  │   ├── api // Contains all the API requests
  │   │   ├── api.ts
  │   │   └── requests.ts
  │   ├── assets // Holds all of files, SVGs, images, gifs, videos, fonts, etc
  │   │   ├── fonts/
  │   │   └── logo.png
  │   ├── components // Global reusable components
  │   │   ├── icon // Folder for each component that requires multiple files or folders
  │   │   │   ├── files/ // ie: folder with the SVG files used by Icon.tsx
  │   │   │   └── Icon.tsx
  │   │   ├── AnimatedWrapper.tsx // Otherwise one file per component 
  │   │   ├── AppText.tsx
  │   │   ├── AsyncRenderWrapper.tsx
  │   │   └── ScreenLoader.tsx
  │   ├── config    
  │   │   └── app-config // Exports the CONFIG variable (with backend URL, target helpers, feature flags, etc)
  │   ├── core // Internal SDK that takes care of all the business logic + some helpers
  │   │   ├── app-messages.ts // Each subclass of the core is a TypeScript file
  │   │   ├── core.ts // Root class of core (only file to be imported for use)
  │   │   ├── events-core.ts
  │   │   └── user-core.ts
  │   ├── hooks // Global reusable Hooks
  │   │   └── use-form.tsx // One Hook per file
  │   ├── locales // Setup for the app localization (JS side, not native)
  │   │   ├── de.json
  │   │   ├── en.json
  │   │   └── index.ts // Contains all the helpers to add localization in the app
  │   ├── modals // Contains the modals components used by react-native-modalfy
  │   │   └── default-error-modal // Each modal has its own folder
  │   │       └── DefaultErrorModal.tsx
  │   ├── navigation // Used to hold all of the navigation logic
  │   │   ├── AuthStack.tsx
  │   │   ├── Navigation.tsx // Main navigation component file
  │   │   ├── ProfileStack.tsx
  │   │   └── TabBar.tsx
  │   ├── screens // Used to hold all of the app screens at this one level, no nesting
  │   │   └── activity // Create a folder per screen
  │   │       ├── components // If screen has components that are used only within the screen, put them here
  │   │       ├── sections // If screen has sections that are used only within the screen, put them here
  │   │       └── Activity.tsx // Component file for the screen
  │   ├── store // State management with zustand
  │   │   ├── middlewares // Folder for the custom store middlewares
  │   │   ├── stores
  │   │   │   ├── app-store.ts // Each store has its own file
  │   │   │   └── user-store.ts
  │   │   └── stores.ts // Main store file
  │   ├── styles // Global styling variables & device helpers
  │   │   ├── fonts.ts 
  │   │   ├── colors.ts
  │   │   ├── screen.ts 
  │   │   └── style-guide.ts // Entry file that exports all the styles & helpers
  │   ├── types // Folder that regroups all the TypeScript interfaces defined in the app
  │   │   ├── modals-types.ts // One file per type item
  │   │   ├── navigation-types.ts
  │   │   ├── requests-types.ts
  │   │   └── store-types.ts
  │   └── utils // Helpers that don't really belong in the core
  │       ├── animate-color.ts
  │       ├── date.ts
  │       └── sleep.ts
  ├── .eslintrc.js // Configuration for ESLint (linter)
  ├── .prettierrc // Holds the code formatter configuration
  ├── .svgrrc.js // Used to set up colors to replace in some .svg files
  ├── app.json // Contains the app name used by various scripts throughout the app
  ├── babel.config.js // Configuration file for Babel
  ├── bitbucket-pipelines.yml // Configuration file for Bitbucket Pipelines (CI)
  ├── detox.config.js // Detox configuration (E2E testing)
  ├── index.d.ts // Useful to set TypeScript interfaces needed for libraries that don't provided them
  ├── index.js // Entry point of the app
  ├── jest.config.js // Configuration file for Jest (unit test)
  └── tsconfig.json // Configuration file for the TypeScript compiler
  ```
</details>

## 🤝 Contributing

This template is a very opinionated approach to React Native apps that the team uses at colorfy.

**Therefore, we won't necessarily consider requests that do not align with our goals/vision/use cases for this template.**

However, feel free to voice your opinions if need be: our position might change!

You can also consider doing so [_from the inside_](https://colorfy.me/jobs/) 👀…

## 📚 Commands

An exhaustive list of all the commands available in `package.json` and their use case.

---

### 📱 Running on device

<details>
  <summary>Browse the commands</summary>

  If you're missing anything here, you can check out the [react-native-cli commands list](https://github.com/react-native-community/cli/blob/master/docs/commands.md#run-ios).

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
</details>

---

### 🛠️ Building apps

<details>
  <summary>Browse the commands</summary>

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
</details>

---

### 🧪 Testing code

<details>
  <summary>Browse the commands</summary>

  ### `yarn lint`

  Runs ESLint on the whole codebase based on the rules set up in `.eslintrc.js` and tries to fix lint errors whenever possible.

  ### `yarn ts`

  Runs the TypeScript compiler on all `*.ts`/`*.tsx` files based on the config set up in `tsconfig.json`.

  ### `yarn unit`

  Runs the test suite specified in `__tests__` via Jest.

  ### `yarn test` | `yarn test-commit`

  Runs the 3 aforementioned commands.

  **Note**: `yarn test` is run by the CI/CD tool before any build. `yarn test-commit` is run before any commit is made from your local machine. Unless for specific and approved reasons: make sure to always pass this command before pushing your code.

  ### `yarn detox-android-staging-debug`** | `yarn detox-android-staging-release`

  Runs the E2E test suite with Detox on the **Android Staging flavour in Debug/Release mode**.


  ### `yarn detox-android-prod-debug`** | `yarn detox-android-prod-release`

  Runs the E2E test suite with Detox on the **Android Prod flavour in Debug/Release mode**.


  ### `yarn detox-ios-staging-debug`** | `yarn detox-ios-staging-release`

  Runs the E2E test suite with Detox on the **iOS Staging target in Debug/Release mode**.

  ### `yarn detox-ios-prod-debug`** | `yarn detox-ios-prod-release`

  Runs the E2E test suite with Detox on the **iOS Prod target in Debug/Release mode**.

  ### `yarn detox-ci`

  Runs the E2E test suite with Detox in the CI/CD tool with the appropriated flavour/target in Release mode.

  **Note**: This is not meant for local use on your machine, prefer the aforementioned commands instead or refer to [Detox documentation](https://github.com/wix/Detox/tree/master/docs).
  </details>

---

### 🗃 Miscellaneous

<details>
  <summary>Browse the commands</summary>

  ### `yarn start`

  Starts Metro, the JavaScript bundler for React Native. Mandatory steps to do anything productive today!

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

  Updates the app icon for both iOS and Android apps using [react-native-make](https://github.com/bamlab/react-native-make/blob/master/docs/set-icon.md). Only needs a 1024 x 1024 non-transparent source file.
  
  Eg: `yarn set-app-icon /Users/charles/Desktop/new_icon_1024.png`.
</details>

