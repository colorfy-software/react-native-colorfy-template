#!/bin/bash

current_path=$(pwd)
uuid=$(python -c 'import sys,uuid; sys.stdout.write(uuid.uuid4().hex)')
path_to_java=$(/usr/libexec/java_home)

echo "Current path is $current_path \n"
echo "Navigating to Java home folder \n"
echo "Generating key for android using uuid $uuid as name \n"

cd "$path_to_java" && sudo keytool -genkey -v -keystore "$uuid".keystore -alias "$uuid" -keyalg RSA -keysize 2048 -validity 10000

echo "Key generated \n"
echo "Moving keystore file to android folder $current_path /android/app \n"
cp -r -f ./"$uuid".keystore "$current_path"/android/app

echo "Navigating back to project folder \n"
cd "$current_path"


echo "\n" >> ./android/gradle.properties
echo "MYAPP_UPLOAD_STORE_FILE=$uuid.keystore" >> ./android/gradle.properties
echo "MYAPP_UPLOAD_KEY_ALIAS=$uuid" >> ./android/gradle.properties
echo "MYAPP_UPLOAD_STORE_PASSWORD=******" >> ./android/gradle.properties
echo "MYAPP_UPLOAD_KEY_PASSWORD=******" >> ./android/gradle.properties

code ./android/gradle.properties