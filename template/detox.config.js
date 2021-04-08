// eslint-disable-next-line @typescript-eslint/no-var-requires
const appName = require('./app.json').name

module.exports = {
  testRunner: 'jest',
  runnerConfig: './e2e/config.json',
  configurations: {
    'android.staging.debug': {
      type: 'android.emulator',
      binaryPath:
        'android/app/build/outputs/apk/staging/debug/app-staging-debug.apk',
      testBinaryPath:
        'android/app/build/outputs/apk/androidTest/staging/debug/app-staging-debug-androidTest.apk',
      build:
        'cd ./android && ./gradlew assembleStagingDebug --stacktrace assembleStagingDebugAndroidTest -DtestBuildType=debug && cd ..',
      device: {
        avdName: 'Pixel2',
      },
    },
    'android.staging.release': {
      type: 'android.emulator',
      binaryPath:
        'android/app/build/outputs/apk/staging/release/app-staging-release.apk',
      testBinaryPath:
        'android/app/build/outputs/apk/androidTest/staging/release/app-staging-release-androidTest.apk',
      build:
        'cd ./android && ./gradlew assembleStagingRelease --stacktrace assembleStagingReleaseAndroidTest -DtestBuildType=release && cd ..',
      device: {
        avdName: 'Pixel2',
      },
    },
    'android.prod.debug': {
      type: 'android.emulator',
      binaryPath: 'android/app/build/outputs/apk/prod/debug/app-prod-debug.apk',
      testBinaryPath:
        'android/app/build/outputs/apk/androidTest/prod/debug/app-prod-debug-androidTest.apk',
      build:
        'cd ./android && ./gradlew assembleProdDebug --stacktrace assembleProdDebugAndroidTest -DtestBuildType=debug && cd ..',
      device: {
        avdName: 'Pixel2',
      },
    },
    'android.prod.release': {
      type: 'android.emulator',
      binaryPath:
        'android/app/build/outputs/apk/prod/release/app-prod-release.apk',
      testBinaryPath:
        'android/app/build/outputs/apk/androidTest/prod/release/app-prod-release-androidTest.apk',
      build:
        'cd ./android && ./gradlew assembleProdRelease --stacktrace assembleProdReleaseAndroidTest -DtestBuildType=release && cd ..',
      device: {
        avdName: 'Pixel2',
      },
    },
    'ios.staging.debug': {
      type: 'ios.simulator',
      binaryPath: `ios/build/${appName}/Build/Products/Debug-iphonesimulator/STAGING.app`,
      build: `xcodebuild -workspace ios/${appName}.xcworkspace -scheme "STAGING Debug" -configuration Debug -sdk iphonesimulator`,
      device: {
        type: 'iPhone 11 Pro',
      },
    },
    'ios.staging.release': {
      type: 'ios.simulator',
      binaryPath: `ios/build/${appName}/Build/Products/Release-iphonesimulator/STAGING.app`,
      build: `xcodebuild -workspace ios/${appName}.xcworkspace -scheme "STAGING Release" -configuration Release -sdk iphonesimulator`,
      device: {
        type: 'iPhone 11 Pro',
      },
    },
    'ios.staging.ci': {
      type: 'ios.simulator',
      binaryPath: `ios/build/${appName}/Build/Products/Release-iphonesimulator/STAGING.app`,
      build: `set -o pipefail && export CODE_SIGNING_REQUIRED=NO && export RCT_NO_LAUNCH_PACKAGER=true && xcodebuild -workspace ios/${appName}.xcworkspace  -scheme "STAGING Release" -configuration Release -sdk iphonesimulator -derivedDataPath ios/build/${appName} -quiet`,
      device: {
        type: 'iPhone 11 Pro',
      },
    },
    'ios.prod.debug': {
      type: 'ios.simulator',
      binaryPath: `ios/build/${appName}/Build/Products/Debug-iphonesimulator/PROD.app`,
      build: `xcodebuild -workspace ios/${appName}.xcworkspace -scheme "PROD Debug" -configuration Debug -sdk iphonesimulator`,
      device: {
        type: 'iPhone 11 Pro',
      },
    },
    'ios.prod.release': {
      type: 'ios.simulator',
      binaryPath: `ios/build/${appName}/Build/Products/Release-iphonesimulator/PROD.app`,
      build: `xcodebuild -workspace ios/${appName}.xcworkspace -scheme "PROD Release" -configuration Release -sdk iphonesimulator`,
      device: {
        type: 'iPhone 11 Pro',
      },
    },
    'ios.prod.ci': {
      type: 'ios.simulator',
      binaryPath: `ios/build/${appName}/Build/Products/Release-iphonesimulator/PROD.app`,
      build: `set -o pipefail && export CODE_SIGNING_REQUIRED=NO && export RCT_NO_LAUNCH_PACKAGER=true && xcodebuild -workspace ios/${appName}.xcworkspace -scheme "PROD Release" -configuration Release -sdk iphonesimulator -derivedDataPath ios/build/${appName} -quiet`,
      device: {
        type: 'iPhone 11 Pro',
      },
    },
  },
}
