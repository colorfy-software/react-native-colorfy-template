#!/usr/bin/env bash

npm i -g detox-cli

if [[ $uname =~ Darwin ]]; then
  brew tap wix/brew
  brew install applesimutils
  xcode-select --install
fi
