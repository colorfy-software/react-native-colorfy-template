#!/usr/bin/env bash

uname=$(uname)

npx jetify

if [[ $uname =~ Darwin && -z $APPCENTER_ANDROID_VARIANT ]]; then
  npx pod-install ios
else
  echo "\033[34m\nWe didn't setup CocoaPods as you're not using macOS.\033[0m"
fi

node ./scripts/silence-recycled-files-warning.js

echo "\033[0;32m\nDonesies!\033[0m"
