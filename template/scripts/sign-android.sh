#!/usr/bin/env bash

set -e

current_path=$(pwd)
uuid=$(python -c 'import sys,uuid; sys.stdout.write(uuid.uuid4().hex)')
path_to_java=$(/usr/libexec/java_home)

NC='\033[0m'
BOLD='\033[1;30m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE_LINK='\033[4;34m'

echo "Current path is ${BLUE_LINK}$current_path${NC} \n"
echo "Generating Android keystore file using UUID ${BLUE}$uuid${NC} as name \n"

cd $path_to_java
sudo keytool -genkey -v -keystore $uuid.keystore -alias $uuid -keyalg RSA -keysize 2048 -validity 10000

echo "\n${YELLOW}Keystore file generated${NC} \n"
echo "Moving keystore file to Android folder ${BLUE_LINK}$current_path/android/app${NC} \n"
cp -r -f ./"$uuid".keystore "$current_path"/android/app

echo "${BOLD}Navigating back to project folder...${NC} \n"
cd $current_path

echo "\n" >> ./android/gradle.properties
echo "MYAPP_UPLOAD_STORE_FILE=$uuid.keystore" >> ./android/gradle.properties
echo "MYAPP_UPLOAD_KEY_ALIAS=$uuid" >> ./android/gradle.properties
echo "MYAPP_UPLOAD_STORE_PASSWORD=_**ENTER-THE-PASSWORD-YOU-PROVIDED**_" >> ./android/gradle.properties
echo "MYAPP_UPLOAD_KEY_PASSWORD=_**ENTER-THE-PASSWORD-YOU-PROVIDED**_" >> ./android/gradle.properties

echo "${GREEN}All good!$NC"

open ./android/gradle.properties
