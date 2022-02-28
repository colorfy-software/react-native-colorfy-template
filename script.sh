#!/usr/bin/env bash

npm i -g detox-cli

if [[ $uname =~ Darwin ]]; then
  brew install svgcleaner
  brew install jpegoptim
  brew install optipng
  brew install tdewolff/tap/minify
  brew tap wix/brew
  brew install applesimutils
  xcode-select --install
fi
