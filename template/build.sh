#!/bin/bash

END='\033[00m'
RED='\033[01;31m'
GREEN='\033[01;32m'

POE_API_TOKEN=PUT_VALUE_HERE
POE_PROJECT_ID=PUT_VALUE_HERE

function importPoe {
  importPoeLang "en"
  importPoeLang "de"
}

function importPoeLang {
  lang=$1
  langCode="$(tr '[:lower:]' '[:upper:]' <<<"${lang}")"

  echo -e "\nImporting ${langCode} translations..."

  local json
  json=$(curl \
    -s \
    --location \
    --request POST "https://api.poeditor.com/v2/projects/export" \
    --form "api_token=$POE_API_TOKEN" \
    --form "id=$POE_PROJECT_ID" \
    --form "language=$lang" \
    --form "type=key_value_json" \
    --form "filters=translated")

  local regex='"url":"(.*)"'

  if [[ $json =~ $regex ]]; then
    local url="${BASH_REMATCH[1]//"\\"/}"
    curl -s "$url" --output "src/locales/$lang.json"
  else
    echo -e "\n${RED}Could not fetch ${langCode} translations:\n${json}${END}"
  fi
}

function cleanSVGs {
  if command -v svgcleaner &>/dev/null; then
    for filename in src/assets/*.svg; do
      [ -e "$filename" ] || continue
      printf "\nCleaning %s: " "$filename"
      svgcleaner "$filename" "$filename"
    done
  fi
}

function cleanBitmaps {
  if command -v jpegoptim &>/dev/null; then
    echo -e '\nMinifying .jpg files...'
    find . -path "./src/assets/*.jpg" -exec jpegoptim -m80 -o -p --strip-all {} \;
  fi

  if command -v optipng &>/dev/null; then
    echo -e '\nMinifying .png files...'
    find . -path "./src/assets/*.png" -exec optipng -silent {} \;
  fi
}

case $1 in
assets)
  #eg: ./build.sh assets
  importPoe
  cleanSVGs
  cleanBitmaps
  node ./scripts/images.js
  npx eslint 'src/assets/index.tsx' --fix
  echo -e "${GREEN}\n✔️ ASSETS GENERATED${END}"
  ;;
build)
  # eg: ./build.sh build appbundle prod
  # eg: ./build.sh build apk staging
  # eg: ./build.sh build apk prod --unsigned
  # eg: ./build.sh build ipa staging 42
  # eg: ./build.sh build ipa prod 42 --unsigned
  isSignedBuild=true
  androidFlavour="$(tr '[:lower:]' '[:upper:]' <<<"${3:0:1}")${3:1}"

  for arg in "$@"; do
    case $arg in
    -u | --unsigned)
      isSignedBuild=false

      for unsigned_arg; do
        shift
        [ "$unsigned_arg" = "-u" ] || [ "$unsigned_arg" = "--unsigned" ] && continue
        set -- "$@" "$unsigned_arg"
      done
      ;;
    esac
  done

  if [[ ${2} = "appbundle" && ${isSignedBuild} = true ]]; then
    npx jetify && cd ./android && ./gradlew bundle"${androidFlavour}"Release --stacktrace && open app/build/outputs/bundle/"${3}"/release && cd ..
  elif [[ ${2} = "appbundle" && ${isSignedBuild} = false ]]; then
    echo -e "\n${RED}Building an unsigned Android App Bundle is not supported yet, please try with 'apk' instead. ${END} \n"
  elif [[ ${2} = "apk" && ${isSignedBuild} = true ]]; then
    npx jetify && cd ./android && ./gradlew assemble"${androidFlavour}"Release --stacktrace && open app/build/outputs/apk/"${3}"/release && cd ..
  elif [[ ${2} = "apk" && ${isSignedBuild} = false ]]; then
    npx jetify && yarn run bundle-android && cd ./android && ./gradlew assemble"${androidFlavour}"Unsigned --stacktrace && open app/build/outputs/apk/"${3}"/unsigned && cd .. && ./build.sh clean android
  elif [[ ${2} = "ipa" && ${isSignedBuild} = true ]]; then
    echo -e "\n${RED}Building a signed IPA via terminal is not supported yet, please use Xcode instead. ${END} \n"
  elif [[ ${2} = "ipa" && ${isSignedBuild} = false ]]; then
    scripts/build-unsigned-ipa.sh "${3}" "${4}"
  fi
  ;;
clean)
  #eg: ./build.sh clean android
  platform="$(tr '[:lower:]' '[:upper:]' <<<"${2}")"

  if [[ ${platform} = "android" ]]; then
    rm ./android/app/src/main/assets/index.android.bundle && rm -rf ./android/app/src/main/res/raw && rm -rf ./android/app/src/main/res/drawable-hdpi && rm -rf ./android/app/src/main/res/drawable-mdpi && rm -rf ./android/app/src/main/res/drawable-xhdpi && rm -rf ./android/app/src/main/res/drawable-xxhdpi && rm -rf ./android/app/src/main/res/drawable-xxxhdpi
  elif [[ ${platform} = "ios" ]]; then
    rm -rf ./ios/build/
  fi
  echo -e "${GREEN}\n✔️ ${platform} BUILD FOLDER CLEANED${END}"
  ;;
detox)
  # eg: ./build.sh detox android
  # eg: ./build.sh detox android staging
  # eg: ./build.sh detox ios prod release
  # eg: ./build.sh detox --ci
  sch=${3:-'dev'}
  scheme="$(tr '[:lower:]' '[:upper:]' <<<"${sch}")"
  mode=${4:-'debug'}

  if [[ ${2} = "-c" || ${2} = "--ci" ]]; then
    ./scripts/run-detox-ci.sh
  else
    detox build --configuration "$2"."$scheme"."$mode" && detox test --configuration "$2"."$scheme"."$mode"
  fi
  ;;
keystore)
  # eg: ./build.sh keystore
  ./scripts/generate-signed-android-keystore.sh
  ;;
run)
  #eg: $ ./build.sh run android
  #eg: $ ./build.sh run android staging
  #eg: $ ./build.sh run ios prod release --clean

  for arg in "$@"; do
    case $arg in
    -c | --clean)
      if [[ ${2} = "android" ]]; then
        cd ./android && ./gradlew clean && ./gradlew uninstallAll && cd ..
        echo -e "${GREEN}\n✔️ Android build folder cleaned & app uninstalled!\n${END}"
      elif [[ ${2} = "ios" ]]; then
        ./build.sh clean ios
        echo -e '\n'
      fi

      for clean_arg; do
        shift
        [[ "$clean_arg" = "-c" || "$clean_arg" = "--clean" ]] && continue
        set -- "$@" "$clean_arg"
      done

      ;;
    esac
  done

  sch=${3:-'dev'}
  scheme="$(tr '[:lower:]' '[:upper:]' <<<"${sch}")"

  mde=${4:-'debug'}
  mode="$(tr '[:lower:]' '[:upper:]' <<<"${mde:0:1}")${mde:1}"

  if [[ ${2} = "android" ]]; then
    npx react-native run-android --variant "${sch}${mode}" --appId me.colorfy.somattwo."${sch}" --verbose
  elif [[ ${2} = "ios" ]]; then
    npx react-native run-ios --scheme "${scheme} ${mode}" --verbose
  fi
  ;;
esac
