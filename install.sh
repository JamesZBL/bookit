#!/bin/bash
npm run build
cp -r dist/* phonegap/www
(cd phonegap && phonegap build android)
(cd phonegap/platforms/android && ./gradlew installDebug)