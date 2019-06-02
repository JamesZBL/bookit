#!/bin/bash
./switch.sh
(cd phonegap && phonegap build android)
(cd phonegap/platforms/android && ./gradlew installDebug)