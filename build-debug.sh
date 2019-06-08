#!/bin/bash
(cd phonegap/platforms/android && ./gradlew build)
mv phonegap/platforms/android/app/build/outputs/apk/debug/app-debug.apk apk
