#!/bin/bash

CURRENT_PATH=$(pwd)
UUID=$(python -c 'import sys,uuid; sys.stdout.write(uuid.uuid4().hex)')
PATH_TO_JAVA=$(/usr/libexec/java_home)

NC='\033[0m'
BLUE='\033[1;34m'
GREEN='\033[01;32m'
YELLOW='\033[0;33m'
BLUE_LINK='\033[4;34m'

echo -e "Current path is ${BLUE_LINK}${CURRENT_PATH}${NC} \n"
echo -e "Generating Android keystore file using UUID ${BLUE}$UUID${NC} as name \n"

cd "$PATH_TO_JAVA" || exit
sudo keytool -genkey -v -keystore "$UUID".keystore -alias "$UUID" -keyalg RSA -keysize 2048 -validity 10000

echo -e "\nMoving keystore file to ${BLUE_LINK}${CURRENT_PATH}/android/app${NC}\n"
cp -r -f ./"$UUID".keystore "${CURRENT_PATH}"/android/app

cd "$CURRENT_PATH" || exit

{
  echo ""
  echo "MYAPP_UPLOAD_STORE_FILE=$UUID.keystore"
  echo "MYAPP_UPLOAD_KEY_ALIAS=$UUID"
  echo "MYAPP_UPLOAD_STORE_PASSWORD=_**ENTER-THE-PASSWORD-YOU-PROVIDED**_"
  echo "MYAPP_UPLOAD_KEY_PASSWORD=_**ENTER-THE-PASSWORD-YOU-PROVIDED**_"
} >> ./android/gradle.properties

echo -e "${GREEN}✔️ KEYSTORE GENERATED\n${NC}"
echo -e "${YELLOW}Don't forget to add the passwords to ${BLUE_LINK}${CURRENT_PATH}/android/gradle.properties${NC}${NC}"

open ./android/gradle.properties
