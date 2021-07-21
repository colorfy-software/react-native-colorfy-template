#!/bin/bash

set -e

NC='\033[00m'
RED='\033[01;31m'
GREEN='\033[32m'
YELLOW='\033[01;33m'
BLUE_LINK='\033[4;34m'

function readJson {  
  UNAMESTR=`uname`
  if [[ "$UNAMESTR" == 'Linux' ]]; then
    SED_EXTENDED='-r'
  elif [[ "$UNAMESTR" == 'Darwin' ]]; then
    SED_EXTENDED='-E'
  fi; 

  VALUE=`grep -m 1 "\"${2}\"" ${1} | sed ${SED_EXTENDED} 's/^ *//;s/.*: *"//;s/",?//'`

  if [ ! "$VALUE" ]; then
    echo -e "${RED}Error: Cannot find \"${2}\" in ${1}${NC}" >&2;
    exit 1;
  else
    echo $VALUE ;
  fi; 
}

CURRENT_PATH=$(pwd)
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd )"
APP_NAME="$( readJson app.json name )"

if [[ $# = 0 ]]; then
  echo -e "\n${RED}You didn't provide any scheme name! ie: 'STAGING' or 'PROD' ${NC} \n"
elif [[ $# = 1 ]]; then
  echo -e "\n${RED}You didn't provide the desired build number${NC} \n"
elif [[ $# > 2 ]]; then
  echo -e "\n${RED}You provided too many arguments, expected only 2. ie: 'PROD' 42 ${NC} \n"
else
  osascript -e 'display alert "💡 Disable Flipper 💡" message "Remember to comment use_flipper!() out of the Podfile and run pod install before building unsigned IPAs!"'
  cd ${ROOT}/ios

  SCHEME=${1}
  BUILD_NUMBER=${2}
  IPA_PATH=${ROOT}/ios/IPAs/${SCHEME}/${SCHEME}_${BUILD_NUMBER}

  mkdir -p ${IPA_PATH}

  xcodebuild -workspace ${ROOT}/ios/${APP_NAME}.xcworkspace -scheme "${SCHEME} Release" -sdk iphoneos -configuration AppStoreDistribution archive -archivePath ${IPA_PATH}/"${SCHEME} Release".xcarchive
  xcodebuild -exportArchive -archivePath ${IPA_PATH}/"${SCHEME} Release".xcarchive -exportOptionsPlist ${ROOT}/ios/exportOptions.plist -exportPath ${IPA_PATH}
  
  echo -e "Unsigned IPA file available at: ${BLUE_LINK}${IPA_PATH}${NC}\n"
  
  echo -e "${GREEN}Done!${NC}"

  open ${IPA_PATH}

  cd ${CURRENT_PATH}
fi
