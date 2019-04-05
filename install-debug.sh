#!/bin/bash
(cd phonegap && phonegap build android)
adb uninstall me.maorunan.bookit
(cd phonegap/platforms/android && ./gradlew installDebug)