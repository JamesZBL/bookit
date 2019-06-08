#!/bin/bash
(cd phonegap && phonegap build android --release)
(cd phonegap/platforms/android && \
 jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1\
 -keystore ../../../bookit.keystore app/build/outputs/apk/release/app-release-unsigned.apk bookit\
 && zipalign -v 4 app/build/outputs/apk/release/app-release-unsigned.apk app/build/outputs/apk/release/app-release.apk)
mkdir -p apk
mv phonegap/platforms/android/app/build/outputs/apk/release/app-release.apk apk
