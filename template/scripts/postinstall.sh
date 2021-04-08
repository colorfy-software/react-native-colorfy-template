#!/usr/bin/env bash

uname=$(uname)

npx jetify

if [[ -z $APPCENTER_ANDROID_VARIANT && -z $APPCENTER_XCODE_SCHEME ]]; then
  # NOTE: Makes the Detox mock file non-commitable (only Detox updates it when it runs).
  # Use --no-assume-unchanged if you want to reverse this.
  git update-index --assume-unchanged src/config/e2e-config.ts
fi

if [[ $uname =~ Darwin && -z $APPCENTER_ANDROID_VARIANT ]]; then
  npx pod-install ios
else
  echo "\033[34m\nWe didn't setup CocoaPods as you're not using macOS.\033[0m"
fi

# node ./scripts/silence-recycled-files-warning.js

echo "\033[0;32m\nDonesies!\033[0m"
