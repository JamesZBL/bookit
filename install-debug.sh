#!/bin/bash
(cd phonegap && phonegap build android)
(cd phonegap/platforms/android && ./gradlew installDebug)