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

This template has virtually everything you might need to kick-start a React Native (0.67.3) app already built-in and set up:

* [TypeScript](https://www.typescriptlang.org), for type safety
* [ESLint](https://eslint.org), for code linting 
* [Prettier](https://prettier.io), for code formatting
* [Jest](https://jestjs.io) + [Testing Library](https://testing-library.com), for unit testing
* [Detox](https://github.com/wix/Detox) + [DetoxRecorder](https://github.com/wix/DetoxRecorder), for end-to-end testing
* [Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines), for continuous integration
* [Bitrise](https://www.bitrise.io) or [AppCenter](https://appcenter.ms), for continuous deployment
* [React Navigation](https://reactnavigation.org) v6, for screen navigation
* [SVG Cleaner](https://github.com/RazrFalcon/svgcleaner) + [React Native SVG](https://github.com/react-native-svg/react-native-svg), for cleaning & rendering `.svg` files directly
* [jpegoptim](https://github.com/tjko/jpegoptim) + [OptiPNG](http://optipng.sourceforge.net), for minifying `.jpg` & `.png` files
* [Modalfy](https://colorfy-software.gitbook.io/react-native-modalfy), for handling custom modals
* [Splash Screen](https://github.com/crazycodeboy/react-native-splash-screen), for a nice cross-platform way of dealing with splash screens
* [Reanimated](https://docs.swmansion.com/react-native-reanimated) + [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/), for performant native driven (- gesture) animations
* [FastImage](https://github.com/DylanVann/react-native-fast-image), for performant image loading
* [Localize](https://github.com/zoontek/react-native-localize), for strings localization in JavaScript
* [date-fns](https://date-fns.org), for date manipulation
* [Device Info](https://github.com/react-native-device-info/react-native-device-info), for native device info
* [zustand](https://github.com/pmndrs/zustand), [zfy](https://colorfy-software.gitbook.io/zfy) & [MMKV](https://github.com/mrousavy/react-native-mmkv), for state management & data persistence (with encryption if needed) 
* [Pre-commit](https://github.com/observing/pre-commit), for running the test suite before each commit
* Support for `Dev`, `Staging` & `Prod` Android flavours/iOS targets out of the box
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
  │   ├── generate-signed-android-keystore.sh // Generates a keystore file to sign Android App Bundles/APKs
  │   ├── images.js // Generates the src/assets/index.tsx file
  │   ├── postinstall.sh // Runs after each modification to the project dependencies list to run Jetifier and update Pods
  │   └── run-detox-ci.sh // Runs Detox in AppCenter (if @appcenter tag was used to setup project)
  ├── src // App root folder
  │   ├── api // Contains all the API requests
  │   │   ├── api.ts
  │   │   └── requests.ts
  │   ├── assets // Holds all of files, SVGs, images, gifs, videos, fonts, etc
  │   │   ├── fonts/
  │   │   ├── icn_activity.svg
  │   │   ├── logo.png
  │   │   └── index.tsx // Generated file from where assets can be imported (`Assets.x`, `Icons.x`, `Images.x`, etc)
  │   ├── components // Global reusable components
  │   │   ├── AnimatedWrapper.tsx // Otherwise one file per component 
  │   │   ├── AppText.tsx
  │   │   ├── AsyncRenderWrapper.tsx
  │   │   ├── Button.tsx
  │   │   ├── FloatingLabelInput.tsx
  │   │   ├── Row.tsx
  │   │   └── ScreenLoader.tsx
  │   ├── config    
  │   │   └── app-config // Exports the CONFIG variable (with backend URL, target helpers, feature flags, etc)
  │   ├── core // Internal SDK that takes care of all the business logic + some helpers
  │   │   ├── app-core.ts // Each subclass of the core is a TypeScript file
  │   │   ├── core.ts // Root class of core (only file to be imported for use)
  │   │   ├── events-core.ts
  │   │   └── user-core.ts
  │   ├── locales // Setup for the app localization (JS side, not native)
  │   │   ├── de.json
  │   │   ├── en.json
  │   │   └── index.ts // Contains all the helpers to add localization in the app
  │   ├── modals // Contains the modals components used by react-native-modalfy
  │   │   └── AlertModal.tsx
  │   ├── navigation // Used to hold all of the navigation logic
  │   │   ├── AuthStack.tsx
  │   │   ├── Navigation.tsx // Main navigation component file
  │   │   ├── SettingsStack.tsx
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
  │   │   │   ├── stores.ts
  │   │   │   └── user-store.ts
  │   │   └── stores.ts // Main store file
  │   ├── styles // Global styling variables & device helpers
  │   │   ├── colors.ts
  │   │   ├── device.ts 
  │   │   ├── fonts.ts 
  │   │   └── style-guide.ts // Entry file that exports all the styles & helpers
  │   ├── types // Folder that regroups all the TypeScript interfaces defined in the app
  │   │   ├── modals-types.ts // One file per type item
  │   │   ├── navigation-types.ts
  │   │   └── store-types.ts
  │   └── utils // Helpers that don't really belong in the core
  │       ├── animate-color.ts
  │       ├── date.ts
  │       ├── linking.ts
  │       ├── navigation.ts
  │       ├── sleep.ts
  │       └── strings.ts
  ├── .eslintrc.js // Configuration for ESLint (linter)
  ├── .prettierrc // Holds the code formatter configuration
  ├── .svgrrc.js // Used to set up colors to replace in some .svg files
  ├── app.json // Contains the app name used by various scripts throughout the app
  ├── babel.config.js // Configuration file for Babel
  ├── bitbucket-pipelines.yml // Configuration file for Bitbucket Pipelines (CI)
  ├── build.sh // File containing useful shell scripts
  ├── detox.config.js // Detox configuration (E2E testing)
  ├── index.d.ts // Useful to set TypeScript interfaces needed for libraries that don't provided them
  ├── index.js // Entry point of the app
  ├── jest.config.js // Configuration file for Jest (unit test)
  └── tsconfig.json // Configuration file for the TypeScript compiler
  ```
</details>

## 📚 Commands

An exhaustive list of all the commands available in `package.json` and their use case.

---

### 📱 Running on device

<details>
  <summary>Browse the commands</summary>

  If you're missing anything here, you can check out the [react-native-cli commands list](https://github.com/react-native-community/cli/blob/master/docs/commands.md#run-ios).

  ###  `yarn android` | `yarn ios`

Will run `./build.sh run` to build the **Dev flavour/target in Debug mode** on your phone (if connected to your computer) or in the [Android
Emulator](https://developer.android.com/studio/run/emulator) (if you have one setup & launched on your computer)/Xcode iOS Simulator.

Here is how you can use the `./build.sh run` command:
- `./build.sh run ios dev` or `./build.sh run ios dev debug`
- `./build.sh run android dev -c` or `./build.sh run android dev --clean` (to clean the build folder and uninstall the app before building)

And from here you change the arguments `ios`/`android`, `dev` (for `staging`/`prod`) and `debug` (for `release`) depending on your needs.
</details>

---

### 🛠️ Building apps

<details>
  <summary>Browse the commands</summary>

  ### `./build.sh build`

  Builds and generates a signed (or unsigned) application and opens your file manager to its location once done.

  Here are examples of how you can use the `./build.sh build` command:
  - `./build.sh build appbundle prod` (Signed Android App Bundle Prod flavour in Release mode)
  - `./build.sh build apk staging` (Signed Android APK Staging flavour in Release mode)
  - `./build.sh build apk prod --unsigned` (Unsigned Android APK Prod flavour in Release mode) 
  - `./build.sh build ipa staging 42` (Signed iOS IPA Staging target in Release mode with build number 42)
  - `./build.sh build ipa prod 42 --unsigned` (Unsigned iOS IPA Staging target in Release mode build number 42)
</details>

---

### 🧪 Testing code

<details>
  <summary>Browse the commands</summary>

  ### `yarn lint`

  Runs ESLint on the whole codebase based on the rules set up in `.eslintrc.js` and tries to fix lint errors whenever possible.

  ### `yarn type`

  Runs the TypeScript compiler on all `*.ts`/`*.tsx` files based on the config set up in `tsconfig.json`.

  ### `yarn unit`

  Runs the test suite specified in `__tests__` via Jest.

  ### `yarn test` | `yarn test-commit`

  Runs the 3 aforementioned commands.

  **Note**: `yarn test` is run by the CI/CD tool before any build. `yarn test-commit` is run before any commit is made from your local machine. Unless for specific and approved reasons: make sure to always pass this command before pushing your code.
  
  ### `./build.sh detox`

  Runs the E2E test suite with Detox.

  Here are examples of how you can use the `./build.sh detox` command:
  - `./build.sh detox android staging`
  - `./build.sh detox ios prod release`
  - `./build.sh detox --ci` (as is, no other argument expected when this flag is used)

  And from here you change the arguments `ios`/`android`, `dev` (for `staging`/`prod`) and `debug` (for `release`) depending on your needs.

  **Note**: `./build.sh detox --ci` runs the E2E test suite with Detox in the CI/CD tool with the appropriated flavour/target in Release mode. This is not meant for local use on your machine, prefer the aforementioned commands instead or refer to [Detox documentation](https://github.com/wix/Detox/tree/master/docs).
  </details>

---

### 🗃 Miscellaneous

<details>
  <summary>Browse the commands</summary>

  ### `./build.sh assets`

  Automatically imports the latest POEditor translations, cleans SVG, minifies JPEG & PNG files and generates the `src/assets/index.tsx` file from where assets can be imported.
  
  **Note**: For the images assets generation to work, you need to respect the file nomenclature rules:
  - **icons have to named with the format** `icn_name.svg` **and can only (!) be SVG files**
  - **images have to named with the format** `img_name.png` **and can be anything (PNG, JPEG, GIF).**
  - 
  ### `./build.sh clean android` | `./build.sh clean ios`

  Cleans the build directory and uninstalls the app from the device (Android only).

  ### `./build.sh keystore`

  Generates a keystore file to sign Android App Bundles/APKs.

  **Note**: Without a keystore, the `release` variant won't be available.

  ### `yarn start`

  Starts Metro, the JavaScript bundler for React Native. Mandatory steps to do anything productive today!

  ### `yarn postinstall`

  Runs after each use of `yarn add`/`yarn install` in the project to jetify the Android code, update the Pods on iOS (if you're using macOS).
</details>

## 🤝 Contributing

This template is a very opinionated approach to React Native apps that the team uses at colorfy.

**Therefore, we won't necessarily consider requests that do not align with our goals/vision/use cases for this template.**

However, feel free to voice your opinions if need be: our position might change!

You can also consider doing so [_from the inside_](https://colorfy.me/jobs/) 👀…
