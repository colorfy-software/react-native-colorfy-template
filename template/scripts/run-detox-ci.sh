#!/usr/bin/env bash

function setupAndroidEmulator {
    # NOTE: Let the code know if it should swap some functions with
  # their mocked counterpart for E2E testing (see user-core.ts for an example)
  echo "💡 Setting up E2E_CONFIG.IS_MOCKING_ENABLED for Detox"
  sed -i '' 's/false/true/g' src/config/e2e-config.ts

  echo "🏁 Setup Android Emulator"
  SIMULATOR_IMAGE="system-images;android-28;google_apis;x86"
  SIMULATOR_NAME="Pixel2"

  ANDROID_HOME=~/Library/Android/sdk
  ANDROID_SDK_ROOT=~/Library/Android/sdk
  ANDROID_AVD_HOME=~/.android/avd
  PATH="$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$PATH"
  
  echo "🌬️ Cleaning up previous Android Emulator instances"
  rm -f "${ANDROID_AVD_HOME}"/*.avd/*.lock

  echo "🤝 Accepts all SDK licences"
  yes | sdkmanager --licenses

  echo "📥 Download Emulator Image"
  sdkmanager --install "$SIMULATOR_IMAGE"

  echo "🆕 Create Emulator '$SIMULATOR_NAME' with image '$SIMULATOR_IMAGE'"
  echo "no" | avdmanager --verbose create avd --force --name "$SIMULATOR_NAME" --device "pixel" --package "$SIMULATOR_IMAGE" --tag "google_apis" --abi "x86"
}

function setupiOSSimulator {
  sed -i '' 's/false/true/g' src/config/e2e-config.ts
  brew tap wix/brew
  brew install applesimutils
  npx detox clean-framework-cache
  npx detox build-framework-cache
}

function cleanupArtifacts {
  echo "🧹 Clean up generated artifacts"
  rm -f /Users/runner/work/1/s/android/app/build/outputs/apk/androidTest/prod/release/app-prod-release-androidTest.apk
  rm -f /Users/runner/work/1/s/android/app/build/outputs/apk/androidTest/staging/release/app-staging-release-androidTest.apk
}

if [[ "$APPCENTER_XCODE_SCHEME" == "STAGING Release" ]]; then
  setupiOSSimulator
  npx detox build -c ios.staging.release.ci
  npx detox test -c ios.staging.release.ci --loglevel verbose --retries 3 --cleanup
elif [[ "$APPCENTER_XCODE_SCHEME" == "PROD Release" ]]; then
  setupiOSSimulator
  npx detox build -c ios.staging.release.ci
  npx detox test -c ios.staging.release.ci --loglevel verbose --retries 3 --cleanup
elif [[ "$APPCENTER_ANDROID_VARIANT" == "stagingRelease" ]]; then
  npx detox build -c android.staging.release --loglevel verbose
  setupAndroidEmulator
  npx detox test -c android.staging.release --loglevel verbose --retries 3 --gpu guest --headless
  cleanupArtifacts
elif [[ "$APPCENTER_ANDROID_VARIANT" == "prodRelease" ]]; then
  npx detox build -c android.prod.release --loglevel verbose
  setupAndroidEmulator
  npx detox test -c android.prod.release --loglevel verbose --retries 3 --gpu guest --headless
  cleanupArtifacts
fi
